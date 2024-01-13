const storedData = localStorage.getItem("products"); // getting data from local storage
if (storedData) {
  const rel = document.getElementById("related-products");
  const show = document.querySelector("#prodspec");
  console.log(show);
  show.classList.remove("d-none");
  // rendering product details
  function renderProductDetails(product) {
    const parsedData = JSON.parse(product);
    const productContainer = document.getElementById("product-details");
    productContainer.innerHTML = "";
    productContainer.innerHTML += `
    <div class="container">
    <div class="row gx-5" >
    <aside class="col-lg-6" >
      <div class="border rounded-4 mb-3 d-flex justify-content-center">
      <!-- product display image -->
      <a data-fslightbox="mygalley" class="rounded-4" target="_blank" data-type="image" href="${parsedData.thumbnail}">
        <img style="max-width: 100%; max-height: 100vh; margin: auto;" class="rounded-4 fit" src="${parsedData.thumbnail}" />
      </a>
    </div>
    <div class="d-flex justify-content-center mb-3">
      <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="${parsedData.images[1]}" class="item-thumb">
        <img width="60" height="60" class="rounded-2" src="${parsedData.images[0]}" />
      </a>
      <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="${parsedData.images[1]}" class="item-thumb">
        <img width="60" height="60" class="rounded-2" src="${parsedData.images[1]}" />
      </a>
      <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="${parsedData.images[2]}" class="item-thumb">
        <img width="60" height="60" class="rounded-2" src="${parsedData.images[2]}" />
      </a>
      <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="${parsedData.images[3]}" class="item-thumb">
        <img width="60" height="60" class="rounded-2" src="${parsedData.images[3]}" />
      </a>
      <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="${parsedData.images[4]}" class="item-thumb">
        <img width="60" height="60" class="rounded-2" src="${parsedData.images[4]}" />
      </a>
    </div>
    </aside>
    <main class="col-lg-6">
    <div class="ps-lg-3">
      <h4 class="title text-dark">
        ${parsedData.title} <br />
      
      </h4>
      <div class="d-flex flex-row my-3">
        <div class="text-warning mb-1 me-2">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
          <span class="ms-1">
            ${parsedData.rating}
          </span>
        </div>
        <span class="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
        <span class="text-success ms-2">In stock${parsedData.stock}</span>
      </div>

      <div class="mb-3">
        <span class="h5">$  ${parsedData.price}</span>
        <span class="text-muted"></span>
      </div>

      <p>
        ${parsedData.description}
      </p>

      <div class="row">

        <dt class="col-3">Brand: </dt>
        <dd class="col-9">${parsedData.brand}</dd>
      </div>

      <hr />

      <div class="row mb-4">
        <div class="col-md-4 col-6">
          <label class="mb-2">Size</label>
          <select class="form-select border border-secondary" style="height: 35px;">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <!-- col.// -->
        <div class="col-md-4 col-6 mb-3">
          <label class="mb-2 d-block">Quantity</label>
          <div class="input-group mb-3" style="width: 170px;">
            <button class="btn btn-white reduce border border-secondary px-3" id="btn-minus" type="button" id="button-addon1" data-mdb-ripple-color="dark">
              <i class="fas fa-minus reduce"></i>
            </button>
            <span class="text-center d-flex align-items-center justify-content-center border border" id="val" style="width: 50px; height: 50px;"
            >1 </span>

            <button class="btn btn-white increase border border-secondary px-3" id="btn-plus" type="button" id="button-addon2" data-mdb-ripple-color="dark">
              <i class="fas fa-plus increase"></i>
            </button>
          </div>
        </div>
      </div>
      
      <button class="btn btn-warning shadow-0 buy" id="buy-now"
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#orderRecapModal"
    >
       Buy now </button>
      <button class="btn btn-primary shadow-0 cart"> <i class="me-1 cart fa fa-shopping-basket"></i> Add to cart </button>
      <a href="#" class="btn btn-light border border-secondary py-2 icon-hover px-3"> <i class="me-1 fa fa-heart fa-lg"></i> Save </a>
    </div>
  </main>
</div>
</div>
    `;
    // getting cart data frrom local storage
    const cartdata = localStorage.getItem("cart") || "[]";
    let savedCart = JSON.parse(cartdata);
    let quantity = document.getElementById("val"); // updating cart item count
    // updating cart count
    const update = () => {
      const cartCount = document.querySelector("#crt-cnt");
      const item = localStorage.getItem("cart") || [];
      const savedItem = JSON.parse(item);
      cartCount.innerHTML = savedItem
        .map((x) => x.item)
        .reduce((x, y) => x + y, 0);
    };
    update();

    productContainer.addEventListener("click", (e) => {
      // btn to reduce product quantity
      if (e.target.classList.contains("reduce") && quantity.innerText > 1) {
        quantity.innerText--;
      } else if (
        e.target.classList.contains("increase") &&
        quantity.innerText < parsedData.stock
      ) {
        quantity.innerText++;
      } else if (e.target.classList.contains("cart")) {
        if (cartdata) {
          let search = savedCart.find((item) => item.id === parsedData.id);
          if (search === undefined) {
            savedCart.push({
              data: parsedData,
              item: parseInt(quantity.textContent),
              id: parsedData.id,
            });
            localStorage.setItem("cart", JSON.stringify(savedCart));
            update(); // updating item count in the cart icon
          } else {
            search.item = parseInt(quantity.textContent);
            localStorage.setItem("cart", JSON.stringify(savedCart));
            console.log(savedCart);
            update();
          }
        } else {
          console.log(
            "Error getting data from local storage or cart is empty."
          );
        }
      } else if (e.target.classList.contains("buy")) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        productContainer.classList.add("blur-overlay");
        const wrapper = document.getElementById("wrapper");
        wrapper.classList.add("d-block");
        const specifications = document.getElementById("prodspec");
        specifications.classList.add("blur-overlay");
        setTimeout(() => {
          const prd = [
            {
              product: parsedData,
              item: parseInt(quantity.textContent),
            },
          ];
          localStorage.setItem("checkout", JSON.stringify(prd));
          productContainer.classList.remove("blur-overlay");
          specifications.classList.remove("blur-overlay");
          wrapper.classList.remove("d-block");
          productContainer.innerHTML = `
          <section class="payment" id="payment">
          <div class="container py-5">
          <div class="card">
            <div class="card-body">
              <div class="row d-flex justify-content-center pb-5">
                <div class="col-md-7 col-xl-5 mb-4 mb-md-0">
                  <div class="py-4 d-flex flex-row">
                    <h5>
                      <span class="far fa-check-square pe-2"></span
                      ><b>ELIGIBLE</b> |
                    </h5>
                    <span class="ps-2">Pay</span>
                  </div>
                  <h4 class="text-success">$${parsedData.price}</h4>
                  <h4>${parsedData.title}</h4>
                  <div class="d-flex pt-2">
                    <div></div>
                    <div class="ms-auto"></div>
                  </div>
                  <div
                    class="rounded d-flex"
                    style="background-color: #f8f9fa"
                  ></div>
                  <hr />
                  <div class="pt-2">
                    <div class="d-flex pb-2">
                      <div class="ms-auto">
                        <p class="text-primary">
                          <i class="fas fa-plus-circle text-primary pe-1"></i>Add
                          payment card
                        </p>
                      </div>
                    </div>
                    <p>
                      This is an estimate for the portion of your order (not covered
                      by insurance) due today . once insurance finalizes their
                      review refunds and/or balances will reconcile automatically.
                    </p>
                    <form class="pb-3">
                      <div class="d-flex flex-row pb-3">
                        <div class="d-flex align-items-center pe-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="radioNoLabel"
                            id="radioNoLabel1"
                            value=""
                            aria-label="..."
                            checked
                          />
                        </div>
                        <div
                          class="rounded border d-flex w-100 p-3 align-items-center"
                        >
                          <p class="mb-0">
                            <i class="fab fa-cc-visa fa-lg text-primary pe-2"></i
                            >Visa Debit Card
                          </p>
                          <div class="ms-auto">************3456</div>
                        </div>
                      </div>
    
                      <div class="d-flex flex-row">
                        <div class="d-flex align-items-center pe-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="radioNoLabel"
                            id="radioNoLabel2"
                            value=""
                            aria-label="..."
                          />
                        </div>
                        <div
                          class="rounded border d-flex w-100 p-3 align-items-center"
                        >
                          <p class="mb-0">
                            <i class="fab fa-cc-mastercard fa-lg text-dark pe-2"></i
                            >Mastercard Office
                          </p>
                          <div class="ms-auto">************1038</div>
                        </div>
                      </div>
                    </form>
                    <a href="checkout.html" class="btn btn-primary btn-block btn-lg"> Proceed to payment</a>

                  </div>
                </div>
    
                <div class="col-md-5 col-xl-4 offset-xl-1">
                  <div class="py-4 d-flex justify-content-end">
                    <h6><a href="shopsingle.html">Cancel and return to website</a></h6>
                  </div>
                  <div
                    class="rounded d-flex flex-column p-2"
                    style="background-color: #f8f9fa"
                  >
                    <div class="p-2 me-3">
                      <h4>Order Recap</h4>
                    </div>
                    <div class="p-2 d-flex">
                      <div class="col-8">Product Name</div>
                      <div class="ms-auto font-weight-bold">${
                        parsedData.title
                      }</div>
                    </div>
                    <div class="p-2 d-flex">
                      <div class="col-8">Amount toward deductible</div>
                      <div class="ms-auto">$0.00</div>
                    </div>
                    <div class="p-2 d-flex">
                    </div>
                    <div class="p-2 d-flex">
                    </div>
                    <div class="border-top px-2 mx-2"></div>
                    <div class="p-2 d-flex pt-3">
                      <div class="col-8">
                        Total Deductible, Coinsurance, and Copay
                      </div>
                      <div class="ms-auto">$0.00</div>
                    </div>
                    <div class="p-2 d-flex">
                      <div class="col-8">
                        Tax
                      </div>
                      <div class="ms-auto">$10.00</div>
                    </div>
                    <div class="border-top px-2 mx-2"></div>
                    <div class="p-2 d-flex pt-3">
                      <div class="col-8">Quantity</div>
                      <div class="ms-auto"><b>${parseInt(
                        quantity.textContent
                      )}</b></div>
                    </div>
                    <div class="p-2 d-flex">
                      <div class="col-8">
                        Price
                        <span class="fa text-dark"></span>
                      </div>
                      <div class="ms-auto"><b>$${parsedData.price}</b></div>
                    </div>
                    <div class="border-top px-2 mx-2"></div>
                    <div class="p-2 d-flex pt-3">
                      <div class="col-8"><b>Total</b></div>
                      <div class="ms-auto">
                        <b class="text-success">$${
                          parsedData.price * parseInt(quantity.textContent) + 10
                        }</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
    
          `;
        }, 2500);
      }
    });
  }
  renderProductDetails(storedData);

  let cat = localStorage.getItem("products");
  let parsedCat = JSON.parse(cat);
  let category = parsedCat.category;
  let displayedProductID = parsedCat.id;
  console.log("selected product id", displayedProductID);
  console.log(category);
  const limit = 5;
  let id = parsedCat.id;

  // loading realated products skeleton
  function renderSkeleton() {
    rel.innerHTML = "";
    for (let i = 0; i < limit; i++) {
      rel.innerHTML += `
        <div class="product-card skeleton">
    <div class="skeleton-image "></div>
    <div class="product-details">
      <div class="skeleton-title"></div>
      <div class="skeleton-rating"></div>
      <div class="skeleton-price"></div>
    </div>
    <div class="product-actions">
      <div class="skeleton-button"></div>
    </div>
  </div>
    `;
    }
  }
  // getting related products
  const relatedProducts = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=${limit}`
      );
      if (!res.ok) {
        throw new Error("Error getting data!");
      }
      const data = await res.json();
      console.log(data.products.map((x) => x.id));
      return data;
    } catch (err) {
      console.log("Error!", err.message);
      return null;
    }
  };
  // displaying related products
  const displayRelatedProducts = async (proId) => {
    renderSkeleton();
    const req = await relatedProducts();
    if (!req) {
      throw new Error("error getting data");
    }
    rel.innerHTML = "";
    console.log(req.products);

    const similarProducts = req.products.filter((x) => x.id !== proId);

    console.log(similarProducts);
    similarProducts.map(({ title, id, price, thumbnail }) => {
      rel.innerHTML += `
      <div class="d-flex mb-3 view" id= "${id}">
      <div class="me-3">
        <img
          src="${thumbnail}"
          style="min-width: 96px; height: 96px"
          class="img-md img-thumbnail view"
         id="${id}"
        />
      </div>
      <div class="info">
        <div class="nav-link mb-1">
          ${title} <br />
        </div>
        <p class="text-dark"> $${price}</p>
      </div>
    </div>
      `;
    });
  };
  displayRelatedProducts(displayedProductID);
  // Displaying a clicked product
  rel.addEventListener("click", async (e) => {
    if (e.target.classList.contains("view")) {
      id = parseInt(e.target.id);
      console.log(id);
      try {
        const data = await fetchProductDetails(id);
        displayProductDetails(data);
        renderProductDetails(localStorage.getItem("products"));
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        displayRelatedProducts(id);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  });
  // function to fetch clicked related products
  const fetchProductDetails = async (productId) => {
    const url = `https://dummyjson.com/products/${productId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return data;
  };
  // function to display clicked related products
  const displayProductDetails = (productData) => {
    localStorage.setItem("products", JSON.stringify(productData));
  };
} else {
  console.log("No data found in local storage.");
}
