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

export { sortOptions, filterMedia };
