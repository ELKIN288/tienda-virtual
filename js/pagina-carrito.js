// =========================================================
// pagina-carrito.js
// Funciones de la página carrito.html:
// mostrar la tabla del carrito, cambiar cantidades, eliminar,
// vaciar, calcular los totales y finalizar la compra simulada.
// =========================================================

// ---------- Configuración del envío ----------
const COSTO_ENVIO = 12000;          // costo fijo del envío
const ENVIO_GRATIS_DESDE = 250000;  // desde este subtotal el envío es gratis

// Campos del formulario que son obligatorios
const CAMPOS_OBLIGATORIOS = ["nombre", "correo", "telefono", "ciudad", "direccion"];


// =========================================================
// 1. MOSTRAR EL CARRITO
// =========================================================
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const tabla = document.getElementById("tabla-carrito");
  const cuerpoTabla = document.getElementById("cuerpo-tabla");
  const mensajeVacio = document.getElementById("carrito-vacio");

  // Si el carrito está vacío se muestra el mensaje y se oculta la tabla
  if (carrito.length === 0) {
    tabla.hidden = true;
    mensajeVacio.hidden = false;
  } else {
    tabla.hidden = false;
    mensajeVacio.hidden = true;
  }

  // Armamos una fila <tr> por cada producto del carrito
  let filas = "";
  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const subtotal = item.precio * item.cantidad; // subtotal = precio x cantidad

    filas = filas + `
      <tr>
        <td class="td-producto">
          <div class="producto-carrito">
            <img src="${item.imagen}" alt="${item.nombre}"
                 onerror="this.onerror = null; this.src = '${item.respaldo}';">
            <span>${item.nombre}</span>
          </div>
        </td>
        <td data-label="Precio" class="precio-celda">${formatearPrecio(item.precio)}</td>
        <td data-label="Cantidad">
          <div class="control-cantidad">
            <button type="button" class="btn-cantidad btn-restar" data-id="${item.id}" aria-label="Restar una unidad">−</button>
            <input type="number" class="input-cantidad" data-id="${item.id}" value="${item.cantidad}" min="1" max="${CANTIDAD_MAXIMA}" aria-label="Cantidad de ${item.nombre}">
            <button type="button" class="btn-cantidad btn-sumar" data-id="${item.id}" aria-label="Sumar una unidad">+</button>
          </div>
        </td>
        <td data-label="Subtotal" class="subtotal">${formatearPrecio(subtotal)}</td>
        <td data-label="Quitar">
          <button type="button" class="btn-eliminar" data-id="${item.id}">✕ Eliminar</button>
        </td>
      </tr>
    `;
  }
  cuerpoTabla.innerHTML = filas;

  asignarEventosTabla();
  mostrarResumen(carrito);
}


// =========================================================
// 2. EVENTOS DE LOS BOTONES DE LA TABLA
// =========================================================
function asignarEventosTabla() {
  // Botones "+"
  const botonesSumar = document.querySelectorAll(".btn-sumar");
  for (let i = 0; i < botonesSumar.length; i++) {
    botonesSumar[i].addEventListener("click", function () {
      const id = Number(botonesSumar[i].dataset.id);
      cambiarCantidad(id, obtenerCantidad(id) + 1);
    });
  }

  // Botones "−"
  const botonesRestar = document.querySelectorAll(".btn-restar");
  for (let i = 0; i < botonesRestar.length; i++) {
    botonesRestar[i].addEventListener("click", function () {
      const id = Number(botonesRestar[i].dataset.id);
      cambiarCantidad(id, obtenerCantidad(id) - 1);
    });
  }

  // Campo numérico: cuando el usuario escribe una cantidad
  const campos = document.querySelectorAll(".input-cantidad");
  for (let i = 0; i < campos.length; i++) {
    campos[i].addEventListener("change", function () {
      const id = Number(campos[i].dataset.id);
      let cantidad = parseInt(campos[i].value);
      if (isNaN(cantidad)) {
        cantidad = 1; // si escribe algo que no es número, queda en 1
      }
      cambiarCantidad(id, cantidad);
    });
  }

  // Botones "Eliminar"
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");
  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener("click", function () {
      const id = Number(botonesEliminar[i].dataset.id);
      eliminarProducto(id);
    });
  }
}


