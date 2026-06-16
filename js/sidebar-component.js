/**

 * Sidebar — flyout Portafolio (panel oscuro), navegación por páginas HTML.

 */

(function () {

  "use strict";



  var PORTFOLIO_SECTIONS = [

    "ilustraciones-digitales",

    "dibujos",

    "esculturas",

    "edicion-video",

    "animacion",

  ];



  /** Nombre de archivo → data-nav-target para marcar ítem activo */

  var FILE_TO_NAV = {

    "index.html": "home",

    "ilustraciones-digitales.html": "ilustraciones-digitales",

    "dibujos.html": "dibujos",

    "esculturas.html": "esculturas",

    "edicion-video.html": "edicion-video",

    "animacion.html": "animacion",

    "acerca.html": "acerca",

  };



  function getCurrentNavId() {

    var path = window.location.pathname || "";

    var segments = path.split("/").filter(Boolean);

    var last = segments.length ? segments[segments.length - 1] : "";

    if (!last || last === "index.html") return "home";

    return FILE_TO_NAV[last] || "home";

  }



  function syncActiveNav(root, portfolioToggle) {

    var currentId = getCurrentNavId();

    var navLinks = root.querySelectorAll("[data-nav-target]");

    navLinks.forEach(function (link) {

      var target = link.getAttribute("data-nav-target");

      link.classList.toggle("is-active", target === currentId);

    });

    updatePortfolioToggleActive(currentId, portfolioToggle);

  }



  function closeFlyout(panel, toggle) {

    if (!panel || !toggle) return;

    panel.hidden = true;

    toggle.setAttribute("aria-expanded", "false");

    toggle.classList.remove("is-open");

  }



  function openFlyout(panel, toggle) {

    if (!panel || !toggle) return;

    panel.hidden = false;

    toggle.setAttribute("aria-expanded", "true");

    toggle.classList.add("is-open");

    positionFlyout(panel, toggle);

  }



  function positionFlyout(panel, toggle) {

    if (!panel || !toggle) return;

    if (window.matchMedia("(max-width: 768px)").matches) {

      panel.style.top = "";

      return;

    }

    var rect = toggle.getBoundingClientRect();

    panel.style.top = Math.round(rect.top) + "px";

  }



  function isPortfolioSection(id) {

    return PORTFOLIO_SECTIONS.indexOf(id) !== -1;

  }



  function updatePortfolioToggleActive(currentId, toggle) {

    if (!toggle) return;

    toggle.classList.toggle("is-active", isPortfolioSection(currentId));

  }



  function initSidebar() {

    var root = document.querySelector("[data-sidebar]");

    if (!root) return;



    var portfolioToggle = root.querySelector("[data-portfolio-toggle]");

    var portfolioPanel = root.querySelector("[data-portfolio-panel]");

    var flyoutLinks = portfolioPanel

      ? portfolioPanel.querySelectorAll("a[href]")

      : [];



    syncActiveNav(root, portfolioToggle);



    function onResize() {

      if (portfolioPanel && portfolioPanel.hidden === false) {

        positionFlyout(portfolioPanel, portfolioToggle);

      }

    }



    window.addEventListener("resize", onResize);



    if (portfolioToggle && portfolioPanel) {

      portfolioToggle.addEventListener("click", function (e) {

        e.stopPropagation();

        var expanded = portfolioPanel.hidden === false;

        if (expanded) {

          closeFlyout(portfolioPanel, portfolioToggle);

        } else {

          openFlyout(portfolioPanel, portfolioToggle);

        }

      });

    }



    document.addEventListener("click", function (e) {

      if (!portfolioPanel || portfolioPanel.hidden) return;

      if (portfolioToggle.contains(e.target)) return;

      if (portfolioPanel.contains(e.target)) return;

      closeFlyout(portfolioPanel, portfolioToggle);

    });



    flyoutLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        closeFlyout(portfolioPanel, portfolioToggle);

      });

    });

  }



  if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initSidebar);

  } else {

    initSidebar();

  }

})();

