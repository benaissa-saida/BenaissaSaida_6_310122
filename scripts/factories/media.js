//fonction permettant de gérer  les mécanismes de création de médias
function mediaFactory(data) {
  // création de constantes contenus dans la data
  const { image, photographerId, title, video, likes, id} = data;

  //creéation du src pour les images et les videos
  const picture = `assets/images/${photographerId}/${image}`;
  const media = `assets/images/${photographerId}/${video}`;

  //fonction de création de l'image
  function createImage() {
    const img = document.createElement("img");
    img.className = 'picture'
    img.dataset.src = 'img';
    img.setAttribute("src", picture);
    img.setAttribute("loading", "lazy");
    img.setAttribute("alt", title);
    img.tabIndex = 0;
    return img;
  }

  //fonction de création de la vidéo
  function createVideo() {
    const video = document.createElement("video");
    video.setAttribute("src", media);
    video.className = 'picture'
    video.dataset.src = 'video';
    video.tabIndex = 0;
    const source = document.createElement("source");
    source.setAttribute("src", media);
    source.setAttribute('alt', title)
    video.appendChild(source);
    return video;
  }

  // création du portfolio de notre photographe
  function getPortfolioDOM() {
    const figure = document.createElement("figure");
    figure.className = "portfolio__info";

    const figcaption = document.createElement("figcaption");
    figcaption.className = "portfolio__info--caption";
    figcaption.textContent = title;

    const like = document.createElement("span");
    like.className = "portfolio__info--heart";

    const countLikes = document.createElement("span");
    countLikes.className = "heart-count";
    countLikes.textContent = likes;
    countLikes.ariaLabel = "nombre de j'aime";

    const heart = document.createElement("i");
    heart.tabIndex = 0;
    heart.className = "hearts far fa-heart";
    heart.ariaLabel = "j'aime";

    like.append(countLikes, heart);
    figcaption.append(like);

    //si le média est une image
    if (image) {
      //création du figure qui contiendra l'image ainsi que la figcaption
      figure.append(createImage(), figcaption);
    } else {
      //sinon ça sera la vidéo
      figure.append(createVideo(), figcaption);
    }
    return figure;
  }

  //on retourne la fonction de création du portfolio
  //afin de pouvoir la réutiliser
  return { getPortfolioDOM };
}
