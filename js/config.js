/**
 * config.js
 * -------------------------------------------------
 * Configuración global del sitio de cumpleaños.
 * Aquí se centralizan todas las variables que podrían
 * necesitar ajuste: número de contacto, fecha del evento
 * y los mensajes de confirmación de asistencia.
 * -------------------------------------------------
 */

// Número de WhatsApp del cumpleañero (código de país + número, sin signos ni espacios)
const WHATSAPP_NUMBER = "56936834818";

// Fecha y hora exacta del inicio de la celebración
const FECHA_CELEBRACION = new Date("2026-09-26T14:00:00-03:00").getTime();

// Mensajes de confirmación según la opción elegida por el invitado en el formulario
const MENSAJES_RSVP = {
  si:    "¡Sí, asistiré a la celebración! Nos vemos el sábado 26.",
  no:    "No podré ir esta vez. Espero que pases un excelente cumpleaños.",
  tarde: "¡Sí iré!, pero llegaré un poco tarde. Guárdame un pedazo de torta."
};

// Clave de almacenamiento local (solo para rastrear las reservas propias del dispositivo)
const CLAVE_MIS_RESERVAS = "bastian_my_reserved_gifts_v3";

// Configuración de JSONBin.io — Base de datos en la nube compartida entre todos los dispositivos.
// Esta es una clave de acceso pública y limitada exclusivamente a leer/actualizar bins.
// Nunca colocar aquí una clave maestra ni otra credencial administrativa.
const JSONBIN_BIN_ID     = "6a7f18afda38895dfee49a07";
const JSONBIN_ACCESS_KEY = "$2a$10$JLMSvJel2baICwQSycpjHe3AbS68JOA8rQ4He4oZN7lqNfz2kYVSC";
const JSONBIN_URL        = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Cantidad de partículas de confeti que caen en el fondo
const CANTIDAD_PARTICULAS = 45;

// Paleta de colores dorados para el confeti y serpentinas
const COLORES_DORADOS = [
  "#ffe066", // Dorado claro
  "#ffd000", // Dorado clásico
  "#d4af37", // Oro metálico
  "#aa7c11", // Oro oscuro
  "#f3e5ab"  // Crema de oro
];
