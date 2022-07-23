// ------------------------------- Funciones Storage -------------------------------//
const getFromDataBase = CLAVE => JSON.parse(localStorage.getItem(CLAVE));
const setToDataBase = (CLAVE, VALOR) => localStorage.setItem(CLAVE, JSON.stringify(VALOR))


// ------------------------------- Declaracion de objetos y base de datos -------------------------------//

//Etiquetas para cada producto:
const Etiqs = new Etiquetas();

// Todos los Televisores 
const TodosLosSmartTv = [];

// Todos los Celulares 
const Iphone13ProMax1000 = new Celular("Apple Iphone 13 Pro Max", ars, 600_000, "IphoneProMax.png", Etiqs.EtiquetasIphone, "1TB", "Grafito", 5);
const Iphone13Pro256 = new Celular("Apple Iphone 13 Pro", ars, 378_500, "Iphone13Pro.png", Etiqs.EtiquetasIphone, "256GB", "Aqua", 5);
const SamsungS22Ultra256 = new Celular("Samsung S22 Ultra", ars, 278_900, "S22ultra.png", Etiqs.EtiquetasSamsung, "256GB", "Negro", 4.5);
const SamsungS22Plus256 = new Celular("Samsung S22+", ars, 228_500, "S22mas.png", Etiqs.EtiquetasSamsung, "256GB", "Color Negro", 4);
const TodosLosCelulares = [Iphone13ProMax1000, Iphone13Pro256, SamsungS22Ultra256, SamsungS22Plus256];

// Todos los Pc 
const AsusZephM16 = new Pc("Asus Zephyrus M16", ars, 450_000, "asus_m16.png", Etiqs.EtiquetaAsusPc, "512 SSD", `15"`, 4.5, "16GB RAM", "RTX 3050", "i9", "OLED UHD");
const AsusZephG14 = new Pc("Asus Zephyrus G14", ars, 480_000, "asus_g14.png", Etiqs.EtiquetaAsusPc, "512 SSD", `15"`, 4, "16GB RAM", "RTX 3080", "Ryzen 9", "UHD");
const MacbookPro14M1 = new Pc("MackBook Pro 14", ars, 690_000, "macbookproM116 1.png", Etiqs.EtiquetaMackBook, "512 SSD", `14"`, 5, "16GB RAM", "Integrada", "M1", "UHD");
const MacbookPro16M1Pro = new Pc("MackBook Pro 16", ars, 770_900, "macbookproM1Pro 1.png", Etiqs.EtiquetaMackBook, "512 SSD", `16"`, 5, "16GB RAM", "Integrada", "M1 Pro", "UHD");
const RazerBlade = new Pc("Razer Blade 15", usd, 5000,  "razer_blade.png", Etiqs.EtiquetaAsusPc, "1TB SSD", `15.6"`, 5, "32GB DDR5 RAM", "Nvidia GeForce RTX 3080 Ti", "12th Gen Intel Core i9 CPU", "4k UHD 144Hz");
const TodasLasPc = [AsusZephM16, AsusZephG14, MacbookPro14M1, MacbookPro16M1Pro, RazerBlade];

// Todos los Consolas
const ps5Disquera = new Consola("Sony PlayStation 5", ars, 220_000, "", [], "800GB", "Disquera", 4.5);
const ps5Digital = new Consola("Sony PlayStation 5", ars, 220_000, "", [], "1000GB", "Digital", 4.5);
const TodasLasConsolas = [];

// Todos los Componentes
const IntelCorei9 = new Componente("12th Gen Intel Core i9 CPU", ars, 200_000, "i9.webp", Etiqs.EtiquetasProcesador, 5);
const IntelCorei7 = new Componente("12th Gen Intel Core i7 CPU", ars, 100_000, "i7.webp", Etiqs.EtiquetasProcesador, 4.5);
const AmdRyzen95900 = new Componente("AMD Ryzen 9 5900X CPU", ars, 151_900, "r9.png", Etiqs.EtiquetasProcesador, 5);
const NvidiaRTX3090 = new Componente("Nvidia GeForce RTX 3090", ars, 495_900, "nvidia3090.png", Etiqs.EtiquetasGrafica, 5);
const TodosLosComponentes = [IntelCorei9, IntelCorei7, AmdRyzen95900, NvidiaRTX3090];

//Todos los productos:
const TodosLosProductos = [];
TodosLosSmartTv.forEach((prod) => {TodosLosProductos.push(prod)});
TodosLosCelulares.forEach((prod) => {TodosLosProductos.push(prod)});
TodasLasPc.forEach((prod) => {TodosLosProductos.push(prod)});
TodasLasConsolas.forEach((prod) => {TodosLosProductos.push(prod)});
TodosLosComponentes.forEach((prod) => {TodosLosProductos.push(prod)});

//Modificador de precio por la inflacion
let modificadorDePrecio = 1;
TodosLosProductos.forEach((prod) => prod.precio = parseInt(prod.precio * modificadorDePrecio));

//Contenedores principales:
const ProductosDestacados = [IntelCorei9, NvidiaRTX3090, AmdRyzen95900, IntelCorei7];
const UltimosProductos = [AsusZephM16, MacbookPro14M1, MacbookPro16M1Pro, AsusZephG14, Iphone13ProMax1000, SamsungS22Plus256, SamsungS22Ultra256, Iphone13Pro256];
const OfertaExclusiva = RazerBlade;
const carrito = [];
const ProductoADetallar = null;

if (localStorage.length == 0){
    localStorage.setItem('TodosLosProductos', JSON.stringify(TodosLosProductos));
    localStorage.setItem('ProductosDestacados', JSON.stringify(ProductosDestacados));
    localStorage.setItem('UltimosProductos', JSON.stringify(UltimosProductos));
    localStorage.setItem('OfertaExclusiva', JSON.stringify(RazerBlade));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('ProductoADetallar', JSON.stringify(ProductoADetallar));
    console.log('Se cargaron todos los datos');
}

if (false){
    localStorage.clear();
    console.log('Se eliminaron Todos los datos');
}
