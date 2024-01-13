// const shopContainer = document.getElementById("row");
// const feat = document.getElementById("feat");
// rendering category of dynamically
// let cart = JSON.parse(localStorage.getItem("data")) || [];
// const generateCat = () => {
//   shopContainer.innerHTML = shopItems.map((x) => {
//     let { img, name } = x;
//     return `
//         <div class="col-md-3 image-container">
//         <div class="container">
//           <img
//             src="${img}"
//             alt=""
//             class="img-fluid image-container"
//             width="300px"
//           />
//           <h4>${name}</h4>
//           <a  href="shop.html" class="btn btn-outline-danger btn-lg py-2">
//             Shop <i class="bi bi-arrow-right"></i>
//           </a>
//         </div>
//       </div>
//         `;
//   });
// };
// generateCat();
// // redering FP dynamically
// const generateFeat = () => {
//   feat.innerHTML = featPro.map((x) => {
//     let { name, rate, price, dsc, img } = x;
//     return `
//         <div class="col-md-3 pb-3">
//         <div class="container-fluid text-center">
//           <img
//             src="${img}"
//             alt=""
//             class="img-fluid"
//             width="350px"
//           />
//         </div>
//         <div class="rating ps-3 py-3 text-warning">
//         ${rate}
//         </div>
//         <div>
//           <p class="h4 ps-3">${name}</p>
//           <p class="ps-3 lead">
//           ${dsc}
//           </p>
//           <p class="lead ps-3">$${price}</p>
//         </div>
//       </div>

//         `;
//   });
// };
// generateFeat();
const update = () => {
  const cartCount = document.querySelector("#crt-cnt");
  const item = localStorage.getItem("cart") || 0;
  const savedItem = JSON.parse(item);
  cartCount.innerHTML = savedItem.map((x) => x.item).reduce((x, y) => x + y, 0);
};
update();
