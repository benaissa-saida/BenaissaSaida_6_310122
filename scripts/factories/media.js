function mediaFactory(data) {
  const { image, photographerId, title, video, likes } = data;

  const picture = `assets/images/${photographerId}/${image}`;
  const media = `assets/images/${photographerId}/${video}`;

  function createImage() {
    const img = document.createElement("img");
    img.className = "";
    img.setAttribute("src", picture);
    img.setAttribute("alt", title);
    return img
  }

  function createVideo() {
    const video = document.createElement("video");
    // video.setAttribute('controls', '')
    const source = document.createElement('source');
    source.setAttribute("src", media);
    source.setAttribute("preload", true);
    source.setAttribute("loop", "");
    video.appendChild(source)
    return video
  }

  function getPortfolioDOM() {
    const figure = document.createElement("figure");
    figure.className = "portfolio__info";

    const figcaption = document.createElement("figcaption");
    figcaption.className = "portfolio__info--caption";
    figcaption.textContent = title;

    const like = document.createElement("span");
    like.textContent = likes;

    const heart = document.createElement("i");
    heart.className = "hearts far fa-heart";

    like.appendChild(heart);
    figcaption.append(like);

    if (image) {
      figure.append(createImage(), figcaption);
    } else {
      figure.append(createVideo(), figcaption);
    }
    return figure;
  }
  return { getPortfolioDOM };
}
