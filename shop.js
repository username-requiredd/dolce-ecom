const savedProduct = localStorage.getItem("cart"); // getting products from localstorage
const parsedProduct = JSON.parse(savedProduct);
let cart = parsedProduct || [];
const savedPage = localStorage.getItem("page"); // getting currentPage page
const parsedPage = JSON.parse(savedPage);
let limit = 9; //no of products per page
let page = parsedPage || 0;
const products = document.getElementById("p-container");
// error handler
const errorMessage = (err) => {
  products.innerHTML = "";
  products.innerHTML = `<p class = "error">${err}! Try checking your connection. </p>`;
};
//Loader animation
function renderSkeleton() {
  products.innerHTML = "";
  for (let i = 0; i < limit; i++) {
    products.innerHTML += `
    <div class="wrapper col-sm-6 col-lg-4 px-2 ">
    <div class="containe" >
      <div class="square1 "></div>
      <div class="square2"></div>
      <div class="square3"></div>
    </div>
  </div>
    `;
  }
}
// product request
async function generateCart(url) {
  try {
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error("error getting data!");
    }
    return await request.json();
  } catch (error) {
    errorMessage(error.message);
  }
}
// rendering products dynamically
async function renderShop(items) {
  items ? renderSkeleton() : errorMessage("Fail to fetch data");
  const data = await items;
  if (!data) {
    errorMessage("Fail to fetch data");
    throw new Error("error getting data");
  }
  products.innerHTML = "";
  data.products.forEach((item) => {
    let { title, price, images, id, thumbnail } = item;
    products.innerHTML += `
    <div class="col-sm-6 col-lg-4 py-5  " id=${id}>
    <div class="product-grid2 shadow-sm">
      <div class="product-image2">
        <a >
          <img
            class="pic-1" img-fluid
            src="${thumbnail}"
          />
          <img
            class="pic-2"
            src="${images[0]}"
          />
        </a>
        <ul class="social">
          <li>
            <a data-tip="Quick View"
           ><i class="fa fa-eye view" id=${id}  ></i
            ></a>
          </li>
          <li>
            <a data-tip="Add to Wishlist"
              ><i class=" wish fa fa-shopping-bag " id=${id}></i
            ></a>
          </li>
          <li>
            <a  data-tip="Add to Cart"
              ><i class=" cart fa fa-shopping-cart"  id=${id}></i
            ></a>
          </li>
        </ul>
      </div>
      <div class="product-content">
        <h3 class="title"><a >${title}</a></h3>
        <span class="price">$${price}</span>
      </div>
    </div>
  </div>
    `;
  });
  products.addEventListener("click", (e) => {
    // add to cart // wishlist
    const addToCart = (action) => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const wishlist = JSON.parse(localStorage.getItem("wish")) || [];
      const args = action === "cart" ? cart : wishlist;
      const id = parseInt(e.target.id);
      const search = args.find((item) => item.id === id);
      if (search === undefined) {
        const db = data.products.find((x) => x.id === id);
        args.push({
          data: db,
          item: 1,
          id: db.id,
        });
        localStorage.setItem(
          args === cart ? "cart" : "wishlist",
          JSON.stringify(args)
        );
        update();
      } else {
        alert("product already exist in cart");
      }
    };
    if (e.target.classList.contains("cart")) {
      addToCart("cart");
    } else if (e.target.classList.contains("wish")) {
      addToCart("wish");
    } else if (
      e.target.classList.contains("view") ||
      e.target.classList.contains("title")
    ) {
      const proId = e.target.id;
      const display = async () => {
        try {
          const url = `https://dummyjson.com/products/${proId}`;
          const data = await generateCart(url);
          window.location.href = "shopsingle.html";
          localStorage.setItem("products", JSON.stringify(data));
        } catch (err) {
          errorMessage(err.message);
        }
      };
      display();
    }
  });
}
const Url = `https://dummyjson.com/products?limit=${limit}&skip=${page}`;
renderShop(generateCart(Url));
// displaying a product category
let category;
const categories = document.getElementById("category");
categories.addEventListener("click", (e) => {
  category = e.target.dataset.info;
  if (!category) {
    // const url = `https://dummyjson.com/products?limit=${limit}&skip=${page}`
    renderShop(generateCart(url));
    console.log("something else");
  }

  async function fetchCategories() {
    try {
      const url = `https://dummyjson.com/products/category/${category}`;
      await renderShop(generateCart(url));
    } catch (error) {
      errorMessage(error.message);
    }
  }
  fetchCategories();
});
// page controls
const previousPage = document.getElementById("prevv");
const nextPage = document.getElementById("nexx");
const loadPage = async (currentPage) => {
  products.innerHTML = "";
  page = currentPage;
  localStorage.setItem("page", JSON.stringify(page));
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const url = `https://dummyjson.com/products?limit=${limit}&skip=${page}`;
  return await renderShop(generateCart(url));
};
const pageContainer = document.getElementById("page-control");
pageContainer.addEventListener("click", async (e) => {
  let pg = e.target.textContent;
  if (pg === "Previous") {
    if (page > 0) {
      page > 0
        ? nextPage.classList.remove("d-none")
        : nextPage.classList.add("d-none");
      products.innerHTML = "";
      page = page - limit;
      localStorage.setItem("page", JSON.stringify(page));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const url = `https://dummyjson.com/products?limit=${limit}&skip=${page}`;
      return await renderShop(generateCart(url));
    }
  } else if (pg === "Next") {
    page = page + limit;
    page >= 99
      ? nextPage.classList.add("d-none")
      : nextPage.classList.remove("d-none");
    const url = `https://dummyjson.com/products?limit=${limit}&skip=${page}`;
    products.innerHTML = "";
    localStorage.setItem("page", JSON.stringify(page));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return await renderShop(generateCart(url));
  } else if (pg === "1") {
    loadPage(0);
  } else if (pg === "2") {
    loadPage(9);
  } else if (pg === "3") {
    loadPage(18);
  }
  page === 0
    ? previousPage.classList.add("d-none")
    : previousPage.classList.remove("d-none");
});
page === 0
  ? previousPage.classList.add("d-none")
  : previousPage.classList.remove("d-none");

page >= 99
  ? nextPage.classList.add("d-none")
  : nextPage.classList.remove("d-none");

// updating the cart count
const update = () => {
  const cartCount = document.querySelector("#crt-cnt");
  const item = localStorage.getItem("cart") || [];
  const savedItem = JSON.parse(item);
  cartCount.innerHTML = savedItem.map((x) => x.item).reduce((x, y) => x + y, 0);
};
update();

const filter = document.getElementById("filter");

filter.addEventListener("click", () => {
  var sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("d-block");
});
