const postCssSelector = "#main article.post";

window.requestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    var start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id);
  };

function setupModal() {
  const root = document.querySelector(".container");
  const bgModal = document.createElement("div");
  bgModal.classList.add("modal__bg");
  bgModal.hidden = true;
  root.appendChild(bgModal);

  window.viewImage = function (el) {
    document.body.style.overflow = "hidden";
    const topOffset = document.documentElement.scrollTop;
    bgModal.style.top = `${topOffset}px`;
    bgModal.hidden = false;

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.top = `${topOffset + window.screen.height / 2.25}px`;

    const img = document.createElement("img");
    img.src = el.src;
    img.style.width = "100%";
    img.style.maxHeight = `${window.screen.height / 1.5}px`;
    modal.appendChild(img);

    bgModal.addEventListener("click", function () {
      bgModal.hidden = true;
      document.body.style.overflow = "visible";
      modal.remove();
    });

    root.appendChild(modal);
  };
}

window.addEventListener("load", function () {
  function callback(deadline) {
    if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
      setupModal();
    } else {
      window.requestIdleCallback(callback);
    }
  }
  window.requestIdleCallback(callback, { timeout: 3000 });
});
