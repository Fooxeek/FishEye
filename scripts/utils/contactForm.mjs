import {
  getPhotographerIdFromUrl,
  getPhotographerDetails,
} from "../pages/photographer.mjs";

async function displayModal() {
  const photographerId = await getPhotographerIdFromUrl();
  const { photographer } = await getPhotographerDetails(photographerId);

  const modal = document.getElementById("contact_modal");
  const modalHeader = modal.querySelector("h2");

  // Afficher le nom du photographe dans le titre du modal
  modalHeader.textContent = `Contactez-moi\n${photographer.name}`;

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();

  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("your_message").value;

  if (!firstName || !lastName || !email || !message) {
    alert("Veuillez renseigner tous les champs du formulaire.");
    return;
  }

  console.log("Prénom/Nom:", firstName, lastName);
  console.log("Email:", email);
  console.log("Message:", message);

  closeModal();
}

const contactForm = document.querySelector("form");
contactForm.addEventListener("submit", handleSubmit);

window.displayModal = displayModal;
window.closeModal = closeModal;
