//Funciones para publicar productos en distintas secciones del index, se extraen los productos del Storage
const PublicarProductos = (contenedor, ClaveLocalStorage) =>{
    const arrayProductos = getFromDataBase(ClaveLocalStorage);
    const section = document.getElementById(contenedor);
    if (arrayProductos == null) return;

    arrayProductos.forEach( producto => {

        const contenedor = document.createElement("a");
        contenedor.setAttribute("href", "pages/detallesDeProducto.html");
         
        contenedor.className = "col-4";
        contenedor.innerHTML = `<img src="images/${producto.imagen}" alt= "Producto Destacado">
                                <h4>${producto.descripcion}</h4>
                                ${ratingDelProducto(producto.rating)}
                                <p>$${producto.precio.toLocaleString('en-US')}</p>`;
        section.appendChild(contenedor);

        //Eventos para cada nodo producto que se encuentre en el index
        contenedor.addEventListener('click', () => { localStorage.setItem('ProductoADetallar', JSON.stringify(producto));
        });

    });
}

const PublicarOferta = () => {
    const productoExclusivo = getFromDataBase('OfertaExclusiva');
    const section = document.getElementById("oferta-exclusiva");
    if (productoExclusivo == null) return;
    
    const contenedor1 = document.createElement("div");
    contenedor1.className = "col-2";
    contenedor1.innerHTML = `<img src="images/${productoExclusivo.imagen}" alt="Producto Exclusivo" class="scale-1_1">`;
    
    const contenedor2 = document.createElement("div");
    contenedor2.className = "col-2";
    contenedor2.innerHTML = `<p>Producto destacado y exclusivo de JustBuy</p>
                             <h1>${productoExclusivo.nombre}</h1>
                             <small>${productoExclusivo.descripcion}</small>
                             <br>
                             <a href="pages/detallesDeProducto.html" class="btn" id="NodoBotonOfertaExclusiva" >Comprar Ahora</a>`;
    section.appendChild(contenedor1);
    section.appendChild(contenedor2);

    //Evento para boton Comprar Ahora
    const NodoBotonOfertaExclusiva = document.getElementById('NodoBotonOfertaExclusiva');
    NodoBotonOfertaExclusiva.addEventListener('click', () => {
        localStorage.setItem('ProductoADetallar', JSON.stringify(productoExclusivo));
    });

}

//Ejecucion. Se cargan Los productos destacados en el index
PublicarProductos('productos-destacados', 'ProductosDestacados');
PublicarProductos('ultimos-productos', 'UltimosProductos');
PublicarOferta();

