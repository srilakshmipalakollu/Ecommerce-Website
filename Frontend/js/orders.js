const token = localStorage.getItem("token");

async function loadOrders() {
    if (!token) {
        alert("Please login!");
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(
        "http://localhost:5000/api/orders/myorders",
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const orders = await response.json();

    const container = document.getElementById("orders-container");

    container.innerHTML = "";

    orders.forEach(order => {
        container.innerHTML += `
            <div class="card">
                <h3>Order ID: ${order._id}</h3>
                <p>Total Amount: ₹${order.totalAmount}</p>
                <p>Status: ${order.status}</p>
                <p>Items: ${order.items.length}</p>
            </div>
        `;
    });
}

loadOrders();