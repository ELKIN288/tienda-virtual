// =========================================================
// carrito.js
// Funciones del carrito que se usan en TODAS las páginas:
// guardar y leer el carrito (localStorage), agregar productos,
// actualizar el contador del menú, mostrar mensajes y el menú
// para celulares.
// =========================================================

// Nombre con el que se guarda el carrito en el localStorage
const CLAVE_CARRITO = "carritoTecnoCaribe";

// Máximo de unidades que se pueden llevar de un mismo producto
const CANTIDAD_MAXIMA = 10;

// Guarda el temporizador del aviso flotante
let temporizadorAviso = null;


// ---------- Leer el carrito guardado ----------
// Si no hay nada guardado, devuelve un arreglo vacío [].
function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  if (datos === null) {
    return [];
  }
  return JSON.parse(datos); // convierte el texto guardado en un arreglo
}


// ---------- Guardar el carrito ----------
// localStorage solo guarda texto, por eso usamos JSON.stringify.
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}


// ---------- Dar formato de pesos colombianos ----------
// Ejemplo: 129900  ->  "$129.900 COP"
function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CO") + " COP";
}


// ---------- Buscar un producto del catálogo por su id ----------
function buscarProducto(id) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      return productos[i];
    }
  }
  return null; // no se encontró
}


// ---------- Agregar un producto al carrito ----------
function agregarAlCarrito(id) {
  const carrito = obtenerCarrito();
  const producto = buscarProducto(id);

  // 1. Buscamos si el producto YA está en el carrito
  let posicion = -1;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      posicion = i;
    }
  }

  if (posicion !== -1) {
    // 2. Si ya está, solo aumentamos la cantidad (no se crea otra línea)
    if (carrito[posicion].cantidad >= CANTIDAD_MAXIMA) {
      mostrarMensaje("Solo puedes llevar " + CANTIDAD_MAXIMA + " unidades de " + producto.nombre + ".", "error");
      return;
    }
    carrito[posicion].cantidad = carrito[posicion].cantidad + 1;
    mostrarMensaje("Ahora tienes " + carrito[posicion].cantidad + " unidades de " + producto.nombre + " en el carrito.", "exito");
  } else {
    // 3. Si no está, lo agregamos como una línea nueva con cantidad 1
    const nuevoItem = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      respaldo: producto.respaldo,
      cantidad: 1
    };
    carrito.push(nuevoItem);
    mostrarMensaje("✔ " + producto.nombre + " se agregó al carrito.", "exito");
  }

  guardarCarrito(carrito);
  actualizarContador(true);
}


// ---------- Contar las unidades que hay en el carrito ----------
function contarUnidades(carrito) {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].cantidad;
  }
  return total;
}


// ---------- Actualizar el número que aparece en el botón Carrito ----------
// Si "animar" es true, el número da un saltico.
function actualizarContador(animar) {
  const contador = document.getElementById("contador-carrito");
  if (contador === null) {
    return;
  }
  contador.textContent = contarUnidades(obtenerCarrito());

  if (animar === true) {
    contador.classList.add("salto");
    setTimeout(function () {
      contador.classList.remove("salto");
    }, 400);
  }
}


// ---------- Mostrar un aviso flotante ----------
// tipo puede ser: "exito" (verde), "error" (rojo) o "info" (azul)
function mostrarMensaje(texto, tipo) {
  let aviso = document.getElementById("aviso");

  // Si el aviso todavía no existe en la página, lo creamos
  if (aviso === null) {
    aviso = document.createElement("div");
    aviso.id = "aviso";
    aviso.setAttribute("role", "status");
    document.body.appendChild(aviso);
  }

  aviso.textContent = texto;
  aviso.className = "aviso aviso-" + tipo + " visible";

  // El aviso se oculta solo después de 3 segundos
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(function () {
    aviso.classList.remove("visible");
  }, 3000);
}


// ---------- Menú para celulares (botón ☰) ----------
function activarMenu() {
  const boton = document.getElementById("boton-menu");
  const menu = document.getElementById("menu");

  boton.addEventListener("click", function () {
    menu.classList.toggle("abierto");

    if (menu.classList.contains("abierto")) {
      boton.textContent = "✕";
      boton.setAttribute("aria-expanded", "true");
    } else {
      boton.textContent = "☰";
      boton.setAttribute("aria-expanded", "false");
    }
  });

  // Al tocar un enlace del menú, el menú se cierra
  const enlaces = menu.querySelectorAll("a");
  for (let i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener("click", function () {
      menu.classList.remove("abierto");
      boton.textContent = "☰";
      boton.setAttribute("aria-expanded", "false");
    });
  }
}


// ---------- Esto se ejecuta apenas carga cualquier página ----------
actualizarContador(false);
activarMenu();
