// jQuery script to initialize a responsive Slick carousel for featured topics 
// and apply a custom scrollbar to the discussions section using OverlayScrollbars.

$(document).ready(function () {
    // Initialize Slick carousel for Featured Topics
    $('.featured-container').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Initialize OverlayScrollbars for Discussions section
    OverlayScrollbars(document.querySelectorAll('.discussion-list'), {
        className: "os-theme-dark",
        scrollbars: {
            autoHide: "leave",
            clickScrolling: true
        }
    });
});
