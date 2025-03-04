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
