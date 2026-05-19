/**
 * @fileoverview Motor del carrito de compras y renderizado de la interfaz de usuario.
 * @author Yeneily
 * @project Colección Copa 2026 - Fase 3
 */


import { productos } from './productsData.js';

export let carrito = JSON.parse(localStorage.getItem('carritoCopa')) || [];

export function agregarAlCarrito(id) {
    const p = productos.find(x => x.id === id);
    const item = carrito.find(x => x.id === id);
    
    if (item) {
        if (item.cantidad < p.stock) {
            item.cantidad++;
        } else {
            alert("Límite de stock alcanzado para este producto");
        }
    } else {
        carrito.push({ ...p, bundleId: p.id, cantidad: 1 });
    }
}

export function vaciarCarrito() {
    carrito = [];
}

export function guardarEstado() {
    localStorage.setItem('carritoCopa', JSON.stringify(carrito));
}  