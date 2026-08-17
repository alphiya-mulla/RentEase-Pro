const productName = document.getElementById("productName");
const reviewsContainer = document.getElementById("reviewsContainer");
const submitReview = document.getElementById("submitReview");

// Get product name from URL
const params = new URLSearchParams(window.location.search);
const product = params.get("product") || "Product";

productName.textContent = product;

// Load all reviews
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

// Show Reviews
function loadReviews(){

    reviewsContainer.innerHTML = "";

    const productReviews = reviews.filter(
        review => review.product === product
    );

    if(productReviews.length === 0){

        reviewsContainer.innerHTML = `

        <div class="no-review">

            <i class="fa-solid fa-star"></i>

            <h3>No Reviews Yet</h3>

            <p>Be the first to review this product.</p>

        </div>

        `;

        return;
    }

    productReviews.forEach(review=>{

        let stars = "";

        for(let i=0;i<review.rating;i++){
            stars += "⭐";
        }

        reviewsContainer.innerHTML += `

        <div class="review-card">

            <h4>${review.name}</h4>

            <div class="stars">${stars}</div>

            <p>${review.text}</p>

            <div class="date">${review.date}</div>

        </div>

        `;

    });

}

// Submit Review

submitReview.addEventListener("click",function(){

    const name = document.getElementById("reviewName").value.trim();

    const rating = Number(document.getElementById("rating").value);

    const text = document.getElementById("reviewText").value.trim();

    if(name==="" || text===""){

        alert("Please fill all fields.");

        return;

    }

    reviews.unshift({

        product:product,

        name:name,

        rating:rating,

        text:text,

        date:new Date().toLocaleDateString()

    });

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

    document.getElementById("reviewName").value="";
    document.getElementById("rating").value="5";
    document.getElementById("reviewText").value="";

    loadReviews();

    alert("Thank you for your review!");

});

// Initial Load
loadReviews();