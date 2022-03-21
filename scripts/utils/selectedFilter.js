const wrapper = document.querySelector(".wrapper");
const toggle = document.querySelector(".wrapper__toggle");
const arrowUp = document.querySelector(".arrowUp");
const resultsList = document.getElementById("filter-list");
let isDropDownOpen = false;
let dateSelected = true;
let popularitySelected = false;
let titeSelected = false;

//fonction pour ouvrir notre toggle de filtre 
const openDrop = () => {
  isDropDownOpen = true;
  arrowUp.classList.remove("hide");
  wrapper.setAttribute("aria-expanded", "true");
  toggle.classList.add("hide");
  resultsList.classList.add("show");
};

//fonction pour fermer notre toggle de filtre
const closeDrop = () => {
  isDropDownOpen = false;
  arrowUp.classList.add("hide");
  toggle.classList.remove("hide");
  wrapper.setAttribute("aria-expanded", "false");
  resultsList.classList.remove("show");
};

//change le texte du button choisi
const changeTextOfFilterButton = (e, textOfTargetedLi) => {
  document.querySelector(".text-filter").innerHTML = textOfTargetedLi;
};

//change l'ordre du texte dans le button clické
const changeOrderText = (e) => {
  //on crée un array de nos différents <li>
  let arrayOfLi = [...document.querySelectorAll("#filter-list li")];

  //pour i qui sera plus petit que la longueur de notre array
  for (let i = 0; i < arrayOfLi.length; i++) {
    //si le i choisi dans notre array correspond au button qu'on a target
    if (arrayOfLi[i] === e.target) {
      // alors on change le texte dans le bouton fermé
      let textOfTargetedLi = arrayOfLi[i].innerHTML;
      changeTextOfFilterButton(e, textOfTargetedLi);
    }
  }
};

// nous permet de naviguer dans le toggle afin de choisir le 
//tri qu'on souhaite
const handleItemKeyDown = (e) => {
  e.preventDefault();

  if (e.key === "ArrowUp" && e.target.previousElementSibling) {
    // up
    e.target.previousElementSibling.focus();
  } else if (e.key === "ArrowDown" && e.target.nextElementSibling) {
    // down
    e.target.nextElementSibling.focus();
  } else if (e.key === "Enter") {
    // enter
    changeOrderText(e.target);
  }
};


//on écoute notre toggle afin de permettre l'ouverture de notre toggle
toggle.addEventListener("click", openDrop);

// on écoute à la fois le click et le keyup pour naviguer dans le toggle
resultsList.addEventListener("click", closeDrop);
resultsList.addEventListener('keyup', (e) => handleItemKeyDown(e))
