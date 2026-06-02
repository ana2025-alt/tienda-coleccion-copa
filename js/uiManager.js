/**
 * @fileoverview Motor del carrito de compras y renderizado de la interfaz de usuario.
 * @author Ana Anselmi
 * @project Colección Copa 2026 - Fase 3
 */

import { productos } from './productsData.js';
import { carrito, agregarAlCarrito } from './cartEngine.js'; // Importamos correctamente la función del motor

// ==========================================================================
// FUNCIÓN: Alertas personalizadas y modernas
// ==========================================================================
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

    // 1. Creamos las tarjetas incluyendo el selector de cantidad solicitado
    listaAMostrar.forEach(p => {
        const agotado = p.stock === 0;
        contenedor.innerHTML += `
            <div class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <span class="price">$${p.precio}</span>
                <p class="stock-label">Stock disponible: ${p.stock}</p>
                
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

    // 2. Escuchamos el clic y enlazamos directamente con las cantidades dinámicas del motor
    setTimeout(() => {
        const botonesAdd = contenedor.querySelectorAll('.btn-add');
        botonesAdd.forEach(boton => {
            boton.addEventListener('click', (e) => {
                if (boton.classList.contains('btn-agregado')) return;

                const idProducto = parseInt(boton.getAttribute('data-id'));
                const inputCantidad = document.getElementById(`cant-${idProducto}`);
                // Si existe el input lee su valor, si no (como en "SIN STOCK"), por defecto es 1
                const cantidadAAgregar = inputCantidad ? parseInt(inputCantidad.value) : 1;

                // Validación por si el usuario escribe un número manualmente inválido
                if (isNaN(cantidadAAgregar) || cantidadAAgregar <= 0) {
                    mostrarNotificacion('Por favor, ingresa una cantidad válida.', 'error');
                    return;
                }

                // --- CONEXIÓN DIRECTA CON TU MOTOR (cartEngine.js) ---
                // Llamamos a la función enviándole el ID numérico y el valor de la caja de cantidad
                const exito = agregarAlCarrito(idProducto, cantidadAAgregar);

                if (exito) {
                    const textoOriginal = boton.innerText;
                    boton.classList.add('btn-agregado');
                    boton.innerText = `¡AGREGADO (${cantidadAAgregar})! ✓`;

                    mostrarNotificacion(`Se añadieron (${cantidadAAgregar}) artículos al carrito con éxito`, 'success');

                    // Actualizar la interfaz global de totales
                    actualizarInterfaz();

                    setTimeout(() => {
                        boton.classList.remove('btn-agregado');
                        boton.innerText = textoOriginal;
                        if(inputCantidad) inputCantidad.value = "1"; // Resetea el contador a 1
                    }, 1500);
                }
            });
        });
    }, 50);
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