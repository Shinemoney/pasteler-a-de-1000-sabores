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
        { id: 'reg-dir', validar: noVacio, mensaje: 'Dirección es requerida' },
        { id: 'reg-fecha-nac', validar: noVacio, mensaje: 'Fecha de nacimiento es requerida' },
        { id: 'reg-codigo', validar: () => true, mensaje: '' },
        { id: 'reg-email-duoc', validar: (v) => v === '' || esCorreoDuoc(v), mensaje: 'Correo institucional inválido' }
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

        reglas.forEach(regla => {
            const campo = document.getElementById(regla.id);
            const errorDiv = document.getElementById('err-' + regla.id);
            if (campo && !regla.validar(campo.value)) {
                campo.style.borderColor = '#e1306c';
                if(errorDiv) {
                    errorDiv.textContent = regla.mensaje;
                    errorDiv.style.display = 'block';
                }
                esValido = false;
            } else if (campo) {
                campo.style.borderColor = '#ccc';
                if(errorDiv) errorDiv.style.display = 'none';
            }
        });

        if (esValido) {
            if (formId === 'form-registro') {
                if (document.getElementById('reg-pass').value !== document.getElementById('reg-pass-conf').value) {
                    const confError = document.getElementById('err-reg-pass-conf');
                    confError.textContent = "Las contraseñas no coinciden";
                    confError.style.display = 'block';
                    return;
                }
                // Aquí podrías guardar otros datos adicionales en el objeto usuario
                localStorage.setItem('usuarioRegistrado', JSON.stringify({ email: document.getElementById('reg-email').value }));
            }
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
    if (typeof iniciarSelectores === 'function') iniciarSelectores('miRegion', 'miComuna');
});