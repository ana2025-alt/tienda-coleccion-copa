**Autor:** Ana  
**Fecha:** Mayo 2026  
**Proyecto:** Refactorización Modular - Fase 3


 📊 Reporte de Mejoras y Puntos Críticos

## 1. Evaluación de Severidad
- **Severidad Alta (Arquitectura):** Acoplamiento total en `app.js`. El almacenamiento de datos (catálogo) convive con las funciones de manipulación del HTML. Falta de aplicación del principio **SOLID (Single Responsibility)**.
- **Severidad Media (Manejo de Estado):** El carrito manipula el arreglo global directamente al restar el inventario (`productoOriginal.stock -= itemCarrito.cantidad`).

## 2. Priorización de Usabilidad (Matriz MoSCoW)
- **MUST (Obligatorio):** Separar las fuentes de datos (el arreglo de productos) del archivo principal.
- **SHOULD (Deseable):** Crear un módulo exclusivo para las reglas del carrito y del negocio de descuentos.
- **COULD (Podría esperar):** Implementar un bundler como Vite para la optimización y empaquetado de módulos ES. 
