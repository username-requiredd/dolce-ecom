const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name").value;
const phone = document.getElementById("phone").value;
const email = document.getElementById("email").value;
// const shipping = document.getElementById("ship").value;
// const address = document.getElementById("address").value;
const city = document.getElementById("select");
const house = document.getElementById("house").value;
const postal = document.getElementById("postal").value;
const zip = document.getElementById("zip").value;
const message = document.getElementById("textarea").value;
const cartitems = document.getElementById("cart-items");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let product = JSON.parse(localStorage.getItem("checkout")) || [];
let price = document.getElementById("price");
let total = document.getElementById("grand-total");
const checkkoutIds = product.map((prod) => prod.product.id);
console.log(checkkoutIds);
const sum = product
  .map((x) => x.product.price * x.item)
  .reduce((x, y) => x + y, 0);
// items in cart
const itemsInCart = cart.filter((item) => !checkkoutIds.includes(item.id));
console.log(itemsInCart);
price.textContent = "$" + sum;
total.textContent = "$" + (sum + 14);
itemsInCart.map((item) => {
  let { images, title, price, id, brand } = item.data;
  cartitems.innerHTML += `
    <div class="d-flex align-items-center mb-4" id=${id}>
    <div class="me-3 position-relative">
      <span
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary"
      >
        ${item.item}
      </span>
      <img
        src="${images[0]}"
        style="height: 96px; width: 96x"
        class="img-sm rounded border"
      />
    </div>
    <div class="">
      <a href="#" class="nav-link">
        ${title} <br />
        ${brand} 
      </a>
      <div class="price text-muted">Total: $${price}</div>
    </div>
  </div>

    `;
});

const Submit = document.getElementById("submit");
const cardName = document.getElementById("name");
const expirationDate = document.getElementById("expire");
const cvv = document.getElementById("cvv");
const order = document.getElementById("order");

Submit.addEventListener("click", () => {
  if (
    cardName.value === "" ||
    expirationDate.value === "" ||
    cvv.value === ""
  ) {
    console.log("empty");
  } else {
    Submit.setAttribute("data-dismiss", "modal");
    Submit.setAttribute("data-toggle", "modal");
    Submit.setAttribute("data-target", "#orderSuccessModal");

    setTimeout(() => {
      $("#orderSuccessModal").removeClass("show");
      $(".modal-backdrop").remove();
      $("body").removeClass("modal-open");
      const today = new Date();
      const orderSummary = {
        name: product.title,
        firstname: firstName.value,
        address: city.value,
        // price: product.data.price,
        // image: product.data.images[0],
        qunatity: 1,
        // total: product.data.price + 14,
        // brand: product.data.brand,
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      };
      console.log(orderSummary);
      localStorage.setItem("order", JSON.stringify(orderSummary));
      window.location.href = "order.html";
    }, 3000);
  }
});