// =========================================================
// 3. CAMBIAR CANTIDADES Y ELIMINAR
// =========================================================

// Devuelve la cantidad que tiene un producto en el carrito
function obtenerCantidad(id) {
  const carrito = obtenerCarrito();
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      return carrito[i].cantidad;
    }
  }
  return 0;
}

// Cambia la cantidad de un producto respetando el mínimo (1) y el máximo
function cambiarCantidad(id, nuevaCantidad) {
  const carrito = obtenerCarrito();

  if (nuevaCantidad < 1) {
    nuevaCantidad = 1;
    mostrarMensaje("La cantidad mínima es 1. Para quitar el producto usa el botón Eliminar.", "info");
  }

  if (nuevaCantidad > CANTIDAD_MAXIMA) {
    nuevaCantidad = CANTIDAD_MAXIMA;
    mostrarMensaje("Puedes llevar máximo " + CANTIDAD_MAXIMA + " unidades por producto.", "info");
  }

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].cantidad = nuevaCantidad;
    }
  }

  guardarCarrito(carrito);
  mostrarCarrito();
  actualizarContador(true);
}

// Quita un producto del carrito
function eliminarProducto(id) {
  const carrito = obtenerCarrito();
  const nuevoCarrito = [];
  let nombreEliminado = "";

  // Pasamos al nuevo carrito todos los productos MENOS el que se elimina
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== id) {
      nuevoCarrito.push(carrito[i]);
    } else {
      nombreEliminado = carrito[i].nombre;
    }
  }

  guardarCarrito(nuevoCarrito);
  mostrarCarrito();
  actualizarContador(true);
  mostrarMensaje(nombreEliminado + " se eliminó del carrito.", "info");
}

// Vacía todo el carrito (pregunta primero)
function vaciarCarrito() {
  if (obtenerCarrito().length === 0) {
    mostrarMensaje("El carrito ya está vacío.", "info");
    return;
  }

  const confirmado = confirm("¿Seguro que quieres vaciar todo el carrito?");
  if (confirmado === true) {
    guardarCarrito([]);
    mostrarCarrito();
    actualizarContador(true);
    mostrarMensaje("Se vació el carrito.", "info");
  }
}


// =========================================================
// 4. CÁLCULOS DE LA COMPRA
// =========================================================

// Calcula unidades, subtotal, envío y total. Devuelve un objeto.
function calcularResumen(carrito) {
  let subtotal = 0;
  for (let i = 0; i < carrito.length; i++) {
    subtotal = subtotal + carrito[i].precio * carrito[i].cantidad;
  }

  // El envío es gratis si no hay productos o si la compra supera el valor mínimo
  let envio = COSTO_ENVIO;
  if (subtotal === 0 || subtotal >= ENVIO_GRATIS_DESDE) {
    envio = 0;
  }

  // Total a pagar = Subtotal de productos + Costo de envío
  const total = subtotal + envio;

  return {
    unidades: contarUnidades(carrito),
    subtotal: subtotal,
    envio: envio,
    total: total
  };
}

