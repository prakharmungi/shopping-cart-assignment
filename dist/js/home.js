(() => {
  getCategoriesData();
  getBannersData();
})();

function getCategoriesData() {
  fetch("http://localhost:5000/categories")
    .then((response) => {
      // indicates whether the response is successful (status code 200-299) or not
      if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      createCategoriesDom(data);
    })
    .catch((error) => console.log(error));
}
function getBannersData() {
  fetch("http://localhost:5000/banners")
    .then((response) => {
      // indicates whether the response is successful (status code 200-299) or not
      if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      createBannersDom(data);
    })
    .catch((error) => console.log(error));
}
function createCategoriesDom(categoriesData) {
  const enabledCategoriesData = categoriesData.filter((eachCategoryInfo) => {
    return eachCategoryInfo.enabled;
  });
  enabledCategoriesData.sort((a, b) => {
    return a.order - b.order;
  });
  let categoriesInfoParent = document.querySelector("#home-b .container");
  let categoryInfoContainer = document.createElement("div");
  let image = document.createElement("img");
  let textInfoContainer = document.createElement("div");
  let categoryName = document.createElement("h4");
  let categoryDescription = document.createElement("p");
  let exploreButton = document.createElement("button");

  exploreButton.setAttribute("class", "explore-button");

  categoryInfoContainer.setAttribute("class", "category-info");
  image.setAttribute("class", "bio-image");
  textInfoContainer.setAttribute("class", "bio");

  enabledCategoriesData.forEach((eachCategoryInfo, index) => {
    image.setAttribute("src", eachCategoryInfo.imageUrl);
    categoryName.innerHTML = eachCategoryInfo.name;
    categoryDescription.innerHTML = eachCategoryInfo.description;
    exploreButton.innerHTML = "Explore " + eachCategoryInfo.key;
    if (index % 2 === 0) {
      categoryInfoContainer.style.gridTemplateColumns = "1fr 2fr";

      categoryInfoContainer.appendChild(image);
      categoryInfoContainer.appendChild(textInfoContainer);
      textInfoContainer.appendChild(categoryName);
      textInfoContainer.appendChild(categoryDescription);
      textInfoContainer.appendChild(exploreButton);
    } else {
      categoryInfoContainer.style.gridTemplateColumns = "2fr 1fr";
      categoryInfoContainer.appendChild(textInfoContainer);
      textInfoContainer.appendChild(categoryName);
      textInfoContainer.appendChild(categoryDescription);
      textInfoContainer.appendChild(exploreButton);
      categoryInfoContainer.appendChild(image);
    }
    exploreButton.setAttribute(
      "onclick",
      "window.location = './products.html'"
    );
    categoriesInfoParent.appendChild(categoryInfoContainer.cloneNode(true));
  });
}

function createBannersDom(bannersData) {
  const activeBannersData = bannersData.filter((eachCategoryInfo) => {
    return eachCategoryInfo.isActive;
  });
  activeBannersData.sort((a, b) => {
    return a.order - b.order;
  });
  let offerImagesParent = document.querySelector("#home-a .container ul");
  let eachImageParent = document.createElement("li");
  let offerImage = document.createElement("img");
  eachImageParent.appendChild(offerImage);
  activeBannersData.forEach((eachBannerInfo) => {
    offerImage.setAttribute("src", eachBannerInfo.bannerImageUrl);
    offerImage.setAttribute("alt", eachBannerInfo.bannerImageAlt);
    offerImagesParent.appendChild(eachImageParent.cloneNode(true));
  });
}

let index = 0;
function show(increase) {
  let liEls = document.querySelectorAll("#home-a .container ul li");
  index = index + increase;
  index = Math.min(Math.max(index, 0), liEls.length - 1);
  liEls[index].scrollIntoView({ behavior: "smooth" });
}
