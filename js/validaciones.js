// Funciones de utilidad comunes
const noVacio = (v) => v.trim() !== '';
const esEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Definición de reglas básicas para formularios
const reglasConfig = {
    'form-registro': [
        { id: 'reg-run', validar: noVacio, mensaje: 'RUN es requerido' },
        { id: 'reg-nombre', validar: noVacio, mensaje: 'Nombre es requerido' },
        { id: 'reg-apellidos', validar: noVacio, mensaje: 'Apellidos son requeridos' },
        { id: 'reg-email', validar: esEmail, mensaje: 'Ingrese un correo válido' },
        { id: 'reg-pass', validar: noVacio, mensaje: 'La contraseña es requerida' },
        { id: 'reg-pass-conf', validar: noVacio, mensaje: 'Debe confirmar su contraseña' },
        { id: 'miRegion', validar: noVacio, mensaje: 'Debe seleccionar una región' },
        { id: 'miComuna', validar: noVacio, mensaje: 'Debe seleccionar una comuna' },
        { id: 'reg-dir', validar: noVacio, mensaje: 'Dirección es requerida' }
    ],
    'form-login': [
        { id: 'login-email', validar: esEmail, mensaje: 'Ingrese un correo válido' },
        { id: 'login-pass', validar: noVacio, mensaje: 'La contraseña es obligatoria' }
    ],
    'form-contacto': [
        { id: 'cont-nombre', validar: noVacio, mensaje: 'El nombre es obligatorio' },
        { id: 'cont-email', validar: esEmail, mensaje: 'Ingrese un correo válido' },
        { id: 'cont-mensaje', validar: noVacio, mensaje: 'El mensaje no puede estar vacío' }
    ]
};

function inicializarFormulario(formId, successId) {
    const form = document.getElementById(formId);
    const successBanner = document.getElementById(successId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let esValido = true;
        const reglas = reglasConfig[formId];

        // 1. Validar campos obligatorios
        reglas.forEach(regla => {
            const campo = document.getElementById(regla.id);
            const errorDiv = document.getElementById('err-' + regla.id);
            if (!regla.validar(campo.value)) {
                campo.style.borderColor = '#e1306c';
                if(errorDiv) errorDiv.style.display = 'block';
                esValido = false;
            } else {
                campo.style.borderColor = '#ccc';
                if(errorDiv) errorDiv.style.display = 'none';
            }
        });

        // 2. Lógica específica según el formulario
        if (esValido) {
            
            // Lógica de Registro (Guardar en localStorage)
            if (formId === 'form-registro') {
                if (document.getElementById('reg-pass').value !== document.getElementById('reg-pass-conf').value) {
                    document.getElementById('err-reg-pass-conf').textContent = "Las contraseñas no coinciden";
                    document.getElementById('err-reg-pass-conf').style.display = 'block';
                    return;
                }
                const email = document.getElementById('reg-email').value;
                const pass = document.getElementById('reg-pass').value;
                localStorage.setItem('usuarioRegistrado', JSON.stringify({ email, pass }));
            }

            // Lógica de Login (Validar contra localStorage)
            if (formId === 'form-login') {
                const emailInput = document.getElementById('login-email').value;
                const passInput = document.getElementById('login-pass').value;
                const user = JSON.parse(localStorage.getItem('usuarioRegistrado'));

                if (user && emailInput === user.email && passInput === user.pass) {
                    successBanner.textContent = "¡Inicio de sesión exitoso!";
                    successBanner.style.display = 'block';
                } else {
                    document.getElementById('err-login-pass').textContent = "Correo o contraseña no coinciden.";
                    document.getElementById('err-login-pass').style.display = 'block';
                    return;
                }
            }

            // Éxito común para todos
            if(successBanner) successBanner.style.display = 'block';
            form.reset();
            if(formId === 'form-registro' && typeof iniciarSelectores === 'function') iniciarSelectores('miRegion', 'miComuna');
            setTimeout(() => { if(successBanner) successBanner.style.display = 'none'; }, 5000);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarFormulario('form-registro', 'registro-success');
    inicializarFormulario('form-login', 'login-success');
    inicializarFormulario('form-contacto', 'contacto-success');
});