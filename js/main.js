/**
 * @fileoverview Lógica principal e inicialización de eventos.
 * @project Colección Copa 2026 - Fase 3
 */

import { renderizarProductos, actualizarInterfaz, mostrarNotificacion } from './uiManager.js';
import { carrito } from './cartEngine.js';

// Inicializar la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarInterfaz();

    // Capturar el formulario de compra
    const formulario = document.querySelector('.checkout-form');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validar que el carrito no esté vacío
            if (carrito.length === 0) {
                mostrarNotificacion('El carrito está vacío. Añade productos antes de comprar.', 'error');
                return;
            }

            const inputEmail = formulario.querySelector('.input-form[type="email"]');
            const inputNombre = formulario.querySelector('.input-form[type="text"]');
            
            const email = inputEmail ? inputEmail.value.trim() : '';
            const nombre = inputNombre ? inputNombre.value.trim() : 'Cliente';

            // Validación de correo
            if (!email || !email.includes('@')) {
                mostrarNotificacion('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }

            // Mensaje de Venta Exitosa Personalizado (Estilo Moderno)
            mostrarNotificacion(`¡Venta exitosa! Gracias por tu compra, ${nombre}. Enviaremos el recibo a: ${email}`, 'success');
            
            // Limpiar formulario y carrito si aplica en tu motor
            formulario.reset();
        });
    }
}); 