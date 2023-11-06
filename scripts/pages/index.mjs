import { photographerTemplate } from "../templates/photographer.mjs";

async function getPhotographers() {
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

async function displayData(photographers) {
  const photographersSection = document.getElementById("photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
