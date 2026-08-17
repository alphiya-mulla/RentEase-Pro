const search=document.getElementById("search");
const searchBtn=document.getElementById("searchBtn");



function darkMode(){
document.body.classList.toggle("dark");
}

var count = 0;

var interval = setInterval(function(){

count += 25;

document.getElementById("users").innerHTML = count;

if(count >= 5000){
clearInterval(interval);
}

},10);

function searchProducts(){
    const text=search.value.trim();
    if(text !== ""){
        window.location.href="products.html?search="+encodeURIComponent(text);
    }
}

searchBtn.addEventListener("click",searchProducts);
search.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        searchProducts();
    }
});


const profileLink = document.getElementById("profileLink");

if(profileLink){

    profileLink.addEventListener("click", function(e){

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        if(user){
            window.location.href = "profile.html";
        }
        else{
            window.location.href = "login.html";
        }

    });

}

// ---------------- CREATE DEFAULT NOTIFICATIONS ----------------

let notifications =
JSON.parse(localStorage.getItem("notifications")) || [];

// ---------- Special Offer ----------

if (!notifications.some(n => n.title === "Special Offer")) {

    notifications.push({

        icon: "fa-gift",

        title: "Special Offer",

        message: "Get 10% OFF when you extend your rental period.",

        time: "Today"

    });

}

// ---------- Rental Reminder ----------

if (!notifications.some(n => n.title === "Rental Reminder")) {

    notifications.push({

        icon: "fa-clock",

        title: "Rental Reminder",

        message: "Your rented products may be nearing their end date. Check your orders to extend your rental if needed.",

        time: "Today"

    });

}

localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
);

updateNotificationBadge();


const slider = document.getElementById("bannerSlider");
const slides = document.querySelectorAll(".banner-slide");

let index = 0;

setInterval(() => {
    index++;

    if (index >= slides.length) {
        index = 0;
    }

    slider.style.transform = `translateX(-${index * 100}%)`;

}, 3000);