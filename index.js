//Funciones para publicar productos en distintas secciones del index, se extraen los productos del Storage
const PublicarProductos = (contenedor, arrayProductos) =>{
    const section = document.getElementById(contenedor);
    if (!arrayProductos) return;
    arrayProductos.forEach( producto => {
        const {imagen, descripcion, rating, precio} = producto;
        const contenedor = document.createElement("a");
        contenedor.setAttribute("href", "pages/detallesDeProducto.html");
         
        contenedor.className = "col-4";
        contenedor.innerHTML = `<img src="images/${imagen}" alt= "Producto Destacado">
                                <h4>${descripcion}</h4>
                                ${ratingDelProducto(rating)}
                                <p>$${precio.toLocaleString('en-US')}</p>`;
        section.appendChild(contenedor);

        //Eventos para cada nodo producto que se encuentre en el index
        contenedor.addEventListener('click', () => { 
            localStorage.setItem('ProductoADetallar', JSON.stringify(producto));
        });
    });
}

const PublicarOferta = () => {
    const section = document.getElementById("oferta-exclusiva");
    if (!OfertaExclusiva) return;
    const {imagen, descripcion, nombre} = OfertaExclusiva;
    const contenedor1 = document.createElement("div");
    contenedor1.className = "col-2";
    contenedor1.innerHTML = `<img src="images/${imagen}" alt="Producto Exclusivo" class="scale-1_1">`;
    
    const contenedor2 = document.createElement("div");
    contenedor2.className = "col-2";
    contenedor2.innerHTML = `<p>Producto destacado y exclusivo de JustBuy</p>
                             <h1>${nombre}</h1>
                             <small>${descripcion}</small>
                             <br>
                             <a href="pages/detallesDeProducto.html" class="btn" id="NodoBotonOfertaExclusiva" >Comprar Ahora</a>`;
    section.appendChild(contenedor1);
    section.appendChild(contenedor2);

    //Evento para boton Comprar Ahora
    const NodoBotonOfertaExclusiva = document.getElementById('NodoBotonOfertaExclusiva');
    NodoBotonOfertaExclusiva.addEventListener('click', () => {
        localStorage.setItem('ProductoADetallar', JSON.stringify(OfertaExclusiva));
    });

}

//Ejecucion. Se cargan Los productos destacados en el index
PublicarProductos('productos-destacados', ProductosDestacados);
PublicarProductos('ultimos-productos', UltimosProductos);
PublicarOferta();

