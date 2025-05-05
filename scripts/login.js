/**
 * This script handles:
 * - Login form validation using jQuery Validation Plugin
 * - Redirects to homepage if credentials are provided
 * - Shows error messages if validation fails
 * - Enhances the "Remember me" checkbox using jQuery UI's Checkboxradio for better UI feedback
 *
 * Technologies: JavaScript, jQuery, jQuery Validation, jQuery UI
 */

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
            // If everything is correct redirect to index.html
            window.location.href = "index.html";
        }
    });
});

$(function () {
    $("#remember").checkboxradio({
        icon: true
    });
});