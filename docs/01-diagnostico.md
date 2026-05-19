# 🔍 Diagnóstico del Monolito - Colección Copa 2026

**Autoras:** Ana Anselmi & Yeneily Seijas  
**Fecha:** Mayo 2026  
**Contexto:** Análisis de arquitectura de la Fase 3 previo a la modularización.

## 1. Estado Actual del Repositorio
El proyecto actual cuenta con una estructura centralizada clásica de un desarrollo rápido de Hackathon:
- **`app.js` único:** Un solo archivo JavaScript se encarga de almacenar el arreglo de base de datos mockeada (`const productos`), gestionar el estado de la aplicación (`let carrito`), calcular operaciones de negocio (descuentos promocionales), validar formularios complejos mediante expresiones regulares (`RegEx`), y renderizar los nodos directamente en el DOM (`innerHTML`).
- **Mezcla de Responsabilidades:** No existen fronteras claras. La lógica de negocio está fuertemente acoplada a la interfaz gráfica.

## 2. Riesgos y Puntos de Quiebre
Si el docente o el cliente solicitaran cambios realistas en el brief, el código actual sufriría los siguientes impactos:
- **Cambio de persistencia:** Si se requiere migrar de `LocalStorage` a una API real (`fetch`), habría que reescribir múltiples secciones dentro del núcleo de interacción.
- **Riesgo de Regresión:** Modificar una propiedad visual dentro del render dinámico de productos puede romper la lógica de validación del carrito de compras debido al acoplamiento de variables globales.
- **Mantenimiento:** El archivo `app.js` escalará exponencialmente con cada nueva línea de productos (features), volviéndose difícil de testear.  

