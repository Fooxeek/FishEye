import {
  getPhotographerIdFromUrl,
  getPhotographerDetails,
} from "../pages/photographer.mjs";

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
  console.log(media);
  return media.sort(sortOptions[option]);
}

// Sélectionnez le sélecteur par son ID
var mediaSelect = document.getElementById("media-select");

// Par défaut, l'option "Popularité" est retirée
var defaultSelectedValue = "popularity";
mediaSelect.value = defaultSelectedValue;

// Masquez l'option "Popularité" par défaut
var popularityOption = document.querySelector(
  ".media-option[value='popularity']"
);
popularityOption.style.display = "none";

// Écoutez les changements d'options
mediaSelect.addEventListener("change", function () {
  // Récupérez la valeur sélectionnée
  var selectedValue = mediaSelect.value;

  // Parcourez toutes les options et retirez l'option sélectionnée
  var options = document.querySelectorAll(".media-option");
  options.forEach(function (option) {
    if (option.value === selectedValue) {
      option.style.display = "none"; // Retirez l'option sélectionnée en la masquant
    } else {
      option.style.display = "block"; // Affichez les autres options
    }
  });
});

export { sortOptions, filterMedia };
