/**
 * @fileoverview Lógica principal e inicialización de eventos globales.
 * @author Ana Anselmi
 * @project Colección Copa 2026 - Fase 3
 */

import { renderizarProductos, actualizarInterfaz, mostrarNotificacion } from './uiManager.js';
import { carrito, vaciarCarrito } from './cartEngine.js';

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarInterfaz();

    // Capturar el evento de confirmación de pedido de forma directa en el body
    document.body.addEventListener('click', (e) => {
        // Buscamos si hicieron clic en el botón de confirmar (por su clase o tipo)
        if (e.target.matches('.btn-checkout') || e.target.closest('.btn-checkout') || e.target.matches('button[type="submit"]')) {
            e.preventDefault();

            // 1. Validar que el carrito tenga productos
            if (!carrito || carrito.length === 0) {
                mostrarNotificacion('El carrito está vacío. Añade productos antes de confirmar.', 'error');
                return;
            }

            // 2. Buscar inputs de datos del cliente
            const inputEmail = document.querySelector('input[type="email"]');
            const inputNombre = document.querySelector('input[type="text"]');

            const email = inputEmail ? inputEmail.value.trim() : '';
            const nombre = inputNombre ? inputNombre.value.trim() : 'Cliente';

            // 3. Validación de correo electrónico
            if (!email || !email.includes('@') || email.length < 5) {
                mostrarNotificacion('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }

            // 4. ALERTA MODERNA DE ÉXITO EXITOSO
            mostrarNotificacion(`¡Pedido realizado exitosamente! Gracias por tu compra, ${nombre}. Enviaremos los detalles a: ${email}`, 'success');

            // 5. Resetear interfaz
            vaciarCarrito();
            actualizarInterfaz();
            if (inputEmail) inputEmail.value = '';
            if (inputNombre) inputNombre.value = '';
        }
    });
}); 