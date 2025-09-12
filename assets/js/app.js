/**
 * APLICACIÓN PRINCIPAL - VERSIÓN BÁSICA
 *
 * Solo maneja clicks en botones y actualización del localStorage
 */

// ========================================
// FUNCIÓN PRINCIPAL
// ========================================

// ========================================
// MENÚ MÓVIL
// ========================================

/**
 * FUNCIÓN: Configurar el menú móvil
 * ¿Qué hace? Hace que el botón del menú móvil funcione
 */
function configurarMenuMovil() {
  // Buscar el botón del menú móvil
  var botonMenu = document.getElementById("mobile-menu-button");
  var menuMovil = document.getElementById("mobile-menu");

  // Si encontramos el botón, le asignamos la función
  if (botonMenu && menuMovil) {
    botonMenu.onclick = function() {
      // Si el menú está oculto, lo mostramos. Si está visible, lo ocultamos
      if (menuMovil.classList.contains("hidden")) {
        menuMovil.classList.remove("hidden");
      } else {
        menuMovil.classList.add("hidden");
      }
    };
  }
}

// ========================================
// FUNCIÓN PRINCIPAL ACTUALIZADA
// ========================================

/**
 * FUNCIÓN: Inicializar la aplicación
 * ¿Qué hace? Configura los botones para que funcionen con localStorage
 */
function iniciarTienda() {
  console.log("🛍️ Tienda iniciada");

  // Configurar botones de agregar al carrito
  prepararBotones();

  // Configurar menú móvil
  configurarMenuMovil();
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
