window.addEventListener("load", function () {
  const root = document.querySelector(".container");
  const bgModal = document.createElement("div");
  bgModal.classList.add("modal__bg");
  bgModal.hidden = true;
  root.appendChild(bgModal);

  document.getElementById("print-button").hidden = false;

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

  window.printPage = function () {
    const root = document.body;
    const oldPage = root.innerHTML;
    const target = root.querySelector("#main article");
    if (!target) {
      alert("Nội dung này không thể download hoặc in");
      return;
    }

    // replace body with target
    root.innerHTML = "";
    root.appendChild(target);
    console.log(target);

    print();

    // undo
    root.innerHTML = oldPage;
  };
});
