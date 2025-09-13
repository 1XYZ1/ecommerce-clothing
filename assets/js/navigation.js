// Codigo para los menus
// Hecho por: Junior Developer

// Cuando la pagina cargue, activar los menus
document.addEventListener("DOMContentLoaded", function() {

  // Menu hamburguesa para mobil
  var botonMovil = document.getElementById("mobile-menu-button");
  var menuMovil = document.getElementById("mobile-menu");

  if (botonMovil && menuMovil) {
    botonMovil.addEventListener("click", function() {
      if (menuMovil.classList.contains("hidden")) {
        menuMovil.classList.remove("hidden");
      } else {
        menuMovil.classList.add("hidden");
      }
    });
  }

  // Menu desplegable de catalogo en computadora
  var botonCatalogo = document.getElementById("catalogo-dropdown-button");
  var menuCatalogo = document.getElementById("catalogo-dropdown");

  if (botonCatalogo && menuCatalogo) {
    botonCatalogo.addEventListener("click", function(evento) {
      evento.preventDefault();

      if (menuCatalogo.classList.contains("hidden")) {
        menuCatalogo.classList.remove("hidden");
      } else {
        menuCatalogo.classList.add("hidden");
      }
    });
  }

  // Menu desplegable de catalogo en celular
  var botonCatalogoMovil = document.getElementById("mobile-catalogo-dropdown-button");
  var menuCatalogoMovil = document.getElementById("mobile-catalogo-dropdown");

  if (botonCatalogoMovil && menuCatalogoMovil) {
    botonCatalogoMovil.addEventListener("click", function(evento) {
      evento.preventDefault();

      if (menuCatalogoMovil.classList.contains("hidden")) {
        menuCatalogoMovil.classList.remove("hidden");
      } else {
        menuCatalogoMovil.classList.add("hidden");
      }
    });
  }

  // Cerrar menu cuando haces click en otra parte
  document.addEventListener("click", function(evento) {
    if (menuCatalogo && botonCatalogo) {
      var clickEnMenu = menuCatalogo.contains(evento.target);
      var clickEnBoton = botonCatalogo.contains(evento.target);

      if (!clickEnMenu && !clickEnBoton) {
        menuCatalogo.classList.add("hidden");
      }
    }
  });

});