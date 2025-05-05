/**
 * This script handles registration form validation and submission behavior.
 * 
 * Features:
 * - Validates the form when "Create Account" is clicked using both HTML5 and jQuery Validation Plugin.
 * - If the form is valid, it redirects to the homepage (index.html).
 * - Displays missing field messages if the form is incomplete.
 * - Uses jQuery UI's Checkboxradio to enhance the "Terms & Conditions" checkbox appearance.
 * 
 * Technologies: Vanilla JS, jQuery Validation Plugin, jQuery UI Checkboxradio
 */

document.addEventListener("DOMContentLoaded", function () {
    const createAccountBtn = document.querySelector(".create-account-btn");

    if (createAccountBtn) {
        createAccountBtn.addEventListener("click", function (event) {
            event.preventDefault();

            const form = document.getElementById("register-form");
            if (form.checkValidity()) {
                window.location.href = "index.html";
            } else {
                form.reportValidity();
            }
        });
    }
});

$(document).ready(function () {
    $("#register-form").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            password: "required",
            terms: "required"
        },
        messages: {
            firstname: "Please enter your first name.",
            lastname: "Please enter your last name.",
            email: {
                required: "Please enter your email address.",
                email: "Please enter a valid email."
            },
            password: "Please enter a password.",
            terms: "You must agree to the Terms & Conditions."
        },
        submitHandler: function (form) {
            window.location.href = "index.html";
        }
    });
});

$(function () {
    // Apply jQuery UI checkboxradio styling
    $("#terms").checkboxradio();
});