// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Validaciones de Bootstrap y lógica propia
            if (contactForm.checkValidity()) {
                enviarDatosBackend(); // Llama a tu función auxiliar
            }
            contactForm.classList.add('was-validated');
        });
    }

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formTitle = document.getElementById('formTitle');
    const authMessage = document.getElementById('authMessage');

    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');

    if (showRegisterBtn && showLoginBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('d-none');
            registerForm.classList.remove('d-none');
            formTitle.textContent = "Crear Cuenta";
            if(authMessage) authMessage.classList.add('d-none');
        });

        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.add('d-none');
            loginForm.classList.remove('d-none');
            formTitle.textContent = "Bienvenido";
            if(authMessage) authMessage.classList.add('d-none');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const btnSubmit = loginForm.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;

            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando...';
            btnSubmit.disabled = true;
            if(authMessage) authMessage.classList.add('d-none');

            try {
                const res = await fetch('https://perfilprofesional-i6jz.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userEmail', email);
                    window.location.href = 'dashboard.html'; // Redirecciona al dashboard
                } else {
                    mostrarErrorAuth(data.error || 'Credenciales incorrectas');
                }
            } catch (error) {
                console.error(error);
                mostrarErrorAuth('Error de conexión con el servidor');
            } finally {
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('regNombre').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const btnSubmit = registerForm.querySelector('button');
            const originalText = btnSubmit.innerHTML;

            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creando...';
            btnSubmit.disabled = true;
            if(authMessage) authMessage.classList.add('d-none');

            try {
                const res = await fetch('https://perfilprofesional-i6jz.onrender.com/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, email, password })
                });

                const data = await res.json();

                if (res.ok) {
                    // Éxito: Mensaje verde y regresa al login
                    authMessage.textContent = '¡Cuenta creada! Por favor inicia sesión.';
                    authMessage.className = 'text-center small mt-3 text-success fw-bold';
                    authMessage.classList.remove('d-none');
                    
                    registerForm.reset();
                    setTimeout(() => {
                        showLoginBtn.click(); 
                    }, 1500);
                } else {
                    mostrarErrorAuth(data.error || 'Error al registrarse');
                }
            } catch (error) {
                console.error(error);
                mostrarErrorAuth('Error de conexión con el servidor');
            } finally {
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }
        });
    }

    if(document.getElementById('github-container')) {
        cargarRepositorios();
    }

});


function mostrarErrorAuth(mensaje) {
    const authMessage = document.getElementById('authMessage');
    if (authMessage) {
        authMessage.textContent = mensaje;
        authMessage.className = 'text-center small mt-3 text-danger fw-bold';
        authMessage.classList.remove('d-none');
        authMessage.classList.add('animate__animated', 'animate__shakeX'); 
    } else {
        alert(mensaje);
    }
}

async function enviarDatosBackend() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const btnSubmit = document.getElementById('btnSubmit');
    const originalText = btnSubmit.innerHTML;

    // 1. Feedback visual (Cargando...)
    btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    btnSubmit.disabled = true;

    try {
        const response = await fetch("https://formspree.io/f/maqjkwnb", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nombre,
                _replyto: email,
                message: mensaje
            })
        });

        if (response.ok) {
            // 3. Éxito
            mostrarAlerta('success', '¡Mensaje enviado! Te contactaré pronto.');
            document.getElementById('contactForm').reset(); // Limpiar formulario
            document.getElementById('contactForm').classList.remove('was-validated');
        } else {
            // 4. Error del servicio
            mostrarAlerta('danger', 'Hubo un problema al enviar el mensaje. Inténtalo más tarde.');
        }
    } catch (error) {
        // 5. Error de red
        console.error(error);
        mostrarAlerta('danger', 'Error de conexión. Verifica tu internet.');
    } finally {
        // Restaurar botón
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
    }
}

function mostrarAlerta(tipo, mensaje) {
    const alertBox = document.getElementById('formAlert');
    if (alertBox) {
        alertBox.className = `alert alert-${tipo} mt-3`;
        alertBox.textContent = mensaje;
        alertBox.classList.remove('d-none');
    } else {
        alert(mensaje);
    }
}

async function cargarRepositorios() {
    console.log("Cargando repositorios...");
}