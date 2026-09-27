# Correos del portal en español (para pegar en Supabase)

Dónde: **Supabase → Authentication → Emails → Templates**. Por cada plantilla, pega el **asunto** y el **cuerpo**; en el cuerpo, usa la vista de código (HTML). No cambies `{{ .ConfirmationURL }}`: Supabase lo reemplaza por el enlace real.

---

## 1. Confirm signup (confirmar cuenta)

**Asunto:**
```
Confirma tu cuenta en bascunan.digital
```

**Cuerpo:**
```html
<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1F1B18">
  <p style="font-size:20px;font-weight:bold;color:#0000FE">bascunan.digital</p>
  <h2 style="font-size:22px">¡Bienvenido al portal de clientes!</h2>
  <p>Confirma tu correo para empezar a subir el material de tu sitio web:</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#2B44FF;color:#fff;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:bold">Confirmar mi cuenta</a></p>
  <p style="color:#6B665F;font-size:14px">Si no creaste esta cuenta, ignora este correo.</p>
  <p style="color:#6B665F;font-size:14px">Alonso Bascuñán · bascunan.digital · WhatsApp +56 9 6366 0958</p>
</div>
```

## 2. Reset password (recuperar contraseña)

**Asunto:**
```
Crea una nueva contraseña · bascunan.digital
```

**Cuerpo:**
```html
<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1F1B18">
  <p style="font-size:20px;font-weight:bold;color:#0000FE">bascunan.digital</p>
  <h2 style="font-size:22px">¿Olvidaste tu contraseña?</h2>
  <p>Toca el botón para crear una nueva. El enlace vence en 1 hora.</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#2B44FF;color:#fff;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:bold">Crear nueva contraseña</a></p>
  <p style="color:#6B665F;font-size:14px">Si no lo pediste tú, ignora este correo: tu contraseña sigue igual.</p>
</div>
```

## 3. Change email address (cambio de correo), opcional

**Asunto:**
```
Confirma tu nuevo correo · bascunan.digital
```

**Cuerpo:**
```html
<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1F1B18">
  <p style="font-size:20px;font-weight:bold;color:#0000FE">bascunan.digital</p>
  <p>Confirma que quieres usar este correo en tu cuenta del portal:</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#2B44FF;color:#fff;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:bold">Confirmar nuevo correo</a></p>
</div>
```

---

## Enviar los correos desde hola@bascunan.digital (recomendado)
El servicio de correo que trae Supabase envía muy pocos correos por hora y usa un remitente genérico. Para que los correos lleguen desde tu dominio y no terminen en spam:

1. En **iHosting.cl**, busca los datos SMTP de tu cuenta `hola@bascunan.digital` (servidor, puerto 465 o 587, usuario y contraseña). Suelen estar en "Cuentas de correo → Configurar cliente de correo".
2. En **Supabase → Authentication → Emails → SMTP Settings**, activa **Enable custom SMTP** y completa:
   - **Sender email:** `hola@bascunan.digital`
   - **Sender name:** `bascunan.digital`
   - **Host, puerto, usuario y contraseña:** los de iHosting.
3. Guarda y prueba creando una cuenta desde el portal.
