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


const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slider-section');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');

let currentIndex = 0;

(function () {
    // Seleccionar elementos del DOM
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slider-section');
    const btnLeft = document.querySelector('.btn-left');
    const btnRight = document.querySelector('.btn-right');

    // Variables para el control del carrusel
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Función para actualizar el carrusel
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');

            if (index === currentIndex) {
                slide.classList.add('active'); // Imagen central
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('prev'); // Imagen izquierda
            } else if (index === (currentIndex + 1) % slides.length) {
                slide.classList.add('next'); // Imagen derecha
            }
        });
    }

    // Función para avanzar
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    // Función para retroceder
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Eventos para los botones
    btnLeft.addEventListener('click', prevSlide);
    btnRight.addEventListener('click', nextSlide);

    // Eventos táctiles para móviles
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX; // Registra la posición inicial del toque
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX; // Registra la posición final del toque
    });

    slider.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX; // Calcula la distancia del deslizamiento

        if (swipeDistance > 50) {
            // Deslizamiento hacia la derecha (retroceder)
            prevSlide();
        } else if (swipeDistance < -50) {
            // Deslizamiento hacia la izquierda (avanzar)
            nextSlide();
        }
    });

    // Inicializar el carrusel
    updateSlider();
})();