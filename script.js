// Script para el Menú Hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

// Abrir/cerrar menú hamburguesa
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Cambiar la opacidad del header al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Carrusel de imágenes
(function () {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slider-section');
    const btnLeft = document.querySelector('.btn-left');
    const btnRight = document.querySelector('.btn-right');

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');

            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else if (index === (currentIndex + 1) % slides.length) {
                slide.classList.add('next');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    btnLeft.addEventListener('click', prevSlide);
    btnRight.addEventListener('click', nextSlide);

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > 50) {
            prevSlide();
        } else if (swipeDistance < -50) {
            nextSlide();
        }
    });

    updateSlider();
})();

// Modal para imágenes
function openImageModal(imageSrc) {
    const modal = document.getElementById('fullscreen-modal');
    const fullImage = document.getElementById('fullscreen-image');
    fullImage.src = imageSrc;
    modal.style.display = 'flex';
}

function closeImageModal() {
    const modal = document.getElementById('fullscreen-modal');
    modal.style.display = 'none';
}

document.getElementById('fullscreen-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('fullscreen-modal')) {
        closeImageModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Modal para el mensaje de éxito
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'flex';
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
}

document.getElementById('success-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('success-modal')) {
        closeSuccessModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSuccessModal();
    }
});

// Formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = this.nombre.value.trim();
    const apellido = this.apellido.value.trim();
    const email = this.email.value.trim();
    const asunto = this.asunto.value.trim();
    const mensaje = this.mensaje.value.trim();

    if (!/^[A-Za-z\s]{3,50}$/.test(nombre)) {
        showMessage('¿Nos decís tu nombre? Tiene que tener al menos 3 letras. 😊', 'error');
        return;
    }

    if (!/^[A-Za-z\s]{3,50}$/.test(apellido)) {
        showMessage('Falta tu apellido. ¡Sin números ni símbolos, porfa! 🧐', 'error');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage('Ese correo no parece válido. ¿Lo revisás otra vez? 📧', 'error');
        return;
    }

    if (asunto.length < 5) {
        showMessage('Danos una pista con el asunto. ¡Queremos saber de qué se trata! 🔍', 'error');
        return;
    }

    if (mensaje.length < 10) {
        showMessage('¡Contanos más! Queremos conocer todos los detalles. 🗣️', 'error');
        return;
    }

    emailjs.sendForm('service_tevdlxc', 'template_oq4yah8', this)
        .then(() => {
            showSuccessModal();
            this.reset();
        }, (error) => {
            showMessage('Uy, algo salió mal al enviar el mensaje. Probá de nuevo en un rato. ⏳', 'error');
            console.error('Error:', error);
        });
});


// Función para mostrar mensajes
function showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}