const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Username Validation
    if (username === "") {
        alert("Please enter your username.");
        return;
    }

    // Email Validation
    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    // Mobile Validation
    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // Password Validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    // Confirm Password
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Get all registered users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("This email is already registered.");
        return;
    }

    // New User Object
    const newUser = {
        username,
        email,
        mobile,
        password
    };

    // Save user
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";

});