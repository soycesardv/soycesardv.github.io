// Lógica para el efecto de máquina de escribir
const textElement = document.querySelector('.typewriter');
const phrases = ['Cesar David Castillo Gomez','Ingeniero en Formación.', 'Software Developer.', 'Entusiasta Web3.', 'Amante de las Motos.'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!textElement) return; // Evita errores si no estamos en la home

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100; // Más rápido al borrar

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa al terminar la frase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Pasa a la siguiente frase
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Iniciar el efecto al cargar
document.addEventListener('DOMContentLoaded', type);

// --- Lógica del Formulario de Contacto ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        // 1. Evitamos que la página se recargue
        event.preventDefault();

        const btnSubmit = document.getElementById('btn-submit');
        const originalText = btnSubmit.innerText;

        // 2. Cambiamos el texto del botón para feedback visual
        btnSubmit.innerText = 'Enviando... 📨';
        btnSubmit.disabled = true;

        // 3. Capturamos los datos del formulario
        const data = new FormData(contactForm);

        try {
            // 4. Enviamos los datos a Formspree usando Fetch API
            const response = await fetch('https://formspree.io/f/mpwvrqpq', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Éxito
                alert('¡Mensaje enviado con éxito! Me pondré en contacto pronto.');
                contactForm.reset(); // Limpia los campos
            } else {
                // Error del servidor
                alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
            }
        } catch (error) {
            // Error de conexión
            alert('Error de conexión. Por favor revisa tu internet.');
        } finally {
            // 5. Restauramos el botón
            btnSubmit.innerText = originalText;
            btnSubmit.disabled = false;
        }
    });
}