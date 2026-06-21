// Inicializar Carrito desde LocalStorage
let carrito = JSON.parse(localStorage.getItem('carrito_sabores')) || [];

function actualizarBadge() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const badge = document.getElementById('cart-count');
    if(badge) badge.textContent = totalItems;
}

function agregarAlCarrito(codigoProducto) {
    const productoBase = listadoProductos.find(p => p.codigo === codigoProducto);
    if (!productoBase) return;

    const existe = carrito.find(item => item.codigo === codigoProducto);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({
            codigo: productoBase.codigo,
            nombre: productoBase.nombre,
            precio: productoBase.precio,
            imagen: productoBase.imagen || 'assets/default.jpg',
            cantidad: 1
        });
    }

    guardarYActualizar();
    renderizarCarrito();
    
    // Abrir automáticamente el carro al añadir un producto
    const sidebar = document.getElementById('cart-sidebar');
    if(sidebar) sidebar.style.right = '0';
}

function eliminarDelCarrito(codigoProducto) {
    carrito = carrito.filter(item => item.codigo !== codigoProducto);
    guardarYActualizar();
    renderizarCarrito();
}

function modificarCantidad(codigoProducto, cambio) {
    const item = carrito.find(p => p.codigo === codigoProducto);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(codigoProducto);
            return;
        }
    }
    guardarYActualizar();
    renderizarCarrito();
}

function guardarYActualizar() {
    localStorage.setItem('carrito_sabores', JSON.stringify(carrito));
    actualizarBadge();
}

// Renderizar dinámicamente los productos dentro del Sidebar
function renderizarCarrito() {
    const container = document.getElementById('cart-items-container');
    const totalAmount = document.getElementById('cart-total-amount');
    
    if (!container) return;

    if (carrito.length === 0) {
        container.innerHTML = `<p id="empty-cart-msg" style="text-align: center; color: #a89480; margin-top: 40px; font-style: italic;">Tu carrito está vacío.</p>`;
        if(totalAmount) totalAmount.textContent = "$0 CLP";
        return;
    }

    container.innerHTML = "";
    let totalAcumulado = 0;

    carrito.forEach(item => {
        totalAcumulado += item.precio * item.cantidad;
        
        const itemRow = document.createElement('div');
        itemRow.style.display = 'flex';
        itemRow.style.alignItems = 'center';
        itemRow.style.justifyContent = 'space-between';
        itemRow.style.paddingBottom = '12px';
        itemRow.style.borderBottom = '1px solid #eee';

        itemRow.innerHTML = `
            <div style="flex-grow: 1; padding-right: 10px;">
                <h4 style="margin: 0; font-size: 14px; color: var(--accent-choco);">${item.nombre}</h4>
                <span style="font-size: 13px; color: #777;">$${item.precio.toLocaleString('es-CL')} x ${item.cantidad}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <button onclick="modificarCantidad('${item.codigo}', -1)" style="width:24px; height:24px; background:#eee; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">-</button>
                <span style="font-size: 14px; font-weight:bold;">${item.cantidad}</span>
                <button onclick="modificarCantidad('${item.codigo}', 1)" style="width:24px; height:24px; background:#eee; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">+</button>
                <button onclick="eliminarDelCarrito('${item.codigo}')" style="background:none; border:none; color:#e1306c; cursor:pointer; margin-left: 5px;"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        container.appendChild(itemRow);
    });

    if(totalAmount) totalAmount.textContent = `$${totalAcumulado.toLocaleString('es-CL')} CLP`;
}

// Inyección de NavBar dinámico
document.addEventListener("DOMContentLoaded", () => {
    const navHTML = `
    <header class="navbar">
        <div class="container nav-box">
            <a href="index.html" class="logo-link">Pastelería <span class="logo-font">1000 Sabores</span></a>
            <nav class="nav-links">
                <a href="index.html">Home</a>
                <a href="productos.html">Productos</a>
                <a href="registro.html">Registro</a>
                <a href="login.html">Ingresar</a>
                <a href="contacto.html">Contacto</a>
                <a href="#" class="cart-widget" id="open-cart-trigger"><i class="fas fa-shopping-cart"></i> (<span id="cart-count">0</span>)</a>
            </nav>
        </div>
    </header>`;
    
    const placeholder = document.getElementById('nav-placeholder');
    if(placeholder) placeholder.innerHTML = navHTML;
    
    // Forzar renderizado y badge inicial
    actualizarBadge();
    renderizarCarrito();
})

// SOLUCIÓN AL ERROR DE APERTURA: Escuchar clics globales en el documento (Delegación)
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar) return;

    // 1. Detectar si hicieron clic en el botón del carrito (o en sus iconos internos)
    const botonCarrito = event.target.closest('#open-cart-trigger') || event.target.closest('.cart-widget');
    
    if (botonCarrito) {
        event.preventDefault();
        renderizarCarrito(); // Cargar los datos actualizados
        sidebar.style.right = '0'; // Mostrar barra
        return;
    }

    // 2. Detectar si hicieron clic en el botón de cerrar (X)
    if (event.target.id === 'close-cart-btn') {
        sidebar.style.right = '-400px'; // Ocultar barra
    }
})

// PASARELA DE PAGO TARJETA SIMULADA
document.addEventListener('DOMContentLoaded', () => {
    const formTarjeta = document.getElementById('form-tarjeta');
    const statusPago = document.getElementById('pago-status');

    if (formTarjeta) {
        formTarjeta.addEventListener('submit', function(event) {
            event.preventDefault();

            const numero = document.getElementById('card-number').value.trim();
            const vencimiento = document.getElementById('card-expiry').value.trim();
            const cvv = document.getElementById('card-cvv').value.trim();
            const titular = document.getElementById('card-holder').value.trim();

            if (!numero || !vencimiento || !cvv || !titular) {
                statusPago.style.display = 'block';
                statusPago.style.backgroundColor = '#f8d7da';
                statusPago.style.color = '#721c24';
                statusPago.style.border = '1px solid #f5c6cb';
                statusPago.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Completa los campos de tu tarjeta.';
                return;
            }

            statusPago.style.display = 'block';
            statusPago.style.backgroundColor = '#fff3cd';
            statusPago.style.color = '#856404';
            statusPago.style.border = '1px solid #ffeeba';
            statusPago.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando con Transbank...';
            
            const btnSubmit = formTarjeta.querySelector('button[type="submit"]');
            if(btnSubmit) btnSubmit.disabled = true;

            setTimeout(() => {
                statusPago.style.backgroundColor = '#d4edda';
                statusPago.style.color = '#155724';
                statusPago.style.border = '1px solid #c3e6cb';
                statusPago.innerHTML = '<i class="fas fa-check-circle"></i> ¡Pago Aprobado! Tu pedido será preparado lo más pronto posible.';

                carrito = [];
                guardarYActualizar();
                renderizarCarrito();
                formTarjeta.reset();
                if(btnSubmit) btnSubmit.disabled = false;

                setTimeout(() => {
                    window.location.href = '#';
                    statusPago.style.display = 'none';
                }, 2500);
            }, 2000);
        });
    }
});
