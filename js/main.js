// Mobile menu toggle
function openNav() {
    document.getElementById("overlay-nav").style.height = "100%";
}

function closeNav() {
    document.getElementById("overlay-nav").style.height = "0%";
}

// Adding shadow to header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(11, 11, 25, 0.95)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(11, 11, 25, 0.8)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});