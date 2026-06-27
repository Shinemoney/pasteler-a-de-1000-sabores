document.addEventListener("DOMContentLoaded", () => {

    const validarFormulario = (e) => {
        const form = e.target;
        const inputs = form.querySelectorAll("input, select, textarea");
        let esValido = true;

        inputs.forEach(input => {
            // Eliminar errores anteriores
            input.style.border = "1px solid #FFC0CB"; 

            // Validar si está vacío
            if (input.value.trim() === "") {
                input.style.border = "2px solid red";
                esValido = false;
            }
            
            
        });

        if (!esValido) {
            e.preventDefault();
            alert("Por favor, completa todos los campos correctamente.");
        } else {
            // Lógica si el formulario es válido
            if (form.id === "form-registro") {
                e.preventDefault();
                const usuario = {
                    email: document.getElementById("reg-email").value,
                    pass: document.getElementById("reg-password").value,
                    nombre: document.getElementById("reg-nombre").value
                };
                localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
                alert("¡Registro exitoso!");
                window.location.href = "login.html";
            } 
            else if (form.id === "form-login") {
                e.preventDefault();
                const user = JSON.parse(localStorage.getItem("usuarioRegistrado"));
                const email = document.getElementById("login-email").value;
                const pass = document.getElementById("login-pass").value;

                if (user && user.email === email && user.pass === pass) {
                    alert("¡Bienvenido!");
                    window.location.href = "index.html";
                } else {
                    alert("Error: Correo o contraseña incorrectos.");
                    form.querySelectorAll("input").forEach(i => i.style.border = "2px solid red");
                }
            }
        }
    };

    // Asignar a todos los formularios de tu proyecto
    const formularios = ["form-registro", "form-login", "form-contacto"];
    formularios.forEach(id => {
        const f = document.getElementById(id);
        if (f) f.addEventListener("submit", validarFormulario);
    });
});