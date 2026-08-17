const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

const history = JSON.parse(
    localStorage.getItem(`history_${currentUser.email}`)
) || [];

const delivery = JSON.parse(
    localStorage.getItem(`${currentUser.email}_delivery`)
) || {};

const payment =
localStorage.getItem("paymentMethod") || "Not Available";

// Latest order
const latestOrder = history[0];

if (!latestOrder) {
    alert("No invoice found.");
    window.location.href = "index.html";
}

// Customer Details
document.getElementById("customerName").textContent =
delivery.fullname || "";

document.getElementById("customerPhone").textContent =
delivery.mobile || "";

document.getElementById("customerAddress").textContent =
`${delivery.house || ""}, ${delivery.street || ""},
${delivery.city || ""}, ${delivery.state || ""} - ${delivery.pincode || ""}`;

// Order Details
document.getElementById("orderId").textContent =
latestOrder.orderId;

document.getElementById("invoiceDate").textContent =
latestOrder.date;

document.getElementById("paymentMethod").textContent =
payment;

// Invoice Number
document.getElementById("invoiceNo").textContent =
"INV" + Date.now();

// Product Table
const invoiceProducts =
document.getElementById("invoiceProducts");

let subtotal = 0;

// Show only active items
const activeItems = latestOrder.items.filter(
    item => item.status !== "Cancelled"
);

if (activeItems.length === 0) {

    invoiceProducts.innerHTML = `
        <tr>
            <td colspan="5">No active products</td>
        </tr>
    `;

} else {

    activeItems.forEach(item => {

        const total = item.isBuy
    ? item.price * item.qty
    : item.price * item.qty * item.duration;

        subtotal += total;

        invoiceProducts.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>
    ${item.isBuy
        ? "Purchase"
        : `${item.duration} Month(s)`}
</td>
            <td>${item.qty}</td>
            <td>₹${item.price}</td>
            <td>₹${total}</td>
        </tr>
        `;
    });

}

// Totals
document.getElementById("subtotal").textContent =
subtotal;

document.getElementById("grandTotal").textContent =
subtotal;