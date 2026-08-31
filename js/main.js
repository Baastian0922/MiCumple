/**
 * main.js
 * -------------------------------------------------
 * Punto de entrada principal del sitio web.
 * Se encarga únicamente de orquestar la inicialización
 * de todos los módulos cuando el DOM está listo.
 *
 * Módulos del proyecto:
 *  - config.js     → Variables y constantes globales
 *  - countdown.js  → Reloj de cuenta regresiva
 *  - music.js      → Reproductor de música de fondo
 *  - rsvp.js       → Formulario de confirmación de asistencia
 *  - calendar.js   → Sistema de recordatorio al calendario
 *  - confetti.js   → Animación de serpentinas y confeti
 *  - regalos.js    → Quiz interactivo y reserva de regalos
 *  - utilidades.js → Funciones globales de apoyo
 * -------------------------------------------------
 */

// Desactivar la restauración automática de posición de scroll al recargar la página
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Forzar el retorno al inicio (arriba) al recargar o refrescar la ventana
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  // Asegurar posición en la parte superior del sitio al cargar
  window.scrollTo(0, 0);

  iniciarCuentaRegresiva();
  iniciarReproductorMusica();
  iniciarFormularioRSVP();
  iniciarCalendario();
  iniciarConfeti();
  iniciarQuiz();
  iniciarSistemaReservas();
  mostrarAvisoCelular();
});

// Refuerzo adicional tras la carga completa de recursos de la página
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

/**
 * mostrarAvisoCelular()
 * Muestra un toast divertido cuando el invitado abre la página desde
 * un dispositivo móvil, recomendándole usar el computador.
 * Solo se muestra una vez por sesión para no molestar.
 */
function mostrarAvisoCelular() {
  // Detectar si el dispositivo es móvil/táctil
  const esCelular = window.matchMedia("(max-width: 768px)").matches ||
    ("ontouchstart" in window) ||
    (navigator.maxTouchPoints > 0);

  // Solo mostrar en celulares y una vez por sesión
  if (!esCelular || sessionStorage.getItem("aviso_celular_visto")) return;
  sessionStorage.setItem("aviso_celular_visto", "1");

  // Crear el toast
  const toast = document.createElement("div");
  toast.className = "mobile-notice-toast";
  toast.innerHTML = `
    <div class="mobile-notice-icon">💻</div>
    <div class="mobile-notice-body">
      <strong>Se recomienda abrir desde un computador</strong>
      <span>Para una experiencia completa y que no te pierdas nada — Y NO, NO ES UNA ESTAFA! 😂</span>
    </div>
    <button class="mobile-notice-close" aria-label="Cerrar aviso">✕</button>
  `;
  document.body.appendChild(toast);

  // Animar entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("visible"));
  });

  // Cerrar al presionar la X
  toast.querySelector(".mobile-notice-close").addEventListener("click", () => {
    cerrarToast(toast);
  });

  // Auto-cerrar después de 15 segundos
  setTimeout(() => cerrarToast(toast), 15000);
}

function cerrarToast(toast) {
  toast.classList.remove("visible");
  toast.classList.add("hiding");
  setTimeout(() => toast.remove(), 500);
}

