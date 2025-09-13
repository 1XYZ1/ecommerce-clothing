// ================================
// FUNCIONES DE LOCALSTORAGE
// ================================
// Diccionario de productos
const productosInfo = {
  "11": { nombre: "Camiseta Deportiva", precio: 15000 },
  "12": { nombre: "Pantalón Gym", precio: 25000 },
  "15": { nombre: "Botella de Agua", precio: 8000 }
};


function obtenerCarrito() {
  var carritoGuardado = localStorage.getItem("mi-carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("mi-carrito", JSON.stringify(carrito));
}

// ================================
// FUNCIONES DEL CARRITO
// ================================

function agregarProducto(idProducto) {
  var carrito = obtenerCarrito();
  var productoEncontrado = carrito.find(item => item.id === idProducto);

  if (productoEncontrado) {
    productoEncontrado.cantidad++;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  renderCarrito();
}

function eliminarProducto(idProducto) {
  console.log("❌ Eliminando producto:", idProducto);
  var carrito = obtenerCarrito().filter(item => item.id !== idProducto);
  guardarCarrito(carrito);
  renderCarrito();
}

function vaciarCarrito() {
  guardarCarrito([]);
  console.log("🗑️ Carrito vaciado");
  renderizarCarrito(); // 🔥 refrescar UI
}

function eliminarProducto(idProducto) {
  console.log("❌ Eliminando producto:", idProducto);

  var carrito = obtenerCarrito();
  var carritoNuevo = carrito.filter(p => p.id !== idProducto);

  guardarCarrito(carritoNuevo);
  renderizarCarrito(); // 🔥 refrescar UI
}

function eliminarProducto(idProducto) {
  console.log("❌ Eliminando producto:", idProducto);

  var carrito = obtenerCarrito();
  var carritoNuevo = carrito.filter(p => p.id !== idProducto);

  guardarCarrito(carritoNuevo);
  renderizarCarrito(); // 🔥 refrescar UI
}


// ================================
// CATÁLOGO DE PRODUCTOS
// ================================

const productos = [
  { id: "11", nombre: "Polera Blanca", precio: 10000 },
  { id: "12", nombre: "Pantalón Jeans", precio: 20000 },
  { id: "15", nombre: "Zapatillas", precio: 35000 },
];

// ================================
// RENDERIZAR EL CARRITO
// ================================

function renderCarrito() {
  var carrito = obtenerCarrito();
  var contenedor = document.getElementById("cart-container");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Carrito Vacío</h3>
      <p class="text-gray-600 mb-6">No tienes productos en tu carrito aún</p>
      <a href="catalogo.html"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block">
        Ir al Catálogo
      </a>
    `;
    return;
  }

  let total = 0;

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (producto) {
      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      contenedor.innerHTML += `
        <div class="flex justify-between items-center border-b py-2">
          <span>${producto.nombre} (x${item.cantidad})</span>
          <span>$${subtotal.toLocaleString()}</span>
          <button onclick="eliminarProducto('${producto.id}')" 
                  class="text-red-500 hover:underline ml-4">Eliminar</button>
        </div>
      `;
    }
  });

  contenedor.innerHTML += `
    <div class="flex justify-between items-center mt-4 font-bold">
      <span>Total:</span>
      <span>$${total.toLocaleString()}</span>
    </div>
    <button onclick="vaciarCarrito()" 
            class="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700">
      Vaciar Carrito
    </button>
  `;
}

// ================================
// INICIALIZAR
// ================================
document.addEventListener("DOMContentLoaded", renderCarrito);

