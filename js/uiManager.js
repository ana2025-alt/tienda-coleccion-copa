/**
 * @fileoverview Motor del carrito de compras y renderizado de la interfaz de usuario.
 * @author Ana Anselmi
 * @project Colección Copa 2026 - Fase 3
 */

import { productos } from './productsData.js';
import { carrito, agregarAlCarrito } from './cartEngine.js';

// FUNCIÓN DE ALERTAS PERSONALIZADAS
export function mostrarNotificacion(mensaje, tipo = 'success') {
    const alertaExistente = document.querySelector('.custom-toast');
    if (alertaExistente) alertaExistente.remove();

    const toast = document.createElement('div');
    toast.className = `custom-toast ${tipo === 'error' ? 'error' : ''}`;
    toast.innerHTML = `<span>${tipo === 'error' ? '⚠️' : '⚽'} ${mensaje}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

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
                <p class="stock-label" id="stock-text-${p.id}">Stock disponible: ${p.stock}</p>
                
                ${!agotado ? `
                    <div class="cantidad-contenedor" style="margin-bottom: 12px; display: flex; justify-content: center; align-items: center; gap: 10px;">
                        <label style="font-size: 0.85rem; opacity: 0.9;">Cantidad:</label>
                        <input type="number" id="cant-${p.id}" value="1" min="1" max="${p.stock}" 
                               style="width: 60px; padding: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; color: white; text-align: center; outline: none;">
                    </div>
                ` : ''}

                <button class="btn-add" data-id="${p.id}" ${agotado ? 'disabled' : ''}>
                    ${agotado ? 'SIN STOCK' : 'AÑADIR AL CARRITO'}
                </button>
            </div>`;
    });

    // ASIGNAR CLICS A LOS BOTONES
    const botonesAdd = contenedor.querySelectorAll('.btn-add');
    botonesAdd.forEach(boton => {
        boton.addEventListener('click', () => {
            if (boton.classList.contains('btn-agregado')) return;

            const idProducto = parseInt(boton.getAttribute('data-id'));
            const inputCantidad = document.getElementById(`cant-${idProducto}`);
            const cantidadAAgregar = inputCantidad ? parseInt(inputCantidad.value) : 1;

            const p = productos.find(x => x.id === idProducto);
            if (!p) return;

            if (isNaN(cantidadAAgregar) || cantidadAAgregar <= 0 || cantidadAAgregar > p.stock) {
                mostrarNotificacion(`Cantidad inválida. Máximo disponible: ${p.stock}`, 'error');
                return;
            }

            // Ejecutamos la inserción en tu archivo cartEngine.js
            const exito = agregarAlCarrito(idProducto, cantidadAAgregar);

            if (exito) {
                // DISMINUIR STOCK REAL Y VISUAL INMEDIATAMENTE
                p.stock -= cantidadAAgregar; 
                const textoStock = document.getElementById(`stock-text-${idProducto}`);
                if (textoStock) textoStock.innerText = `Stock disponible: ${p.stock}`;

                // Modificar el botón temporalmente (Efecto Farmatodo)
                const textoOriginal = boton.innerText;
                boton.classList.add('btn-agregado');
                boton.innerText = `¡AGREGADO (${cantidadAAgregar})! ✓`;

                mostrarNotificacion(`Se añadieron (${cantidadAAgregar}) artículos al carrito`, 'success');

                // Si se agotó el stock por completo, desactivamos el botón
                if (p.stock === 0) {
                    boton.disabled = true;
                    boton.innerText = 'SIN STOCK';
                    if (inputCantidad) inputCantidad.parentElement.remove();
                } else if (inputCantidad) {
                    inputCantidad.max = p.stock;
                    inputCantidad.value = "1";
                }

                actualizarInterfaz();

                setTimeout(() => {
                    if (p.stock > 0) {
                        boton.classList.remove('btn-agregado');
                        boton.innerText = textoOriginal;
                    }
                }, 1500);
            }
        });
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

    if(subElem) subElem.innerText = `$${subtotal.toFixed(2)}`;
    if(totElem) totElem.innerText = `$${(subtotal - desc).toFixed(2)}`;
}