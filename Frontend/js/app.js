const API_URL = "http://localhost:5000/api/products";

const API_URL = "http://localhost:5000/api/products";

let allProducts = [];

async function loadProducts() {
    const response = await fetch(API_URL);
    allProducts = await response.json();

    displayProducts(allProducts);
}

function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <h4>₹${product.price}</h4>
                <button onclick='addToCart(${JSON.stringify(product)})'>
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item._id === product._id);

    if (existing) {
        existing.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast("✅ Product added to cart!");
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    showToast("Logged out successfully!");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}

document.getElementById("categoryFilter").addEventListener("change", function () {

    const category = this.value;

    if (category === "All") {
        displayProducts(allProducts);
        return;
    }

    const filtered = allProducts.filter(
        product => product.category === category
    );

    displayProducts(filtered);
});

updateCartCount();
loadProducts();