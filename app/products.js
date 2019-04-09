import axios from 'axios';

const url = 'http://localhost:3000/products';
const productListElement = document.getElementById('product-list');

async function getProduct(url) {
  const result = await axios.get(url);
  return result;
}

getProduct(url)
  .then(res => {
    const products = res.data;
    if (productListElement) {
      products.map(product => productListElement.innerHTML += generateHTML(product));
    }
  })
  .catch(e => {
    console.log(e);
  });

function generateHTML(product) {
  return `<div class="col-md-4">
            <div class="products-item">
              <a class="products-item__img" href="#">
                <span></span>
                <img class="products-item__image" src="${product.image}" />
              </a>
              <div class="products-item__view">
                <a href="#"><i class="fas fa-heart"></i>Yêu thích</a><a href="#"><i class="fas fa-signal"></i>So sánh</a><a
                  href="#"><i class="fas fa-compress"></i></a>
              </div>
              <div class="products-item__info">
                <h5 class="products-item__info__name"><a href="#">${product.name}</a></h5>
                <p class="price">
                  <span class="price__new">${product.price}<sup>đ</sup></span>
                  <span class="price__old">${product.price_old}<sup>đ</sup></span>
                </p>
                <button type="button" class="btn btn-primary btn-wine add-to-cart">Add to card</button>
              </div>
            </div>
          </div>`
}
