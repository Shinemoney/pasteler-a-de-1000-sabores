// Funciones de validación
const noVacio = (valor) => valor && valor.trim() !== '';
const esEmail = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
const esCorreoDuoc = (valor) => valor.endsWith('@duocuc.cl');

const reglasConfig = {
    'form-registro': [
        { id: 'reg-run', validar: noVacio, mensaje: 'RUN es requerido' },
        { id: 'reg-nombre', validar: noVacio, mensaje: 'Nombre es requerido' },
        { id: 'reg-apellidos', validar: noVacio, mensaje: 'Apellidos son requeridos' },
        { id: 'reg-email', validar: esEmail, mensaje: 'Ingrese un correo válido' },
        { id: 'reg-email-inst', validar: (v) => v === '' || esCorreoDuoc(v), mensaje: 'Institucional debe ser @duocuc.cl' },
        { id: 'reg-region', validar: noVacio, mensaje: 'Seleccione una región' },
        { id: 'reg-comuna', validar: noVacio, mensaje: 'Seleccione una comuna' },
        { id: 'reg-direccion', validar: noVacio, mensaje: 'Dirección es requerida' }
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
            if (campo) {
                if (!regla.validar(campo.value)) {
                    campo.style.borderColor = '#e1306c';
                    esValido = false;
                } else {
                    campo.style.borderColor = '#ccc';
                }
            }
        });

        if (esValido) {
            // Lógica de descuento solo en registro
            if (formId === 'form-registro') {
                const codigo = document.getElementById('reg-codigo').value.trim();
                if (codigo === 'FELICES50') {
                    localStorage.setItem('codigo_aplicado', 'FELICES50');
                } else {
                    localStorage.removeItem('codigo_aplicado');
                }
            }

            if(successBanner) {
                successBanner.style.display = 'block';
                successBanner.textContent = "¡Enviado con éxito!";
            }
            form.reset();
            setTimeout(() => { if(successBanner) successBanner.style.display = 'none'; }, 4000);
        } else {
            alert("Por favor, revisa los campos en rojo.");
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarFormulario('form-registro', 'registro-success');
    inicializarFormulario('form-contacto', 'contacto-success');
});