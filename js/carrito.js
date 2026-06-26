// --- Lógica del Carrito ---

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
});

// 1. Lógica para abrir/cerrar carrito
const trigger = document.getElementById('open-cart-trigger');
if (trigger) {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('cart-sidebar').style.right = '0';
        renderizarCarrito();
    });
}

// Cierre del sidebar del carrito
const closeBtn = document.getElementById('close-cart-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.getElementById('cart-sidebar').style.right = '-400px';
    });
}

// 2. Función para agregar productos (LLAMA A ESTA DESDE TUS BOTONES)
function agregarAlCarrito(nombre, precio, tamano) {
    let carrito = JSON.parse(localStorage.getItem('carrito_sabores')) || [];
    
    // Convertir precio a número y validar
    const precioNumerico = parseFloat(precio) || 0;
    
    let index = carrito.findIndex(item => item.nombre === nombre && item.tamano === tamano);
    
    if (index !== -1) {
        carrito[index].cantidad = (parseInt(carrito[index].cantidad) || 0) + 1;
    } else {
        carrito.push({ 
            nombre: nombre, 
            precio: precioNumerico, 
            tamano: tamano || "Sin especificar", 
            cantidad: 1 
        });
    }
    
    localStorage.setItem('carrito_sabores', JSON.stringify(carrito));
    alert(nombre + " agregado al carrito");
    renderizarCarrito();
}

// 3. Función principal para calcular y mostrar
function renderizarCarrito() {
    const container = document.getElementById('cart-items-container');
    const totalContainer = document.getElementById('cart-total-amount');
    const countSpan = document.getElementById('cart-count');
    const carrito = JSON.parse(localStorage.getItem('carrito_sabores')) || [];
    
    if (!container || !totalContainer) return;

    container.innerHTML = '';
    let subtotal = 0;
    
    carrito.forEach((item, index) => {
        const precio = parseFloat(item.precio) || 0;
        const cantidad = parseInt(item.cantidad) || 0;
        subtotal += (precio * cantidad);
        
        container.innerHTML += `
            <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <div style="font-weight: bold;">${item.nombre}</div>
                <div style="font-size: 0.8rem; color: #666;">Tamaño: ${item.tamano}</div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 5px;">
                    <div>$${precio.toLocaleString('es-CL')}</div>
                    <div>
                        <button onclick="cambiarCantidad(${index}, -1)" style="padding: 2px 8px;">-</button>
                        <span>${cantidad}</span>
                        <button onclick="cambiarCantidad(${index}, 1)" style="padding: 2px 8px;">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Calcular descuento
    const codigoAplicado = localStorage.getItem('codigo_aplicado');
    let descuento = (codigoAplicado === 'FELICES50') ? (subtotal * 0.5) : 0;
    let totalFinal = subtotal - descuento;

    // Mostrar totales
    if (descuento > 0) {
        totalContainer.innerHTML = `
            <div style="font-size: 0.9rem; color: #555;">Subtotal: $${subtotal.toLocaleString('es-CL')}</div>
            <div style="color: #27ae60; font-size: 0.9rem;">Descuento (50%): -$${descuento.toLocaleString('es-CL')}</div>
            <div style="font-size: 1.3rem; border-top: 1px solid #ccc; padding-top: 5px; color: #8B4513;">Total: $${totalFinal.toLocaleString('es-CL')} CLP</div>
        `;
    } else {
        totalContainer.innerHTML = `<div style="font-size: 1.3rem; margin-top: 10px; color: #8B4513;">Total: $${subtotal.toLocaleString('es-CL')} CLP</div>`;
    }

    if (countSpan) {
        countSpan.textContent = carrito.reduce((sum, item) => sum + (parseInt(item.cantidad) || 0), 0);
    }
}

// 4. Función para cambiar cantidades
function cambiarCantidad(index, delta) {
    let carrito = JSON.parse(localStorage.getItem('carrito_sabores')) || [];
    carrito[index].cantidad = (parseInt(carrito[index].cantidad) || 0) + delta;
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    
    localStorage.setItem('carrito_sabores', JSON.stringify(carrito));
    renderizarCarrito();
}