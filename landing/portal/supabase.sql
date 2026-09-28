-- =====================================================================
-- Portal de clientes · bascunan.digital
-- Ejecutar una vez en Supabase → SQL Editor → New query → Run.
-- Crea la tabla de proyectos, la seguridad por usuario (RLS) y el
-- almacenamiento privado de archivos.
-- =====================================================================

-- 1) Un proyecto por cliente ------------------------------------------------
create table if not exists public.proyectos (
  user_id         uuid primary key references auth.users (id) on delete cascade,
  correo          text,
  nombre          text,
  negocio         text,
  whatsapp        text,
  rubro           text,
  comuna          text,
  instagram       text,
  dominio         text,
  tipo_sitio      text,
  color_1         text,
  color_2         text,
  referencias     text,
  texto_nosotros  text,
  texto_servicios text,
  texto_faq       text,
  texto_contacto  text,
  -- La etapa la cambia solo Alonso (desde el panel de Supabase)
  etapa           text not null default 'material'
                  check (etapa in ('material', 'diseno', 'desarrollo', 'revision', 'publicado')),
  notas_internas  text,  -- solo para Alonso: el cliente no puede leerla ni editarla
  -- Lo que Alonso le entrega al cliente: el cliente solo LEE estas 3, nunca las edita.
  mensaje_etapa   text,  -- nota corta de Alonso, visible para el cliente ("ya diseñé tu home, revísala")
  enlace_diseno   text,  -- link a Figma u otro, visible para el cliente
  enlace_preview  text,  -- link al sitio en desarrollo/revisión, visible para el cliente
  creado_en       timestamptz not null default now(),
  actualizado_en  timestamptz not null default now()
);

-- Límites de largo (evitan abusos)
alter table public.proyectos drop constraint if exists largo_textos;
alter table public.proyectos
  add constraint largo_textos check (
    coalesce(length(texto_nosotros), 0) <= 3000 and coalesce(length(texto_servicios), 0) <= 3000 and
    coalesce(length(texto_faq), 0) <= 3000 and coalesce(length(texto_contacto), 0) <= 1000 and
    coalesce(length(referencias), 0) <= 1000
  );
alter table public.proyectos drop constraint if exists largo_mensajes;
alter table public.proyectos
  add constraint largo_mensajes check (
    coalesce(length(mensaje_etapa), 0) <= 600 and coalesce(length(enlace_diseno), 0) <= 300 and
    coalesce(length(enlace_preview), 0) <= 300
  );

-- Fecha de actualización automática
create or replace function public.tocar_actualizado() returns trigger language plpgsql set search_path = '' as $$
begin new.actualizado_en = now(); return new; end $$;
drop trigger if exists proyectos_actualizado on public.proyectos;
create trigger proyectos_actualizado before update on public.proyectos
  for each row execute function public.tocar_actualizado();

-- Al crear una cuenta se crea su proyecto con los datos del registro
create or replace function public.crear_proyecto() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.proyectos (user_id, correo, nombre, negocio, whatsapp)
  values (new.id, new.email,
          left(new.raw_user_meta_data ->> 'nombre', 80),
          left(new.raw_user_meta_data ->> 'negocio', 80),
          left(new.raw_user_meta_data ->> 'whatsapp', 20));
  return new;
end $$;
drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario after insert on auth.users
  for each row execute function public.crear_proyecto();

-- 2) Seguridad: cada cliente ve y edita SOLO su proyecto ---------------------
alter table public.proyectos enable row level security;

drop policy if exists "leer mi proyecto" on public.proyectos;
create policy "leer mi proyecto" on public.proyectos
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "editar mi proyecto" on public.proyectos;
create policy "editar mi proyecto" on public.proyectos
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Permisos por columna: el cliente no ve las notas internas y no puede cambiar
-- su etapa ni su user_id. Solo lee y actualiza estas columnas.
revoke all on public.proyectos from anon, authenticated;
grant select (user_id, correo, nombre, negocio, whatsapp, rubro, comuna, instagram, dominio, tipo_sitio,
              color_1, color_2, referencias, texto_nosotros, texto_servicios, texto_faq, texto_contacto,
              etapa, mensaje_etapa, enlace_diseno, enlace_preview, creado_en, actualizado_en)
  on public.proyectos to authenticated;
grant update (nombre, negocio, whatsapp, rubro, comuna, instagram, dominio, tipo_sitio,
              color_1, color_2, referencias, texto_nosotros, texto_servicios, texto_faq, texto_contacto)
  on public.proyectos to authenticated;

-- 3) Archivos: bucket privado, cada cliente en su propia carpeta ------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('recursos', 'recursos', false, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf',
              'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- El cliente puede LEER cualquier carpeta suya, incluida "entregas" (lo que Alonso le entrega).
drop policy if exists "ver mis archivos" on storage.objects;
create policy "ver mis archivos" on storage.objects for select to authenticated
  using (bucket_id = 'recursos' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Pero solo sube y borra en sus 3 carpetas de siempre: "entregas" queda de solo lectura para él.
drop policy if exists "subir mis archivos" on storage.objects;
create policy "subir mis archivos" on storage.objects for insert to authenticated
  with check (bucket_id = 'recursos' and (storage.foldername(name))[1] = (select auth.uid())::text
              and (storage.foldername(name))[2] in ('logo', 'fotos', 'otros'));

drop policy if exists "borrar mis archivos" on storage.objects;
create policy "borrar mis archivos" on storage.objects for delete to authenticated
  using (bucket_id = 'recursos' and (storage.foldername(name))[1] = (select auth.uid())::text
         and (storage.foldername(name))[2] in ('logo', 'fotos', 'otros'));

-- 4) Endurecer funciones (recomendación del revisor de seguridad de Supabase) --
-- Las funciones de trigger no deben poder llamarse desde la API.
revoke execute on function public.crear_proyecto() from public, anon, authenticated;
revoke execute on function public.tocar_actualizado() from public, anon, authenticated;
