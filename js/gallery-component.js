/**
 * Gallery — rejilla responsive, modal detalle (gris) y modal zoom (negro) / video.
 */
(function () {
  "use strict";

  function escapeHtml(str) {
    if (str == null) return "";
    var div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  function Gallery(options) {
    this.container = options.container;
    this.dataKey = options.dataKey;
    this.items = options.items || [];
    this.detailModal = document.querySelector("[data-modal-detail]");
    this.zoomModal = document.querySelector("[data-modal-zoom]");
    this._boundDetailClick = this._onDetailMediaClick.bind(this);
    this.render();
  }

  Gallery.prototype.getItems = function () {
    return this.items;
  };

  Gallery.prototype.setItems = function (items) {
    this.items = items || [];
    this.render();
  };

  Gallery.prototype.render = function () {
    var self = this;
    if (!this.container) return;
    this.container.innerHTML = "";
    this.container.classList.add("gallery-grid");

    this.items.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "gallery-card";
      card.setAttribute("data-item-id", item.id);

      var mediaWrap = document.createElement("div");
      mediaWrap.className = "gallery-card__media";

      if (item.kind === "video") {
        var img = document.createElement("img");
        img.src = item.thumb;
        img.alt = "";
        img.loading = "lazy";
        img.className = "gallery-card__thumb";
        mediaWrap.appendChild(img);
        var play = document.createElement("span");
        play.className = "gallery-card__play";
        play.setAttribute("aria-hidden", "true");
        play.textContent = "▶";
        mediaWrap.appendChild(play);
      } else {
        var thumb = document.createElement("img");
        thumb.src = item.thumb;
        thumb.alt = "";
        thumb.loading = "lazy";
        thumb.className = "gallery-card__thumb";
        mediaWrap.appendChild(thumb);
      }

      var overlay = document.createElement("div");
      overlay.className = "gallery-card__overlay";
      var title = document.createElement("span");
      title.className = "gallery-card__title";
      title.textContent = item.title;
      overlay.appendChild(title);

      if (item.kind !== "video") {
        var corner = document.createElement("span");
        corner.className = "gallery-card__corner-chevron";
        corner.setAttribute("aria-hidden", "true");
        corner.textContent = ">";
        overlay.appendChild(corner);
      }

      mediaWrap.appendChild(overlay);
      card.appendChild(mediaWrap);

      card.addEventListener("click", function () {
        self.openDetail(item);
      });

      self.container.appendChild(card);
    });
  };

  Gallery.prototype.openDetail = function (item) {
    if (!this.detailModal) return;
    this.detailModal.hidden = false;
    document.body.classList.add("modal-open");

    var imgEl = this.detailModal.querySelector("[data-detail-image-wrap]");
    var videoFileWrap = this.detailModal.querySelector("[data-detail-video-file]");
    var iframeWrap = this.detailModal.querySelector("[data-detail-iframe-wrap]");
    var titleEl = this.detailModal.querySelector("[data-detail-title]");
    var yearEl = this.detailModal.querySelector("[data-detail-year]");
    var temaEl = this.detailModal.querySelector("[data-detail-tema]");

    imgEl.hidden = true;
    videoFileWrap.hidden = true;
    iframeWrap.hidden = true;

    titleEl.textContent = item.title;
    yearEl.textContent = item.year;
    temaEl.textContent = item.category;

    var detailBox = this.detailModal.querySelector(".modal-detail__box");
    if (detailBox) {
      detailBox.classList.toggle(
        "modal-detail__box--wide",
        item.kind === "video"
      );
    }

    var imgTag = this.detailModal.querySelector("[data-detail-image]");
    imgTag.removeEventListener("click", this._boundDetailClick);

    if (item.kind === "video") {
      if (item.videoType === "file") {
        videoFileWrap.hidden = false;
        var v = this.detailModal.querySelector("[data-detail-video]");
        v.pause();
        v.removeAttribute("src");
        v.removeAttribute("poster");
        v.querySelectorAll("source").forEach(function (s) {
          s.remove();
        });
        if (item.thumb) {
          v.setAttribute("poster", item.thumb);
        }
        var source = document.createElement("source");
        source.src = item.videoSrc;
        source.type = "video/mp4";
        v.appendChild(source);
        v.load();
      } else {
        iframeWrap.hidden = false;
        var iframe = this.detailModal.querySelector("[data-detail-iframe]");
        iframe.src = item.videoSrc;
      }
    } else {
      imgEl.hidden = false;
      imgTag.src = item.image || item.thumb;
      imgTag.alt = item.title;
      imgTag.dataset.zoomSrc = item.image || item.thumb;
      imgTag.addEventListener("click", this._boundDetailClick);
    }

    this._currentItem = item;

    var closeBtn = this.detailModal.querySelector("[data-close-detail]");
    var self = this;
    if (closeBtn && !closeBtn._galleryBound) {
      closeBtn._galleryBound = true;
      closeBtn.addEventListener("click", function () {
        self.closeDetail();
      });
    }
  };

  Gallery.prototype._onDetailMediaClick = function (e) {
    e.preventDefault();
    if (!this._currentItem || this._currentItem.kind !== "image") return;
    var src =
      e.currentTarget.dataset.zoomSrc ||
      this._currentItem.image ||
      this._currentItem.thumb;
    if (!src) return;
    this.openZoom(src, this._currentItem.title);
  };

  Gallery.prototype.closeDetail = function () {
    if (!this.detailModal) return;
    this.detailModal.hidden = true;
    var iframe = this.detailModal.querySelector("[data-detail-iframe]");
    if (iframe) iframe.src = "";
    var v = this.detailModal.querySelector("[data-detail-video]");
    if (v) {
      v.pause();
      v.removeAttribute("src");
      v.innerHTML = "";
    }
    var img = this.detailModal.querySelector("[data-detail-image]");
    if (img) img.removeEventListener("click", this._boundDetailClick);
    if (!this.zoomModal || this.zoomModal.hidden) {
      document.body.classList.remove("modal-open");
    }
  };

  Gallery.prototype.openZoom = function (src, title) {
    if (!this.zoomModal) return;
    if (!src) return;
    this.zoomModal.hidden = false;
    var img = this.zoomModal.querySelector("[data-zoom-image]");
    if (img) {
      var self = this;
      if (this._zoomTimer) {
        clearTimeout(this._zoomTimer);
        this._zoomTimer = null;
      }
      img.onload = null;
      img.onerror = null;
      img.alt = title || "";
      img.removeAttribute("src");
      // Asignamos src en el próximo tick para evitar edge-cases
      // donde el "hidden → visible" ocurre en el mismo click.
      setTimeout(function () {
        img.src = src;
      }, 0);
      img.onload = function () {
        if (self._zoomTimer) {
          clearTimeout(self._zoomTimer);
          self._zoomTimer = null;
        }
      };
      img.onerror = function () {
        if (self._zoomTimer) {
          clearTimeout(self._zoomTimer);
          self._zoomTimer = null;
        }
        self.closeZoom();
      };
      // Si la imagen nunca carga (ruta rota / bloqueada), cerramos para evitar pantalla negra.
      this._zoomTimer = setTimeout(function () {
        self.closeZoom();
      }, 8000);
    }
    var closeBtn = this.zoomModal.querySelector("[data-close-zoom]");
    var self = this;
    if (closeBtn && !closeBtn._zoomBound) {
      closeBtn._zoomBound = true;
      closeBtn.addEventListener("click", function () {
        self.closeZoom();
      });
    }
    this.zoomModal.onclick = function (e) {
      if (e.target === self.zoomModal) self.closeZoom();
    };
  };

  Gallery.prototype.closeZoom = function () {
    if (!this.zoomModal) return;
    this.zoomModal.hidden = true;
    if (this._zoomTimer) {
      clearTimeout(this._zoomTimer);
      this._zoomTimer = null;
    }
    var img = this.zoomModal.querySelector("[data-zoom-image]");
    if (img) {
      img.onload = null;
      img.onerror = null;
      img.removeAttribute("src");
    }
    var detailOpen = this.detailModal && !this.detailModal.hidden;
    if (!detailOpen) {
      document.body.classList.remove("modal-open");
    }
  };

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var zoom = document.querySelector("[data-modal-zoom]");
    var detail = document.querySelector("[data-modal-detail]");
    if (zoom && !zoom.hidden) {
      zoom.hidden = true;
      if (!detail || detail.hidden) {
        document.body.classList.remove("modal-open");
      }
      return;
    }
    if (detail && !detail.hidden) {
      detail.hidden = true;
      var iframe = detail.querySelector("[data-detail-iframe]");
      if (iframe) iframe.src = "";
      var v = detail.querySelector("[data-detail-video]");
      if (v) {
        v.pause();
        v.removeAttribute("src");
        v.innerHTML = "";
      }
      document.body.classList.remove("modal-open");
    }
  });

  window.Gallery = Gallery;
})();
