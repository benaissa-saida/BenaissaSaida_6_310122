//fonction qui va nous permettre d'afficher les données de nos photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  //boucle qui va nous créer la card d'un photographe
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

//fonction qui va lancer notre displayData
async function init() {
  // Récupère les datas des photographes
  const photographersApi = new PhotographerApi("/data/photographers.json");
  const photographers = await photographersApi.getPhotographers();

  displayData(photographers);
}

init();
