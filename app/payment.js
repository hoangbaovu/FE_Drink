let btnPurchaseElement = document.getElementsByClassName('btn-purchase')[0];

if (btnPurchaseElement) {
  btnPurchaseElement.addEventListener('click', handlePurchase);
}

function handlePurchase() {
  alert('Mua hàng thành công');
  localStorage.removeItem('productList');
}
