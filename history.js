const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!currentUser || !currentUser.email) {
    alert("Please login first");
    window.location.href = "login.html";
}

// Keys
const historyKey = `history_${currentUser.email}`;

// DOM
const historyContainer =
document.getElementById("historyContainer");

const emptyHistory =
document.getElementById("emptyHistory");

// Load history
let history =
JSON.parse(localStorage.getItem(historyKey)) || [];

// Empty state
function renderEmptyState() {
    historyContainer.style.display = "none";
    emptyHistory.style.display = "block";
}

// Render history
function renderHistory() {

    historyContainer.innerHTML = "";

    if (history.length === 0) {
        renderEmptyState();
        return;
    }

    let hasActiveOrders = false;

    history.forEach(order => {

        let productsHTML = "";
        let grandTotal = 0;

        // Show only active items
        const activeItems = order.items.filter(
            item => item.status !== "Cancelled"
        );

        if (activeItems.length === 0) return;

        hasActiveOrders = true;

        activeItems.forEach((item, index) => {

            const itemTotal =
                item.price * item.qty * item.duration;

            grandTotal += itemTotal;

            productsHTML += `
                <div class="product-row">
                    <img src="${item.image}" />

                    <div class="product-info">
                        <h3>${item.name}</h3>
                        <p>₹${item.price}/month</p>
                        <p>Duration: ${item.duration} Month(s)</p>
                        <p>Quantity: ${item.qty}</p>

                        <button class="extend-btn"
                            onclick="extendRental('${order.orderId}', ${index})">
                            <i class="fa-solid fa-clock"></i>
                            Extend Rental
                        </button>
                    </div>
                </div>
            `;
        });

        historyContainer.innerHTML += `
            <div class="history-card">

                <div class="history-top">
                    <div>
                        <div class="order-id">
                            Order #${order.orderId}
                        </div>

                        <div class="order-date">
                            ${order.date}
                        </div>
                    </div>

                    <span class="status">
                        Active
                    </span>
                </div>

                ${productsHTML}

                <h3 style="margin-top:20px;">
                    Grand Total : ₹${grandTotal}
                </h3>

                <div class="history-buttons">

                    <button class="track-btn"
                        onclick="trackOrder('${order.orderId}')">
                        <i class="fa-solid fa-location-dot"></i>
                        Track
                    </button>

                    <button class="support-btn"
                        onclick="openSupport('${activeItems[0].name}')">
                        <i class="fa-solid fa-headset"></i>
                        Support
                    </button>

                    <button class="invoice-btn"
                        onclick="openInvoice()">
                        <i class="fa-solid fa-file-invoice"></i>
                        Invoice
                    </button>

                    <button class="cancel-btn"
                        onclick="cancelOrder('${order.orderId}')">
                        <i class="fa-solid fa-ban"></i>
                        Cancel Order
                    </button>

                </div>

            </div>
        `;
    });

    if (!hasActiveOrders) {
        renderEmptyState();
    }
}

// Initial render
renderHistory();


// -------------------- ACTIONS --------------------

function openSupport(product) {
    localStorage.setItem("selectedProduct", product);
    window.location.href = "support.html";
}

function trackOrder(orderId) {
    localStorage.setItem("trackingOrderId", orderId);
    window.location.href = "track.html";
}

function openInvoice() {
    window.location.href = "invoice.html";
}


// Cancel whole order
function cancelOrder(orderId) {

    if (!confirm("Are you sure you want to cancel this order?")) return;

    history = history.map(order => {

        if (order.orderId === orderId) {
            order.items = order.items.map(item => ({
                ...item,
                status: "Cancelled"
            }));
        }

        return order;
    });

    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );

    alert("Order cancelled successfully");

    location.reload();
}


// -------------------- EXTEND RENTAL --------------------

let currentOrderId = "";
let currentProductIndex = 0;

function extendRental(orderId, productIndex) {
    currentOrderId = orderId;
    currentProductIndex = productIndex;

    document.getElementById("extendModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("extendModal").style.display = "none";
}

function confirmExtension() {

    const selected = document.querySelector(
        'input[name="extendPlan"]:checked'
    );

    if (!selected) {
        alert("Please select a plan");
        return;
    }

    const months = selected.value;

    localStorage.setItem("paymentType", "extend");
    localStorage.setItem("extendOrderId", currentOrderId);
    localStorage.setItem("extendProductIndex", currentProductIndex);
    localStorage.setItem("extendMonths", months);

    window.location.href = "payment.html";
}