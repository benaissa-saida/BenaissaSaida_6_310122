//fonction qui pourra montrer un seul photographe
async function displayOnePhotographer(photographer) {
  const photographerInfo = document.querySelector(".photographer__info");
  const photographerImg = document.querySelector(".photographer__img");

  //on cherche le nom de chaque photographe pour le mettre
  //dans le modal de contact
  const name = document.querySelector(".photographerName");
  name.textContent = photographer.name;

  const photographerModel = photographerFactory(photographer);
  //on va chercher les infos contenus dans notre factory photogrape
  const userInfo = photographerModel.getOneUserInfo();
  const userImg = photographerModel.getOneUserImg();

  //pour créer les infos et l'image de chaque photographe
  photographerInfo.appendChild(userInfo);
  photographerImg.appendChild(userImg);
}

//fonction pour afficher les différents médias du photographe
async function displayMedias(portfolio, photographer) {
  const photographerFolio = document.querySelector(".portfolio");

  //boucle qui permettra de créer le portfolio de chaque photographe
  portfolio.forEach((media) => {
    const photographerMedias = mediaFactory(media, photographer);
    const medias = photographerMedias.getPortfolioDOM();
    photographerFolio.appendChild(medias);
  });
  // let pictures = document.querySelectorAll(".picture");

  //fonction qui fera ouvrir la lightbox afin de mieux voir les médias
  openLightbox(photographer, portfolio);

  //fonction qui permet d'avoir le calcul des like après un trie
  addAsFav();
}

// fonction qui permet d'afficher le petit encart du prix et des coeurs
async function displayStaticInsert(portfolio, photographer) {
  const photographerStaticInsert = document.querySelector(".static-insert");
  photographerStaticInsert.tabIndex = 0;

  const priceText = document.createElement("span");
  price = photographer.price;
  priceText.textContent = price + "€/jour";
  priceText.tabIndex = 0;
  priceText.ariaLabel = `${price} €/jour`;

  const likes = document.createElement("span");
  likes.className = "static-insert__likes";
  likes.tabIndex = 0;

  const totalCount = document.createElement("span");
  totalCount.className = "total-hearts";
  this.totalLikes = portfolio.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
  totalCount.textContent = totalLikes;

  //aria label pour avoir le total de like
  likes.ariaLabel = `${this.totalLikes} j'aimes`;

  const heart = document.createElement("i");
  heart.className = "fas fa-heart";

  likes.append(totalCount, heart);

  //creation de notre encart avec les likes et le prix par jour du photographe
  photographerStaticInsert.append(likes, priceText);

  return photographerStaticInsert;
}

//fonction qui permet de calculer le total des likes
async function addAsFav() {
  //on crée un fonction globale qui contient l'element heart du dom
  this.hearts = document.getElementsByClassName("hearts");

  // selectionne le total heart dans le dom
  let likes = document.querySelector(".total-hearts");

  //permet d'avoir un array de tous nos hearts
  this.allHearts = [...hearts];
  let totalLikes = this.totalLikes;

  //boucle qui permet de rentrer dans chacun de nos coeurs contenus dans l'array
  allHearts.forEach((heart) => {
    let addedToFav = false;

    //fonction de remplissage du coeur
    const fillHeart = (e) => {
      //permet de selectionner le parent de notre coeur
      let selectedLike = e.target.parentNode;
      const likeSpan = selectedLike.querySelector(".heart-count");
      if (!addedToFav) {
        // s'il y a un click
        addedToFav = true;
        //on ajoute 1 à notre span contenant le total de like d'une image
        likeSpan.textContent = parseInt(likeSpan.textContent) + 1;
        heart.style.fontWeight = "bold";
        //on incrémente le total de like dans l'encart
        totalLikes++;

        likes.textContent = totalLikes;
      } else {
        addedToFav = false;
        //sinon on retire le j'aime qu'on vient de mettre
        likeSpan.textContent = parseInt(likeSpan.textContent) - 1;
        heart.style.fontWeight = "400";
        //avant de modifier de nouveau le total de like dans l'encart
        totalLikes--;

        likes.textContent = totalLikes;
      }
    };

    //ca se fera au click ou lorsqu'on tape sur entrer dans le clavier
    heart.addEventListener("click", (e) => {
      console.log("heart");
      fillHeart(e);
    });
    heart.addEventListener("keyup", (e) => {
      if (e.key === "Enter") fillHeart(e);
    });
  });
}

