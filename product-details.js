// Logged in user
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Get selected product
const product = JSON.parse(localStorage.getItem("selectedProduct"));

console.log(product);
console.log(product.ratings);
console.log(product.offers);
console.log(product.descriptions);
console.log(product.specifications);

if (!product) {
    alert("No product selected.");
    window.location.href = "products.html";
}
console.log(product);

// Show Product Details
const mainImage = document.getElementById("mainImage");
const imageDescription = document.getElementById("imageDescription");

const specificationList = document.getElementById("specificationsList");
document.getElementById("productName").textContent=product.name || "";


mainImage.src = product.images?.[0] || "";


document.getElementById("productPrice").textContent =
    product.price || "";


document.getElementById("productRating").textContent =product.ratings[0];

document.getElementById("productOffer").textContent = product.offers[0];

imageDescription.textContent =
    product.descriptions?.[0] || "No description available";

specificationList.innerHTML =
    product.specifications?.[0]?.map(item =>
        `<li>${item}</li>`
    ).join("") || "";

    const defaultMainImage = product.images?.[0] || "";
const defaultDescription = product.descriptions?.[0] || "";
const defaultSpecs = product.specifications?.[0] || [];

let selectedImage = defaultMainImage;

    mainImage.onclick = function () {
    mainImage.src = defaultMainImage;
    selectedImage = defaultMainImage;

    imageDescription.textContent = defaultDescription;

    specificationList.innerHTML = defaultSpecs
        .map(item => `<li>${item}</li>`)
        .join("");
};

const thumbs = document.querySelectorAll(".thumbnail");

thumbs.forEach((thumb, index) => {

    if (product.images[index + 1]) {

        thumb.src = product.images[index + 1];

        thumb.onclick = function () {

            mainImage.src = product.images[index + 1];
            selectedImage = product.images[index + 1];

            imageDescription.textContent =
    product.descriptions?.[index + 1] || "No description available";

    document.getElementById("productOffer").textContent = product.offers[index + 1];

    document.getElementById("productRating").textContent = product.ratings[index + 1];



specificationList.innerHTML =
    product.specifications?.[index + 1]?.map(item =>
        `<li>${item}</li>`
    ).join("") || "";

        };

    } else {

        thumb.style.display = "none";

    }

});
// -------------------- CART --------------------

const cartBtn = document.getElementById("cartBtn");

cartBtn.addEventListener("click", () => {

    const cartKey = currentUser.email + "_cart";

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingProduct = cart.find(
        item => item.name === product.name && item.image === selectedImage
    );

    const duration = parseInt(
        document.getElementById("duration").value
    );

    if (existingProduct) {

        existingProduct.qty += 1;
        existingProduct.duration = duration;

    } else {
        console.log("Selected Product:",product);
        console.log("Price:",product.price);
        console.log("Duration:",duration);

        cart.push({

            name: product.name,
            price: Number(product.price),
            image: selectedImage,
            qty: 1,
            duration: duration,
            isBuy:false
        });

    }

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );
  
    updateCartBadge();
    alert("Product added to cart successfully.");
});



// -------------------- WISHLIST --------------------

const wishlistBtn = document.getElementById("wishlistBtn");

const wishlistKey =
currentUser.email + "_wishlist";

const wishlist =
JSON.parse(localStorage.getItem(wishlistKey)) || [];

if (wishlist.find(item => item.name === product.name)) {

    wishlistBtn.innerHTML =
    '<i class="fa-solid fa-heart"></i>';

    wishlistBtn.querySelector("i").style.color = "#ff1744";

}

wishlistBtn.addEventListener("click", () => {

    let wishlist = JSON.parse(
        localStorage.getItem(wishlistKey)
    ) || [];

    const exists = wishlist.find(
        item => item.name === product.name
    );

    if (exists) {

        alert("Product already in wishlist.");
        return;

    }

    wishlist.push({

        name: product.name,
        price: Number(product.price),
        image: selectedImage

    });

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );

    // Turn current page heart red immediately
    wishlistBtn.innerHTML =
    '<i class="fa-solid fa-heart"></i>';

    wishlistBtn.querySelector("i").style.color =
    "#ff1744";

    updateWishlistIcon();
    
});
