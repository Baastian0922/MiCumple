/**
 * calendar.js
 * -------------------------------------------------
 * Módulo del sistema de recordatorio de calendario.
 * Permite agregar el evento del cumpleaños directamente
 * a Google Calendar, Apple Calendar u otras apps mediante
 * la descarga de un archivo .ics estándar.
 * -------------------------------------------------
 */

function iniciarCalendario() {
  const botonCalendario   = document.getElementById("calendar-btn");
  const dropdownCalendario = document.getElementById("calendar-dropdown");
  const botonDescargarICS = document.getElementById("ical-download-btn");

  if (!botonCalendario || !dropdownCalendario) return;

  // Mostrar u ocultar el menú desplegable al hacer clic en el botón
  botonCalendario.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownCalendario.classList.toggle("show");
  });

  // Cerrar el menú si el usuario hace clic en cualquier otra zona de la página
  document.addEventListener("click", () => {
    dropdownCalendario.classList.remove("show");
  });

  // Descarga del archivo iCalendar (.ics) para compatibilidad universal
  if (botonDescargarICS) {
    botonDescargarICS.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdownCalendario.classList.remove("show");

      const titulo    = "Cumpleaños 26 de Bastián 🎉";
      const descripcion = "¡Viva el cumpleañero! Vamos a la celebración. 📍 Importante: la entrada a los quinchos es por calle Gerónimo de Alderete.";
      const ubicacion = "Parque La Araucana, Gerónimo de Alderete 2400, La Florida";

      // Hora del evento en UTC:
      // Inicio: 14:00 hora Chile (UTC-3) = 17:00 UTC
      // Fin: 18:00 hora Chile (UTC-3) = 21:00 UTC
      const contenidoICS = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//BastianCumple//NONSGML v1.0//EN",
        "BEGIN:VEVENT",
        "UID:" + new Date().getTime() + "@bastiancumple.cl",
        "DTSTAMP:20260810T200000Z",
        "DTSTART:20260926T170000Z",
        "DTEND:20260926T210000Z",
        "SUMMARY:" + titulo,
        "DESCRIPTION:" + descripcion,
        "LOCATION:" + ubicacion,
        "BEGIN:VALARM",
        "TRIGGER:-PT15M",   // Recordatorio 15 minutos antes del evento
        "ACTION:DISPLAY",
        "DESCRIPTION:¡Viva el cumpleañero! Vamos a la celebración de Bastián",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      // Crear y descargar el archivo automáticamente sin abrir nueva pestaña
      const blob = new Blob([contenidoICS], { type: "text/calendar;charset=utf-8;" });
      const enlace = document.createElement("a");
      enlace.href = URL.createObjectURL(blob);
      enlace.setAttribute("download", "recordatorio-cumple-bastian.ics");
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
    });
  }
}
