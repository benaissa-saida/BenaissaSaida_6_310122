//Mettre le code JavaScript lié à la page photographer.html
const path = window.location.pathname;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerID = urlParams.get("id");

async function displayOnePhotographer(photographers, medias) {
  const photographerInfo = document.querySelector(".photographer__info");
  const photographerImg = document.querySelector(".photographer__img");
  const photographerFolio = document.querySelector(".portfolio");

  photographers.filter((photographer) => {
    if (photographer.id == photographerID) {
      const photographerModel = photographerFactory(photographer);
      const userInfo = photographerModel.getOneUserInfo();
      const userImg = photographerModel.getOneUserImg();
      photographerInfo.appendChild(userInfo);
      photographerImg.appendChild(userImg);
    }
  });


  medias.filter((media) => {
    if (media.photographerId == photographerID) {
      const photographerMedias = mediaFactory(media);
      const medias = photographerMedias.getPortfolioDOM();
      photographerFolio.appendChild(medias);
    }
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographersApi = new PhotographerApi("/data/photographers.json");
  const photographers = await photographersApi.getPhotographers();
  const medias = await photographersApi.getMedia();

  displayOnePhotographer(photographers, medias);
}

init();
