// Script para el Menú Hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a'); // Selecciona todos los enlaces del menú

// Abrir/cerrar menú hamburguesa
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active'); // Cierra el menú
        hamburger.classList.remove('active'); // Vuelve el ícono a su estado original
    });
});

// Cambiar la opacidad del header al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Cambia la opacidad después de 50px de scroll
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});


// Carrusel
const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector(".carruseles"),
      slides = document.querySelectorAll(".slider-section");

let currentIndex = 0;

// Función para mover el carrusel
function moveSlide(direction) {
    if (direction === 'right') {
        currentIndex = (currentIndex + 1) % slides.length;
    } else {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Eventos
btnLeft.addEventListener("click", () => moveSlide('left'));
btnRight.addEventListener("click", () => moveSlide('right'));

// Autoplay (opcional)
setInterval(() => moveSlide('right'), 5000);