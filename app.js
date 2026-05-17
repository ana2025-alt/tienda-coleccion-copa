// T3 - Datos Mockeados Completos (Fase 2 Final)
const productos = [
    { id: 1, nombre: "Camiseta México - Colección Copa", precio: 95, stock: 8, imagen: "imagenes/image_2ad539.jpg" },
    { id: 2, nombre: "Camiseta Argentina - Colección Copa", precio: 110, stock: 3, imagen: "imagenes/image_2ad1f3.jpg" },
    { id: 3, nombre: "Camiseta Brasil - Colección Copa", precio: 105, stock: 5, imagen: "imagenes/image_2ad1bd.jpg" },
    { id: 4, nombre: "Camiseta Alemania - Colección Copa", precio: 100, stock: 4, imagen: "imagenes/image_2ad197.jpg" },
    { id: 5, nombre: "Camiseta Italia - Colección Copa", precio: 90, stock: 0, imagen: "imagenes/image_2ad15e.jpg" },
    { id: 6, nombre: "Camiseta Portugal - Colección Copa", precio: 100, stock: 6, imagen: "imagenes/image_2ad13e.jpg" },
    { id: 7, nombre: "Camiseta España - Colección Copa", precio: 95, stock: 7, imagen: "imagenes/image_2ad11d.jpg" },
    { id: 8, nombre: "Balón Oficial Trionda 2026", precio: 160, stock: 10, imagen: "imagenes/image_874ab1.png" },
    { id: 9, nombre: "Gorra Sedes Copa 2026", precio: 25, stock: 15, imagen: "imagenes/image_2a5d7a.jpg" },
    { id: 10, nombre: "Gorra World Cup Verde", precio: 30, stock: 12, imagen: "imagenes/image_2a5d55.jpg" },
    { id: 11, nombre: "Gorra Sedes USA/Canadá", precio: 25, stock: 20, imagen: "imagenes/image_2a5d1d.jpg" },
    { id: 12, nombre: "Bufanda Oficial Mundial 2026", precio: 20, stock: 25, imagen: "imagenes/image_2a5c9e.jpg" },
    
    // EXCLUSIVOS AGREGADOS
    { id: 13, nombre: "Balón Trionda Neón", precio: 145, stock: 6, imagen: "imagenes/image_8749d8.jpg" },
    { id: 14, nombre: "Balón Sedes Mix", precio: 150, stock: 7, imagen: "imagenes/image_8749fe.png" },
    { id: 15, nombre: "Combo Termos Banderas (Edición Especial)", precio: 195, stock: 5, imagen: "imagenes/image_872b92.jpg" },
    { id: 16, nombre: "Termo México 2026", precio: 45, stock: 15, imagen: "imagenes/image_874dfe.jpg" },
    { id: 17, nombre: "Termo Canadá 2026", precio: 45, stock: 12, imagen: "imagenes/image_874df6.jpg" },
    { id: 18, nombre: "Termo USA 2026", precio: 45, stock: 20, imagen: "imagenes/image_874d9e.jpg" },
    { id: 19, nombre: "Termo Colombia 2026", precio: 45, stock: 10, imagen: "imagenes/image_874d7f.jpg" },
    { id: 20, nombre: "Termo South Africa 2026", precio: 45, stock: 8, imagen: "imagenes/image_874dd8.jpg" }
];

// Cargar estado inicial (Persistencia LocalStorage)
let carrito = JSON.parse(localStorage.getItem('carritoCopa')) || [];

// T4 - Render de productos en la grilla
function renderizarProductos(listaAMostrar = productos) {
    const contenedor = document.getElementById('contenedor-productos');
    if(!contenedor) return; 
    
    contenedor.innerHTML = "";
    
    if(listaAMostrar.length === 0) {
        contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No se encontraron productos.</p>`;
        return;
    }

    listaAMostrar.forEach(p => {
        const agotado = p.stock === 0;
        contenedor.innerHTML += `
            <div class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <span class="price">$${p.precio}</span>
                <p class="stock-label">Stock disponible: ${p.stock}</p>
                <button class="btn-add" onclick="agregarAlCarrito(${p.id})" ${agotado ? 'disabled' : ''}>
                    ${agotado ? 'SIN STOCK' : 'AÑADIR AL CARRITO'}
                </button>
            </div>`;
    });
}

// T6 - Lógica del Buscador
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

// T5 - Lógica para añadir al carrito
function agregarAlCarrito(id) {
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
    actualizarInterfaz();
}

// T7 y T8 - Renderizado del carrito, cálculos y almacenamiento local
function actualizarInterfaz() {
    localStorage.setItem('carritoCopa', JSON.stringify(carrito));
    
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

    subElem.innerText = `$${subtotal.toFixed(2)}`;
    totElem.innerText = `$${(subtotal - desc).toFixed(2)}`;
}

// T9 - Finalizar Compra y validación de campos
function finalizarCompra() {
    const nombre = document.getElementById('nombre-cliente').value;
    const correo = document.getElementById('correo-cliente').value;

    if (nombre.trim() === "" || correo.trim() === "") {
        alert("Por favor, ingresa tus datos para procesar la compra.");
        return;
    }

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert(`¡Venta exitosa!\n\nGracias por tu compra, ${nombre}.\nEnviaremos el recibo a: ${correo}`);
    
    carrito = [];
    document.getElementById('nombre-cliente').value = "";
    document.getElementById('correo-cliente').value = "";
    actualizarInterfaz();
}

// Iniciar aplicación
renderizarProductos();
actualizarInterfaz(); 