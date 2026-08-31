/**
 * utilidades.js
 * -------------------------------------------------
 * Funciones de utilidad globales del sitio.
 * Incluye funcionalidades reutilizables que no
 * pertenecen a ningún módulo específico:
 *  - Copia de datos de cuenta RUT al portapapeles
 * -------------------------------------------------
 */

// Copiar los datos bancarios al portapapeles al hacer clic en el botón de la tarjeta de aporte
function copiarDatosCuenta(boton) {
  const textoCopiar =
    "Nombre: Bastian Mauricio\nBanco: BancoEstado\nCuenta RUT: 201928990\nRUT: 20.192.899-0";

  navigator.clipboard
    .writeText(textoCopiar)
    .then(() => {
      // Mostrar confirmación visual en el botón por 2.5 segundos
      const contenidoOriginal = boton.innerHTML;
      boton.innerHTML         = '<i class="fa-solid fa-check"></i> ¡Copiado!';
      boton.style.background  = "#d4af37";
      boton.style.color       = "#0b0615";

      setTimeout(() => {
        boton.innerHTML        = contenidoOriginal;
        boton.style.background = "";
        boton.style.color      = "";
      }, 2500);
    })
    .catch(() => {
      // Alternativa si el portapapeles no está disponible en el navegador
      alert(
        "Datos Cuenta RUT:\nNombre: Bastian Mauricio\nBancoEstado - Cuenta RUT\nRUT: 20.192.899-0"
      );
    });
}

// Exponer la función de copia globalmente para que pueda ser llamada desde el HTML inline
window.copyRutDetails = copiarDatosCuenta;
