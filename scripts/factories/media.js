function mediaFactory(data) {
  const { image, photographerId, title, video, likes } = data;

  const picture = `assets/images/${photographerId}/${image}`;
  const media = `assets/images/${photographerId}/${video}`;

  // const photographe

  function getPortfolioDOM() {
    const figure = document.createElement("figure");
    figure.className = "portfolio__info"

    const img = document.createElement("img");
    img.className = "";
    img.setAttribute("src", picture);
    img.setAttribute("alt", title);

    const video = document.createElement("video");
    video.setAttribute("src", media);
    video.setAttribute("preload", true);
    video.setAttribute("loop", "");

    const figcaption = document.createElement("figcaption");
    figcaption.className = "portfolio__info--caption"
    figcaption.textContent = title;

    const like = document.createElement("span");
    like.textContent = likes

    const heart = document.createElement('i');
    heart.className = "hearts far fa-heart"
    
    like.appendChild(heart)
    figcaption.append(like)
    
    if (image) {
      figure.append(img, figcaption);
    } else {
      figure.append(video, figcaption);
    }
    return figure;
  }
  return { getPortfolioDOM };
}
