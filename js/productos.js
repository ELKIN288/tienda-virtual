// =========================================================
// productos.js
// Catálogo de la tienda: un ARREGLO de OBJETOS.
// Cada objeto es un producto con sus datos.
//
// imagen   -> foto real del producto (Wikimedia Commons, licencia libre)
// respaldo -> ilustración propia que se muestra si la foto no carga
// autorFoto y fuenteFoto -> créditos de la foto
// =========================================================

const productos = [
  {
    id: 1,
    nombre: "Apple AirPods Pro",
    descripcion: "Audífonos inalámbricos de Apple con cancelación activa de ruido y estuche de carga.",
    precio: 999900,
    categoria: "Audio",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Apple_airpods_pro.jpg/500px-Apple_airpods_pro.jpg",
    respaldo: "img/audifonos.svg",
    autorFoto: "Arne Müseler",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Apple_airpods_pro.jpg",
    destacado: true
  },
  {
    id: 2,
    nombre: "Parlante JBL Flip 5",
    descripcion: "Parlante Bluetooth portátil, resistente al agua y con hasta 12 horas de música.",
    precio: 399900,
    categoria: "Audio",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/JBL_speaker%2C_2021.jpg/500px-JBL_speaker%2C_2021.jpg",
    respaldo: "img/parlante.svg",
    autorFoto: "Ssu",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:JBL_speaker,_2021.jpg",
    destacado: true
  },
  {
    id: 3,
    nombre: "Audífonos Sony WH-1000XM3",
    descripcion: "Audífonos de diadema inalámbricos con cancelación de ruido y hasta 30 horas de batería.",
    precio: 799900,
    categoria: "Audio",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sony-WH-1000XM3-kabellose-Bluetooth-Noise-Cancelling-Kopfhoerer.4.jpg/500px-Sony-WH-1000XM3-kabellose-Bluetooth-Noise-Cancelling-Kopfhoerer.4.jpg",
    respaldo: "img/diadema.svg",
    autorFoto: "digitalpush.net",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Sony-WH-1000XM3-kabellose-Bluetooth-Noise-Cancelling-Kopfhoerer.4.jpg",
    destacado: false
  },
  {
    id: 4,
    nombre: "Mouse Logitech MX Master 3S",
    descripcion: "Mouse inalámbrico ergonómico con clics silenciosos y desplazamiento ultrarrápido.",
    precio: 449900,
    categoria: "Computador",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Logitech_MX_Master_3S_HS01.jpg/500px-Logitech_MX_Master_3S_HS01.jpg",
    respaldo: "img/mouse.svg",
    autorFoto: "Hayden Schiff",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Logitech_MX_Master_3S_HS01.jpg",
    destacado: false
  },
  {
    id: 5,
    nombre: "Teclado Apple Magic Keyboard",
    descripcion: "Teclado inalámbrico de Apple, delgado y recargable, para Mac, iPad y iPhone.",
    precio: 549900,
    categoria: "Computador",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Apple_Magic_Keyboard_-_US.jpg/500px-Apple_Magic_Keyboard_-_US.jpg",
    respaldo: "img/teclado.svg",
    autorFoto: "Fletcher",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Apple_Magic_Keyboard_-_US.jpg",
    destacado: false
  },
  {
    id: 6,
    nombre: "Cámara web Logitech C270 HD",
    descripcion: "Cámara web HD con micrófono incorporado, ideal para clases y videollamadas.",
    precio: 99900,
    categoria: "Computador",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Fancy_webcam_on_computer_screen.jpg/500px-Fancy_webcam_on_computer_screen.jpg",
    respaldo: "img/camara.svg",
    autorFoto: "Peter Placzek",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Fancy_webcam_on_computer_screen.jpg",
    destacado: false
  },
  {
    id: 7,
    nombre: "Memoria USB SanDisk Cruzer Blade",
    descripcion: "Memoria USB compacta y liviana para guardar y llevar tus archivos.",
    precio: 34900,
    categoria: "Computador",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2015_Pendrive_SanDisk_4GB.jpg/500px-2015_Pendrive_SanDisk_4GB.jpg",
    respaldo: "img/usb.svg",
    autorFoto: "Jacek Halicki",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:2015_Pendrive_SanDisk_4GB.jpg",
    destacado: false
  },
  {
    id: 8,
    nombre: "Cable Apple USB-C de 1 m",
    descripcion: "Cable de carga y datos USB-C para iPad, iPhone y MacBook.",
    precio: 99900,
    categoria: "Celular",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/USB_Type-C_Cable_-_iPad_USB-C_Charger_%2845640822114%29.jpg/500px-USB_Type-C_Cable_-_iPad_USB-C_Charger_%2845640822114%29.jpg",
    respaldo: "img/cable.svg",
    autorFoto: "Tony Webster",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:USB_Type-C_Cable_-_iPad_USB-C_Charger_(45640822114).jpg",
    destacado: false
  },
  {
    id: 9,
    nombre: "Power bank Anker PowerCore 10000",
    descripcion: "Batería portátil compacta de 10.000 mAh para cargar tu celular donde estés.",
    precio: 129900,
    categoria: "Celular",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Anker_power_bank_lit.jpg/500px-Anker_power_bank_lit.jpg",
    respaldo: "img/powerbank.svg",
    autorFoto: "Saucy",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Anker_power_bank_lit.jpg",
    destacado: false
  },
  {
    id: 10,
    nombre: "Reloj Garmin Forerunner 55",
    descripcion: "Reloj GPS para correr con monitor de frecuencia cardíaca y batería de larga duración.",
    precio: 899900,
    categoria: "Relojes",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Garmin_Forerunner_55.jpg/500px-Garmin_Forerunner_55.jpg",
    respaldo: "img/reloj.svg",
    autorFoto: "Melyanac",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Garmin_Forerunner_55.jpg",
    destacado: true
  },
  {
    id: 11,
    nombre: "Apple Watch Series 8",
    descripcion: "Reloj inteligente con pantalla siempre activa, sensor de temperatura y detección de accidentes.",
    precio: 1599900,
    categoria: "Relojes",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Apple_Watch_Series_8.jpg/500px-Apple_Watch_Series_8.jpg",
    respaldo: "img/reloj.svg",
    autorFoto: "iGeeksBlog",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Apple_Watch_Series_8.jpg",
    destacado: true
  },
  {
    id: 12,
    nombre: "Control inalámbrico Xbox",
    descripcion: "Control oficial de Xbox, compatible con Xbox Series X|S, Xbox One y PC.",
    precio: 299900,
    categoria: "Gaming",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Xbox_Wireless_Controller%2C_Model_1914_%27Shock_Blue%27.jpg/500px-Xbox_Wireless_Controller%2C_Model_1914_%27Shock_Blue%27.jpg",
    respaldo: "img/control.svg",
    autorFoto: "mliu92",
    fuenteFoto: "https://commons.wikimedia.org/wiki/File:Xbox_Wireless_Controller,_Model_1914_'Shock_Blue'.jpg",
    destacado: false
  }
];
