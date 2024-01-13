const orders = JSON.parse(localStorage.getItem("history")) || [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const orderDate = JSON.parse(localStorage.getItem("orderdate")) || [];
const name = JSON.parse(localStorage.getItem("name")) || [];
const user = JSON.parse(localStorage.getItem("user")) || [];

console.log(orderDate);
const itemsinCArt = document.getElementById("cartItems");
const itemsinWishlist = document.getElementById("wishlist");
console.log(cart);
console.log(orders);
const ordersPlaced = document.getElementById("orders");
ordersPlaced.textContent = orders.length;
itemsinCArt.textContent = cart.length;
itemsinWishlist.textContent = wishlist.length;

// recent orders
const container = document.getElementById("container");
console.log(container);
orders.map((order) => {
  let { title, id } = order.product;
  container.innerHTML += `
  <div class="order my-3 bg-light">
  <div class="row">
    <div class="col-lg-4">
      <div
        class="d-flex flex-column justify-content-between order-summary"
      >
        <div class="d-flex align-items-center">
          <div class="text-uppercase">Order #fur10001</div>
          <div class="blue-label ms-auto text-uppercase">paid</div>
        </div>
        <div class="fs-8">${title}</div>
        <div class="fs-8">${orderDate}</div>
        <div class="rating d-flex align-items-center pt-1">
          <img
            src="https://www.freepnglogos.com/uploads/like-png/like-png-hand-thumb-sign-vector-graphic-pixabay-39.png"
            alt=""
          /><span class="px-2">Rating:</span>
          <span class="fas fa-star"></span>
          <span class="fas fa-star"></span>
          <span class="fas fa-star"></span>
          <span class="fas fa-star"></span>
          <span class="far fa-star"></span>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div
        class="d-sm-flex align-items-sm-start justify-content-sm-between"
      >
        <div class="status">Status : Delivered</div>
        <div class="btn btn-primary text-uppercase">order info</div>
      </div>
      <div class="progressbar-track">
        <ul class="progressbar">
          <li id="step-1" class="text-muted green">
            <span class="fas fa-gift"></span>
          </li>
          <li id="step-2" class="text-muted green">
            <span class="fas fa-check"></span>
          </li>
          <li id="step-3" class="text-muted green">
            <span class="fas fa-box"></span>
          </li>
          <li id="step-4" class="text-muted green">
            <span class="fas fa-truck"></span>
          </li>
          <li id="step-5" class="text-muted green">
            <span class="fas fa-box-open"></span>
          </li>
        </ul>
        <div id="tracker"></div>
      </div>
    </div>
  </div>
</div>

    `;
});

const userName = document.getElementById("name");
const loggIN = document.getElementById("account");
userName.textContent = `Hello ${name}`;
loggIN.textContent = `you are logged in as ${user[0].userEmail}`;
