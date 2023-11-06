import mediaTemplate from "../templates/media.mjs";
import { filterMedia } from "../utils/selectmenu.mjs";

export async function getPhotographers() {
  try {
    const response = await fetch("../../data/photographers.json");
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données.");
    const photographers = await response.json();
    return photographers;
  } catch (error) {
    console.error("Erreur :", error);
    return { photographers: [] };
  }
}

export async function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("id"));
  return photographerId;
}

export async function getPhotographerDetails(photographerId) {
  try {
    const { photographers, media } = await getPhotographers();
    const photographer = photographers.find((p) => p.id === photographerId);
    if (photographer) {
      const photographerMedia = media.filter(
        (m) => m.photographerId === photographerId
      );
      return { photographer, media: photographerMedia };
    } else {
      console.log("Aucun photographe trouvé avec cet ID.");
      return null;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du photographe :",
      error
    );
    return null;
  }
}

async function loadPhotographerDetails() {
  const photographerId = await getPhotographerIdFromUrl();
  try {
    const { photographer, media } = await getPhotographerDetails(
      photographerId
    );

    // Tri par popularité par défaut
    const sortedMedia = await filterMedia("popularity");

    if (photographer) {
      // Sélectionnez l'élément DOM où vous souhaitez ajouter les détails du photographe
      const photographerDetailsContainer =
        document.getElementById("photograph-header");

      const contactButton =
        document.getElementsByClassName("contact_button")[0];

      // Créez une div pour regrouper les détails du photographe
      const photographerDetailsDiv = document.createElement("div");
      photographerDetailsDiv.classList.add("photograph-details");
      photographerDetailsContainer.insertBefore(
        photographerDetailsDiv,
        contactButton
      );

      // Créez un élément pour afficher le nom du photographe
      const photographerName = document.createElement("h2");
      photographerName.textContent = photographer.name;
      photographerName.classList.add("photograph-name");
      photographerDetailsDiv.appendChild(photographerName);

      // Créez un élément pour afficher l'emplacement du photographe
      const photographerLocation = document.createElement("p");
      photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
      photographerLocation.classList.add("photograph-location");
      photographerDetailsDiv.appendChild(photographerLocation);

      // Créez un élément pour afficher la description du photographe
      const photographerTagline = document.createElement("p");
      photographerTagline.textContent = photographer.tagline;
      photographerTagline.classList.add("photograph-tagline");
      photographerDetailsDiv.appendChild(photographerTagline);

      // ...

      const photographerImg = document.createElement("img");
      photographerImg.setAttribute(
        "src",
        `../assets/photographers/${photographer.portrait}`
      );
      photographerImg.setAttribute("alt", photographer.name);
      photographerImg.classList.add("photograph-img");
      photographerDetailsContainer.appendChild(photographerImg);

      const main = document.getElementById("main");
      const mediaContainer = document.getElementsByClassName("media")[0];

      // Sélectionnez l'élément DOM où vous souhaitez ajouter les médias
      const flexContainer = document.createElement("div");
      flexContainer.classList.add("photograph-flex");
      mediaContainer.appendChild(flexContainer);

      // Parcourez les médias et ajoutez-les à la page HTML en utilisant le modèle mediaTemplate
      sortedMedia.forEach((mediaData) => {
        const mediaDOM = mediaTemplate(mediaData, photographer.name);
        const mediaElement = mediaDOM.getMediaDOM();
        flexContainer.appendChild(mediaElement);
      });

      const mediaSelect = document.getElementById("media-select");

      // Ajoutez un gestionnaire d'événements change à l'élément <select>
      mediaSelect.addEventListener("change", async function () {
        // Obtenez la valeur de l'option sélectionnée
        const selectedOption = mediaSelect.value;

        try {
          // Filtrer les médias en fonction de l'option sélectionnée
          const sortedMedia = await filterMedia(selectedOption);

          // Sélectionnez l'élément DOM où vous avez ajouté les médias précédemment
          const flexContainer = document.querySelector(".photograph-flex");

          // Effacez les médias existants dans le DOM
          flexContainer.innerHTML = "";

          // Parcourez les médias triés et ajoutez-les à la page HTML en utilisant le modèle mediaTemplate
          sortedMedia.forEach((mediaData) => {
            const mediaDOM = mediaTemplate(mediaData, photographer.name);
            const mediaElement = mediaDOM.getMediaDOM();
            flexContainer.appendChild(mediaElement);
          });
        } catch (error) {
          console.error("Erreur lors du tri des médias :", error);
          // Gérez l'erreur selon vos besoins
        }
      });

      // Calculer le total des likes
      const totalLikes = media.reduce((acc, currentMedia) => {
        return acc + currentMedia.likes;
      }, 0);
      // Récupérer le prix du photographe
      const photographerPrice = photographer.price;

      // Créez un élément pour afficher le prix du photographe et le total des likes
      const photographPriceAndlikes = document.createElement("p");
      photographPriceAndlikes.innerHTML = `<span> ${totalLikes} <i class="fas fa-heart" aria-label="likes"></i></span> <span> ${photographerPrice}€ / jour </span>`;
      photographPriceAndlikes.classList.add("information");
      main.appendChild(photographPriceAndlikes);
    } else {
      console.log("Aucun photographe trouvé avec cet ID.");
    }
  } catch (error) {
    console.error(
      "Erreur lors du chargement des détails du photographe :",
      error
    );
    // Gérez l'erreur selon vos besoins
  }
}

loadPhotographerDetails();
