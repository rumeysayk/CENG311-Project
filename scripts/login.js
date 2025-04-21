// This script validates the login form using jQuery Validation Plugin
// If valid, redirects to homepage. Otherwise, shows error messages.

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

$(document).ready(function () {
    $("#loginForm").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: "required"
        },
        messages: {
            email: {
                required: "Please enter your email.",
                email: "Enter a valid email."
            },
            password: "Please enter your password."
        },
        submitHandler: function (form) {
            // Eğer her şey doğruysa index.html'ye yönlendir
            window.location.href = "index.html";
        }
    });
});
