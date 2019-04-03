
function getLocalStorageCartPage() {
  let cartListElement = document.getElementById('cart-list');
  let productList = localStorage.getItem('productList');
  products = JSON.parse(productList);
  if (!products) {
    products = []
    document.getElementById('no-item').innerHTML = `Bạn chưa có sản phẩm nào!`;
  }

  if (cartListElement) {
    products.map(product => {
      let { image, name, price, quantity } = product;
      cartListElement.innerHTML += generateHTMLCartPage(image, name, price, quantity);
    });
  }
}

function generateHTMLCartPage(image, name, price, quantity) {
  return `<tr>
          <td><a href="#"><img class="table-cart__img" src="${image}" alt=""></a></td>
          <td>${name}</td>
          <td class="table-cart__price">${price}<sup class="text-lowercase">đ</sup></td>
          <td>${quantity}</td>
          <td class="table-cart__price">${price * quantity}<sup class="text-lowercase">đ</sup></td>
          <td><a class="btn btn-link" href="#"><i class="far fa-trash-alt"></i></a></td>
        </tr>`
}

getLocalStorageCartPage();
