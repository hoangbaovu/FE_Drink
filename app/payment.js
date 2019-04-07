document.getElementsByClassName('btn-purchase')[0].addEventListener('click', handlePurchase);

function handlePurchase() {
  alert('Mua hàng thành công');
  localStorage.removeItem('productList');
}

console.log('payment')
