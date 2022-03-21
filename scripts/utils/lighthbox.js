function lightBox(url, attribute) {
  constructor(url, attribute);

  //fonction de construction de notre lighthbox
  function constructor(url, attribute) {
    //création d'une valeur globale qui va nous faire construire 
    //notre lightbox
    this.element = buildContainer(url, attribute);

    //et il sera ensuite contenu dans le container créer pour.
    document.querySelector(".lightbox__container").appendChild(element);
  }

  //contruit notre container qui aura les différents médias.
  function buildContainer(url, attribute) {
    const dom = document.querySelector(".lightbox__container--media");
    const lightbox = document.querySelector(".lightbox");

    //il va ainsi créer soit une balise img pour les images 
    //soit une balise video pour les vidéos
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

//ajoute le média après le click sur next ou prev
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

//ouvre la lightbox après avoir été chercher les informations
//du photographe ainsi que son portfolio
function openLightbox(photographer, portfolio) {
  // permet l'ouverture après avoir touché 'enter'
  openLightboxOnKeyup(); 

  //crée une boucle de chaque photos afin de pouvoir avoir 
  //les evenement que l'on veut
  document.querySelectorAll(".picture").forEach((pic) =>
    pic.addEventListener("click", (e) => {
      e.preventDefault();
      lightBox(
        //url du média
        e.currentTarget.getAttribute("src"),
        //attribut du média
        e.target.getAttribute("data-src")
      );
      //fonction qui nous permettra de passer d'un média à l'autre
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
  // creation d'un array de nos medias
  const pics = Array.from(document.querySelectorAll(".picture"));

  //on recherche ensuite le src de notre média
  const gallery = pics.map((pic) => pic.getAttribute("src"));

  //on cherche ensuite l'index de notre média, son src
  //correspondant à l'url du média cliqué
  let i = gallery.findIndex((pic) => pic === url);

  nextAndPrevOnKeyUp(i, gallery, pics, photographer, portfolio)
  const btnNext = document.querySelector(".lightbox__container--next");
  btnNext.addEventListener("click", () => {
    // on incrémente pour nous permettre de voir tous les médias
    i++; 
    //si i fait la taille de notre array, alors on donne la valeur 0
    // a notre i pour nous permettre de refaire une boucle
    if (i == gallery.length) i = 0;
    addMediaAfterClick(i, pics, photographer, portfolio);
  });

  const btnPrev = document.querySelector(".lightbox__container--prev");
  btnPrev.addEventListener("click", () => {
    i--;
    //si i devient -1 alors on retire 1 à l'array de nos média
    //afin qu'on puisse retomber sur le dernier média de l'array
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
