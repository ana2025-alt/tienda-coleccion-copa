/**
 * @fileoverview Módulo base y gestión del catálogo de productos.
 * @author Ana
 * @project Colección Copa 2026 - Fase 3
 */



import { productos } from './productsData.js';
import { carrito, agregarAlCarrito, vaciarCarrito, guardarEstado } from './cartEngine.js';
import { renderizarProductos, actualizarInterfaz } from './uiManager.js';

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarInterfaz();
    configurarEventos();
});

function configurarEventos() {
    const contenedor = document.getElementById('contenedor-productos');
    if(contenedor) {
        contenedor.addEventListener('click', (e) => {
            if(e.target.classList.contains('btn-add')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                agregarAlCarrito(id);
                guardarEstado();
                actualizarInterfaz();
            }
        });
    }

    const buscador = document.getElementById('buscador');
    if(buscador) {
        buscador.addEventListener('input', () => {
            const texto = buscador.value.toLowerCase();
            const filtrados = productos.filter(p => 
                p.nombre.toLowerCase().includes(texto)
            );
            renderizarProductos(filtrados);
        });
    }

    const btnCheckout = document.querySelector('.btn-checkout');
    if(btnCheckout) {
        btnCheckout.addEventListener('click', finalizarCompra);
    }
}

function finalizarCompra() {
    const nombre = document.getElementById('nombre-cliente').value;
    const correo = document.getElementById('correo-cliente').value;

    if (nombre.trim() === "") {
        alert("Por favor, ingresa tu nombre para procesar la compra.");
        return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    carrito.forEach(itemCarrito => {
        const productoOriginal = productos.find(p => p.id === itemCarrito.id);
        if (productoOriginal) {
            productoOriginal.stock -= itemCarrito.cantidad;
        }
    });

    alert(`¡Venta exitosa!\n\nGracias por tu compra, ${nombre}.\nEnviaremos el recibo a: ${correo}`);
    
    vaciarCarrito();
    guardarEstado();
    
    document.getElementById('nombre-cliente').value = "";
    document.getElementById('correo-cliente').value = "";
    
    renderizarProductos();
    actualizarInterfaz();
}  