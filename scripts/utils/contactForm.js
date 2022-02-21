function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function sendForm(e) {
  e.preventDefault();
  const contact = {

    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  }

  if (firstName && lastName && email && message) {
    closeModal();
    console.log(contact);
  }
}
