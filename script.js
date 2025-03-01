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



//modal diseños:
// Función para abrir el modal con la imagen
// Función para abrir el modal con la imagen
function openModal(imageSrc) {
    const modal = document.getElementById('fullscreen-modal');
    const fullImage = document.getElementById('fullscreen-image');
    fullImage.src = imageSrc; // Establecemos la imagen
    modal.style.display = 'flex'; // Mostramos el modal
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('fullscreen-modal');
    modal.style.display = 'none'; // Ocultamos el modal
}

// Cerrar el modal al hacer clic fuera de la imagen
document.getElementById('fullscreen-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('fullscreen-modal')) {
        closeModal(); // Cierra el modal si se hace clic en el fondo
    }
});

// Cerrar el modal al presionar la tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { // Si la tecla es Escape
        closeModal(); // Cierra el modal
    }
});







// Función para mostrar mensajes de error
function showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');

    // Crear el mensaje
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;

    // Agregar el mensaje al contenedor
    messageContainer.appendChild(messageElement);

    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Función para mostrar el modal de éxito
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'flex'; // Mostrar el modal
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none'; // Ocultar el modal
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener los valores de los campos
    const nombre = this.nombre.value.trim();
    const apellido = this.apellido.value.trim();
    const email = this.email.value.trim();
    const asunto = this.asunto.value.trim();
    const mensaje = this.mensaje.value.trim();

    // Validar nombre
    if (!/^[A-Za-z\s]{3,50}$/.test(nombre)) {
        showMessage('El nombre debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios.', 'error');
        return;
    }

    // Validar apellido
    if (!/^[A-Za-z\s]{3,50}$/.test(apellido)) {
        showMessage('El apellido debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios.', 'error');
        return;
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage('Por favor, introduce un correo electrónico válido.', 'error');
        return;
    }

    // Validar asunto
    if (asunto.length < 5 || asunto.length > 100) {
        showMessage('El asunto debe tener entre 5 y 100 caracteres.', 'error');
        return;
    }

    // Validar mensaje
    if (mensaje.length < 10 || mensaje.length > 500) {
        showMessage('El mensaje debe tener entre 10 y 500 caracteres.', 'error');
        return;
    }

    // Enviar el formulario
    emailjs.sendForm('service_tevdlxc', 'template_oq4yah8', this)
        .then(() => {
            showSuccessModal(); // Mostrar el modal de éxito
            this.reset(); // Limpiar el formulario después de un envío exitoso
        }, (error) => {
            showMessage('Error al enviar el formulario. Por favor, inténtalo de nuevo.', 'error');
            console.error('Error:', error);
        });
});