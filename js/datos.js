// js/datos.js
const regionesYComunas = {
    "Metropolitana": ["Santiago", "La Pintana", "La Granja", "San Bernado", "El Bosque", "La Florida", "Puente Alto", "Maipú", "Las Condes"],
    "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué", "Villa Alemana", "San Antonio"],
    "Biobío": ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz"],
    "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Angol"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Puerto Varas"]
};

function iniciarSelectores(idReg, idCom) {
    const reg = document.getElementById(idReg);
    const com = document.getElementById(idCom);
    
    // Limpiar selectores al iniciar
    reg.innerHTML = '<option value="">Seleccione Región</option>';
    com.innerHTML = '<option value="">Seleccione Comuna</option>';
    
    // Llenar regiones
    for (let r in regionesYComunas) {
        reg.options.add(new Option(r, r));
    }
    
    // Al cambiar región, limpiar y llenar comunas
    reg.addEventListener("change", () => {
        com.innerHTML = '<option value="">Seleccione Comuna</option>';
        if (reg.value && regionesYComunas[reg.value]) {
            regionesYComunas[reg.value].forEach(c => {
                com.options.add(new Option(c, c));
            });
        }
    });
}