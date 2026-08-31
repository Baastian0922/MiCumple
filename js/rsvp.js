/**
 * rsvp.js
 * -------------------------------------------------
 * Módulo de confirmación de asistencia (RSVP).
 * Gestiona el formulario de invitados y genera
 * automáticamente el enlace de WhatsApp con el
 * mensaje correspondiente a la opción seleccionada.
 * -------------------------------------------------
 */

function iniciarFormularioRSVP() {
  const formulario = document.getElementById("rsvp-invitation-form");

  if (!formulario) return;

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre  = document.getElementById("rsvp-name").value.trim();
    const opcion  = document.getElementById("rsvp-status-select").value;

    // Validar que el invitado ingresó su nombre
    if (!nombre) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }

    // Validar que el invitado seleccionó una opción de asistencia
    if (!opcion) {
      alert("Por favor, selecciona una opción de asistencia.");
      return;
    }

    const textoRespuesta = MENSAJES_RSVP[opcion];
    const mensajeBase    = `Hola Bastián, soy ${nombre}. Confirmo mi respuesta: ${textoRespuesta}`;
    const mensajeCodificado = encodeURIComponent(mensajeBase);
    const urlWhatsApp    = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;

    // Abrir conversación de WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, "_blank");
  });
}
