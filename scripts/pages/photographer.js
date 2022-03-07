//Mettre le code JavaScript lié à la page photographer.html
async function displayOnePhotographer(photographer) {
  const photographerInfo = document.querySelector(".photographer__info");
  const photographerImg = document.querySelector(".photographer__img");

  const photographerModel = photographerFactory(photographer);
  const userInfo = photographerModel.getOneUserInfo();
  const userImg = photographerModel.getOneUserImg();
  photographerInfo.appendChild(userInfo);
  photographerImg.appendChild(userImg);
}

async function photographerName(photographer) {
  const name = document.querySelector(".photographerName");
  name.textContent = photographer.name;
}

async function displayMedias(portfolio, photographer) {
  const photographerFolio = document.querySelector(".portfolio");

  portfolio.forEach((media) => {
    const photographerMedias = mediaFactory(media, photographer);
    const medias = photographerMedias.getPortfolioDOM();
    photographerFolio.appendChild(medias);

    document.querySelectorAll(".picture").forEach((pic) =>
      pic.addEventListener("click", (e) => {
        e.preventDefault();  
        new lightbox(e.currentTarget.getAttribute('src'), e.target.getAttribute("data-src"));
      })
    );
  });

  addAsFav();
}

async function displayStaticInsert(portfolio, photographer) {
  const photographerStaticInsert = document.querySelector(".static-insert");

  const priceText = document.createElement("span");
  price = photographer.price;
  priceText.textContent = price + "€/jour";

  const likes = document.createElement("span");
  likes.className = "static-insert__likes";

  const totalCount = document.createElement("span");
  totalCount.className = "total-hearts";
  this.totalLikes = portfolio.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
  totalCount.textContent = totalLikes;

  const heart = document.createElement("i");
  heart.className = "fas fa-heart";

  likes.append(totalCount, heart);
  photographerStaticInsert.append(likes, priceText);

  return photographerStaticInsert;
}

async function addAsFav() {
  this.hearts = document.getElementsByClassName("hearts");
  let likes = document.querySelector(".total-hearts");
  this.allHearts = [...hearts];
  let totalLikes = this.totalLikes;

  allHearts.forEach((heart) => {
    let addedToFav = false;
    const fillHeart = (e) => {
      let selectedLike = e.target.parentNode;
      const likeSpan = selectedLike.querySelector(".heart-count");
      if (!addedToFav) {
        addedToFav = true;
        likeSpan.textContent = parseInt(likeSpan.textContent) + 1;
        heart.style.fontWeight = "bold";
        totalLikes++;

        likes.textContent = totalLikes;
      } else {
        addedToFav = false;
        likeSpan.textContent = parseInt(likeSpan.textContent) - 1;
        heart.style.fontWeight = "400";
        totalLikes--;

        likes.textContent = totalLikes;
      }
    };
    heart.addEventListener("click", (e) => {
      console.log("heart");
      fillHeart(e);
    });
    heart.addEventListener("keyup", (e) => {
      if (e.key === "Enter") fillHeart(e);
    });
  });
}

async function sortData(portfolio) {
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
    closeDrop();
    changeOrderTextInOpenedButtonFilter(e);
    if (dateSelected) {
      mediasSortByDate = medias.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      portfolio = mediasSortByDate;
      document.querySelector(".portfolio").innerHTML = "";
      displayMedias(portfolio);
    }
  };

  const sortByTitle = (e) => {
    closeDrop();
    changeOrderTextInOpenedButtonFilter(e);
    if (titleSelected) {
      mediasSortByTitle = medias.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      });
      portfolio = mediasSortByTitle;
      document.querySelector(".portfolio").innerHTML = "";
      displayMedias(portfolio);
    }
  };

  const sortByPopularity = (e) => {
    closeDrop();
    changeOrderTextInOpenedButtonFilter(e);
    if (popularitySelected) {
      mediasSortByPopularity = medias.sort((a, b) => {
        return b.likes - a.likes;
      });
      portfolio = mediasSortByPopularity;
      document.querySelector(".portfolio").textContent = "";
      displayMedias(portfolio);
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

function closeModalOnKeyUp() {
  document.addEventListener("keyup", (e) => {
    // console.log(e);
    if (e.key == "Escape") {
      modal.style.display = "none";
    }
  });
}

async function init() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const photographerID = urlParams.get("id");
  console.log(photographerID);

  // Récupère les datas des photographes
  const photographersApi = new PhotographerApi("/data/photographers.json");
  const photographers = await photographersApi.getPhotographers();
  const medias = await photographersApi.getMedias();

  const photographer = photographers.find((e) => e.id == photographerID);
  const portfolio = medias.filter((e) => e.photographerId == photographerID);

  displayOnePhotographer(photographer);
  photographerName(photographer);
  closeModalOnKeyUp();
  displayStaticInsert(portfolio, photographer);
  sortData(portfolio);
  displayMedias(portfolio, photographer);
}

init();
