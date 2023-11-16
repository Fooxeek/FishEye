import { openLightbox } from "../utils/lightbox.mjs";
import { updateTotalLikes } from "../utils/totalLikes.mjs";

export default function mediaTemplate(data, photographerName) {
  const { title, image, video } = data;
  let { likes } = data;

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
    likesElement.classList.add("likes");
    likesElement.innerHTML = `${likes} <i class="fas fa-heart"></i>`;
    likesElement.addEventListener("click", () => {
      // Incrémente le nombre de likes lorsque le cœur est cliqué
      likes++;
      likesElement.innerHTML = `${likes} <i class="fas fa-heart"></i>`;
      updateTotalLikes(1);
    });

    informationElement.appendChild(likesElement);

    // Ajoutez informationElement à flex
    flex.appendChild(informationElement);

    return flex;
  }

  return {
    getMediaDOM,
  };
}
