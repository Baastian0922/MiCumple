/**
 * regalos.js
 * -------------------------------------------------
 * Módulo del Quiz interactivo y sistema de reserva
 * sorpresa de regalos.
 *
 * Incluye:
 *  - Quiz de 4 preguntas para recomendar categorías de regalo
 *  - Desbloqueo del catálogo al finalizar el quiz
 *  - Sistema de reserva GLOBAL sincronizado entre todos los dispositivos (JSONBin.io)
 *  - Reservas locales en localStorage solo para saber cuáles reservó ESTE dispositivo
 *  - Modal de confirmación de reserva con estados de carga
 *  - Lógica de liberación exclusiva por el propio invitado
 * -------------------------------------------------
 */

// ---- Perfiles de categorías recomendadas según resultado del quiz ----
const PERFILES_CATEGORIAS = {
  mate: {
    nombre:      "Mate 🧉",
    categoria:   "category-mate",
    descripcion: "rituales materos y momentos para compartir"
  },
  cafe: {
    nombre:      "Café ☕",
    categoria:   "category-cafe",
    descripcion: "café de especialidad y pausas con buen sabor"
  },
  deporte: {
    nombre:      "Deporte 🏋️‍♂️",
    categoria:   "category-deporte",
    descripcion: "entrenamiento, energía y nuevas metas"
  },
  musica: {
    nombre:      "Música 🎸",
    categoria:   "category-musica",
    descripcion: "creatividad, instrumentos y buen sonido"
  },
  tecno: {
    nombre:      "Tecnología 🎧",
    categoria:   "category-tecno",
    descripcion: "tecnología y accesorios para disfrutar todos los días"
  },
  extras: {
    nombre:      "Extras ⭐",
    categoria:   "category-extras",
    descripcion: "detalles prácticos, versátiles y originales"
  }
};

// ====================================================================
// ---- API JSONBin.io: Reservas GLOBALES (compartidas entre todos) ----
// ====================================================================

/**
 * Lee la lista de regalos reservados globalmente desde JSONBin.io.
 * @returns {Promise<string[]>} Array de IDs de regalos reservados.
 */
async function leerReservasGlobales() {
  try {
    const respuesta = await fetch(`${JSONBIN_URL}/latest`, {
      method:  "GET",
      headers: { "X-Access-Key": JSONBIN_ACCESS_KEY }
    });
    if (!respuesta.ok) return [];
    const datos = await respuesta.json();
    return Array.isArray(datos.record?.reservas) ? datos.record.reservas : [];
  } catch (e) {
    console.error("Error leyendo reservas de JSONBin:", e);
    return [];
  }
}

/**
 * Escribe la lista actualizada de regalos reservados en JSONBin.io.
 * @param {string[]} listaReservas - Array completo de IDs de regalos reservados.
 */
async function escribirReservasGlobales(listaReservas) {
  try {
    await fetch(JSONBIN_URL, {
      method:  "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": JSONBIN_ACCESS_KEY
      },
      body: JSON.stringify({ reservas: listaReservas })
    });
  } catch (e) {
    console.error("Error guardando reservas en JSONBin:", e);
  }
}

// ====================================================================
// ---- localStorage: Reservas propias (solo este dispositivo) --------
// ====================================================================

/**
 * Retorna los IDs de regalos que el INVITADO de ESTE dispositivo ha reservado.
 * @returns {string[]}
 */
function obtenerMisReservas() {
  try {
    const datos = localStorage.getItem(CLAVE_MIS_RESERVAS);
    return datos ? JSON.parse(datos) : [];
  } catch (e) {
    return [];
  }
}

function guardarEnMisReservas(idRegalo) {
  const miLista = obtenerMisReservas();
  if (!miLista.includes(idRegalo)) miLista.push(idRegalo);
  localStorage.setItem(CLAVE_MIS_RESERVAS, JSON.stringify(miLista));
}

function eliminarDeMisReservas(idRegalo) {
  const miLista = obtenerMisReservas().filter((id) => id !== idRegalo);
  localStorage.setItem(CLAVE_MIS_RESERVAS, JSON.stringify(miLista));
}

// ====================================================================
// ---- Actualizar la vista del catálogo según el estado de reservas --
// ====================================================================

/**
 * Pinta cada tarjeta de regalo según si está reservada globalmente o no.
 * @param {string[]} reservasGlobales - Lista de IDs reservados en JSONBin.
 * @param {string[]} misReservas - Lista de IDs reservados por este dispositivo.
 */
