let cart = JSON.parse(localStorage.getItem("cart")) || []; // getting data from cart
const cartContainer = document.getElementById("cart-container");
const tot = document.getElementById("tot");
const ship = document.getElementById("ship");
const summary = document.getElementById("cart-summary");
// function to empty cart
const cartEmpty = () => {
  cartContainer.innerHTML = `
<h4 class='text-center'>Cart is empty</h4>
`;
};
if (cart.length === 0) {
  summary.classList.add("d-none");
  cartEmpty();
  localStorage.removeItem("checkboxState");
} else {
  summary.classList.remove("d-none");
}
// saving selected prod state
function getCheckboxState(id) {
  const checkboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
  return checkboxState[id] === true; // Return the value of the checkbox state
}
function itemsCount() {
  let itemsInCart = document.getElementById("items-cart");
  itemsInCart.innerHTML = cart.length;
}
itemsCount();
// rendering cart items

function generateCart(x) {
  x.forEach((item) => {
    let { images, title, brand, price, id, description } = item.data;
    const checkboxId = `checkbox_${id}`;
    const isChecked = getCheckboxState(checkboxId);
    cartContainer.innerHTML += `
    <div class="table-responsive" id="${id}">
    <table class="table shoping-cart-table">
      <tbody>
        <tr>
          <td width="90">
            <div
              class="cart-product-imitation"
              style="max-width: 80px"
            >
              <img src="${images[0]}" alt="" />
            </div>
          </td>
          <td class="desc">
            <h3>
              <a href="#" class="text-navy">
              ${title}
              </a>
            </h3>
            <p class="small">
            </p>
            <dl class="small m-b-none">
              <dt>Description lists</dt>
              <dd>
              ${description}
              </dd>
            </dl>

            <div class="m-t-sm">
              <a href="#" class="text-muted"
                ><i class="fa fa-gift"></i> Add gift package</a
              >
              |
              <a href="#" class="text-muted remove"
              id="${id}"
                ><i class="fa fa-trash" ></i> Remove item</a
              >
            </div>
          </td>

          <td>
          ${price}
            <s class="small text-muted">$230,00</s>
          </td>
          <td width="65">
            <div class="d-flex quantity-control">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-secondary decrease"
                  type="button"
                  id="${id}"
                >
                  <i class="fas fa-minus decrease " ${id}></i>
                </button>
              </div>
    
              <span
               class="form-control quantity-input text-center">
              ${item.item}
              </span>

              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary increase"
                  type="button"
                  id="${id}"
                >
                  <i class="fas fa-plus increase " ${id}></i>
                </button>
              </div>
            </div>
          </td>
          <td>
          </td>
          <td>
            <input
              type="checkbox"
              id="${checkboxId}"
              class="form-check-input"
              ${isChecked ? "checked" : ""}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

        `;
  });

  // removing, increasing, decreasing/selecting an item from cart
  cartContainer.addEventListener("click", (e) => {
    // function to remove an item
    function removeItem(e) {
      const productId = e.target.id;
      // Remove item from checkout
      let checkout = JSON.parse(localStorage.getItem("checkout")) || [];
      checkout = checkout.filter(
        (item) => item.product.id !== parseInt(productId)
      );
      localStorage.setItem("checkout", JSON.stringify(checkout));
      // Remove item from cart
      const updatedCart = cart.filter((x) => x.data.id !== parseInt(productId));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      location.reload();
      grandTotal();
      generateCart(updatedCart);
      // Show cartEmpty if the cart is empty
      if (updatedCart.length === 0) {
        cartEmpty();
      }
    }
    // funtion to increase/decrease quantity count
    function updateCount(e, op) {
      let id = parseInt(e.target.id);
      let parentElement = e.target.closest(".table-responsive");
      if (parentElement) {
        let quantityElement = parentElement.querySelector(".quantity-input");
        if (quantityElement) {
          let currentQuantity = parseInt(quantityElement.textContent, 10);
          // console.log(currentQuantity);
          if (op == "+") {
            currentQuantity++;
            quantityElement.textContent = currentQuantity;
            updateQuantityCount();
            grandTotal();
          } else if (op == "-" && currentQuantity > 1) {
            currentQuantity--;
            quantityElement.textContent = currentQuantity;
            updateQuantityCount();
            grandTotal();
          }
          // updating quantity count of the product in local storage
          function updateQuantityCount() {
            const updatedQuantity =
              JSON.parse(localStorage.getItem("cart")) || [];
            let quantitySearch = updatedQuantity.find((item) => item.id === id);
            if (quantitySearch) {
              quantitySearch.item = currentQuantity;
              quantityElement.textContent = currentQuantity;
              localStorage.setItem("cart", JSON.stringify(updatedQuantity));
            }
          }
        }
      }

      if (e.target.classList.contains("remove")) {
        removeItem(e);
      }

      // grandTotal();
    }

    if (e.target.classList.contains("remove")) {
      removeItem(e);
    } else if (e.target.classList.contains("increase")) {
      updateCount(e, "+");
      // console.log(e.target.id);
      // grandTotal();
    } else if (e.target.classList.contains("decrease")) {
      updateCount(e, "-");

      // grandTotal();
    } else if (e.target.type === "checkbox") {
      const productId = e.target.id.split("_")[1];
      const isChecked = e.target.checked;
      let selectedItems = JSON.parse(localStorage.getItem("checkout")) || [];
      const checkboxState =
        JSON.parse(localStorage.getItem("checkboxState")) || {};
      if (isChecked) {
        checkboxState[e.target.id] = true;
        const search = cart.find((x) => x.id === parseInt(productId));
        localStorage.setItem("checkboxState", JSON.stringify(checkboxState));
        if (search) {
          selectedItems.push({
            product: search.data,
            item: search.item,
          });
        }
      } else {
        selectedItems = selectedItems.filter(
          (item) => item.product.id !== parseInt(productId)
        );
        checkboxState[e.target.id] = false;
        localStorage.setItem("checkboxState", JSON.stringify(checkboxState));
      }
      localStorage.setItem("checkout", JSON.stringify(selectedItems));
    }
  });

  // calculating total
  function grandTotal() {
    let totalPrice = document.getElementById("total-price");
    const sum = JSON.parse(localStorage.getItem("cart"))
      .map((x) => x.item * x.data.price)
      .reduce((x, y) => x + y, 0);
    totalPrice.innerHTML = `$${sum}`;
  }
  grandTotal();
}
generateCart(cart);
const checkBtn = document.getElementById("check-btn");
checkBtn.addEventListener("click", () => {
  let checkoutItem = JSON.parse(localStorage.getItem("checkout")) || [];
  if (checkoutItem.length === 0) {
    alert("select item to checkout!");
  } else {
    window.location.href = "checkout.html";
  }
});
