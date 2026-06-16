/**
 * Enlaza datos → galerías por sección y reinicia al cambiar de vista.
 */
(function () {
  "use strict";

  var galleries = {};

  function mountGallery(key, containerSelector) {
    var el = document.querySelector(containerSelector);
    if (!el || typeof PORTFOLIO_DATA === "undefined") return;
    var items = PORTFOLIO_DATA[key] || [];
    if (galleries[key]) {
      galleries[key].setItems(items);
    } else {
      galleries[key] = new Gallery({
        container: el,
        dataKey: key,
        items: items,
      });
    }
  }

  function applySiteConfig() {
    if (typeof SITE_CONFIG === "undefined") return;
    var img = document.querySelector("[data-home-hero]");
    if (!img || !SITE_CONFIG.homeHeroSrc) return;
    img.src = SITE_CONFIG.homeHeroSrc;
    img.alt = SITE_CONFIG.homeHeroAlt || "";
  }

  function init() {
    applySiteConfig();
    mountGallery(
      "ilustracionesDigitales",
      "[data-gallery-ilustraciones-digitales]"
    );
    mountGallery("dibujos", "[data-gallery-dibujos]");
    mountGallery("esculturas", "[data-gallery-esculturas]");
    mountGallery("edicionVideo", "[data-gallery-videos]");
    mountGallery("animacion", "[data-gallery-animacion]");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
