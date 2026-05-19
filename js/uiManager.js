/**
 * @fileoverview Motor del carrito de compras y renderizado de la interfaz de usuario.
 * @author Yeneily
 * @project Colección Copa 2026 - Fase 3
 */



import { productos } from './productsData.js';
import { carrito } from './cartEngine.js';

export function renderizarProductos(listaAMostrar = productos) {
    const contenedor = document.getElementById('contenedor-productos');
    if(!contenedor) return; 
    
    contenedor.innerHTML = "";
    
    if(listaAMostrar.length === 0) {
        contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No se encontraron productos.</p>`;
        return;
    }

    listaAMostrar.forEach(p => {
        const agotado = p.stock === 0;
        contenedor.innerHTML += `
            <div class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <span class="price">$${p.precio}</span>
                <p class="stock-label">Stock disponible: ${p.stock}</p>
                <button class="btn-add" data-id="${p.id}" ${agotado ? 'disabled' : ''}>
                    ${agotado ? 'SIN STOCK' : 'AÑADIR AL CARRITO'}
                </button>
            </div>`;
    });
}

export function actualizarInterfaz() {
    const cont = document.getElementById('items-carrito');
    const subElem = document.getElementById('subtotal-val');
    const totElem = document.getElementById('total-val');
    const promo = document.getElementById('promo-msg');

    if(!cont) return;

    cont.innerHTML = carrito.length === 0 ? '<p class="empty-msg">El carrito está vacío</p>' : '';
    let subtotal = 0;
    
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
        cont.innerHTML += `
            <div class="item-carrito">
                <span>${item.nombre} (x${item.cantidad})</span>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>`;
    });

    let desc = carrito.length >= 3 ? subtotal * 0.1 : 0;
    if(promo) promo.style.display = desc > 0 ? "block" : "none";

    subElem.innerText = `$${subtotal.toFixed(2)}`;
    totElem.innerText = `$${(subtotal - desc).toFixed(2)}`;
}   