function lightBox(url, attribute) {
  constructor(url, attribute);
  function constructor(url, attribute) {
    this.element = buildContainer(url, attribute);
    document.querySelector(".lightbox__container").appendChild(element);
  }

  function buildContainer(url, attribute) {
    const dom = document.querySelector(".lightbox__container--media");
    const lightbox = document.querySelector(".lightbox");
    if (attribute == "img") {
      dom.innerHTML = `<img src="${url}">`;
    } else {
      dom.innerHTML = `
        <video controls preload loop autoplay>
          <source src="${url}"/>
        </video>
      `;
    }
    lightbox.style.display = "block";
    return dom;
  }
}

function addMediaAfterClick(i, pics, photographer, portfolio) {
  const container = document.querySelector(".lightbox__container--media");
  if (pics[i].src.includes(".jpg")) {
    container.innerHTML = `<img src="assets/images/${photographer.id}/${portfolio[i].image}">`;
  }
  if (pics[i].src.includes(".mp4")) {
    container.innerHTML = `
      <video controls preload loop autoplay>
        <source src="assets/images/${photographer.id}/${portfolio[i].video}">/>
      </video>
    `;
  }
}
function openLightbox(photographer, portfolio) {
  openLightboxOnKeyup();
  document.querySelectorAll(".picture").forEach((pic) =>
    pic.addEventListener("click", (e) => {
      e.preventDefault();
      lightBox(
        e.currentTarget.getAttribute("src"),
        e.target.getAttribute("data-src")
      );
      nextAndPrev(e.currentTarget.getAttribute("src"), photographer, portfolio);
    })
  );
}

function openLightboxOnKeyup() {
  const lightbox = document.querySelector(".lightbox");
  document.querySelectorAll(".picture").forEach((pic) =>
    pic.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        console.log("enter");
        lightBox(
          e.currentTarget.getAttribute("src"),
          e.target.getAttribute("data-src")
        );
        lightbox.style.display = "block";
      }
    })
  );
}

function closeLightbox() {
  closeLightboxOnKeyUp();
  const btnClose = document.querySelector(".lightbox__container--close");
  btnClose.addEventListener("click", function () {
    //on va chercher le parent du parent du button close
    //ici lightbox pour lui donner un display none
    btnClose.parentNode.parentNode.style.display = "none";
  });
}

function closeLightboxOnKeyUp() {
  const lightbox = document.querySelector(".lightbox");
  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      lightbox.style.display = "none";
    }
  });
}


function nextAndPrev(url, photographer, portfolio) {
  const pics = Array.from(document.querySelectorAll(".picture"));
  const gallery = pics.map((pic) => pic.getAttribute("src"));
  let i = gallery.findIndex((pic) => pic === url);

  nextAndPrevOnKeyUp(i, gallery, pics, photographer, portfolio)
  const btnNext = document.querySelector(".lightbox__container--next");
  btnNext.addEventListener("click", () => {
    i++;
    if (i == gallery.length) i = 0;
    addMediaAfterClick(i, pics, photographer, portfolio);
  });

  const btnPrev = document.querySelector(".lightbox__container--prev");
  btnPrev.addEventListener("click", () => {
    i--;
    if (i == -1) i = gallery.length - 1;
    addMediaAfterClick(i, pics, photographer, portfolio);
  });
}

function nextAndPrevOnKeyUp(i, gallery, pics, photographer, portfolio) {
  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
      i++;
      if (i == gallery.length) i = 0;
      addMediaAfterClick(i, pics, photographer, portfolio);
    }
    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      i--;
      if (i == -1) i = gallery.length - 1;
      addMediaAfterClick(i, pics, photographer, portfolio);
    }
  });
}
