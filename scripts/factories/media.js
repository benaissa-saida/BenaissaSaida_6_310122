function mediaFactory(data) {
  const { image, photographerId, title, video, likes, id } = data;

  const picture = `assets/images/${photographerId}/${image}`;
  const media = `assets/images/${photographerId}/${video}`;

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

    const heart = document.createElement("i");
    heart.tabIndex = 0;
    heart.className = "hearts far fa-heart";
    heart.ariaLabel = "likes";

    like.append(countLikes, heart);
    figcaption.append(like);

    if (image) {
      figure.append(createImage(), figcaption);
    } else {
      figure.append(createVideo(), figcaption);
    }
    return figure;
  }

  // const pics = document.querySelectorAll(".picture").forEach((pic) =>
  //   pic.addEventListener("click", (e) => {
  //     console.log(e)
  //     // e.preventDefault();
  //     // console.log(e.currentTarget)
  //     // new lightbox(e.currentTarget.getAttribute('src'));
  //   })
  // );

  return { getPortfolioDOM };
}