//fonction qui permet de trier les datas
async function sortData(portfolio, photographer) {
  medias = portfolio;
  let dateSelected = true;
  let popularitySelected = true;
  let titleSelected = true;
  let mediasSortByDate = [];
  let mediasSortByPopularity = [];
  let mediasSortByTitle = [];

  let buttonDate = document.querySelector("#date");
  let buttonPopularity = document.querySelector("#popularity");
  let buttonTitle = document.querySelector("#title");

  const sortByDate = (e) => {
    closeDrop(); // ferme le drop
    changeOrderText(e); //change le texte du button
    if (dateSelected) {
      // si date selectionné
      //alors on trie en fonction des dates
      mediasSortByDate = medias.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      portfolio = mediasSortByDate;
      document.querySelector(".portfolio").innerHTML = ""; // on vide le portfolio
      document.querySelectorAll(".picture").innerHTML = "";

      displayMedias(portfolio, photographer); // avant d'afficher le nouveau portfolio
    }
  };

  const sortByTitle = (e) => {
    closeDrop();
    changeOrderText(e);
    if (titleSelected) {
      mediasSortByTitle = medias.sort((a, b) => {
        //trie les titres par ordre alphabétique
        // si a > b alors 1 equivaut à plus grand sinon -1 équivaut à plus petit
        return a.title > b.title ? 1 : -1;
      });
      portfolio = mediasSortByTitle;
      document.querySelector(".portfolio").innerHTML = "";
      document.querySelectorAll(".picture").innerHTML = "";

      displayMedias(portfolio, photographer);
    }
  };

  const sortByPopularity = (e) => {
    closeDrop();
    changeOrderText(e);
    if (popularitySelected) {
      mediasSortByPopularity = medias.sort((a, b) => {
        return b.likes - a.likes;
      });
      portfolio = mediasSortByPopularity;
      document.querySelector(".portfolio").textContent = "";
      document.querySelectorAll(".picture").innerHTML = "";

      displayMedias(portfolio, photographer);
    }
  };

  //event click & keyup
  buttonDate.addEventListener("click", (e) => {
    sortByDate(e, buttonDate, buttonTitle, buttonPopularity);
  });
  buttonDate.addEventListener("keyup", (e) => {
    if (e.key === "Enter") sortByDate(e);
  });

  //event click & keyup
  buttonTitle.addEventListener("click", (e) => {
    sortByTitle(e, buttonDate, buttonTitle, buttonPopularity);
  });
  buttonTitle.addEventListener("keyup", (e) => {
    if (e.key === "Enter") sortByTitle(e);
  });

  //event click & keyup
  buttonPopularity.addEventListener("click", (e, buttonPopularity) => {
    sortByPopularity(e, buttonDate, buttonTitle, buttonPopularity);
  });
  buttonPopularity.addEventListener("keyup", (e) => {
    if (e.key === "Enter") sortByPopularity(e);
  });
}

//fermeture du modal après avoir touché "esc"
function closeModalOnKeyUp() {
  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      modal.style.display = "none";
    }
  });
}

//fonction d'init pour initialiser toutes nos fonctions
async function init() {
  // on va chercher dans le query l'id de notre photographe
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const photographerID = urlParams.get("id");

  // Récupère les datas du photographe
  const photographersApi = new PhotographerApi("/data/photographers.json");
  const photographers = await photographersApi.getPhotographers();
  const medias = await photographersApi.getMedias();

  //on trouve notre photographe qui correspond à l'id entré dans notre query
  const photographer = photographers.find((e) => e.id == photographerID);

  //on filtre nos medias pour avoir seulement ceux de notre photographe
  const portfolio = medias.filter((e) => e.photographerId == photographerID);

  displayOnePhotographer(photographer);
  closeLightbox();
  closeModalOnKeyUp();
  displayStaticInsert(portfolio, photographer);
  sortData(portfolio, photographer);
  displayMedias(portfolio, photographer);
}

init();
