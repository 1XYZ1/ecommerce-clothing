/**
 * CARRITO DE COMPRAS - VERSIÓN BÁSICA
 *
 * Solo funciones esenciales para agregar/quitar productos del localStorage
 */

// ========================================
// FUNCIONES BÁSICAS DE LOCALSTORAGE
// ========================================

/**
 * FUNCIÓN: Obtener el carrito del localStorage
 * ¿Qué hace? Lee el carrito guardado en el navegador
 */
function obtenerCarrito() {
  var carritoGuardado = localStorage.getItem("mi-carrito");

  // Si no existe, devolvemos una lista vacía
  if (carritoGuardado === null) {
    return [];
  }

  // Si existe, lo convertimos de texto a lista
  return JSON.parse(carritoGuardado);
}

/**
 * FUNCIÓN: Guardar el carrito en localStorage
 * ¿Qué hace? Guarda el carrito en el navegador
 */
function guardarCarrito(carrito) {
  localStorage.setItem("mi-carrito", JSON.stringify(carrito));
}

/**
 * FUNCIÓN: Agregar un producto al carrito
 * ¿Qué hace? Añade un producto al carrito y lo guarda en localStorage
 */
function agregarProducto(idProducto) {


  // Obtenemos el carrito actual
  var carrito = obtenerCarrito();

  // Buscamos si el producto ya está en el carrito
  var productoEncontrado = false;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      carrito[i].cantidad = carrito[i].cantidad + 1;
      productoEncontrado = true;
      break;
    }
  }

  // Si no lo encontramos, lo agregamos como nuevo
  if (!productoEncontrado) {
    carrito.push({
      id: idProducto,
      cantidad: 1,
    });
  }

  // Guardamos el carrito actualizado
  guardarCarrito(carrito);
}

/**
 * FUNCIÓN: Eliminar un producto del carrito
 * ¿Qué hace? Quita un producto del carrito y actualiza localStorage
 */
function eliminarProducto(idProducto) {
  console.log("❌ Eliminando producto:", idProducto);

  var carrito = obtenerCarrito();

  // Creamos un nuevo carrito sin el producto eliminado
  var carritoNuevo = [];
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== idProducto) {
      carritoNuevo.push(carrito[i]);
    }
  }

  // Guardamos el carrito nuevo
  guardarCarrito(carritoNuevo);
}

/**
 * FUNCIÓN: Vaciar todo el carrito
 * ¿Qué hace? Elimina todos los productos del carrito
 */
function vaciarCarrito() {
  guardarCarrito([]);
  console.log("🗑️ Carrito vaciado");
}
