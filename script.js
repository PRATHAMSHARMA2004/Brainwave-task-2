// Cart array to hold the added items
let cart = [];

// Sample products data
const products = [
  { id: 1, name: 'Product 1', price: 49.99, img: 'https://picsum.photos/200/300', category: 'electronics' },
  { id: 2, name: 'Product 2', price: 39.99, img: 'https://picsum.photos/200/300?random=1', category: 'fashion' },
  { id: 3, name: 'Product 3', price: 29.99, img: 'https://picsum.photos/200/300?random=2', category: 'home' },
  { id: 4, name: 'Product 4', price: 59.99, img: 'https://picsum.photos/200/300?random=3', category: 'electronics' },
  { id: 5, name: 'Product 5', price: 19.99, img: 'https://picsum.photos/200/300?random=4', category: 'fashion' },
  { id: 6, name: 'Product 6', price: 89.99, img: 'https://picsum.photos/200/300?random=5', category: 'home' }
];

// Load and display products dynamically
function loadProducts() {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(productDiv);
  });
}

// Add item to the cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}

// Update the cart display
function updateCart() {
  const cartLink = document.getElementById('cart-link');
  cartLink.textContent = `Cart (${cart.length})`;

  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Search products based on input
function searchProducts() {
  const query = document.getElementById('search-box').value.toLowerCase();
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
  displayFilteredProducts(filteredProducts);
}

// Sort products based on selected option
function sortProducts() {
  const sortOption = document.getElementById('sort-options').value;
  let sortedProducts;

  if (sortOption === 'name-asc') {
    sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'price-asc') {
    sortedProducts = [...products].sort((a, b) => a.price - b.price);
  } else {
    sortedProducts = [...products].sort((a, b) => b.price - a.price);
  }

  displayFilteredProducts(sortedProducts);
}

// Display filtered/sorted products
function displayFilteredProducts(filteredProducts) {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '';

  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(productDiv);
  });
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
  }
}

// Initialize the page
loadProducts();
