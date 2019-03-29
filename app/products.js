import axios from 'axios';

const url = 'http://localhost:3000/products';
const result = document.getElementById('product-list');

async function getProduct(url) {
  return await axios.get(url);
}

function render() {
  getProduct(url).then(res => {
    const product = res.data;
    for (let i in product) {
      result.innerHTML += generateHTML(product[i]);
    }
  });
}

function generateHTML(item) {
  return `<div class="col-md-4">
            <div class="products-item">
              <a class="products-item__img" href="#">
                <span></span>
                <img src="${item.image}" />
              </a>
              <div class="products-item__view">
                <a href="#"><i class="fas fa-heart"></i>Yêu thích</a><a href="#"><i class="fas fa-signal"></i>So sánh</a><a
                  href="#"><i class="fas fa-compress"></i></a>
              </div>
              <div class="products-item__info">
                <h5 class="products-item__info__name"><a href="#">${item.name}</a></h5>
                <p class="price">
                  <span class="price__new">${item.price}<sup>đ</sup></span>
                  <span class="price__old">${item.price_old}<sup>đ</sup></span>
                </p>
                <a class="btn btn-primary btn-wine" href="#">Add to card</a>
              </div>
            </div>
          </div>`
}

render();
