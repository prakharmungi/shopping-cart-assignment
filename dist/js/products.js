(() => {
  getCategoriesData();
  getProductsData();
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
      createCategoriesList(data);
    })
    .catch((error) => console.log(error));
}

function createCategoriesList(categoriesData) {
  const enabledCategoriesData = categoriesData.filter((eachCategoryInfo) => {
    return eachCategoryInfo.enabled;
  });
  enabledCategoriesData.sort((a, b) => {
    return a.order - b.order;
  });
  let categoriesListParent = document.querySelector("#plp-a .container ul");
  let categoryListItem = document.createElement("li");

  enabledCategoriesData.forEach((eachCategoryInfo, index) => {
    categoryListItem.innerHTML = eachCategoryInfo.name;
    categoriesListParent.appendChild(categoryListItem.cloneNode(true));
  });
  enabledCategoriesData.forEach((eachCategoryInfo, index) => {
    categoriesListParent.childNodes[index].addEventListener("click", () => {
      filterProducts(eachCategoryInfo.id);
    });
  });
}

function getProductsData() {
  fetch("http://localhost:5000/products")
    .then((response) => {
      // indicates whether the response is successful (status code 200-299) or not
      if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`);
      }
      return response.json();
    })
    .then((data) => {
      productsData = data;
      createProductsList();
    })
    .catch((error) => console.log(error));
}
let productsData = [];
function createProductsList(id) {
  let selectedCategoryData = productsData;
  if (id) {
    let e = document.querySelector(".items");
    var child = e.lastElementChild;
    while (e.children.length > 1) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
    selectedCategoryData = selectedCategoryData.filter((eachCategoryData) => {
      return eachCategoryData.category === id;
    });
  }

  let productsListParent = document.querySelector("#plp-a .container .items");
  let productContainer = document.querySelector(
    "#plp-a .container .items .item"
  );
  let productName = document.querySelector(
    "#plp-a .container .items .item .item-name"
  );
  let productImage = document.querySelector(
    "#plp-a .container .items .item .item-image"
  );
  let productDescription = document.querySelector(
    "#plp-a .container .items .item-description"
  );
  let productPrice = document.querySelector(
    "#plp-a .container .items .item-price"
  );
  selectedCategoryData.forEach((eachProductInfo, index) => {
    productName.innerHTML = eachProductInfo.name;
    productImage.setAttribute("src", eachProductInfo.imageURL);
    productDescription.innerHTML = eachProductInfo.description;
    productPrice.innerHTML = "MRP Rs." + eachProductInfo.price;
    productsListParent.appendChild(productContainer.cloneNode(true));
  });
  document.querySelector(".items").children[0].remove();
  selectedCategoryData.forEach((eachProductInfo, index) => {
    // if (index > 1) {
    productsListParent.children[index]
      .querySelector(".item-buy-btn")
      .addEventListener("click", () => {
        addToCart(eachProductInfo);
      });
    // }
  });
}

function filterProducts(id) {
  createProductsList(id);
}

function addToCart(productToAdd) {
  console.log("productToAdd", productToAdd);
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    let cartItem = JSON.parse(cartItems).find((eachItem) => {
      return eachItem.id === productToAdd.id;
    });
    if (cartItem) {
      cartItems = JSON.parse(cartItems).map((eachItem) => {
        if (eachItem.id === productToAdd.id) {
          eachItem.noOfUnits += 1;
        }
        return eachItem;
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      let newcartItems = JSON.parse(cartItems);
      newcartItems.push({
        name: productToAdd.name,
        id: productToAdd.id,
        price: productToAdd.price,
        imageUrl: productToAdd.imageURL,
        noOfUnits: 1,
      });
      localStorage.setItem("cartItems", JSON.stringify(newcartItems));
    }
  } else {
    let cartItems = [];
    cartItems.push({
      name: productToAdd.name,
      id: productToAdd.id,
      price: productToAdd.price,
      imageUrl: productToAdd.imageURL,
      noOfUnits: 1,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  const cartItemsToShow = JSON.parse(localStorage.getItem("cartItems"));
  document.querySelector(".cart-button .cart-items-count").innerHTML =
    cartItemsToShow ? cartItemsToShow.length + "items" : "0 items";
}
