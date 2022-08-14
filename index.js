//Funciones para publicar productos en distintas secciones del index, se extraen los productos de la BD
const GenerarContenedorDeProducto = producto => {
    const {imagen, descripcion, rating, precio} = producto;
    const contenedor = document.createElement("a");
    contenedor.setAttribute("href", "pages/detallesDeProducto.html");
    contenedor.className = "col-4";
    contenedor.innerHTML = `
        <img src="images/${imagen}" alt= "Producto Destacado">
        <h4>${descripcion}</h4>
        ${ratingDelProducto(rating)}
        <p>$${precio.toLocaleString('en-US')}</p>
    `;

    //Si se hace click sobre un producto:
    contenedor.addEventListener('click', () => { 
        localStorage.setItem('ProductoADetallar', JSON.stringify(producto));
    });

    return contenedor;
}

const PublicarProductos = (contenedor, arrayProductos) =>{
    const section = document.getElementById(contenedor);
    arrayProductos.forEach( producto => { 
        section.appendChild(GenerarContenedorDeProducto(producto)) 
    });
}

const PublicarOferta = (producto) => {
    //Esta funcion es muy concreta
    const section = document.getElementById("oferta-exclusiva");
    const {imagen, descripcion, nombre} = producto;
    const contenedor1 = document.createElement("div");
    contenedor1.className = "col-2";
    contenedor1.innerHTML = `<img src="images/${imagen}" alt="Producto Exclusivo" class="scale-1_1">`;
    
    const contenedor2 = document.createElement("div");
    contenedor2.className = "col-2";
    contenedor2.innerHTML = `
        <p>Producto destacado y exclusivo de JustBuy</p>
        <h1>${nombre}</h1>
        <small>${descripcion}</small>
        <br>
        <a href="pages/detallesDeProducto.html" class="btn" id="OfertaExclusiva-btn">Comprar Ahora</a>
    `;
    section.appendChild(contenedor1);
    section.appendChild(contenedor2);

    //Evento para boton Comprar Ahora
    const NodoBotonOfertaExclusiva = document.getElementById('OfertaExclusiva-btn');
    NodoBotonOfertaExclusiva.addEventListener('click', () => {
        localStorage.setItem('ProductoADetallar', JSON.stringify(producto));
    });
}

const SeleciconarProductosDestacados = (arrayTodosLosProductos, arrayIds) => {
    //En el index existen 3 secciones de contenedores de productos. El arrayIds contiene 3 arrays mas con...
    //... los ids respectivos para cada seccion, la funcion sirve para recorrer solo una vez la base de datos
    let i = 0;
    const max = arrayTodosLosProductos.length;
    const ProductosDestacados = [[], [], []];
    while (i < max && (arrayIds[0] || arrayIds[1] || arrayIds[2]) ){
        const producto = arrayTodosLosProductos[i];
        const searchInDestacados = arrayIds[0].indexOf(producto.id);
        const searchInUltimos = arrayIds[1].indexOf(producto.id);
        const searchInOferta = arrayIds[2].indexOf(producto.id);
        if (searchInDestacados != -1) {
            ProductosDestacados[0].push(producto);
            arrayIds[0].splice(searchInDestacados, 1);
        }
        if (searchInUltimos != -1) {
            ProductosDestacados[1].push(producto);
            arrayIds[1].splice(searchInUltimos, 1);
        }
        if (searchInOferta != -1) {
            ProductosDestacados[2].push(producto);
            arrayIds[2].splice(searchInOferta, 1);
        }
        i++;
    }
    return ProductosDestacados;
}

//Los Id`s de los productos que queremos publicar para cada contenedor
const Destacados = [118, 119, 120, 121];
const Ultimos = [100, 104, 105, 101, 112, 114, 115, 113];
const Oferta = [103];
const ids = [Destacados, Ultimos, Oferta];

const CargarData = async () => {
    try{
        const resp = await fetch('js/data/productos.json');
        const data = await resp.json();
        const ProductosDestacados = SeleciconarProductosDestacados(data.productos, ids);
        PublicarProductos('productos-destacados', ProductosDestacados[0]);
        PublicarProductos('ultimos-productos', ProductosDestacados[1]);
        PublicarOferta(ProductosDestacados[2][0]);
    } catch (e) { 
        console.log(`Algun error con un producto: ${e}`); 
    }

}

//Ejecucion. Se cargan Los productos destacados en el index.
CargarData();