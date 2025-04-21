// This script checks if the registration form is valid when the "Create Account" button is clicked. 
// If valid, it redirects to the homepage. If invalid, it shows the missing fields.
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
