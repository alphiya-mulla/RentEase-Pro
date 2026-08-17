const deliveryForm = document.getElementById("deliveryForm");

// Check login
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {

    alert("Please login first.");

    localStorage.setItem("redirectAfterLogin", "delivery.html");

    window.location.href = "login.html";

}

const deliveryKey = currentUser.email + "_delivery";

// ================= SAVE ADDRESS =================

deliveryForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const house = document.getElementById("house").value.trim();
    const street = document.getElementById("street").value.trim();
    const landmark = document.getElementById("landmark").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const instruction = document.getElementById("instruction").value.trim();

    if (mobile.length !== 10 || isNaN(mobile)) {

        alert("Please enter a valid 10-digit mobile number.");

        return;

    }

    if (pincode.length !== 6 || isNaN(pincode)) {

        alert("Please enter a valid 6-digit PIN code.");

        return;

    }

    const deliveryDetails = {

        fullname,
        mobile,
        house,
        street,
        landmark,
        city,
        state,
        pincode,
        instruction

    };

    localStorage.setItem(
        deliveryKey,
        JSON.stringify(deliveryDetails)
    );

    alert("Delivery details saved successfully!");

    localStorage.setItem("paymentType", "order");

    window.location.href = "payment.html";

});

// ================= LOAD SAVED ADDRESS =================

const savedDetails = JSON.parse(
    localStorage.getItem(deliveryKey)
);

const savedBox =
document.getElementById("savedAddressBox");

const savedAddress =
document.getElementById("savedAddress");

if (savedDetails) {

    savedBox.style.display = "block";

    deliveryForm.style.display = "none";

    savedAddress.innerHTML = `

        <p><b>${savedDetails.fullname}</b></p>

        <p>${savedDetails.mobile}</p>

        <p>

            ${savedDetails.house},
            ${savedDetails.street},
            ${savedDetails.landmark}

        </p>

        <p>

            ${savedDetails.city},
            ${savedDetails.state} -
            ${savedDetails.pincode}

        </p>

    `;

}

// ================= DELIVER HERE =================

document.getElementById("deliverBtn").onclick = function () {

    localStorage.setItem("paymentType", "order");

    window.location.href = "payment.html";

};

// ================= CHANGE ADDRESS =================

document.getElementById("changeBtn").onclick = function () {

    savedBox.style.display = "none";

    deliveryForm.style.display = "block";

    if (savedDetails) {

        document.getElementById("fullname").value = savedDetails.fullname;
        document.getElementById("mobile").value = savedDetails.mobile;
        document.getElementById("house").value = savedDetails.house;
        document.getElementById("street").value = savedDetails.street;
        document.getElementById("landmark").value = savedDetails.landmark;
        document.getElementById("city").value = savedDetails.city;
        document.getElementById("state").value = savedDetails.state;
        document.getElementById("pincode").value = savedDetails.pincode;
        document.getElementById("instruction").value = savedDetails.instruction;

    }

};