function photographerFactory(data) {
  const { name, portrait, id, city, country, tagline, price} = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const anchor = document.createElement("a");
    anchor.href = `photographer.html?id=${id}`;

    const profileInfo = document.createElement("div");
    profileInfo.className = "profile__info";

    const img = document.createElement("img");
    img.className = "profile__picture";
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const profileName = document.createElement("h2");
    profileName.className = "profile__info--name";
    profileName.textContent = name;

    const profileLocation = document.createElement("h3");
    profileLocation.className = "profile__info--location";
    profileLocation.textContent = city + ", " + country;

    const profileTagline = document.createElement("h4");
    profileTagline.className = "profile__info--tag";
    profileTagline.textContent = tagline;

    const profilePrice = document.createElement("p");
    profilePrice.className = "profile__info--price";
    profilePrice.textContent = price + "€/jour";

    article.append(anchor, profileInfo);
    anchor.append(img, profileName);
    profileInfo.append(profileLocation, profileTagline, profilePrice);
    return article;
  }

  function getOneUserInfo() {
    const profileInfo = document.createElement("div");
    profileInfo.className = "profile__info";

    const profileName = document.createElement("h2");
    profileName.className = "profile__info--name";
    profileName.textContent = name;

    const profileLocation = document.createElement("h3");
    profileLocation.className = "profile__info--location";
    profileLocation.textContent = city + ", " + country;

    const profileTagline = document.createElement("h4");
    profileTagline.className = "profile__info--tag";
    profileTagline.textContent = tagline;
    profileInfo.append(profileName, profileLocation, profileTagline);
    return profileInfo;
  }

  function getOneUserImg() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    return img;
  }

  return { getUserCardDOM, getOneUserInfo, getOneUserImg };
}
