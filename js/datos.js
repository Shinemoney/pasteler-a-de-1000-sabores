// js/datos.js

// 1. Catálogo de productos (Actualizado con los precios e info de la tabla oficial)
const listadoProductos = [
    { codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, imagen: 'assets/1image.jpeg' },
    { codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, imagen: 'assets/2image.jpeg' },
    { codigo: 'TT001', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Vainilla', precio: 40000, imagen: 'assets/3image.jpeg' },
    { codigo: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000, imagen: 'assets/4image.jpeg' },
    { codigo: 'PI001', categoria: 'Postres Individuales', nombre: 'Mousse de Chocolate', precio: 5000, imagen: 'assets/5image.jpeg' },
    { codigo: 'PI002', categoria: 'Postres Individuales', nombre: 'Tiramisú Clásico', precio: 5500, imagen: 'assets/6image.jpeg' },
    { codigo: 'PSA001', categoria: 'Productos Sin Azúcar', nombre: 'Torta Sin Azúcar de Naranja', precio: 48000, imagen: 'assets/7image.jpeg' },
    { codigo: 'PSA002', categoria: 'Productos Sin Azúcar', nombre: 'Cheesecake Sin Azúcar', precio: 47000, imagen: 'assets/8image.jpeg' },
    { codigo: 'PT001', categoria: 'Pastelería Tradicional', nombre: 'Empanada de Manzana', precio: 3000, imagen: 'assets/9image.jpeg' },
    { codigo: 'PT002', categoria: 'Pastelería Tradicional', nombre: 'Tarta de Santiago', precio: 6000, imagen: 'assets/10image.jpeg' },
    { codigo: 'PG001', categoria: 'Productos Sin Gluten', nombre: 'Brownie Sin Gluten', precio: 4000, imagen: 'assets/11image.jpeg' },
    { codigo: 'PG002', categoria: 'Productos Sin Gluten', nombre: 'Pan Sin Gluten', precio: 3500, imagen: 'assets/12image.jpeg' },
    { codigo: 'PV001', categoria: 'Productos Vegana', nombre: 'Torta Vegana de Chocolate', precio: 50000, imagen: 'assets/13image.jpeg' },
    { codigo: 'PV002', categoria: 'Productos Vegana', nombre: 'Galletas Veganas de Avena', precio: 4500, imagen: 'assets/14image.jpeg' },
    { codigo: 'TE001', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Cumpleaños', precio: 55000, imagen: 'assets/15image.jpeg' },
    { codigo: 'TE002', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Boda', precio: 60000, imagen: 'assets/16image.jpeg' }
];

// 2. Regiones y Comunas
const regionesYComunas = {
    "Metropolitana": ["Santiago", "La Pintana", "La Granja", "San Bernado", "El Bosque", "La Florida", "Puente Alto", "Maipú", "Las Condes"],
    "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué", "Villa Alemana", "San Antonio"],
    "Biobío": ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz"],
    "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Angol"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Puerto Varas"]
};

// 3. Lógica para selectores de región/comuna
function iniciarSelectores(idReg, idCom) {
    const reg = document.getElementById(idReg);
    const com = document.getElementById(idCom);
    
    if (!reg || !com) return;
    
    reg.innerHTML = '<option value="">Seleccione Región</option>';
    com.innerHTML = '<option value="">Seleccione Comuna</option>';
    
    for (let r in regionesYComunas) {
        reg.options.add(new Option(r, r));
    }
    
    reg.addEventListener("change", () => {
        com.innerHTML = '<option value="">Seleccione Comuna</option>';
        if (reg.value && regionesYComunas[reg.value]) {
            regionesYComunas[reg.value].forEach(c => {
                com.options.add(new Option(c, c));
            });
        }
    });
}