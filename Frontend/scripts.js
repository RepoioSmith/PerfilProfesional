// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // =======================================================
    // 1. LÓGICA DEL FORMULARIO DE CONTACTO (Index.html)
    // =======================================================
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

    // =======================================================
    // 2. LÓGICA DE AUTENTICACIÓN (Login.html)
    // =======================================================
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formTitle = document.getElementById('formTitle');
    const authMessage = document.getElementById('authMessage');

    // --- A. Alternar entre Login y Registro ---
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

    // --- B. Manejo del LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const btnSubmit = loginForm.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;

            // Feedback visual
            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando...';
            btnSubmit.disabled = true;
            if(authMessage) authMessage.classList.add('d-none');

            try {
                const res = await fetch('http://127.0.0.1:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userEmail', email);
                    window.location.href = 'dashboard.html'; // Redirige al dashboard
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

    // --- C. Manejo del REGISTRO (Nuevo) ---
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
                const res = await fetch('http://127.0.0.1:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, email, password })
                });

                const data = await res.json();

                if (res.ok) {
                    // Éxito: Mensaje verde y volver al login
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

    // =======================================================
    // 3. CARGA DE REPOSITORIOS (Si aplica)
    // =======================================================
    if(document.getElementById('github-container')) {
        cargarRepositorios();
    }

});

// =======================================================
// FUNCIONES AUXILIARES (Fuera del evento principal)
// =======================================================

function mostrarErrorAuth(mensaje) {
    const authMessage = document.getElementById('authMessage');
    if (authMessage) {
        authMessage.textContent = mensaje;
        authMessage.className = 'text-center small mt-3 text-danger fw-bold'; // Clase para error rojo
        authMessage.classList.remove('d-none');
        authMessage.classList.add('animate__animated', 'animate__shakeX'); // Animación opcional si usas Animate.css
    } else {
        alert(mensaje);
    }
}

async function enviarDatosBackend() {
    // Aquí va tu lógica original para enviar el formulario de contacto
    console.log("Enviando formulario de contacto...");
    // Ejemplo:
    // const nombre = document.getElementById('nombre').value;
    // ... fetch a tu endpoint de contacto ...
    mostrarAlerta('success', 'Mensaje enviado correctamente (Simulación)');
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
    // Aquí va tu lógica para cargar repos desde GitHub
    console.log("Cargando repositorios...");
}