/**
 * confetti.js
 * -------------------------------------------------
 * Módulo del sistema de serpentinas y confeti dorado.
 * Genera una animación continua de partículas que caen
 * suavemente sobre el fondo del sitio.
 *
 * Optimizaciones de rendimiento:
 *  - Reduce partículas automáticamente en dispositivos móviles
 *  - Pausa el bucle de animación cuando la pestaña no está visible
 *    (Page Visibility API) para no consumir CPU/GPU en segundo plano
 *  - Usa will-change en el canvas vía JS para que el compositor
 *    del navegador lo maneje en su propio hilo
 *  - Redimensionamiento con debounce para no disparar reflows continuos
 * -------------------------------------------------
 */

function iniciarConfeti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  // Informar al compositor que este canvas cambia continuamente
  canvas.style.willChange = "transform";

  const ctx = canvas.getContext("2d");

  let ancho = (canvas.width  = window.innerWidth);
  let alto  = (canvas.height = window.innerHeight);

  // ---- Debounce en resize: evita reflows repetidos al redimensionar ----
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ancho = canvas.width  = window.innerWidth;
      alto  = canvas.height = window.innerHeight;
    }, 150);
  });

  // ---- Reducir partículas en móvil para ahorrar GPU ----
  const esCelular = window.matchMedia("(max-width: 768px)").matches;
  const totalParticulas = esCelular
    ? Math.floor(CANTIDAD_PARTICULAS * 0.4)   // 40% en celular
    : CANTIDAD_PARTICULAS;                     // 100% en escritorio

  const particulas = [];

  // ---- Clase de partícula (serpentina o confeti) ----
  class Particula {
    constructor() {
      this.reiniciar();
      // Distribuir en altura aleatoria al inicio para no caer todas juntas
      this.y = Math.random() * alto - alto;
    }

    reiniciar() {
      this.x            = Math.random() * ancho;
      this.y            = -20;
      this.tamanio      = Math.random() * 6 + 4;
      this.velocidadY   = Math.random() * 2 + 1;
      this.velocidadX   = Math.random() * 1 - 0.5;
      this.color        = COLORES_DORADOS[Math.floor(Math.random() * COLORES_DORADOS.length)];
      this.esSerpentina = Math.random() > 0.45;
      this.angulo       = Math.random() * Math.PI * 2;
      this.velocidadOla = Math.random() * 0.05 + 0.02;
      this.amplitudOla  = Math.random() * 15 + 10;
      this.largoSerpentina = Math.random() * 20 + 20;
      this.anchoSerpentina = Math.random() * 2 + 1.5;
    }

    actualizar() {
      this.y      += this.velocidadY;
      this.angulo += this.velocidadOla;
      this.x      += this.velocidadX + Math.sin(this.angulo) * 0.5;
      if (this.y > alto + 30) this.reiniciar();
    }

    dibujar() {
      ctx.fillStyle   = this.color;
      ctx.strokeStyle = this.color;
      ctx.lineWidth   = this.anchoSerpentina;

      if (this.esSerpentina) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < 5; i++) {
          const segY = this.y - i * (this.largoSerpentina / 5);
          const segX = this.x + Math.sin(this.angulo + i * 0.5) * this.amplitudOla * 0.4;
          ctx.lineTo(segX, segY);
        }
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanio / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  for (let i = 0; i < totalParticulas; i++) {
    particulas.push(new Particula());
  }

  // ---- Bucle de animación con pausa en pestaña oculta ----
  let animId  = null;
  let pausado = false;

  function animar() {
    if (pausado) return;

    ctx.clearRect(0, 0, ancho, alto);
    ctx.globalAlpha = 0.55;

    for (let i = 0; i < particulas.length; i++) {
      particulas[i].actualizar();
      particulas[i].dibujar();
    }

    ctx.globalAlpha = 1.0;
    animId = requestAnimationFrame(animar);
  }

  // Page Visibility API: pausa cuando la pestaña queda en segundo plano
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pausado = true;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    } else {
      pausado = false;
      animar();
    }
  });

  animar();
}
