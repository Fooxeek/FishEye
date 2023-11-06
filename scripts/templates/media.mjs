import { openLightbox } from "../utils/lightbox.mjs";

export default function mediaTemplate(data, photographerName) {
  const { id, name, photographerId, title, image, video, likes, date, price } =
    data;
  const imagePath = `../../assets/images/${photographerName.replace(
    /\s+/g,
    "_"
  )}/${image}`;
  const videoPath = `../../assets/images/${photographerName.replace(
    /\s+/g,
    "_"
  )}/${video}`;

  function getMediaDOM() {
    const flex = document.createElement("div");
    flex.classList.add("media");

    if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", imagePath);
      img.setAttribute("alt", "Media");
      img.addEventListener("click", () => {
        openLightbox(imagePath);
      });
      flex.appendChild(img);
    } else if (video) {
      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", videoPath);
      videoElement.setAttribute("controls", true);
      videoElement.addEventListener("click", () => {
        openLightbox(videoPath);
      });
      flex.appendChild(videoElement);
    }

    const informationElement = document.createElement("div");
    informationElement.classList.add("media-information");

    const titleElement = document.createElement("p");
    titleElement.textContent = title;
    informationElement.appendChild(titleElement);

    const likesElement = document.createElement("p");
    likesElement.innerHTML = `${likes} <i class="fas fa-heart"></i>`;
    informationElement.appendChild(likesElement);

    // Ajoutez informationElement à flex
    flex.appendChild(informationElement);

    return flex;
  }

  return {
    getMediaDOM,
  };
}