// Escribe los valores del resumen en la página
function mostrarResumen(carrito) {
  const resumen = calcularResumen(carrito);

  document.getElementById("total-unidades").textContent = resumen.unidades;
  document.getElementById("subtotal-general").textContent = formatearPrecio(resumen.subtotal);
  document.getElementById("total-pagar").textContent = formatearPrecio(resumen.total);

  const textoEnvio = document.getElementById("costo-envio");
  const notaEnvio = document.getElementById("nota-envio");

  if (resumen.subtotal === 0) {
    textoEnvio.textContent = formatearPrecio(0);
    notaEnvio.textContent = "";
  } else if (resumen.envio === 0) {
    textoEnvio.textContent = "Gratis ($0 COP)";
    notaEnvio.textContent = "🎉 ¡Tu compra tiene envío gratis!";
  } else {
    textoEnvio.textContent = formatearPrecio(resumen.envio);
    const falta = ENVIO_GRATIS_DESDE - resumen.subtotal;
    notaEnvio.textContent = "Te faltan " + formatearPrecio(falta) + " para tener envío gratis.";
  }

  // Si el carrito está vacío NO se puede finalizar la compra
  const estaVacio = carrito.length === 0;
  document.getElementById("btn-continuar").disabled = estaVacio;
  document.getElementById("btn-finalizar").disabled = estaVacio;
  document.getElementById("btn-vaciar").disabled = estaVacio;
  document.getElementById("aviso-formulario").hidden = !estaVacio;
}


// =========================================================
// 5. FINALIZAR LA COMPRA (SIMULACIÓN)
// =========================================================

// Lleva al usuario hasta el formulario
function irAlFormulario() {
  document.getElementById("seccion-compra").scrollIntoView({ behavior: "smooth" });
  document.getElementById("nombre").focus({ preventScroll: true });
}

// Revisa que el correo tenga la forma texto@texto.algo
function correoValido(correo) {
  const posicionArroba = correo.indexOf("@");
  const posicionPunto = correo.lastIndexOf(".");

  if (correo.indexOf(" ") !== -1) {
    return false; // no puede tener espacios
  }
  if (posicionArroba < 1) {
    return false; // debe tener algo antes de la @
  }
  if (posicionPunto < posicionArroba + 2) {
    return false; // debe tener un punto después de la @
  }
  if (posicionPunto === correo.length - 1) {
    return false; // no puede terminar en punto
  }
  return true;
}

// Revisa que el teléfono tenga solo números y entre 7 y 10 dígitos
function telefonoValido(telefono) {
  if (telefono.length < 7 || telefono.length > 10) {
    return false;
  }
  for (let i = 0; i < telefono.length; i++) {
    if (telefono[i] < "0" || telefono[i] > "9") {
      return false;
    }
  }
  return true;
}

// Muestra el mensaje de error debajo de un campo
function mostrarError(idCampo, mensaje) {
  document.getElementById(idCampo).classList.add("invalido");
  document.getElementById("error-" + idCampo).textContent = mensaje;
}

// Quita el mensaje de error de un campo
function limpiarError(idCampo) {
  document.getElementById(idCampo).classList.remove("invalido");
  document.getElementById("error-" + idCampo).textContent = "";
}

// Se ejecuta cuando el usuario presiona "Finalizar compra"
function finalizarCompra(evento) {
  evento.preventDefault(); // evita que el formulario recargue la página

  const carrito = obtenerCarrito();

  // 1. Verificar que haya al menos un producto en el carrito
  if (carrito.length === 0) {
    mostrarMensaje("Tu carrito está vacío. Agrega al menos un producto para comprar.", "error");
    return;
  }

  // 2. Leer los datos del formulario (trim quita espacios al inicio y al final)
  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    telefono: document.getElementById("telefono").value.trim().replaceAll(" ", ""),
    ciudad: document.getElementById("ciudad").value.trim(),
    direccion: document.getElementById("direccion").value.trim(),
    pago: document.getElementById("pago").value
  };

  // 3. Validar los campos obligatorios
  for (let i = 0; i < CAMPOS_OBLIGATORIOS.length; i++) {
    limpiarError(CAMPOS_OBLIGATORIOS[i]);
  }

  let formularioValido = true;

  if (datos.nombre === "") {
    mostrarError("nombre", "Escribe tu nombre completo.");
    formularioValido = false;
  }

  if (datos.correo === "") {
    mostrarError("correo", "Escribe tu correo electrónico.");
    formularioValido = false;
  } else if (correoValido(datos.correo) === false) {
    mostrarError("correo", "El correo no es válido. Ejemplo: nombre@correo.com");
    formularioValido = false;
  }

  if (datos.telefono === "") {
    mostrarError("telefono", "Escribe tu número de teléfono.");
    formularioValido = false;
  } else if (telefonoValido(datos.telefono) === false) {
    mostrarError("telefono", "Usa solo números, entre 7 y 10 dígitos.");
    formularioValido = false;
  }

  if (datos.ciudad === "") {
    mostrarError("ciudad", "Escribe la ciudad de entrega.");
    formularioValido = false;
  }

  if (datos.direccion === "") {
    mostrarError("direccion", "Escribe la dirección de entrega.");
    formularioValido = false;
  }

  if (formularioValido === false) {
    mostrarMensaje("Revisa los campos marcados en rojo.", "error");
    return;
  }

  // 4. Todo está bien: mostramos la confirmación y vaciamos el carrito
  const resumen = calcularResumen(carrito);
  mostrarConfirmacion(datos, carrito, resumen);

  guardarCarrito([]);
  mostrarCarrito();
  actualizarContador(false);
  document.getElementById("formulario-compra").reset();
}

