const main_page = document.getElementsByClassName("main1")[0];
const cart = document.getElementsByClassName("cart_count")[0];
let ProductData = [];
let productcount = {}
let totalcount = 0

fetch('/products')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    ProductData = [...data];
    data.forEach((product, i) => {
      main_page.innerHTML += `
        <div class="item1 item${i}">
          <h2 class="heading">${product.title}</h2>
          <img src="${product.image}" alt="${product.title}" class="pimage">
          <p class="product">${product.description}</p>
          <p class="p_price">Price: $${product.price}</p>
          <input type="button" value="Add to cart" class="Add_to_product1" id="add_${i}">
          <input type="button" value="Delete" class="Add_to_product2" id="delete_${i}">
        </div>
      `;
    });
  })
  .catch((error) => {
    console.error('Error fetching products:', error);
  });

main_page.addEventListener('click', (e) => {
  if (e.target.classList.contains('Add_to_product1')) {
    const id = e.target.id.split('_')[1]; 
    if (!productcount[id]) {
      productcount[id] = 0;
    }
    console.log("You clicked Add to Cart button for product", id);
    productcount[id] += 1;
    totalcount += 1;
    cart.innerHTML = totalcount;
  }
});

main_page.addEventListener('click', (e) => {
  if (e.target.classList.contains('Add_to_product2')) {
    const id = e.target.id.split('_')[1]; 
    if (productcount[id] > 0 && totalcount > 0) {
      console.log("You clicked Delete button for product", id);
      productcount[id] -= 1;
      totalcount -= 1;
      cart.innerHTML = totalcount;
    }
  }
});

