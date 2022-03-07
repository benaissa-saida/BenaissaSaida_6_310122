function lightbox(url, attribute) {
  constructor(url, attribute);
  function constructor(url, attribute) {
    this.element = buildDom(url, attribute);
    document.body.appendChild(element);
  }

  function close(e) {
    e.preventDefault();
    this.element.style.display = "none";
    // window.setTimeout(() => {
    //     this.element.parentElement.removeChild(this.element)
    // }, 500)
  }

  function buildDom(url, attribute) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    if (attribute == "img") {
      dom.innerHTML = `<div class="lightbox__container">
            <button class="lightbox__container--close">Close</button>
            <button class="lightbox__container--next">Next</button>
            <button class="lightbox__container--prev">Previous</button>
            <div class="lightbox__container--img">
            <img src="${url}">
            </div>
          </div>`;
    } else {
      dom.innerHTML = `<div class="lightbox__container">
            <button class="lightbox__container--close">Close</button>
            <button class="lightbox__container--next">Next</button>
            <button class="lightbox__container--prev">Previous</button>
            <div class="lightbox__container--img">
                <video controls preload loop autoplay>
                    <source src="${url}"/>
                </video>
            </div>
          </div>`;
    }
    dom.classList.add("open");
    dom
      .querySelector(".lightbox__container--close")
      .addEventListener("click", () => {
        dom.classList.remove("open");
        dom.classList.add("close");
      });
    return dom;
  }
}
