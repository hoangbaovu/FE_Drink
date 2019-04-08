
if (document.readyState == 'complete') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  setTimeout(function () {
    ready();
    console.log('done');
  }, 1000);
}

function ready() {
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  const addToCartButtonsLength = addToCartButtons.length;
  for (let i = 0; i < addToCartButtonsLength; i++) {
    button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }

  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
  const quantityInputsLength = quantityInputs.length;
  for (let i = 0; i < quantityInputsLength; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  const removeCartItemButton = document.getElementsByClassName('btn-remove-item');
  const removeCartItemButtonLength = removeCartItemButton.length;
  for (let i = 0; i < removeCartItemButtonLength; i++) {
    button = removeCartItemButton[i];
    button.addEventListener('click', removeCartItem);
  }
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  if (input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('dropdown-cart')[0];
  let cartItems = cartItemContainer.getElementsByClassName('item');
  let total = 0;
  for (item of cartItems) {
    const priceElement = item.getElementsByClassName('item__price')[0];
    const quantityElement = item.getElementsByClassName('cart-quantity-input')[0];
    const price = parseFloat(priceElement.innerText.replace('đ', ''));
    const quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  document.getElementsByClassName('cart-total-price')[0].innerText = `Tổng tiền: ${total}đ`;
}

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const productName = shopItem.getElementsByClassName('products-item__info__name')[0].innerText;
  const productPrice = shopItem.getElementsByClassName('price__new')[0].innerText;
  const productImage = shopItem.getElementsByClassName('products-item__image')[0].src;
  addItemToCart(productName, productPrice, productImage);
  updateCartTotal();
}

function addItemToCart(productName, productPrice, productImage) {
  const cartRow = document.createElement('li');
  const cartItem = document.getElementsByClassName('dropdown-cart')[0];
  const cartItemNames = cartItem.getElementsByClassName('item__name')
  for (let item of cartItemNames) {
    if (item.innerText == productName) {
      alert('Sản phẩm đã được thêm vào giỏ hàng');
      return
    }
  }
  const cartRowContents = `<div class="item">
                            <div class="item-left">
                              <img class="item__img" src="${productImage}" alt="" />
                              <div class="item-info">
                                <span class="item__name">${productName}</span>
                                <span class="item__price">${productPrice}</span>
                              </div>
                            </div>
                            <div class="item-right ml-auto">
                              <div class="item__quantity">
                                <input class="cart-quantity-input" type="number" value="1">
                              </div>
                              <button class="btn btn-xs btn-danger btn-remove-item">x</button>
                            </div>
                          </div>`
  cartRow.innerHTML = cartRowContents;
  cartItem.appendChild(cartRow);
  cartRow.getElementsByClassName('btn-remove-item')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  productQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;

  setLocalStorage(productImage, productName, productPrice, productQuantity);
}

function setLocalStorage(image, name, price, quantity) {
  const oldLocalCart = JSON.parse(localStorage.getItem('productList')) || [];
  const newLocalCart = {
    image,
    name,
    price: parseFloat(price.replace('đ', '')),
    quantity: parseInt(quantity)
  }
  oldLocalCart.push(newLocalCart);
  localStorage.setItem('productList', JSON.stringify(oldLocalCart));
}

function getLocalStorage() {
  const productList = localStorage.getItem('productList');
  products = JSON.parse(productList);
  if (!products) {
    products = []
  }

  products.map(product => {
    const { image, name, price, quantity } = product;
    generateHTMLCart(image, name, price, quantity);
  });
  updateCartTotal();
}

function generateHTMLCart(image, name, price, quantity) {
  const cartRow = document.createElement('li');
  const cartItem = document.getElementsByClassName('dropdown-cart')[0];
  const cartRowContents = `<div class="item">
                            <div class="item-left">
                              <img class="item__img" src="${image}" alt="" />
                              <div class="item-info">
                                <span class="item__name">${name}</span>
                                <span class="item__price">${price}đ</span>
                              </div>
                            </div>
                            <div class="item-right ml-auto">
                              <div class="item__quantity">
                                <input class="cart-quantity-input" type="number" value="${quantity}">
                              </div>
                              <button class="btn btn-xs btn-danger btn-remove-item">x</button>
                            </div>
                          </div>`
  cartRow.innerHTML = cartRowContents;
  cartItem.append(cartRow);
}
getLocalStorage();
