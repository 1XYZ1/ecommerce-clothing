/**
 * APLICACIÓN PRINCIPAL - VERSIÓN BÁSICA
 *
 * Solo maneja clicks en botones y actualización del localStorage
 */

// ========================================
// FUNCIÓN PRINCIPAL
// ========================================

/**
 * FUNCIÓN: Inicializar la aplicación
 * ¿Qué hace? Configura los botones para que funcionen con localStorage
 */
function iniciarTienda() {
  console.log("🛍️ Tienda iniciada");

  // Configurar botones de agregar al carrito
  prepararBotones();
}

// ========================================
// MANEJO DE BOTONES
// ========================================

/**
 * FUNCIÓN: Preparar todos los botones de "Agregar al carrito"
 * ¿Qué hace? Busca todos los botones y les asigna la función de click
 */
function prepararBotones() {
  var botones = document.querySelectorAll("[data-product-id]");

  console.log("🔘 Encontré", botones.length, "botones");

  // Para cada botón, le asignamos la función
  for (var i = 0; i < botones.length; i++) {
    asignarFuncionAlBoton(botones[i]);
  }
}

/**
 * FUNCIÓN: Asignar función click a un botón
 * ¿Qué hace? Conecta el botón con la función de agregar al carrito
 */
function asignarFuncionAlBoton(boton) {
  boton.onclick = function (evento) {
    evento.preventDefault();

    // Obtenemos el ID del producto
    var idProducto = this.getAttribute("data-product-id");

    console.log("👆 Click en producto:", idProducto);

    // Agregamos al carrito (actualiza localStorage)
    agregarProducto(idProducto);
  };
}

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Ejecutar cuando la página cargue completamente
 */
document.addEventListener("DOMContentLoaded", iniciarTienda);
