const search = document.getElementById("search");
const categorySelect = document.getElementById("main-category-select");
const cards = document.querySelectorAll(".card");

// Logged in user
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

// User-specific keys
const cartKey = currentUser
    ? currentUser.email + "_cart"
    : "_cart";

const wishlistKey = currentUser
    ? currentUser.email + "_wishlist"
    : "_wishlist";

// Current Filters
let currentCategory = "all";
let currentRoom = "All";
let currentPrice = "all";

// =======================
// FILTER PRODUCTS
// =======================

function filterProducts() {

    const searchValue = search.value.toLowerCase();

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();
        const room = card.dataset.category || "";

        const type = card.classList.contains("Furniture")
            ? "Furniture"
            : "Appliance";

        const rentPrice = Number(card.dataset.price);
const buyPrice = Number(card.dataset.buyprice);

const durationSelect = card.querySelector(".duration");
const duration = durationSelect ? Number(durationSelect.value) : 0;

const isBuy = duration === 0;

const price = isBuy ? buyPrice : rentPrice;

        let show = true;

        // Search
        if (!name.includes(searchValue))
            show = false;

        // Category
        if (
            currentCategory !== "all" &&
            type !== currentCategory
        )
            show = false;

        // Room
        if (
            currentRoom !== "All" &&
            room !== currentRoom
        )
            show = false;

        // Price

        if (currentPrice === "0-499" && price > 499)
            show = false;

        if (
            currentPrice === "500-799" &&
            !(price >= 500 && price <= 799)
        )
            show = false;

        if (
            currentPrice === "800-999" &&
            !(price >= 800 && price <= 999)
        )
            show = false;

        if (
            currentPrice === "999 above" &&
            price < 999
        )
            show = false;

        card.style.display = show ? "block" : "none";

    });

}

// =======================
// SEARCH FROM HOME PAGE
// =======================

const params = new URLSearchParams(window.location.search);

const searchText = params.get("search");

if (searchText) {

    search.value = searchText;

    filterProducts();

}

// =======================
// SEARCH
// =======================

search.addEventListener("keyup", filterProducts);

// =======================
// CATEGORY
// =======================

categorySelect.addEventListener("change", function () {

    currentCategory = this.value;

    const roomButtons =
        document.querySelectorAll(".room-chip");

    roomButtons.forEach(btn => {

        const room = btn.dataset.room;

        if (currentCategory === "Furniture") {

            if (
                room === "Living Room" ||
                room === "Bedroom" ||
                room === "Kitchen"
            ) {

                btn.style.display = "inline-flex";

            }

            else {

                btn.style.display = "none";

            }

        }

        else if (currentCategory === "Appliance") {

            if (
                room === "Living Room" ||
                room === "Kitchen"
            ) {

                btn.style.display = "inline-flex";

            }

            else {

                btn.style.display = "none";

            }

        }

        else {

            btn.style.display = "inline-flex";

        }

    });

    currentRoom = "All";

    document.querySelectorAll(".room-chip")
        .forEach(btn => btn.classList.remove("active"));

    document.getElementById("all-room")
        .classList.add("active");

    filterProducts();

});

// =======================
// ROOM FILTER
// =======================

document.querySelectorAll(".room-chip")
.forEach(button => {

    button.addEventListener("click", function () {

        document.querySelectorAll(".room-chip")
        .forEach(btn => btn.classList.remove("active"));

        document.getElementById("all-room")
        .classList.remove("active");

        this.classList.add("active");

        currentRoom = this.dataset.room;

        filterProducts();

    });

});

document.getElementById("all-room")
.addEventListener("click", function () {

    currentRoom = "All";

    document.querySelectorAll(".room-chip")
    .forEach(btn => btn.classList.remove("active"));

    this.classList.add("active");

    filterProducts();

});

// =======================
// PRICE FILTER
// =======================

const priceFilter =
document.getElementById("price-filter");

priceFilter.addEventListener("change", function () {

    currentPrice = this.value;

    filterProducts();

});

filterProducts();

// =======================
// ADD TO CART
// =======================

const buttons = document.querySelectorAll(".cart-btn");

buttons.forEach(button => {

    button.onclick = function () {

        // Check login
        if (!currentUser) {

            alert("Please login first.");

            localStorage.setItem(
                "redirectAfterLogin",
                "products.html"
            );

            window.location.href = "login.html";

            return;
        }

        const card = this.closest(".card");

const name = card.dataset.name;

const mode = new URLSearchParams(window.location.search).get("mode");

const isBuy = mode === "buy";

const price = isBuy
    ? Number(card.dataset.buyprice)
    : Number(card.dataset.price);

    console.log("Mode:", isBuy ? "BUY" : "RENT");
console.log("Rent Price:", card.dataset.price);
console.log("Buy Price:", card.dataset.buyprice);
console.log("Final Price:", price);

const durationSelect = card.querySelector(".duration");

const duration = isBuy
    ? 0
    : Number(durationSelect.value);

        let cart =
            JSON.parse(localStorage.getItem(cartKey)) || [];

        const item = cart.find(p => p.name === name);

        if (item) {

            item.qty++;

            item.duration = duration;

        }

        else {

         cart.push({

    name: name,
    price: price,
    qty: 1,
    duration: duration,
    isBuy: isBuy,
    image: card.querySelector("img").src

});
        }

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );
        updateCartBadge();

        alert(name + " added to cart!");

    };

});

// =======================
// WISHLIST
// =======================

const wishlistButtons =
document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(button => {

    const card = button.closest(".card");

    const name = card.dataset.name;

    let wishlist =
        JSON.parse(localStorage.getItem(wishlistKey)) || [];

    if (wishlist.find(item => item.name === name)) {

        button.classList.add("active");

        button.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

    }

    button.onclick = function () {

        if (!currentUser) {

            alert("Please login first.");

            localStorage.setItem(
                "redirectAfterLogin",
                "products.html"
            );

            window.location.href = "login.html";

            return;

        }

        let wishlist =
            JSON.parse(localStorage.getItem(wishlistKey)) || [];

        const exists =
            wishlist.find(item => item.name === name);

        if (exists) {

            wishlist =
                wishlist.filter(item => item.name !== name);

            button.classList.remove("active");

            button.innerHTML =
                '<i class="fa-solid fa-heart"></i>';

        }

        else {

            wishlist.push({

                name: name,
                price: Number(card.dataset.price),
                image: card.querySelector("img").src

            });

            button.classList.add("active");

            button.innerHTML =
                '<i class="fa-solid fa-heart"></i>';

        }

        localStorage.setItem(
            wishlistKey,
            JSON.stringify(wishlist)
        );
        updateWishlistIcon();
        console.log("Wishlist length:",
        JSON.parse(localStorage.getItem(wishlistKey))?.length
        );
    };

});

// =======================
// REVIEWS
// =======================

function openReview(product) {

    localStorage.setItem(
        "reviewProduct",
        product
    );

    window.location.href = "reviews.html";

}

document.querySelectorAll(".product-image").forEach(image => {

    image.addEventListener("click", function () {

        const card = this.closest(".card");

        const cardName = card.dataset.name.trim().toLowerCase();
        

       

const product = productData.find(
    p => p.name.trim().toLowerCase() === cardName.toLowerCase()
);

console.log(product);
        
      

        if (!product) {
            alert("Product not found");
            return;
        }

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(product)
        );
        localStorage.setItem("productMode","rent");
        
        window.location.href = "product-details.html";

    });

});

        



