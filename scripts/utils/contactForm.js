const modal = document.getElementById("contact_modal");

//INPUT Elements
const first = document.getElementById("firstName");
const last = document.getElementById("lastName");
const mail = document.getElementById("email");
const message = document.getElementById("message");

// REGEX
const regNoNum =
  /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;

function displayModal() {
  modal.style.display = "flex";
  first.focus()
}

function closeModal() {
  modal.style.display = "none";
}

//get data from form
const getData = () => {
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  return contact;
};

const errors = {
  firstName: document.getElementById("error-first"),
  lastName: document.getElementById("error-last"),
  email: document.getElementById("error-email"),
  message: document.getElementById("error-message"),
};

function firstNameValidation() {
  const contact = getData();

  if (contact.firstName.length < 2) {
    first.classList.add("is-invalid");
    errors.firstName.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    return false;
  }

  if (!regNoNum.test(contact.firstName)) {
    first.classList.add("is-invalid");
    errors.firstName.innerHTML =
      "Ceci n'est pas un prénom, doit contenir que des lettres !";
    return false;
  } else {
    first.classList.remove("is-invalid");
    first.classList.add("is-valid");
    errors.firstName.innerText = "";
    return true;
  }
}

function lastNameValidation() {
  const contact = getData();

  if (contact.lastName.length < 2) {
    last.classList.add("is-invalid");
    errors.lastName.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    return false;
  }

  if (!regNoNum.test(contact.lastName)) {
    last.classList.add("is-invalid");
    errors.lastName.innerHTML =
      "Ceci n'est pas un nom, doit contenir que des lettres !";
    return false;
  } else {
    last.classList.remove("is-invalid");
    last.classList.add("is-valid");
    errors.lastName.innerText = "";
    return true;
  }
}

function emailValidation() {
  const contact = getData();
  const regMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regMail.test(contact.email)) {
    mail.classList.add("is-invalid");
    errors.email.innerHTML = "Veuillez entrer un email valide.";
    return false;
  } else {
    mail.classList.remove("is-invalid");
    mail.classList.add("is-valid");
    errors.email.innerText = "";
    return true;
  }
}

function messageValidation() {
  const contact = getData();

  if (contact.message.length < 4) {
    message.classList.add("is-invalid");
    errors.message.innerHTML = "Veuillez entrer 4 caractères ou plus.";
    return false;
  } else {
    message.classList.remove("is-invalid");
    message.classList.add("is-valid");
    errors.message.innerText = "";
    return true;
  }
}

function sendForm(e) {
  const contact = getData();
  e.preventDefault();
  let firstNameValid = false;
  lastNameValid = false;
  emailValid = false;
  messageValid = false;

  first.classList.remove("is-valid", "is-invalid");
  last.classList.remove("is-valid", "is-invalid");
  mail.classList.remove("is-valid", "is-invalid");
  message.classList.remove("is-valid", "is-invalid");

  if (firstNameValidation()) {
    firstNameValid = true;
  }

  if (lastNameValidation()) {
    lastNameValid = true;
  }

  if (emailValidation()) {
    emailValid = true;
  }

  if (messageValidation()) {
    messageValid = true;
  }

  if (firstNameValid && lastNameValid && emailValid && messageValid) {
    closeModal();
    console.log(contact);
  }
}
