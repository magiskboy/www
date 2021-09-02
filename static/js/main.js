const postCssSelector = "#main article.post";

window.addEventListener("load", function () {
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
});
