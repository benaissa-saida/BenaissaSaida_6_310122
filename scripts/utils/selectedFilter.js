const wrapper = document.querySelector(".wrapper");
const toggle = document.querySelector(".wrapper__toggle");
const arrowUp = document.querySelector(".arrowUp");
const resultsList = document.getElementById("filter-list");
let isDropDownOpen = false;
let dateSelected = true;
let popularitySelected = false;
let titeSelected = false;

const openDrop = () => {
  isDropDownOpen = true;
  arrowUp.classList.remove("hide");
  wrapper.setAttribute("aria-expanded", "true");
  toggle.classList.add("hide");
  resultsList.classList.add("show");
};

const closeDrop = () => {
  isDropDownOpen = false;
  arrowUp.classList.add("hide");
  toggle.classList.remove("hide");
  wrapper.setAttribute("aria-expanded", "false");
  resultsList.classList.remove("show");
};

const changeTextOfFilterButton = (e, textOfTargetedLi) => {
  document.querySelector(".text-filter").innerHTML = textOfTargetedLi;
};

const changeOrderTextInOpenedButtonFilter = (e) => {
  let arrayOfLi = [...document.querySelectorAll("#filter-list li")];
  for (let i = 0; i < arrayOfLi.length; i++) {
    if (arrayOfLi[i] === e.target) {
      //Change texte dans le bouton fermé
      let textOfTargetedLi = arrayOfLi[i].innerHTML;
      changeTextOfFilterButton(e, textOfTargetedLi);
    }
  }
};

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
    changeOrderTextInOpenedButtonFilter(e.target);
  }
};



toggle.addEventListener("click", openDrop);

resultsList.addEventListener("click", closeDrop);
resultsList.addEventListener('keyup', (e) => handleItemKeyDown(e))
