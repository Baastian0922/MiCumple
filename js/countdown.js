/**
 * countdown.js
 * -------------------------------------------------
 * Módulo encargado del reloj de cuenta regresiva.
 * Actualiza todos los elementos con las clases
 * .days-val, .hours-val, .minutes-val y .seconds-val
 * que aparecen tanto en el Hero como en la sección
 * de Información del evento.
 * -------------------------------------------------
 */

function iniciarCuentaRegresiva() {
  function actualizarReloj() {
    const ahora      = new Date().getTime();
    const diferencia = FECHA_CELEBRACION - ahora;

    let d = "00", h = "00", m = "00", s = "00";

    if (diferencia > 0) {
      const dias     = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas    = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos  = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      d = String(dias).padStart(2, "0");
      h = String(horas).padStart(2, "0");
      m = String(minutos).padStart(2, "0");
      s = String(segundos).padStart(2, "0");
    }

    // Actualizar todos los contadores visibles en la página simultáneamente
    document.querySelectorAll(".days-val").forEach(el    => (el.innerText = d));
    document.querySelectorAll(".hours-val").forEach(el   => (el.innerText = h));
    document.querySelectorAll(".minutes-val").forEach(el => (el.innerText = m));
    document.querySelectorAll(".seconds-val").forEach(el => (el.innerText = s));
  }

  actualizarReloj();
  setInterval(actualizarReloj, 1000);
}
