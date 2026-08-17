const productName = document.getElementById("productName");
const deliveryDate = document.getElementById("deliveryDate");


// Get order history
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const history = JSON.parse(
    localStorage.getItem(`history_${currentUser.email}`)
) || [];

const latestOrder = history[0];

if (!latestOrder) {
    alert("No order found");
    window.location.href = "history.html";
}

productName.innerHTML = "";

latestOrder.items.forEach(item => {

    productName.innerHTML += `<div>${item.name}</div>`;

});


if(latestOrder){

    // Estimated delivery = Order date + 3 days
    const orderDate = new Date(latestOrder.date);

    const estimated = new Date(orderDate);

    estimated.setDate(estimated.getDate() + 3);

    deliveryDate.textContent = estimated.toDateString();

    // Days passed
    const today = new Date();

    const days = Math.floor(
        (today - orderDate) / (1000 * 60 * 60 * 24)
    );

    const steps = document.querySelectorAll(".step");

    // Remove previous classes
    steps.forEach(step=>{
        step.classList.remove("completed","active");
    });

    if(days <= 0){

        steps[0].classList.add("active");

    }

    else if(days == 1){

        steps[0].classList.add("completed");
        steps[1].classList.add("active");

    }

    else if(days == 2){

        steps[0].classList.add("completed");
        steps[1].classList.add("completed");
        steps[2].classList.add("active");

    }

    else{

        steps[0].classList.add("completed");
        steps[1].classList.add("completed");
        steps[2].classList.add("completed");
        steps[3].classList.add("completed");

    }

}