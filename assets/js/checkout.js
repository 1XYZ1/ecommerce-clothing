// assets/js/checkout.js
(function () {
  console.log("[checkout] script cargado");

  const money = (n) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

  function obtenerCarrito() {
    try {
      return JSON.parse(localStorage.getItem("mi-carrito")) || [];
    } catch (e) {
      console.warn("[checkout] error leyendo carrito:", e);
      return [];
    }
  }

  // desde pages/checkout/
  const CATALOGO_URL = "../data/productos.json";

  async function cargarProductos() {
    try {
      const res = await fetch(CATALOGO_URL);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json(); // { productos: [...] }
      const map = new Map();
      (data.productos || []).forEach((p) => map.set(String(p.id), p));
      return map;
    } catch (e) {
      console.error("[checkout] no pude cargar productos.json:", e);
      alert("No se pudo cargar el catálogo. Revisa la ruta ../data/productos.json");
      return new Map();
    }
  }

  const contItems = document.getElementById("resumen-items");
  const elSubtotal = document.getElementById("subtotal");
  const elEnvio = document.getElementById("envio");
  const elTotal = document.getElementById("total");
  const btn = document.getElementById("btn-finalizar");

  if (!btn) {
    console.error("[checkout] no encontré #btn-finalizar");
    return;
  }

  let carrito = obtenerCarrito();
  let productosMap = null;

  function pintarLinea(item, p) {
    const cantidad = Number(item.cantidad || 1);
    const precio = Number(p?.precio || 0);
    const totalLinea = cantidad * precio;

    const div = document.createElement("div");
    div.className = "flex items-center justify-between gap-3";
    div.innerHTML =
      '<div class="flex items-center gap-3">' +
      (p?.imagen
        ? '<img src="../../' +
          p.imagen +
          '" class="w-12 h-12 rounded object-cover" alt="' +
          (p?.nombre || "") +
          '">'
        : "") +
      '<div><p class="font-medium">' +
      (p?.nombre || "Producto") +
      '</p><p class="text-xs text-gray-500">Cant: ' +
      cantidad +
      "</p></div></div>" +
      '<p class="font-medium">' +
      money(totalLinea) +
      "</p>";
    return { div, totalLinea };
  }

  function calcularTotales(lineas) {
    const subtotal = lineas.reduce((acc, x) => acc + x.totalLinea, 0);
    const envio = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + envio;
    return { subtotal, envio, total };
  }

  async function renderResumen() {
    contItems.innerHTML = "";
    carrito = obtenerCarrito();

    if (!carrito.length) {
      contItems.innerHTML = '<p class="text-sm text-gray-600">Tu carrito está vacío.</p>';
      elSubtotal.textContent = money(0);
      elEnvio.textContent = money(0);
      elTotal.textContent = money(0);
      return { subtotal: 0, envio: 0, total: 0 };
    }

    if (!productosMap) {
      productosMap = await cargarProductos();
    }

    const lineas = [];
    for (const item of carrito) {
      const p = productosMap.get(String(item.id));
      const { div, totalLinea } = pintarLinea(item, p);
      contItems.appendChild(div);
      lineas.push({ totalLinea });
    }

    const t = calcularTotales(lineas);
    elSubtotal.textContent = money(t.subtotal);
    elEnvio.textContent = t.envio === 0 ? "Gratis" : money(t.envio);
    elTotal.textContent = money(t.total);
    return t;
  }

  function validar() {
    const f1 = document.getElementById("form-personales");
    const f2 = document.getElementById("form-envio");
    const f3 = document.getElementById("form-pago");
    const ok = [f1, f2, f3].every((f) => f && f.reportValidity());
    console.log("[checkout] validacion:", ok);
    return ok;
  }

  btn.addEventListener("click", async function () {
    console.log("[checkout] click finalizar");

    if (!obtenerCarrito().length) {
      alert("Tu carrito está vacío. Vuelve al carrito para agregar productos.");
      return;
    }
    if (!validar()) {
      alert("Revisa los campos obligatorios marcados con *.");
      return;
    }

    // Loading state visible
    const prev = btn.textContent;
    btn.textContent = "Procesando...";
    btn.disabled = true;
    btn.classList.add("opacity-70", "cursor-not-allowed");

    const totales = await renderResumen();

    // Simulación de procesamiento (2s)
    await new Promise((r) => setTimeout(r, 2000));

    const orderId = "ORD-" + Date.now();
    console.log("[checkout] orderId:", orderId);

    const pedido = {
      orderId: orderId,
      fecha: new Date().toISOString(),
      totales: totales,
      items: obtenerCarrito(),
      datosPersonales: {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
      },
      envio: {
        direccion: document.getElementById("direccion").value,
        ciudad: document.getElementById("ciudad").value,
        cp: document.getElementById("cp").value,
        pais: document.getElementById("pais").value,
        guardarDireccion: document.getElementById("guardarDir").checked,
      },
      pago: { metodo: "tarjeta", titular: document.getElementById("titular").value },
    };

    try {
      sessionStorage.setItem("lastOrder", JSON.stringify(pedido));
    } catch (e) {
      console.warn("[checkout] no pude guardar lastOrder:", e);
    }

    // Vaciar carrito
    try {
      localStorage.setItem("mi-carrito", JSON.stringify([]));
    } catch (e) {
      console.warn("[checkout] no pude vaciar carrito:", e);
    }

    // Redirección a confirmación
    window.location.href = "confirmacion.html?order=" + encodeURIComponent(orderId);

    // Fallback visual si no redirige
    setTimeout(() => {
      btn.textContent = prev;
      btn.disabled = false;
      btn.classList.remove("opacity-70", "cursor-not-allowed");
    }, 2500);
  });

  // Inicial: pintar resumen
  renderResumen();
})();
