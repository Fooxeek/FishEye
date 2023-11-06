export function photographerTemplate(data) {
  const { id, name, tagline, city, portrait, country, price } = data;
  const picture = `../../assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer-card");

    const divWrapper = document.createElement("div");
    divWrapper.classList.add("photographer-wrapper");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("photographer-img");

    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("photographer-name");

    const pLocation = document.createElement("p");
    pLocation.textContent = `${city}, ${country}`;
    pLocation.classList.add("photographer-location");

    const pTagline = document.createElement("p");
    pTagline.textContent = tagline;
    pTagline.classList.add("photographer-tagline");

    const pPrice = document.createElement("p");
    pPrice.textContent = `Price: ${price} USD`;
    pPrice.classList.add("photographer-price");

    divWrapper.appendChild(img);
    divWrapper.appendChild(h2);

    article.appendChild(divWrapper);
    article.appendChild(pLocation);
    article.appendChild(pTagline);
    article.appendChild(pPrice);

    divWrapper.addEventListener("click", function () {
      // Redirigez l'utilisateur vers la page du photographe en utilisant son ID
      window.location.href = `photographer.html?id=${id}`;
    });

    return article;
  }

  return { id, name, tagline, city, country, picture, getUserCardDOM };
}
