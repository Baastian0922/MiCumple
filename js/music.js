/**
 * music.js
 * -------------------------------------------------
 * Módulo del reproductor de música de fondo.
 * Controla la reproducción del audio ambiente (jazz),
 * el estado visual del botón y el tooltip informativo.
 * El volumen por defecto se mantiene suave al 15%.
 * -------------------------------------------------
 */

function iniciarReproductorMusica() {
  const audio        = document.getElementById("bg-music");
  const botonMusica  = document.getElementById("music-toggle-btn");
  const iconoMusica  = document.getElementById("music-icon");
  const tooltipMusica = document.getElementById("music-tooltip");
  let estaReproduciendo = false;

  // Volumen ambiente suave para no interrumpir la lectura
  if (audio) {
    audio.volume = 0.15;
  }

  function alternarMusica() {
    if (estaReproduciendo) {
      // Pausar la música y restaurar el ícono
      audio.pause();
      botonMusica.classList.remove("music-playing");
      iconoMusica.className = "fa-solid fa-music";
      estaReproduciendo = false;
    } else {
      // Reproducir y actualizar la interfaz
      audio
        .play()
        .then(() => {
          botonMusica.classList.add("music-playing");
          iconoMusica.className = "fa-solid fa-volume-high";
          if (tooltipMusica) tooltipMusica.style.display = "none"; // Ocultar sugerencia al activar
          estaReproduciendo = true;
        })
        .catch((err) => {
          console.warn("El navegador bloqueó la autoreproducción automática.", err);
        });
    }
  }

  // Acción del botón de música en el widget flotante
  botonMusica.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevenir propagación del clic al documento
    alternarMusica();
  });

  // Intentar reproducir automáticamente con el primer clic del usuario en cualquier parte
  document.body.addEventListener(
    "click",
    () => {
      if (!estaReproduciendo) alternarMusica();
    },
    { once: true } // Solo se activa una única vez
  );
}
