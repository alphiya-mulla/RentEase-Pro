const orderItems = document.getElementById("order-items");
const totalPrice = document.getElementById("total-price");
const orderId = document.getElementById("order-id");
const orderDate = document.getElementById("order-date");

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const cartKey = currentUser.email + "_cart";
const historyKey = "history_" + currentUser.email;

// Get history and cart
let history = JSON.parse(localStorage.getItem(historyKey)) || [];
let currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

// If new cart exists → save as new order
if (currentCart.length > 0) {

    const newOrder = {
        orderId: "RE" + Date.now(),
        date: new Date().toLocaleDateString(),
        items: currentCart.map(item => ({
            ...item,
            status: "Active"
        }))
    };

    history.unshift(newOrder);

    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );

    // ================= NOTIFICATION =================

let notifications =
JSON.parse(localStorage.getItem("notifications")) || [];

notifications.push({

    icon: "fa-box",

    title: "Order Placed Successfully",

    message: `Your order ${newOrder.orderId} has been placed successfully.`,

    time: newOrder.date

});

localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
);

// Increase notification count
let count =
Number(localStorage.getItem("notificationCount")) || 0;

localStorage.setItem(
    "notificationCount",
    count + 1
);

    localStorage.removeItem(cartKey);
}

// Always read latest order from history
let latestOrder = history[0];

let total = 0;

// Show Order ID & Date
if (latestOrder) {
    orderId.textContent = latestOrder.orderId;
    orderDate.textContent = latestOrder.date;
}

// Display products
if (!latestOrder || latestOrder.items.length === 0) {

    orderItems.innerHTML = "<h3>No products ordered.</h3>";

} else {

    orderItems.innerHTML = "";

    latestOrder.items.forEach(item => {

        if (item.status !== "Cancelled") {

            total += item.isBuy
    ? item.price * item.qty
    : item.price * item.qty * item.duration;

            orderItems.innerHTML += `
            <div class="order-card">

                <img src="${item.image}">

                <div class="order-info">
                    <h3>${item.name}</h3>
                   <p>
    ${item.isBuy
        ? "Purchase Product"
        : `Duration : ${item.duration} Month(s)`}
</p>
                    <p>Price : ₹${item.price}</p>
                    <p>Quantity : ${item.qty}</p>
                </div>

                <div class="order-right">
                    <h3>
₹${item.isBuy
    ? item.price * item.qty
    : item.price * item.qty * item.duration}
</h3>

                    <button class="cancel-btn"
                    onclick="cancelOrder('${item.name}','${item.image}')">
                        Cancel Order
                    </button>

                </div>

            </div>
            `;
        }

    });

}

totalPrice.textContent = total;

// Cancel single item
function cancelOrder(productName, productImage) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this item?"
    );

    if (confirmCancel) {

        let history =
        JSON.parse(localStorage.getItem(historyKey)) || [];

        history[0].items = history[0].items.map(item => {

            if (
                item.name === productName &&
                item.image === productImage
            ) {
                item.status = "Cancelled";
            }

            return item;
        });

        localStorage.setItem(
            historyKey,
            JSON.stringify(history)
        );

        alert("Item cancelled successfully.");

        location.reload();
    }
}