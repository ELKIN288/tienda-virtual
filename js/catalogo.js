// =========================================================
// catalogo.js
// Dibuja las tarjetas de los productos en la página
// (si una foto no carga, se muestra la ilustración de respaldo):
//  - index.html      -> solo los productos destacados
//  - productos.html  -> todos los productos
// =========================================================

// ---------- Crear el HTML de una tarjeta de producto ----------
function crearTarjeta(producto) {
  return `
    <article class="tarjeta">
      <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy"
           onerror="this.onerror = null; this.src = '${producto.respaldo}';">
      <div class="tarjeta-info">
        <span class="categoria">${producto.categoria}</span>
        <h3>${producto.nombre}</h3>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">${formatearPrecio(producto.precio)}</p>
        <button type="button" class="btn btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
      </div>
    </article>
  `;
}


// ---------- Mostrar una lista de productos dentro de un contenedor ----------
function mostrarProductos(lista, idContenedor) {
  const contenedor = document.getElementById(idContenedor);

  // Si el contenedor no existe en esta página, no hacemos nada
  if (contenedor === null) {
    return;
  }

  // 1. Armamos el HTML de todas las tarjetas con un ciclo
  let html = "";
  for (let i = 0; i < lista.length; i++) {
    html = html + crearTarjeta(lista[i]);
  }
  contenedor.innerHTML = html;

  // 2. Le damos un evento "click" a cada botón "Agregar al carrito"
  const botones = contenedor.querySelectorAll(".btn-agregar");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function () {
      const id = Number(botones[i].dataset.id); // el id viene del atributo data-id
      agregarAlCarrito(id);
    });
  }
}


// ---------- Sacar del catálogo solo los productos destacados ----------
function obtenerDestacados() {
  const destacados = [];
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].destacado === true) {
      destacados.push(productos[i]);
    }
  }
  return destacados;
}


// ---------- Mostrar los créditos de las fotos (productos.html) ----------
function mostrarCreditos() {
  const lista = document.getElementById("creditos-fotos");
  if (lista === null) {
    return;
  }

  for (let i = 0; i < productos.length; i++) {
    const item = document.createElement("li");
    const enlace = document.createElement("a");
    enlace.href = productos[i].fuenteFoto;
    enlace.target = "_blank";
    enlace.rel = "noopener";
    enlace.textContent = "Wikimedia Commons";
    item.textContent = productos[i].nombre + ": foto de " + productos[i].autorFoto + ", ";
    item.appendChild(enlace);
    lista.appendChild(item);
  }
}


// ---------- Esto se ejecuta al cargar la página ----------
mostrarProductos(productos, "lista-productos");                // productos.html
mostrarProductos(obtenerDestacados(), "productos-destacados"); // index.html
mostrarCreditos();                                             // productos.html
