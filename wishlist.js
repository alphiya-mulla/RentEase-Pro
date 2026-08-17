const wishlistContainer = document.getElementById("wishlist-items");
const emptyMessage = document.getElementById("empty-message");

// Check logged in user
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {

    alert("Please login first.");

    localStorage.setItem("redirectAfterLogin", "wishlist.html");

    window.location.href = "login.html";

}

// User-specific keys
const wishlistKey = currentUser.email + "_wishlist";
const cartKey = currentUser.email + "_cart";

let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

// ---------------- DISPLAY WISHLIST ----------------

function displayWishlist() {

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }

    emptyMessage.style.display = "none";

    wishlist.forEach(function (item, index) {

        wishlistContainer.innerHTML += `

        <div class="card">

            <img src="${item.image}" alt="${item.name}">

            <h3>${item.name}</h3>

            <p>₹${item.price}/month</p>

            <button onclick="moveToCart(${index})">
                Add to Cart
            </button>

            <button onclick="removeWishlist(${index})">
                Remove
            </button>

        </div>

        `;

    });

}

// ---------------- REMOVE ----------------

function removeWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );

    displayWishlist();
    updateWishlistIcon();

}

// ---------------- MOVE TO CART ----------------

function moveToCart(index) {

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const product = wishlist[index];

    const existing = cart.find(item => item.name === product.name);

    if (existing) {

        existing.qty++;

    }

    else {

        cart.push({

            name: product.name,
            price: Number(product.price),
            image: product.image[0],
            qty: 1,
            duration: 1,
            isBuy:true

        });

    }

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );

    alert(product.name + " added to cart!");

}

displayWishlist();
updateWishlistIcon();