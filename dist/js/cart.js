function openCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  let cartBody = document.querySelector(".modal-body");
  var child = cartBody.lastElementChild;
  while (child) {
    cartBody.removeChild(child);
    child = cartBody.lastElementChild;
  }
  setHeaderDetails(cartItems);
  setBodyDetails(cartItems);
  setFooterDetails(cartItems);
}

function setHeaderDetails(cartItems) {
  if (cartItems) {
    document.querySelector(".cart-header-section .cart-heading").innerHTML =
      "My Cart " + "(" + cartItems.length + " items)";
  } else {
    document.querySelector(".cart-header-section .cart-heading").innerHTML =
      "My Cart ";
  }
}

function setBodyDetails(cartItems) {
  if (cartItems) {
    let cartBody = document.querySelector(".modal-body");
    let cartItemContainer = document.createElement("div");
    let cartItemImage = document.createElement("img");
    let cartItemInfoContainer = document.createElement("div");
    let cartItemName = document.createElement("h3");
    let priceDetailsContainer = document.createElement("div");
    let reduceCount = document.createElement("span");
    let cartItemCount = document.createElement("span");
    let increaseCount = document.createElement("span");
    let cartItemPrice = document.createElement("span");
    let itemTotalPrice = document.createElement("span");

    // setting class attribute
    cartItemContainer.setAttribute("class", "cart-item-container");
    cartItemImage.setAttribute("class", "cart-item-image");
    cartItemInfoContainer.setAttribute("class", "cart-item-info");
    cartItemName.setAttribute("class", "cart-item-name");
    priceDetailsContainer.setAttribute("class", "price-details-container");
    reduceCount.setAttribute("class", "reduce-count");
    cartItemCount.setAttribute("class", "cart-item-count");
    increaseCount.setAttribute("class", "increase-count");
    cartItemPrice.setAttribute("class", "cart-item-price");
    itemTotalPrice.setAttribute("class", "item-total-price");

    // appending items
    cartItemContainer.appendChild(cartItemImage);
    cartItemContainer.appendChild(cartItemInfoContainer);
    cartItemInfoContainer.appendChild(cartItemName);
    cartItemInfoContainer.appendChild(priceDetailsContainer);
    priceDetailsContainer.appendChild(reduceCount);
    priceDetailsContainer.appendChild(cartItemCount);
    priceDetailsContainer.appendChild(increaseCount);
    priceDetailsContainer.appendChild(cartItemPrice);
    priceDetailsContainer.appendChild(itemTotalPrice);

    cartItems.forEach((eachItemDetail) => {
      cartItemImage.setAttribute("src", eachItemDetail.imageUrl);
      cartItemName.innerHTML = eachItemDetail.name;
      reduceCount.innerHTML = "-";
      cartItemCount.innerHTML = eachItemDetail.noOfUnits;
      increaseCount.innerHTML = "+";
      cartItemPrice.innerHTML = "x  Rs." + eachItemDetail.price;
      itemTotalPrice.innerHTML =
        "Rs." + eachItemDetail.price * eachItemDetail.noOfUnits;

      cartBody.appendChild(cartItemContainer.cloneNode(true));
    });
  } else {
    let cartBody = document.querySelector(".modal-body");
    let cartItemContainer = document.createElement("div");
    cartItemContainer.innerHTML =
      "No items in your cart, your favorite item is just a click away.";
    cartBody.appendChild(cartItemContainer);
  }
}

function setFooterDetails(cartItems) {
  if (cartItems) {
    let cartItemContainer = document.querySelector(".cart-total-value");
    let totalValue = 0;
    cartItems.forEach((eachItemDetail) => {
      totalValue = totalValue + eachItemDetail.price * eachItemDetail.noOfUnits;
    });
    cartItemContainer.innerHTML = "Rs." + totalValue + ">";
  } else {
    document.querySelector(".model-footer h4").innerHTML = "";
    document.querySelector(".model-footer .checkout-button").innerHTML =
      "Start Shopping";
  }
}

(function () {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  document.querySelector(".cart-button .cart-items-count").innerHTML = cartItems
    ? cartItems.length + " items"
    : "0 items";
})();
