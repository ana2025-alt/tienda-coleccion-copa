# 🗺️ Plan de Acción y Tareas de Refactorización

**Autor:** Ana y Yeneily
**Fecha:** Mayo 2026  
**Proyecto:** Refactorización Modular - Fase 3

## 1. Alcance (Scope)
- **IN:** Separar el código en módulos independientes (Datos, Carrito, UI) utilizando ES Modules (`import/export`).
- **OUT:** No se añadirán estilos nuevos de CSS ni pasarelas de pago externas en esta sesión.

## 2. Tabla de Tareas Priorizadas
| ID | Tarea | Tipo | Prioridad |
|----|-------|------|-----------|
| T1 | Aislar base de datos mockeada a `productsData.js` | Refactor | P0 |
| T2 | Aislar lógica del carrito de compras a `cartEngine.js` | Refactor | P0 |
| T3 | Configurar punto de entrada centralizado en `main.js` | Refactor | P1 |

## 3. Estrategia de Refactorización en 3 Pasos
- **Paso 1 (Invariante - Datos):** Extraer el arreglo de productos a un archivo separado. *Prueba manual:* Verificar que la cuadrícula renderice exactamente igual los 17 productos.
- **Paso 2 (Invariante - Lógica):** Mudar las funciones de agregar, actualizar y vaciar el carrito. *Prueba manual:* Añadir productos y constatar que el subtotal y el descuento promocional calculen bien.
- **Paso 3 (Invariante - Validación):** Centralizar eventos del formulario en el entry point. *Prueba manual:* Intentar comprar con correos falsos para asegurar que la RegEx los siga rechazando y descuente el stock. 
