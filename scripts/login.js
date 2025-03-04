// This script prevents the default form submission and redirects to the home page 
// if both email and password are provided. If either is missing, 
// an alert prompts the user to enter both.

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); 

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (email && password) {
                window.location.href = "index.html";
            } else {
                alert("Please enter both email and password.");
            }
        });
    }
});
