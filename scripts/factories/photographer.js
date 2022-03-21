//fonction permettant de gérer  les mécanismes de création des photographes
function photographerFactory(data) {
  // création de constantes contenus dans la data
  const { name, portrait, id, city, country, tagline, price} = data;

  //creéation du src pour les images et les videos
  const picture = `assets/photographers/${portrait}`;

  //fonction de création d'une card photographe
  function getUserCardDOM() {
    const article = document.createElement("article");

    const anchor = document.createElement("a");
    anchor.href = `photographer.html?id=${id}`;
    anchor.title = `lien vers le photographe ${name}`

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

    profileInfo.append(profileLocation, profileTagline, profilePrice);
    anchor.append(img, profileName);

    //l'article précedemment crée contiendra le lien vers un photographe 
    //ainsi que ses infos
    article.append(anchor, profileInfo);
    return article;
  }

  //fonction pour avoir les infos d'un photographe
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

  //fonction pour avoir l'image d'un photographe
  function getOneUserImg() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    return img;
  }

  //on retourne les fonctions afin de pouvoir la réutiliser
  return { getUserCardDOM, getOneUserInfo, getOneUserImg };
}
