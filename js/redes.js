// js/redes.js
document.addEventListener('DOMContentLoaded', () => {
    // Buscamos los enlaces
    const socialLinks = document.querySelectorAll('.social-link')
    
    // Si no existen iconos en la página actual, el script simplemente no hace nada
    if (socialLinks.length === 0) return

    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log("Redirigiendo a: " + link.href);
        })
    })
})