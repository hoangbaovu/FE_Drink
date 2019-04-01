$('document').ready(function () {
  let addToCartButtons = document.getElementsByClassName('add-to-cart');
  for (let i = 0; i < addToCartButtons.length; i++) {
    button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }

  let quantityInputs = document.getElementsByClassName('cart-quantity-input');
  console.log(quantityInputs.length)
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
});

function ready() {
  let removeCartItemButton = document.getElementsByClassName('btn-remove-item');
  console.log(removeCartItemButton)
  for (let i = 0; i < removeCartItemButton.length; i++) {
    button = removeCartItemButton[i];
    button.addEventListener('click', removeCartItem);
  }
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('dropdown-cart')[0];
  let cartItems = cartItemContainer.getElementsByClassName('item');
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let cartItem = cartItems[i];
    let priceElement = cartItem.getElementsByClassName('item__price')[0];
    let quantityElement = cartItem.getElementsByClassName('cart-quantity-input')[0];
    let price = parseFloat(priceElement.innerText.replace('đ', ''));
    let quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  document.getElementsByClassName('cart-total-price')[0].innerText = `Tổng tiền: ${total}đ`;
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let productName = shopItem.getElementsByClassName('products-item__info__name')[0].innerText;
  let productPrice = shopItem.getElementsByClassName('price__new')[0].innerText;
  let productImage = shopItem.getElementsByClassName('products-item__image')[0].src;
  addItemToCart(productName, productPrice, productImage);
  updateCartTotal();
}

function addItemToCart(productName, productPrice, productImage) {
  let cartRow = document.createElement('li');
  let cartItem = document.getElementsByClassName('dropdown-cart')[0];
  let cartItemNames = cartItem.getElementsByClassName('item__name')
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == productName) {
      alert('Sản phẩm đã được thêm vào giỏ hàng');
      return
    }
  }
  let cartRowContents = `<div class="item">
                          <div class="item-left">
                            <img src="${productImage}" alt="" />
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
  cartItem.append(cartRow);
  cartRow.getElementsByClassName('btn-remove-item')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

ready();
