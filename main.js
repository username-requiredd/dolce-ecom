const update = () => {
  const cartCount = document.querySelector("#crt-cnt");
  const item = localStorage.getItem("cart") || 0;
  const savedItem = JSON.parse(item);
  cartCount.innerHTML = savedItem.map((x) => x.item).reduce((x, y) => x + y, 0);
};
update();
