async function checkout() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const items = cart.map(item => ({
        product: item._id,
        quantity: 1
    }));

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    try {
        const response = await fetch(
            "http://localhost:5000/api/orders",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    items,
                    totalAmount
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("Order placed successfully!");

            localStorage.removeItem("cart");

            window.location.href = "orders.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong.");
    }
}
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>

                <div class="qty-controls">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <p>Subtotal: ₹${item.price * item.quantity}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("total").innerHTML =
        "Total: ₹" + total;
}