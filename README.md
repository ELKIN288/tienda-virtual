# TecnoCaribe – Tienda virtual de tecnología y accesorios

Examen final de **Programación Web** (Ingeniería Industrial).
Tienda virtual (E-commerce) hecha con **HTML5, CSS3 y JavaScript**, sin bases de datos ni servidor.

- **Autor:** Elkin Ardila Ferreira
- **Sitio publicado:** https://elkin288.github.io/tienda-virtual/
- **Repositorio:** https://github.com/ELKIN288/tienda-virtual

## Estructura del proyecto

```
tienda-virtual/
├── index.html          Página principal (banner, quiénes somos, destacados, contacto)
├── productos.html      Catálogo con los 12 productos
├── carrito.html        Carrito, resumen de la compra y formulario para finalizar
├── css/
│   └── estilos.css     Hoja de estilos externa (Flexbox, Grid y diseño responsive)
├── js/
│   ├── productos.js    Arreglo de objetos con los productos
│   ├── carrito.js      Funciones comunes: localStorage, agregar, contador, mensajes, menú
│   ├── catalogo.js     Dibuja las tarjetas de productos y sus botones
│   └── pagina-carrito.js  Tabla del carrito, cantidades, totales y compra simulada
└── img/                Logo, banner e ilustraciones de respaldo (SVG)
```

## Cómo cumple los requerimientos

| Requerimiento | Dónde está |
|---|---|
| RF01 Página principal | `index.html`: nombre, logotipo, menú, banner, presentación, acceso al catálogo y al carrito, pie de página con contacto |
| RF02 Catálogo (mínimo 10) | 12 productos de marcas reconocidas (Apple, JBL, Sony, Logitech, SanDisk, Anker, Garmin y Xbox) en `js/productos.js`, cada uno con foto, nombre, descripción, precio en COP y botón |
| RF03 Carrito | `carrito.html` + `js/pagina-carrito.js`: ver productos, cambiar cantidad (− / + o escribiendo), eliminar uno, vaciar todo, total de unidades. Si se agrega un producto repetido, sube la cantidad y no se duplica la línea (`agregarAlCarrito` en `js/carrito.js`) |
| RF04 Cálculos | `calcularResumen()`: subtotal por producto, subtotal general, envío ($12.000, gratis desde $250.000) y **Total = Subtotal + Envío**. Con el carrito vacío el total es $0 COP y no se puede finalizar |
| RF05 Compra simulada | Formulario con nombre, correo, teléfono, ciudad y dirección. `finalizarCompra()` valida los campos, revisa que haya productos y muestra la confirmación con el nombre y el valor total |
| RF06 Navegación | Menú en todas las páginas, botón ☰ en celulares, mensajes de confirmación y advertencia, diseño adaptable (`@media` en `estilos.css`) |
| RF07 Persistencia | `localStorage` en `obtenerCarrito()` y `guardarCarrito()`: el carrito se conserva al recargar o cambiar de página |

## Conceptos aplicados

- **HTML5:** etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`), formulario, tabla, enlaces e imágenes.
- **CSS3:** variables, clases, Flexbox, Grid, transiciones, animaciones (`@keyframes`) y media queries.
- **JavaScript:** variables, funciones, eventos (`click`, `change`, `input`, `submit`), condicionales, ciclos `for`, arreglos, objetos, manipulación del DOM y `localStorage`.

## Fotos de los productos

Las fotos son de **Wikimedia Commons** y se usan con licencias libres (Creative Commons).
Se cargan desde Wikimedia; si una foto no carga, la página muestra automáticamente una ilustración propia de la carpeta `img/` (atributo `onerror` en `js/catalogo.js`).

| Producto | Autor de la foto | Fuente |
|---|---|---|
| Apple AirPods Pro | Arne Müseler | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Apple_airpods_pro.jpg) |
| Parlante JBL Flip 5 | Ssu | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:JBL_speaker,_2021.jpg) |
| Audífonos Sony WH-1000XM3 | digitalpush.net (CC BY 4.0) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sony-WH-1000XM3-kabellose-Bluetooth-Noise-Cancelling-Kopfhoerer.4.jpg) |
| Mouse Logitech MX Master 3S | Hayden Schiff | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Logitech_MX_Master_3S_HS01.jpg) |
| Teclado Apple Magic Keyboard | Fletcher | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Apple_Magic_Keyboard_-_US.jpg) |
| Cámara web Logitech C270 HD | Peter Placzek | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Fancy_webcam_on_computer_screen.jpg) |
| Memoria USB SanDisk Cruzer Blade | Jacek Halicki | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2015_Pendrive_SanDisk_4GB.jpg) |
| Cable Apple USB-C | Tony Webster | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:USB_Type-C_Cable_-_iPad_USB-C_Charger_(45640822114).jpg) |
| Power bank Anker PowerCore 10000 | Saucy | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Anker_power_bank_lit.jpg) |
| Reloj Garmin Forerunner 55 | Melyanac | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Garmin_Forerunner_55.jpg) |
| Apple Watch Series 8 | iGeeksBlog | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Apple_Watch_Series_8.jpg) |
| Control inalámbrico Xbox | mliu92 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Xbox_Wireless_Controller,_Model_1914_'Shock_Blue'.jpg) |

Las marcas mencionadas pertenecen a sus respectivos dueños. Esta tienda es un proyecto académico y no tiene relación con ellas.

## Cómo probarlo en el computador

Abrir el archivo `index.html` con el navegador (Chrome, Edge o Firefox).

> Proyecto académico. Los precios y datos de contacto son de ejemplo; no se realizan pagos reales.