// Llena y muestra el mensaje de confirmación de la compra
function mostrarConfirmacion(datos, carrito, resumen) {
  // Número de pedido al azar, por ejemplo TC-483920
  const numeroPedido = "TC-" + Math.floor(100000 + Math.random() * 900000);

  document.getElementById("conf-nombre").textContent = datos.nombre;
  document.getElementById("conf-pedido").textContent = numeroPedido;
  document.getElementById("conf-total").textContent = formatearPrecio(resumen.total);
  document.getElementById("conf-pago").textContent = datos.pago;
  document.getElementById("conf-direccion").textContent = datos.direccion + ", " + datos.ciudad;
  document.getElementById("conf-correo").textContent = datos.correo;

  // Lista de productos comprados
  const lista = document.getElementById("conf-productos");
  lista.innerHTML = "";
  for (let i = 0; i < carrito.length; i++) {
    agregarLineaPedido(lista, carrito[i].cantidad + " × " + carrito[i].nombre, formatearPrecio(carrito[i].precio * carrito[i].cantidad));
  }
  agregarLineaPedido(lista, "Subtotal de productos", formatearPrecio(resumen.subtotal));
  if (resumen.envio === 0) {
    agregarLineaPedido(lista, "Envío", "Gratis");
  } else {
    agregarLineaPedido(lista, "Envío", formatearPrecio(resumen.envio));
  }

  // Ocultamos el formulario y mostramos la confirmación
  document.getElementById("caja-formulario").hidden = true;
  const confirmacion = document.getElementById("confirmacion");
  confirmacion.hidden = false;
  confirmacion.scrollIntoView({ behavior: "smooth", block: "start" });

  mostrarMensaje("¡Gracias por tu compra, " + datos.nombre + "!", "exito");
}

// Crea una línea <li> con un texto a la izquierda y un valor a la derecha
function agregarLineaPedido(lista, texto, valor) {
  const linea = document.createElement("li");
  const spanTexto = document.createElement("span");
  const spanValor = document.createElement("span");
  spanTexto.textContent = texto;
  spanValor.textContent = valor;
  linea.appendChild(spanTexto);
  linea.appendChild(spanValor);
  lista.appendChild(linea);
}


// =========================================================
// 6. ESTO SE EJECUTA AL CARGAR LA PÁGINA DEL CARRITO
// =========================================================
mostrarCarrito();

document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
document.getElementById("btn-continuar").addEventListener("click", irAlFormulario);
document.getElementById("formulario-compra").addEventListener("submit", finalizarCompra);

// Cuando el usuario escribe en un campo con error, el error desaparece
for (let i = 0; i < CAMPOS_OBLIGATORIOS.length; i++) {
  const campo = document.getElementById(CAMPOS_OBLIGATORIOS[i]);
  campo.addEventListener("input", function () {
    limpiarError(CAMPOS_OBLIGATORIOS[i]);
  });
}
