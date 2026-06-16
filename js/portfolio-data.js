/**
 * Vista inicial — imagen hero grande (sidebar + portada). Cambia solo estas rutas.
 */
const SITE_CONFIG = {
  homeHeroSrc: "assets/home.jpg",
  homeHeroAlt: "Ilustración de portada",
};

/**
 * PORTAFOLIO — Datos centralizados
 * =================================
 * Añade entradas copiando un bloque del mismo tipo y cambiando id (único), rutas y textos.
 *
 * Campos comunes:
 *   id          — string único (ej. "dibujo-01")
 *   title       — título del proyecto
 *   year        — año (número o string)
 *   category    — etiqueta "Tema" en el modal (debe coincidir con la sección visual)
 *   thumb       — miniatura en la rejilla (ruta o URL)
 *   kind        — "image" | "video"
 *
 * Solo imágenes (kind: "image"):
 *   image       — imagen grande en modal detalle y zoom (alta resolución recomendada)
 *
 * Solo video (kind: "video"):
 *   videoType   — "file" (archivo local/mp4) | "iframe" (YouTube/Vimeo embebido)
 *   videoSrc    — URL del src del <video> o URL completa del iframe (YouTube embed, etc.)
 */

const PORTFOLIO_DATA = {
  /** Ilustraciones digitales — misma forma que dibujos (kind: "image") */
  ilustracionesDigitales: [
    {
      id: "ilustracion-digital-01",
      title: "Look",
      year: 2025,
      category: "Blanco y negro",
      thumb: "assets/digital/look.jpg",
      image: "assets/digital/look.jpg",
      kind: "image",
    },
        {
      id: "ilustracion-digital-02",
      title: "Imo",
      year: 2025,
      category: "Blanco y negro",
      thumb: "assets/digital/blanconegro.jpeg",
      image: "assets/digital/blanconegro.jpeg",
      kind: "image",
    },
    {
      id: "ilustracion-digital-03",
      title: "Amarillo azul",
      year: 2024,
      category: "Dualidad",
      thumb: "assets/digital/azulamarillo.png",
      image: "assets/digital/azulamarillo.png",
      kind: "image",
    },
    {
      id: "ilustracion-digital-04",
      title: "Morado",
      year: 2024,
      category: "Perfil",
      thumb: "assets/digital/retrato.png",
      image: "assets/digital/retrato.png",
      kind: "image",
    },
    {
      id: "ilustracion-digital-05",
      title: "FEM",
      year: 2023,
      category: "Portada",
      thumb: "assets/digital/fem.jpeg",
      image: "assets/digital/fem.jpeg",
      kind: "image",
    },
    {
      id: "ilustracion-digital-06",
      title: "Uma",
      year: 2026,
      category: "Ilustracion",
      thumb: "assets/digital/personificacion uma.jpg",
      image: "assets/digital/personificacion uma.jpg",
      kind: "image",
    },
    {
      id: "ilustracion-digital-07",
      title: "Comic",
      year: 2026,
      category: "Comic",
      thumb: "assets/digital/comic1.jpg",
      image: "assets/digital/comic1.jpg",
      kind: "image",
    },
    {
      id: "ilustracion-digital-08",
      title: "Comic",
      year: 2026,
      category: "Comic",
      thumb: "assets/digital/comic2.jpg",
      image: "assets/digital/comic2.jpg",
      kind: "image",
    },
    {
      id: "ilustracion-digital-09",
      title: "comic",
      year: 2026,
      category: "Comic",
      thumb: "assets/digital/comic3.jpg",
      image: "assets/digital/comic3.jpg",
      kind: "image",
    },
    {
      id: "ilustracion-digital-10",
      title: "Comic",
      year: 2026,
      category: "Comic",
      thumb: "assets/digital/comic4.jpg",
      image: "assets/digital/comic4.jpg",
      kind: "image",
    },
  ],

  /** Dibujos tradicionales — añade objetos al array */
  dibujos: [
    {
      id: "dibujo-01",
      title: "Osito",
      year: 2022,
      category: "Lapiz",
      thumb: "assets/tradicional/furro.png",
      image: "assets/tradicional/furro.png",
      kind: "image",
    },
    {
      id: "dibujo-02",
      title: "Girasol",
      year: 2020,
      category: "Acuarela",
      thumb: "assets/tradicional/girasol.png",
      image: "assets/tradicional/girasol.png",
      kind: "image",
    },
    {
      id: "dibujo-03",
      title: "Espejo",
      year: 2021,
      category: "Acrilico",
      thumb: "assets/tradicional/ojos.png",
      image: "assets/tradicional/ojos.png",
      kind: "image",
    },
    {
      id: "dibujo-04",
      title: "Practica",
      year: 2021,
      category: "Lapiz",
      thumb: "assets/tradicional/poses.png",
      image: "assets/tradicional/poses.png",
      kind: "image",
    },
    {
      id: "dibujo-05",
      title: "Arrullo",
      year: 2024,
      category: "Lapiz",
      thumb: "assets/tradicional/flor.png",
      image: "assets/tradicional/flor.png",
      kind: "image",
    },
  ],

  /** Esculturas — misma forma que dibujos (kind: "image") */
  esculturas: [
    {
      id: "escultura-01",
      title: "Cocoguiro",
      year: 2025,
      category: "Pisapapeles",
      thumb: "assets/esculturas/cocoguiro.png",
      image: "assets/esculturas/cocoguiro.png",
      kind: "image",
    },
    {
      id: "escultura-02",
      title: "Tucanes",
      year: 2025,
      category: "Decoracion",
      thumb: "assets/esculturas/tucanes.png",
      image: "assets/esculturas/tucanes.png",
      kind: "image",
    },
    {
      id: "escultura-03",
      title: "Sombreros",
      year: 2025,
      category: "Portaincienso",
      thumb: "assets/esculturas/sombrero.png",
      image: "assets/esculturas/portainsienso.png",
      kind: "image",
    },
    {
      id: "escultura-04",
      title: "Oso Palmero",
      year: 2025,
      category: "Decoracion",
      thumb: "assets/esculturas/hormiguero.png",
      image: "assets/esculturas/hormiguero.png",
      kind: "image",
    },
    {
      id: "escultura-05",
      title: "Chiucan",
      year: 2025,
      category: "Decoracion",
      thumb: "assets/esculturas/chiucan.png",
      image: "assets/esculturas/chiucan.png",
      kind: "image",
    },
    {
      id: "escultura-06",
      title: "Chiguiro",
      year: 2025,
      category: "Pisapapeles",
      thumb: "assets/esculturas/chiguiro.png",
      image: "assets/esculturas/chiguiro.png",
      kind: "image",
    },
    {
      id: "escultura-07",
      title: "Arpia y Chiguiro",
      year: 2025,
      category: "Imanes",
      thumb: "assets/esculturas/imanesbonitos.png",
      image: "assets/esculturas/imanesbonitos.png",
      kind: "image",
    },
    {
      id: "escultura-08",
      title: "Mono araña y churuco",
      year: 2025,
      category: "Imanes",
      thumb: "assets/esculturas/iman.png",
      image: "assets/esculturas/iman.png",
      kind: "image",
    },
  ],

  /** Edición de videos — kind: "video"; usa videoType + videoSrc */
  edicionVideo: [
    {
      id: "video-edit-01",
      title: "Genderless",
      year: 2026,
      category: "Edición de videos",
      thumb: "assets/edicion/miniatura 1.jpeg",
      kind: "video",
      videoType: "file",
      videoSrc:
        "assets/edicion/genderless.mp4",
    },
    {
      id: "video-edit-02",
      title: "Back to future",
      year: 2026,
      category: "Edición de videos",
      thumb: "assets/edicion/miniatura2.jpg",
      kind: "video",
      videoType: "file",
      videoSrc:
        "assets/edicion/backtofuture.mp4",
    },
  ],

  /** Animación — mismo formato que edición de video */
  animacion: [
    {
      id: "anim-01",
      title: "Gavial",
      year: 2026,
      category: "Animación",
      thumb: "assets/animacion/gavial.png",
      kind: "video",
      videoType: "file",
      videoSrc:
        "assets/animacion/gavial.mp4",
    },
    {
      id: "anim-02",
      title: "Estaca",
      year: 2026,
      category: "Animación",
      thumb: "assets/animacion/staca.png",
      kind: "video",
      videoType: "file",
      videoSrc:
        "assets/animacion/staca.mp4",
    },
    {
      id: "anim-03",
      title: "Harina",
      year: 2026,
      category: "Animación",
      thumb: "assets/animacion/harina.png",
      kind: "video",
      videoType: "file",
      videoSrc:
        "assets/animacion/harina.mp4",
    },
  ],
};
