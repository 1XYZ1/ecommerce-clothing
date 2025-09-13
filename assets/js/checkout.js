(function () {
  // util para formatear euros en es-es (para el resumen)
  const money = (n) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

  // lee el carrito que ya usa el proyecto
  function obtenerCarrito() {
    try { return JSON.parse(localStorage.getItem("mi-carrito")) || []; }
    catch { return []; }
  }

  // pinta un resumen básico (si no tienes precios en el storage, muestra 0)
  function renderResumen() {
    const cont = document.getElementById("resumen-items");
    const elSubtotal = document.getElementById("subtotal");
    const elEnvio = document.getElementById("envio");
    const elTotal = document.getElementById("total");

    const carrito = obtenerCarrito();
    cont.innerHTML = "";

    if (!carrito.length) {
      cont.innerHTML = '<p class="text-sm text-gray-600">Tu carrito está vacío.</p>';
      elSubtotal.textContent = money(0);
      elEnvio.textContent = money(0);
      elTotal.textContent = money(0);
      return;
    }

    let subtotal = 0;
    carrito.forEach((it) => {
      const cant = Number(it.cantidad || 1);
      const precio = Number(it.precio || 0);
      const totalLinea = cant * precio;
      subtotal += totalLinea;

      const row = document.createElement("div");
      row.className = "flex items-center justify-between gap-3";
      row.innerHTML =
        '<div><p class="font-medium">Producto #' + String(it.id) + '</p>' +
        '<p class="text-xs text-gray-500">Cant: ' + cant + "</p></div>" +
        '<p class="font-medium">' + money(totalLinea) + "</p>";
      cont.appendChild(row);
    });

    const envio = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + envio;
    elSubtotal.textContent = money(subtotal);
    elEnvio.textContent = envio === 0 ? "Gratis" : money(envio);
    elTotal.textContent = money(total);
  }

  // fuerza que un input acepte solo dígitos
  function forceDigits(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      el.value = el.value.replace(/\D+/g, "");
    });
  }

  // formatea fecha mm/aa con "/" automático
  function formatFecha(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      let v = el.value.replace(/\D+/g, "");
      if (v.length > 4) v = v.slice(0, 4);
      el.value = v.length >= 3 ? v.slice(0, 2) + "/" + v.slice(2) : v;
    });
  }

  // aplicar restricciones numéricas
  ["telefono", "cp", "numeroTarjeta", "cvv"].forEach(forceDigits);
  formatFecha("fecha");

  // validación html5 de los 3 formularios
  function validar() {
    const ids = ["form-personales", "form-envio", "form-pago"];
    return ids.every((fid) => {
      const f = document.getElementById(fid);
      return f && f.reportValidity();
    });
  }

  // flujo del botón finalizar
  const btn = document.getElementById("btn-finalizar");
  btn?.addEventListener("click", async () => {
    if (!validar()) { alert("Revisa los campos obligatorios marcados con *."); return; }

    const prev = btn.textContent;
    btn.textContent = "Procesando...";
    btn.disabled = true;
    btn.classList.add("opacity-70", "cursor-not-allowed");

    // actualizar resumen (no bloquea) y simular espera
    try { renderResumen(); } catch {}
    await new Promise((r) => setTimeout(r, 2000));

    // generar id y tiempo estimado
    const orderId = "ORD-" + Date.now();
    const eta = Math.floor(Math.random() * 12) + 3;

    // vaciar carrito
    try { localStorage.setItem("mi-carrito", "[]"); } catch {}

    // redirigir a confirmación
    const qs = new URLSearchParams({ order: orderId, eta: String(eta) }).toString();
    window.location.href = "confirmacion.html?" + qs;

    // fallback por si no redirige
    setTimeout(() => {
      btn.textContent = prev;
      btn.disabled = false;
      btn.classList.remove("opacity-70", "cursor-not-allowed");
    }, 2500);
  });

  // primer render
  renderResumen();
})();
