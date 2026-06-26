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

function renderizarCatalogo(filtro = "todas") {
    const contenedor = document.getElementById("grid-productos-target");
    if (!contenedor) return;
    
    contenedor.innerHTML = ""; 

    listadoProductos.forEach(prod => {
        if (filtro !== "todas" && !prod.categoria.includes(filtro)) return;

        const card = document.createElement("div");
        card.style.cssText = "background: white; border-radius: 12px; border: 1px solid #FFC0CB; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 10px;";

        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100%; border-radius: 8px; height: 200px; object-fit: cover;">
            
            <h3 style="font-family: 'Lobster', cursive; color: #8B4513; margin: 10px 0 0; font-size: 1.5rem;">${prod.nombre}</h3>
            
            <p style="margin: 0; color: #5D4037; font-size: 1rem;"><strong>Categoría:</strong> ${prod.categoria}</p>
            
            <select id="tamanio-${prod.codigo}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                <option value="Pequeña (10p)">Pequeña (10p)</option>
                <option value="Mediana (15p)">Mediana (15p)</option>
                <option value="Grande (20p)">Grande (20p)</option>
            </select>
            
            <input type="text" id="mensaje-${prod.codigo}" placeholder="Mensaje especial..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
            
            <h4 style="color: #8B4513; margin: 5px 0; font-size: 1.3rem;">$${prod.precio.toLocaleString('es-CL')} CLP</h4>
            
            <div style="text-align: center; margin: 5px 0;">
                <span style="font-size: 0.9rem;">Compartir: </span>
                <i class="fab fa-whatsapp" style="color: #25D366; cursor: pointer; margin-right: 10px;"></i> 
                <i class="fab fa-facebook" style="color: #1877F2; cursor: pointer;"></i>
            </div>
            
            <button onclick="agregarAlCarrito('${prod.codigo}')" style="width: 100%; background-color: #FFC0CB; color: #8B4513; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer;">
                <i class="fas fa-shopping-cart"></i> Añadir al Carrito
            </button>
        `;
        
        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => renderizarCatalogo());