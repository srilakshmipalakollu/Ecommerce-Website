const PRODUCT_API = "http://localhost:5000/api/products";
const ORDER_API = "http://localhost:5000/api/orders";

// ---------- LOAD PRODUCTS ----------
async function loadProducts() {
    const response = await fetch(PRODUCT_API);
    const products = await response.json();

    const container = document.getElementById("admin-products");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>₹${product.price}</p>
            <button onclick="editProduct('${product._id}')">
    Edit
</button>
            </div>
        `;
    });
}

// ---------- ADD PRODUCT ----------
const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: Number(document.getElementById("price").value),
        image: document.getElementById("image").value,
        stock: Number(document.getElementById("stock").value),
        category: document.getElementById("category").value
    };

    await fetch(PRODUCT_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    alert("Product Added!");
    form.reset();
    loadProducts();
});

// ---------- DELETE PRODUCT ----------
async function deleteProduct(id) {
    await fetch(`${PRODUCT_API}/${id}`, {
        method: "DELETE"
    });

    alert("Product Deleted!");
    loadProducts();
}

// ---------- LOAD ALL ORDERS ----------
async function loadOrders() {
    const token = localStorage.getItem("token");

    const response = await fetch(ORDER_API, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const orders = await response.json();

    const container = document.getElementById("admin-orders");
    container.innerHTML = "";

    orders.forEach(order => {
        container.innerHTML += `
            <div class="card">
                <h3>Order ID: ${order._id}</h3>
                <p>User: ${order.user?.name || "N/A"}</p>
                <p>Total: ₹${order.totalAmount}</p>
                <p>Status: ${order.status}</p>
            </div>
        `;
    });
}

loadProducts();
loadOrders();