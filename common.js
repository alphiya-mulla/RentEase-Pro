// ===============================
// WISHLIST ICON
// ===============================
function updateWishlistIcon() {

    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!currentUser) return;

    const wishlistKey = currentUser.email + "_wishlist";
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const icon = document.querySelector("#wishlistIcon");

    if (!icon) return;

    if (wishlist.length > 0) {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-solid");
        icon.style.color = "#ff1744";

    } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-solid");
        icon.style.color = "";

    }
}

// ===============================
// CART BADGE
// ===============================

function updateCartBadge() {

    const currentUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    const badge =
        document.getElementById("cartBadge");

    if (!badge) return;

    if (!currentUser) {

        badge.style.display = "none";
        return;

    }

    const cartKey =
        currentUser.email + "_cart";

    const cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    let count = 0;

    cart.forEach(item => {

        count += item.qty;

    });

    if (count > 0) {

        badge.style.display = "flex";
        badge.textContent = count;

    } else {

        badge.style.display = "none";

    }

}

function updateNotificationBadge() {

    const badge = document.getElementById("notificationBadge");

    if (!badge) return;

    const total =
        Number(localStorage.getItem("notificationCount")) || 0;

    const seen =
        Number(localStorage.getItem("notificationSeen")) || 0;

    const unseen = total - seen;

    if (unseen > 0) {

        badge.style.display = "flex";
        badge.textContent = unseen;

    } else {

        badge.style.display = "none";

    }
}

document.addEventListener("DOMContentLoaded", () => {

    updateWishlistIcon();
    updateCartBadge();
    updateNotificationBadge();

});