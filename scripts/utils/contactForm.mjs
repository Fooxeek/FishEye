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

window.displayModal = displayModal;
window.closeModal = closeModal;
