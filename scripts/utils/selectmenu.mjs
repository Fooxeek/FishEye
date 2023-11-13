import {
  getPhotographerIdFromUrl,
  getPhotographerDetails,
} from "../pages/photographer.mjs";

import mediaTemplate from "../templates/media.mjs";

// Objet de configuration pour le tri
const sortOptions = {
  popularity: (a, b) => b.likes - a.likes,
  date: (a, b) => new Date(b.date) - new Date(a.date),
  title: (a, b) => a.title.localeCompare(b.title),
};

// Fonction de tri par défaut (popularité)
async function filterMedia(option) {
  const photographerId = await getPhotographerIdFromUrl();
  const { media } = await getPhotographerDetails(photographerId);

  // Utilisez l'option sélectionnée pour trier les médias et renvoyez le tableau trié

  return media.sort(sortOptions[option]);
}

const firstButton = document.querySelector(".sortby-select__button");
const panel = document.querySelector(".sortby-select-panel");
const icone = document.querySelector(".fa-chevron-down");

let result;
firstButton.addEventListener("click", function () {
  result = panel.classList.toggle("flex");
  if (result) {
    firstButton.setAttribute("aria-expanded", "true");
    icone.classList.add("rotate");
  } else {
    firstButton.setAttribute("aria-expanded", "false");
    icone.classList.remove("rotate");
  }
});

const sortButtons = document.querySelectorAll(".sortby-select__option");
function updateSortButtons(selectedOption) {
  sortButtons.forEach((button) => {
    const option = button.getAttribute("data-id");
    if (option === selectedOption) {
      button.setAttribute("aria-selected", "true");
      button.classList.add("selected");
    } else {
      button.setAttribute("aria-selected", "false");
      button.classList.remove("selected");
    }
  });
}

sortButtons.forEach((button) => {
  button.addEventListener("click", async function () {
    const option = button.getAttribute("data-id");
    const sortedMedia = await filterMedia(option);
    renderMedia(sortedMedia, option);
    updateSortButtons(option);

    // Swap label and data-id for the first button
    const firstButtonLabel = firstButton.textContent;
    const firstButtonDataId = firstButton.getAttribute("data-id");

    // Update the first button with the icon
    firstButton.innerHTML = `${button.textContent} <i class="fas fa-chevron-down rotate"></i>`;
    firstButton.setAttribute("data-id", option);

    // Update the clicked button with the icon
    button.innerHTML = `${firstButtonLabel}`;
    button.setAttribute("data-id", firstButtonDataId);
  });
});

async function renderMedia(media) {
  const photographerId = await getPhotographerIdFromUrl();
  const { photographer } = await getPhotographerDetails(photographerId);
  // Assuming you have a container for your media elements with the class "media-container"
  const mediaContainer = document.querySelector(".photograph-flex");

  // Clear existing media elements
  mediaContainer.innerHTML = "";

  // Iterate through the sorted media and append them to the container
  media.forEach((mediaItem) => {
    const mediaDOM = mediaTemplate(mediaItem, photographer.name);
    mediaContainer.appendChild(mediaDOM.getMediaDOM());
  });
}

export { sortOptions, filterMedia };
