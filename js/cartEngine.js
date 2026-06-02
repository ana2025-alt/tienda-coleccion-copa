/**
 * @fileoverview Motor del carrito de compras y almacenamiento de estado.
 * @author Yeneily
 * @project Colección Copa 2026 - Fase 3
 */

import { productos } from './productsData.js';
import { mostrarNotificacion } from './uiManager.js';

export let carrito = JSON.parse(localStorage.getItem('carritoCopa')) || [];

// CORRECCIÓN: Ahora recibe el ID del producto Y la cantidad que el usuario eligió en la pantalla
export function agregarAlCarrito(id, cantidadAAgregar = 1) {
    const p = productos.find(x => x.id === id);
    const item = carrito.find(x => x.id === id);
    
    if (!p) return;

    if (item) {
        // Validamos si la cantidad vieja más la nueva supera el stock disponible
        if ((item.cantidad + cantidadAAgregar) <= p.stock) {
            item.cantidad += cantidadAAgregar;
        } else {
            // Reemplazamos el alert viejo tosco por la notificación de error premium
            mostrarNotificacion(`No puedes añadir esa cantidad. Límite de stock: ${p.stock}`, 'error');
            return false; // Retorna falso para avisar que no se pudo agregar
        }
    } else {
        // Si el producto es nuevo, se agrega con la cantidad exacta que seleccionó el usuario
        if (cantidadAAgregar <= p.stock) {
            carrito.push({ ...p, bundleId: p.id, cantidad: cantidadAAgregar });
        } else {
            mostrarNotificacion(`No puedes añadir esa cantidad. Límite de stock: ${p.stock}`, 'error');
            return false;
        }
    }
    
    // Guardamos automáticamente en el LocalStorage
    guardarEstado();
    return true; // Éxito
}

export function vaciarCarrito() {
    carrito = [];
    guardarEstado();
}

export function guardarEstado() {
    localStorage.setItem('carritoCopa', JSON.stringify(carrito));
} 