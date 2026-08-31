# 🎂 Invitación Web Interactiva - Cumpleaños 26 de Bastián

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Una aplicación web moderna, interactiva y de estética premium desarrollada para la celebración del 26º cumpleaños de **Bastián**. Incluye cuenta regresiva en tiempo real, reproductor de música flotante, un quiz dinámico de recomendación, un catálogo interactivo de regalos con reserva local, integración con Google Calendar/iCal y envío de confirmaciones mediante WhatsApp.

---

## ✨ Características Principales

- ⏳ **Cuenta Regresiva en Tiempo Real**: Sincronizada con la fecha y hora exacta del evento (`26 de Septiembre de 2026, 14:00 hrs`). Presente en el *Hero* y en la sección informativa.
- 🎵 **Reproductor de Música Flotante**: Permite reproducir música de fondo (*Jazz Sax*) con control flotante y persistencia de preferencia en el navegador.
- 🎮 **Quiz Interactivo (4 Preguntas)**: Un divertido test que analiza las respuestas de los invitados y desbloquea el catálogo recomendándoles la categoría de regalos más afin.
- 🎁 **Catálogo de Regalos & Sistema de Reservas**:
  - Organizado por categorías (*Mate*, *Café*, *Deporte*, *Música*, *Tecnología* y *Extras*).
  - Enlaces de referencia directa a tiendas (Mercado Libre, Paris, Falabella, Audiomúsica, etc.).
  - Sistema de **reserva dinámica global** sincronizada con JSONBin y seguimiento local en `localStorage`.
- 📅 **Integración con Calendarios**:
  - Enlace rápido a **Google Calendar**.
  - Generación y descarga directa de archivo `.ics` para **iCal / Apple / Outlook Calendar**.
- 📍 **Ubicación & Google Maps**: Dirección del evento y acceso rápido con un clic a la ubicación exacta en Google Maps.
- 💬 **Confirmación de Asistencia (RSVP)**: Formulario interactivo que genera un mensaje personalizado preformateado para enviar directamente por **WhatsApp**.
- 💳 **Información Bancaria (`datos_cuenta.html`)**: Página dedicada para aquellos invitados que prefieran realizar un aporte en dinero.
- 🎊 **Efectos Visuales & Confeti**: Animación fluida de serpentinas y confeti dorado en `<canvas>`.
- 📱 **Diseño 100% Responsivo**: Adaptado perfectamente para celulares, tablets y computadores con un elegante tema oscuro (*Dark Mode*) y acentos dorados y púrpuras.

---

## 📂 Estructura del Proyecto

```text
MiCumple/
├── index.html              # Página principal de la invitación
├── datos_cuenta.html       # Vista con los datos bancarios para aportes
├── .gitignore              # Archivos excluidos del control de versiones
├── LICENSE                 # Licencia MIT de código abierto
├── README.md               # Documentación general del proyecto
├── css/
│   └── style.css           # Estilos globales, variables, layout y responsividad
├── js/
│   ├── config.js           # Variables globales de configuración (fechas, WhatsApp, etc.)
│   ├── main.js             # Punto de entrada inicial e interacción global
│   ├── countdown.js        # Lógica del temporizador de cuenta regresiva
│   ├── music.js            # Control del reproductor audio flotante
│   ├── quiz.js / regalos.js # Lógica del Quiz y sistema de reservas de regalos
│   ├── rsvp.js             # Lógica de confirmación de asistencia vía WhatsApp
│   ├── calendar.js         # Generador de enlaces y archivo .ics para calendarios
│   ├── confetti.js         # Sistema de partículas e interacción de confeti
│   └── utilidades.js       # Funciones auxiliares y herramientas comunes
├── img/                    # Imágenes de referencias de regalos y assets visuales
└── music/                  # Pistas de audio en formato MP3 para la música de fondo
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible.
- **CSS3**: Diseño en grid, flexbox, variables CSS, animaciones de alto rendimiento y estética de vidrio (*glassmorphism*).
- **JavaScript (ES6+)**: Arquitectura modular orientada a eventos, manipulación del DOM y uso de `localStorage`.
- **FontAwesome 6**: Iconografía vectorial moderna para acentos visuales.

> **Seguridad:** el navegador usa una clave de acceso de JSONBin limitada a lectura y actualización. La clave maestra de la cuenta nunca debe guardarse en el repositorio ni enviarse al navegador.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

1. **Clonar o descargar el repositorio**:
   ```bash
   git clone https://github.com/Baastian0922/MiCumple.git
   ```
2. **Abrir en tu navegador**:
   - No requiere dependencias externas ni compilación (*Node.js/npm* no son requeridos).
   - Simplemente abre `index.html` en tu navegador web preferido o usa una extensión de servidor local como **Live Server** en VS Code.

---

## 🌐 Cómo Subirlo y Desplegarlo en GitHub Pages

Para publicar tu invitación en internet de forma gratuita con **GitHub Pages**:

1. **Crear un repositorio en GitHub**:
   - Ingresa a [GitHub New Repository](https://github.com/new).
   - Nómbralo (ejemplo: `MiCumple` o `cumple-bastian`).
   - Mantén el repositorio como **Público** o **Privado**.

2. **Subir los archivos mediante Git**:
   ```bash
   git init
   git add .
   git commit -m "feat: Versión inicial de la invitación web de cumpleaños 26"
   git branch -M main
   git remote add origin https://github.com/Baastian0922/MiCumple.git
   git push -u origin main
   ```

3. **Activar GitHub Pages**:
   - Ve a los **Settings** (Configuración) de tu repositorio en GitHub.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En **Build and deployment** -> **Source**, selecciona `Deploy from a branch`.
   - Selecciona la rama `main` y la carpeta `/ (root)`.
   - Haz clic en **Save**.
   - ¡Listo! En un par de minutos tendrás tu link público activo (ejemplo: `https://tu-usuario.github.io/MiCumple/`).

---

## 📄 Licencia & Copyright

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [`LICENSE`](LICENSE) para obtener más detalles.

**Copyright (c) 2026 Bastián**  
Todos los derechos reservados. Desarrollado con 💛 para celebrar en grande.
