// T3 - Datos Mockeados Completos (Sello Colección Copa)
const productos = [
    { id: 1, nombre: "Camiseta México - Colección Copa", precio: 95, stock: 8, imagen: "imagenes/image_2ad539.jpg" },
    { id: 2, nombre: "Camiseta Argentina - Colección Copa", precio: 110, stock: 3, imagen: "imagenes/image_2ad1f3.jpg" },
    { id: 3, nombre: "Camiseta Brasil - Colección Copa", precio: 105, stock: 5, imagen: "imagenes/image_2ad1bd.jpg" },
    { id: 4, nombre: "Camiseta Alemania - Colección Copa", precio: 100, stock: 4, imagen: "imagenes/image_2ad197.jpg" },
    { id: 5, nombre: "Camiseta Italia - Colección Copa", precio: 90, stock: 0, imagen: "imagenes/image_2ad15e.jpg" },
    { id: 6, nombre: "Camiseta Portugal - Colección Copa", precio: 100, stock: 6, imagen: "imagenes/image_2ad13e.jpg" },
    { id: 7, nombre: "Camiseta España - Colección Copa", precio: 95, stock: 7, imagen: "imagenes/image_2ad11d.jpg" },
    { id: 8, nombre: "Balón Oficial Trionda 2026", precio: 160, stock: 10, imagen: "imagenes/image_2a605c.jpg" },
    { id: 9, nombre: "Gorra Sedes Copa 2026", precio: 25, stock: 15, imagen: "imagenes/image_2a5d7a.jpg" },
    { id: 10, nombre: "Gorra World Cup Verde", precio: 30, stock: 12, imagen: "imagenes/image_2a5d55.jpg" },
    { id: 11, nombre: "Gorra Sedes USA/Canadá", precio: 25, stock: 20, imagen: "imagenes/image_2a5d1d.jpg" },
    { id: 12, nombre: "Bufanda Oficial Mundial 2026", precio: 20, stock: 25, imagen: "imagenes/image_2a5c9e.jpg" }
];

let carrito = [];

// T4 - Render de productos en la grilla (Iteraciones)
function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if(!contenedor) return; // Seguridad por si no existe el ID
    
    contenedor.innerHTML = "";
    productos.forEach(p => {
        const agotado = p.stock === 0;
        contenedor.innerHTML += `
            <div class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <span class="price">$${p.precio}</span>
                <p style="font-size: 0.75rem; color: #666; margin-bottom: 10px;">Stock: ${p.stock}</p>
                <button class="btn-add" onclick="agregarAlCarrito(${p.id})" ${agotado ? 'disabled' : ''}>
                    ${agotado ? 'SIN STOCK' : 'AÑADIR'}
                </button>
            </div>`;
    });
}

// T5 - Lógica para añadir al carrito
function agregarAlCarrito(id) {
    const p = productos.find(x => x.id === id);
    const item = carrito.find(x => x.id === id);
    if (item) {
        if (item.cantidad < p.stock) item.cantidad++;
        else alert("Límite de stock alcanzado para este producto");
    } else {
        carrito.push({ ...p, cantidad: 1 });
    }
    renderizarCarrito();
}

// T7 y T8 - Renderizado del carrito y cálculo de funciones
function renderizarCarrito() {
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
            <div class="item-carrito" style="display: flex; justify-content: space-between; margin-bottom: 5px; border-bottom: 1px solid #eee;">
                <span>${item.nombre} (x${item.cantidad})</span>
                <span>$${item.precio * item.cantidad}</span>
            </div>`;
    });

    // Lógica de Descuento (Requisito: Procesos con condicionales)
    let desc = carrito.length >= 3 ? subtotal * 0.1 : 0;
    if(promo) promo.style.display = desc > 0 ? "block" : "none";

    subElem.innerText = `$${subtotal.toFixed(2)}`;
    totElem.innerText = `$${(subtotal - desc).toFixed(2)}`;
}

// NUEVO: Función para Capturar Datos del Cliente (Punto 4 de la Fase 2)
function finalizarCompra() {
    const nombre = document.getElementById('nombre-cliente').value;
    const correo = document.getElementById('correo-cliente').value;

    if (nombre === "" || correo === "") {
        alert("Por favor, ingresa tus datos para procesar la compra.");
        return;
    }

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert(`¡Gracias por tu compra, ${nombre}! Te enviaremos el recibo a ${correo}.`);
    
    // Limpiar todo después de la compra
    carrito = [];
    document.getElementById('nombre-cliente').value = "";
    document.getElementById('correo-cliente').value = "";
    renderizarCarrito();
}

// Iniciar aplicación
renderizarProductos();