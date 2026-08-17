const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        alert("No account found! Please create an account first.");
        window.location.href = "signup.html";
        return;
    }

    // Find matching user
    const user = users.find(u =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    // Save current logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login Successful!");

    const deliveryKey = `${user.email}_delivery`;

const savedDelivery = localStorage.getItem(deliveryKey);

if (savedDelivery) {
    window.location.href = "delivery.html";
} else {
    window.location.href = "delivery.html";
}

return;

    // Redirect to previous page if available
    const redirectPage =
        localStorage.getItem("redirectAfterLogin") ||
        "delivery.html";

    localStorage.removeItem("redirectAfterLogin");

    window.location.href = redirectPage;

});