import { getTotalLikes, addObserver } from "./totalLikes.mjs";

export function LikesAndPrice(media, photographer) {
  const main = document.getElementById("main");

  // Create an element to display the photographer's price and total likes
  const photographPriceAndlikes = document.createElement("p");
  photographPriceAndlikes.classList.add("information");
  main.appendChild(photographPriceAndlikes);

  // Update the likes and price when totalLikes changes
  const updateLikesAndPrice = (newTotalLikes) => {
    const photographerPrice = photographer.price;

    // Update the content of the element
    photographPriceAndlikes.innerHTML = `<span> ${newTotalLikes} <i class="fas fa-heart" aria-label="likes"></i></span> <span> ${photographerPrice}€ / day </span>`;
  };

  // Initial update
  updateLikesAndPrice(getTotalLikes(media));

  // Add observer to be notified of changes in totalLikes
  addObserver(updateLikesAndPrice);
}
