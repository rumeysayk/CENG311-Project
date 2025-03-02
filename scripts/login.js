document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Formun varsayılan davranışını engelle

            // Email ve şifre alanlarını al
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (email && password) {
                // Eğer giriş bilgileri girilmişse yönlendirme yap
                window.location.href = "index.html";
            } else {
                alert("Please enter both email and password.");
            }
        });
    }
});
