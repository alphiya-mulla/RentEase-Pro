// Check Login
const user = JSON.parse(localStorage.getItem("loggedInUser"));

const profileContainer = document.getElementById("profileContainer");
const loginMessage = document.getElementById("loginMessage");

// safer check
if (!user || !user.email) {

    if (profileContainer) profileContainer.style.display = "none";
    if (loginMessage) loginMessage.style.display = "block";

} else {

    if (loginMessage) loginMessage.style.display = "none";
    if (profileContainer) profileContainer.style.display = "block";

    // Display User Details safely
    document.getElementById("profile-name").textContent = user.username;
    document.getElementById("profile-email").textContent = user.email;
    document.getElementById("profile-phone").textContent = user.mobile;
}
// Logout
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    window.location.href = "index.html";

});
}