function aplicarVistaReservas(reservasGlobales, misReservas) {
  document.querySelectorAll(".gift-card[data-gift-id]").forEach((tarjeta) => {
    const idRegalo = tarjeta.getAttribute("data-gift-id");

    // El aporte en dinero no participa del sistema de reserva
    if (!idRegalo || idRegalo === "aporte-dinero") return;

    const estaReservado = reservasGlobales.includes(idRegalo);
    const esMiReserva   = misReservas.includes(idRegalo);
    const contenedorImg = tarjeta.querySelector(".gift-image-wrapper");
    const botonReservar = tarjeta.querySelector(".gift-reserve-btn");

    if (estaReservado) {
      tarjeta.classList.add("is-reserved");

      // Crear o reutilizar la capa de superposición sobre la imagen
      let overlay = contenedorImg ? contenedorImg.querySelector(".reserved-overlay") : null;
      if (contenedorImg && !overlay) {
        overlay = document.createElement("div");
        overlay.className = "reserved-overlay";
        contenedorImg.appendChild(overlay);
      }
      if (overlay) {
        overlay.innerHTML = '<i class="fa-solid fa-lock"></i><span>Reservado por un invitado 🎁</span>';
      }

      if (esMiReserva) {
        // Solo quien lo reservó desde este dispositivo puede liberarlo
        if (botonReservar) {
          botonReservar.disabled  = false;
          botonReservar.className = "gift-reserve-btn my-reservation";
          botonReservar.innerHTML = '<i class="fa-solid fa-unlock"></i> Liberar mi reserva';
        }
      } else {
        // Para los demás invitados el botón queda bloqueado
        if (botonReservar) {
          botonReservar.disabled  = true;
          botonReservar.className = "gift-reserve-btn reserved";
          botonReservar.innerHTML = '<i class="fa-solid fa-check-double"></i> Apartado';
        }
      }
    } else {
      tarjeta.classList.remove("is-reserved");

      // Quitar la capa de superposición si existía
      const overlay = tarjeta.querySelector(".reserved-overlay");
      if (overlay) overlay.remove();

      if (botonReservar) {
        botonReservar.disabled  = false;
        botonReservar.className = "gift-reserve-btn";
        botonReservar.innerHTML = '<i class="fa-solid fa-gift"></i> Reservar';
      }
    }
  });
}

/**
 * Obtiene las reservas globales de JSONBin y actualiza toda la vista del catálogo.
 */
async function actualizarVistaReservas() {
  const reservasGlobales = await leerReservasGlobales();
  const misReservas      = obtenerMisReservas();
  aplicarVistaReservas(reservasGlobales, misReservas);
}

// ====================================================================
// ---- Inicialización del Quiz ------------------------------------
// ====================================================================

