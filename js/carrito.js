// js/carrito.js - Versión Completa y Optimizada

let carrito = JSON.parse(localStorage.getItem('carrito_sabores')) || [];

document.addEventListener("DOMContentLoaded", () => {
    renderizarNav();
    actualizarBadge();
    renderizarCarrito();

    // Delegación de eventos (Funciona aunque los elementos se creen dinámicamente)
    document.body.addEventListener("click", (e) => {
        // Abrir Carrito
        if (e.target.closest('#open-cart-trigger')) {
            e.preventDefault();
            document.getElementById('cart-sidebar').style.right = '0';
        }
        // Cerrar Carrito
        if (e.target.closest('#close-cart-btn')) {
            document.getElementById('cart-sidebar').style.right = '-400px';
        }
    });
});

// 1. Renderizado de Navegación
function renderizarNav() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = `
        <header style="background-color: #4B3621; padding: 20px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <a href="index.html" style="color: #FFF5E1; text-decoration: none; font-size: 20px; font-weight: bold;">Pastelería 1000 Sabores</a>
                <nav>
                    <ul style="list-style: none; display: flex; gap: 30px; margin: 0; padding: 0; align-items: center;">
                        <li><a href="index.html" style="color: #FFF5E1; text-decoration: none;">Home</a></li>
                        <li><a href="productos.html" style="color: #FFF5E1; text-decoration: none;">Productos</a></li>
                        <li>
                            <a href="#" id="open-cart-trigger" style="background-color: #FFC0CB; color: #8B4513; padding: 10px 15px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                                <i class="fas fa-shopping-cart"></i> (<span id="cart-count">0</span>)
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>`;
    }
}

// 2. Gestión de Carrito
function agregarAlCarrito(codigoProducto) {
    const productoBase = listadoProductos.find(p => p.codigo === codigoProducto);
    if (!productoBase) return;

    const existe = carrito.find(item => item.codigo === codigoProducto);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...productoBase, cantidad: 1 });
    }
    guardarYActualizar();
    alert(productoBase.nombre + " añadido al carrito.");
}

function modificarCantidad(codigo, delta) {
    const item = carrito.find(p => p.codigo === codigo);
    if (item) {
        item.cantidad += delta;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(p => p.codigo !== codigo);
        }
    }
    guardarYActualizar();
}

function guardarYActualizar() {
    localStorage.setItem('carrito_sabores', JSON.stringify(carrito));
    actualizarBadge();
    renderizarCarrito();
}

function actualizarBadge() {
    const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = count;
}

function renderizarCarrito() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-amount');
    if (!container) return;

    container.innerHTML = carrito.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding: 10px 0;">
            <div><strong>${item.nombre}</strong><br>$${item.precio.toLocaleString('es-CL')}</div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button onclick="modificarCantidad('${item.codigo}', -1)" style="cursor:pointer;">-</button>
                <span>${item.cantidad}</span>
                <button onclick="modificarCantidad('${item.codigo}', 1)" style="cursor:pointer;">+</button>
            </div>
        </div>
    `).join('');

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-CL')} CLP`;
}