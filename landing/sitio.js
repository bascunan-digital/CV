/* =========================================================
   bascunan.digital · cookies y analítica (compartido por todas las páginas)
   - Google Analytics 4 se carga SOLO si la persona acepta.
   - Sin ID de GA4 configurado no hay cookies de analítica y el aviso no se muestra.
   - window.medir(evento, datos) registra eventos (no hace nada sin consentimiento).
   ========================================================= */
(function () {
  'use strict';
  var GA4_ID = ''; // Pega aquí tu ID de medición, por ejemplo 'G-ABC123XYZ' (Analytics → Administrar → Flujos de datos)
  var CLAVE = 'bd-cookies'; // guarda la elección: 'si' o 'no'

  var demo = window.BD_DEMO_COOKIES === true; // solo para mostrar el aviso en la vista previa
  function leer() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem(CLAVE, v); } catch (e) {} }

  var cargado = false;
  function cargarGA() {
    if (cargado || !GA4_ID) return; cargado = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { anonymize_ip: true });
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(s);
  }
  window.medir = function (evento, datos) { if (cargado && window.gtag) window.gtag('event', evento, datos || {}); };

  function aviso() {
    if (document.getElementById('aviso-cookies')) return;
    var d = document.createElement('div');
    d.id = 'aviso-cookies';
    d.setAttribute('role', 'dialog'); d.setAttribute('aria-live', 'polite'); d.setAttribute('aria-label', 'Aviso de cookies');
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:90;max-width:420px;margin-left:auto;background:#1F1B18;color:#fff;border-radius:20px;padding:18px 20px;box-shadow:0 20px 50px -15px rgba(0,0,0,.45);font:14px/1.5 "Plus Jakarta Sans",system-ui,sans-serif';
    d.innerHTML = '<p style="margin:0 0 12px"><strong>¿Me ayudas a mejorar el sitio?</strong><br>Uso cookies de Google Analytics solo para contar visitas y saber qué secciones sirven. No las uso para publicidad. <a href="privacidad.html#cookies" style="color:#FDE8F0;text-decoration:underline">Más información</a></p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" data-cookies="si" style="flex:1;min-width:120px;border:0;border-radius:999px;padding:11px 16px;background:#FDE8F0;color:#2B44FF;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer">Aceptar</button>' +
      '<button type="button" data-cookies="no" style="flex:1;min-width:120px;border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:11px 16px;background:transparent;color:#fff;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer">Rechazar</button></div>';
    document.body.appendChild(d);
    d.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cookies]'); if (!b) return;
      guardar(b.dataset.cookies); d.remove();
      if (b.dataset.cookies === 'si') cargarGA();
    });
  }
  // Permite cambiar la elección desde la política de privacidad
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-reabrir-cookies]')) { try { localStorage.removeItem(CLAVE); } catch (x) {} aviso(); }
  });

  function iniciar() {
    var eleccion = leer();
    if (eleccion === 'si') cargarGA();
    else if (!eleccion && (GA4_ID || demo)) aviso();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
