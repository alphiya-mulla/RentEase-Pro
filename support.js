const supportForm = document.getElementById("supportForm");
const productInput = document.getElementById("product");

// Get selected product
const selectedProduct =
JSON.parse(localStorage.getItem("selectedProduct")) || "";

// Show product name in input
productInput.value = selectedProduct.name;

// Submit Support Request
supportForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const issue =
    document.getElementById("issue").value;

    const description =
    document.getElementById("description").value.trim();

    if (!issue || !description) {
        alert("Please fill all fields.");
        return;
    }

    const currentUser =
JSON.parse(localStorage.getItem("loggedInUser"));

const supportKey =
currentUser.email + "_supportRequests";

let requests =
JSON.parse(localStorage.getItem(supportKey)) || [];

    requests.unshift({

        requestId: "SR" + Date.now(),

        product: selectedProduct.name,

        issue: issue,

        description: description,

        status: "Pending",

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem(
        supportKey,
        JSON.stringify(requests)
    );

    alert("Support request submitted successfully!");

    // Clear selected product after submit
    localStorage.removeItem("selectedProduct");

    window.location.href = "history.html";

});