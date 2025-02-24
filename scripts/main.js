window.addEventListener('DOMContentLoaded', (event) => {
    const currentPage = window.location.pathname; // Mevcut sayfanın yolunu al
    const navLinks = document.querySelectorAll('.nav-links li a'); // Navbar linklerini seç

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active'); // Mevcut sayfaya ait linke 'active' sınıfını ekle
        } else {
            link.classList.remove('active'); // Diğer linklerden 'active' sınıfını kaldır
        }
    });
});
