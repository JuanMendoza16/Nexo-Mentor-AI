const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const switcherText = document.getElementById('switcherText');
const switcherToLogin = document.getElementById('switcherToLogin');

// Cambiar a formulario de registro
switchToRegister.addEventListener('click', () => {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
    formTitle.textContent = 'Registrarse';
    switcherText.style.display = 'none';
    switcherToLogin.style.display = 'block';
    // Ajustar aria-expanded
    switchToRegister.setAttribute('aria-expanded', 'false');
    switchToLogin.setAttribute('aria-expanded', 'true');
});

// Cambiar a formulario de inicio de sesión
switchToLogin.addEventListener('click', () => {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    formTitle.textContent = 'Iniciar Sesión';
    switcherText.style.display = 'block';
    switcherToLogin.style.display = 'none';
    // Ajustar aria-expanded
    switchToLogin.setAttribute('aria-expanded', 'false');
    switchToRegister.setAttribute('aria-expanded', 'true');
});

// Validación simple login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const email = loginForm.loginEmail.value.trim();
    const password = loginForm.loginPassword.value.trim();

    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';

    if (!email) {
        document.getElementById('loginEmailError').textContent = 'El correo es obligatorio.';
        valid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Correo no válido.';
        valid = false;
    }
    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'La contraseña es obligatoria.';
        valid = false;
    }

    if (valid) {
        alert('Inicio de sesión exitoso (simulado)');
        loginForm.reset();
    }
});

// Validación simple registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = registerForm.registerName.value.trim();
    const email = registerForm.registerEmail.value.trim();
    const password = registerForm.registerPassword.value.trim();

    document.getElementById('registerNameError').textContent = '';
    document.getElementById('registerEmailError').textContent = '';
    document.getElementById('registerPasswordError').textContent = '';

    if (!name) {
        document.getElementById('registerNameError').textContent = 'El nombre es obligatorio.';
        valid = false;
    }
    if (!email) {
        document.getElementById('registerEmailError').textContent = 'El correo es obligatorio.';
        valid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('registerEmailError').textContent = 'Correo no válido.';
        valid = false;
    }
    if (!password) {
        document.getElementById('registerPasswordError').textContent = 'La contraseña es obligatoria.';
        valid = false;
    }

    if (valid) {
        alert('Registro exitoso (simulado)');
        registerForm.reset();
        // Volver a login
        switchToLogin.click();
    }
});

function validateEmail(email) {
    // Simple regex para validar email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Google Sign-In callback
function handleCredentialResponse(response) {
    // Decodifica el token JWT para obtener datos del usuario si quieres
    console.log('JWT ID token:', response.credential);
    alert('Inicio de sesión con Google exitoso (simulado). Token:\n' + response.credential);
    // Aquí puedes enviar el token a tu backend para autenticar o registrar al usuario
}

// Inicializa el botón de Google
window.onload = function () {
    google.accounts.id.initialize({
        client_id: 'TU_CLIENT_ID_AQUI',
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: false
    });
    google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { theme: 'outline', size: 'large', text: 'signin_with' }  // estilos del botón
    );
    google.accounts.id.prompt(); // show the One Tap prompt (opcional)
}