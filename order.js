let order = JSON.parse(localStorage.getItem("order")) || [];
const orderDate = document.getElementById("date");
const orderNumber = document.getElementById("order-number");
const shippingAddress = document.getElementById("address");
// date
const date = `${order.year}-${order.month < 10 ? "0" : ""}${order.month}-${
  order.day < 10 ? "0" : ""
}${order.day}`;
orderDate.textContent = date;
let product = JSON.parse(localStorage.getItem("checkout")) || [];
const image = document.getElementById("image-det");
product.forEach((x) => {
  image.innerHTML += `
<div class="d-flex flex-row product-name-image pb-2">
<img
  class="rounded"
  src="${x.product.images[0]}"
  width="80"
/>
<div class="d-flex flex-column justify-content-between ml-2">
  <div>
    <span class="d-block font-weight-bold p-name" id="title"
      >${x.product.title}</span
    ><span class="fs-12" id="brand">${x.product.brand}</span>
  </div>
  <span class="fs-12" id="quantity">Qty: ${x.item}pcs</span>
</div>
</div>
<div class="product-price">
<h5 id="price">$${x.product.price * x.item}</h5>

`;
});
// total

const sum = product
  .map((x) => x.product.price * x.item)
  .reduce((x, y) => x + y, 0);
// form detail
const firstName = document.getElementById("fn");
firstName.textContent = `hello ${order.firstname}`;
const subTotal = document.getElementById("Subtotal");
const shippingCost = document.getElementById("shipping");
const total = document.getElementById("total");
const delivery = document.getElementById("exp");
subTotal.textContent = `$${sum}`;
total.textContent = `$${sum + 14}`;
delivery.textContent = `${order.year}-${order.month < 10 ? "0" : ""}${
  order.month
}-${order.day < 10 ? "0" : ""}${order.day}`;
const address = document.getElementById("address");
address.textContent = `${order.address}`;
const backBtn = document.getElementById("back");
const checkoutItems = JSON.parse(localStorage.getItem("checkout"));
const checkoutItemsIds = checkoutItems.map((prod) => prod.product.id);
// back to shop button
backBtn.addEventListener("click", () => {
  window.location.href = " shop.html";

  localStorage.setItem("name", JSON.stringify(order.firstname));
  localStorage.setItem("orderdate", JSON.stringify(date));
  localStorage.setItem("history", JSON.stringify(product));
  localStorage.removeItem("checkout");
  localStorage.removeItem("order");
  localStorage.removeItem("checkboxState");
  const cart = JSON.parse(localStorage.getItem("cart"));
  const removedItems = cart.filter(
    (item) => !checkoutItemsIds.includes(item.id)
  );
  localStorage.setItem("cart", JSON.stringify(removedItems));
});
