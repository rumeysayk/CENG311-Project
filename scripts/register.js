document.addEventListener("DOMContentLoaded", function () {
    // Butonu seç
    const createAccountBtn = document.querySelector(".create-account-btn");

    if (createAccountBtn) {
        // Butona tıklanınca yönlendirme yap
        createAccountBtn.addEventListener("click", function (event) {
            event.preventDefault();
            
            // Form doğrulamasını kontrol et
            const form = document.getElementById("register-form");
            if (form.checkValidity()) {
                window.location.href = "index.html"; 
            } else {
                form.reportValidity(); // Eksik alanları göster
            }
        });
    }
});