function iniciarQuiz() {
  const contenedorQuiz   = document.getElementById("quiz-wrapper");
  const bannerResultado  = document.getElementById("quiz-result-banner");
  const seccionRegalos   = document.getElementById("gifts-content-wrapper");
  const barraProgreso    = document.getElementById("quiz-progress-fill");
  const indicadorPaso    = document.getElementById("quiz-step-indicator");
  const nombreCategoria  = document.getElementById("recommended-category-name");
  const descripcionCategoria = document.getElementById("recommended-category-description");
  const botonRehacerQuiz = document.getElementById("redo-quiz-btn");

  if (!contenedorQuiz || !seccionRegalos) return;

  // Al recargar la página, siempre empezar desde el primer paso del quiz
  sessionStorage.removeItem("bastian_quiz_profiles");

  const totalPasos = contenedorQuiz.querySelectorAll(".quiz-step").length;
  const crearPuntajes = () => Object.fromEntries(
    Object.keys(PERFILES_CATEGORIAS).map((clave) => [clave, 0])
  );

  let puntajes   = crearPuntajes();
  let historialPreferencias = [];
  let pasoActual = 1;

  // Estado visual inicial del quiz
  contenedorQuiz.style.display  = "block";
  if (bannerResultado) bannerResultado.style.display = "none";
  seccionRegalos.style.display  = "none";

  contenedorQuiz.querySelectorAll(".quiz-step").forEach((step) =>
    step.classList.remove("active")
  );
  const primerPaso = contenedorQuiz.querySelector('.quiz-step[data-step="1"]');
  if (primerPaso) primerPaso.classList.add("active");

  if (barraProgreso) barraProgreso.style.width = `${100 / totalPasos}%`;
  if (indicadorPaso) indicadorPaso.textContent = `Pregunta 1 de ${totalPasos}`;

  document.querySelectorAll(".gift-category-group").forEach((el) => {
    el.classList.remove("recommended-category");
    const etiqueta = el.querySelector(".recommended-tag");
    if (etiqueta) etiqueta.remove();
  });

  // Registrar el clic en cada opción del quiz
  const botonesOpcion = contenedorQuiz.querySelectorAll(".quiz-opt-btn");
  botonesOpcion.forEach((btn) => {
    btn.addEventListener("click", () => {
      const categoriasSeleccionadas = (btn.getAttribute("data-categories") || "")
        .split(",")
        .map((categoria) => categoria.trim())
        .filter((categoria) => puntajes.hasOwnProperty(categoria));

      // Cada respuesta mezcla dos intereses y suma un punto a ambos.
      categoriasSeleccionadas.forEach((categoria) => {
        puntajes[categoria]++;
        historialPreferencias.push(categoria);
      });

      if (pasoActual < totalPasos) {
        // Avanzar al siguiente paso
        const pasoActualEl = contenedorQuiz.querySelector(`.quiz-step[data-step="${pasoActual}"]`);
        if (pasoActualEl) pasoActualEl.classList.remove("active");

        pasoActual++;
        const siguientePasoEl = contenedorQuiz.querySelector(`.quiz-step[data-step="${pasoActual}"]`);
        if (siguientePasoEl) siguientePasoEl.classList.add("active");

        const porcentaje = (pasoActual / totalPasos) * 100;
        if (barraProgreso) barraProgreso.style.width = `${porcentaje}%`;
        if (indicadorPaso) indicadorPaso.textContent = `Pregunta ${pasoActual} de ${totalPasos}`;
      } else {
        // Recomendar las dos categorías con mayor afinidad. En caso de
        // empate, tiene prioridad la elegida más recientemente.
        const categoriasRecomendadas = Object.keys(puntajes)
          .sort((categoriaA, categoriaB) => {
            const diferenciaPuntaje = puntajes[categoriaB] - puntajes[categoriaA];
            if (diferenciaPuntaje !== 0) return diferenciaPuntaje;
            return historialPreferencias.lastIndexOf(categoriaB)
              - historialPreferencias.lastIndexOf(categoriaA);
          })
          .slice(0, 2);

        sessionStorage.setItem("bastian_quiz_profiles", JSON.stringify(categoriasRecomendadas));
        desbloquearRegalos(categoriasRecomendadas, true);
      }
    });
  });

  // ---- Mostrar catálogo y destacar las dos categorías recomendadas ----
  function desbloquearRegalos(clavesPerfil, scrollAutomatico = true) {
    const clavesValidas = (Array.isArray(clavesPerfil) ? clavesPerfil : [clavesPerfil])
      .filter((clave) => PERFILES_CATEGORIAS[clave])
      .slice(0, 2);
    const clavesFinales = clavesValidas.length === 2 ? clavesValidas : ["mate", "cafe"];
    const perfiles = clavesFinales.map((clave) => PERFILES_CATEGORIAS[clave]);

    contenedorQuiz.style.display  = "none";
    bannerResultado.style.display = "flex";
    seccionRegalos.style.display  = "block";

    if (nombreCategoria) {
      nombreCategoria.textContent = perfiles.map((perfil) => perfil.nombre).join(" + ");
    }
    if (descripcionCategoria) {
      descripcionCategoria.textContent = `Tu combinación reúne ${perfiles
        .map((perfil) => perfil.descripcion)
        .join(" y ")}.`;
    }
    // Limpiar etiquetas de recomendación anteriores
    document.querySelectorAll(".gift-category-group").forEach((el) => {
      el.classList.remove("recommended-category");
      const etiqueta = el.querySelector(".recommended-tag");
      if (etiqueta) etiqueta.remove();
    });

    let primeraCategoriaEl = null;
    perfiles.forEach((perfil, indice) => {
      const categoriaEl = document.getElementById(perfil.categoria);
      if (categoriaEl) {
        categoriaEl.classList.add("recommended-category");

        const etiqueta = document.createElement("span");
        etiqueta.className = "recommended-tag";
        etiqueta.innerHTML = `<i class="fa-solid fa-star"></i> Afinidad #${indice + 1}`;
        categoriaEl.prepend(etiqueta);

        if (!primeraCategoriaEl) primeraCategoriaEl = categoriaEl;
      }
    });

    if (scrollAutomatico && (bannerResultado || primeraCategoriaEl)) {
      setTimeout(() => {
        (bannerResultado || primeraCategoriaEl).scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }

    // Cargar el estado actualizado de las reservas al mostrar el catálogo
    actualizarVistaReservas();
  }

  // Permite al invitado rehacer el quiz
  if (botonRehacerQuiz) {
    botonRehacerQuiz.addEventListener("click", () => {
      sessionStorage.removeItem("bastian_quiz_profiles");
      puntajes   = crearPuntajes();
      historialPreferencias = [];
      pasoActual = 1;

      contenedorQuiz.querySelectorAll(".quiz-step").forEach((step) =>
        step.classList.remove("active")
      );
      const primerPaso = contenedorQuiz.querySelector('.quiz-step[data-step="1"]');
      if (primerPaso) primerPaso.classList.add("active");

      if (barraProgreso) barraProgreso.style.width = `${100 / totalPasos}%`;
      if (indicadorPaso) indicadorPaso.textContent = `Pregunta 1 de ${totalPasos}`;

      document.querySelectorAll(".gift-category-group").forEach((el) => {
        el.classList.remove("recommended-category");
        const etiqueta = el.querySelector(".recommended-tag");
        if (etiqueta) etiqueta.remove();
      });

      contenedorQuiz.style.display  = "block";
      bannerResultado.style.display = "none";
      seccionRegalos.style.display  = "none";

      contenedorQuiz.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}

// ====================================================================
// ---- Sistema de Reserva Sorpresa de Regalos -------------------------
// ====================================================================

function iniciarSistemaReservas() {
  const fondoModal     = document.getElementById("reserve-modal-backdrop");
  const botonCancelar  = document.getElementById("btn-cancel-reserve");
  const botonConfirmar = document.getElementById("btn-confirm-reserve");
  let regaloSeleccionado = null;

  /**
   * Bloquea o desbloquea el botón de confirmar mostrando un estado de carga.
   * @param {boolean} cargando
   */
  function setCargando(cargando) {
    if (!botonConfirmar) return;
    if (cargando) {
      botonConfirmar.disabled  = true;
      botonConfirmar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';
    } else {
      botonConfirmar.disabled  = false;
      botonConfirmar.innerHTML = '<i class="fa-solid fa-check"></i> Sí, reservar';
    }
  }

  // ---- Registrar el clic en cada botón de reserva del catálogo ----
  document.querySelectorAll(".gift-reserve-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const idRegalo = btn.getAttribute("data-gift-id");
      if (!idRegalo) return;

      const misReservas = obtenerMisReservas();

      // Si YA es mi reserva en este dispositivo → ofrecer liberarla
      if (misReservas.includes(idRegalo)) {
        if (confirm("¿Deseas liberar este regalo para que otro invitado pueda elegirlo?")) {
          btn.disabled  = true;
          btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Liberando...';

          // Leer lista global, quitar el regalo y guardar
          const listaGlobal     = await leerReservasGlobales();
          const listaActualizada = listaGlobal.filter((id) => id !== idRegalo);
          await escribirReservasGlobales(listaActualizada);

          // Quitar de mis reservas locales
          eliminarDeMisReservas(idRegalo);

          // Actualizar toda la vista
          await actualizarVistaReservas();
        }
        return;
      }

      if (btn.disabled) return;

      // Abrir modal de confirmación
      regaloSeleccionado = idRegalo;
      if (fondoModal) fondoModal.style.display = "flex";
    });
  });

  // Cerrar modal sin confirmar
  if (botonCancelar) {
    botonCancelar.addEventListener("click", () => {
      if (fondoModal) fondoModal.style.display = "none";
      regaloSeleccionado = null;
    });
  }

  // Confirmar la reserva → guardar en JSONBin + localStorage
  if (botonConfirmar) {
    botonConfirmar.addEventListener("click", async () => {
      if (!regaloSeleccionado) return;

      setCargando(true);

      // Leer lista actual de JSONBin, agregar el regalo y guardar
      const listaGlobal = await leerReservasGlobales();
      if (!listaGlobal.includes(regaloSeleccionado)) {
        listaGlobal.push(regaloSeleccionado);
      }
      await escribirReservasGlobales(listaGlobal);

      // Guardar en localStorage de este dispositivo (para poder liberarlo luego)
      guardarEnMisReservas(regaloSeleccionado);

      // Actualizar toda la vista y cerrar el modal
      await actualizarVistaReservas();
      if (fondoModal) fondoModal.style.display = "none";
      setCargando(false);
      regaloSeleccionado = null;
    });
  }

  // Al cargar la página, leer desde JSONBin y pintar el estado actual
  actualizarVistaReservas();

}
