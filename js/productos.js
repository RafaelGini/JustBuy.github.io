//Funciones para publicar todos productos
const PublicarProductos = () =>{
    const section = document.getElementById('todosLos-productos');
    arrayProductos.forEach( producto => {
        const contenedor = document.createElement("a");
        contenedor.setAttribute("href", "detallesDeProducto.html");
        contenedor.setAttribute("id", `${producto.id}`);
        contenedor.className = "col-4";
        contenedor.innerHTML = `<img src="../images/${producto.imagen}" alt= "Producto Destacado">
                                <h4>${producto.descripcion}</h4>
                                ${ratingDelProducto(producto.rating)}
                                <p>$${producto.precio.toLocaleString('en-US')}</p>`;
        section.appendChild(contenedor);

        //Eventos para cada nodo producto que se encuentre en el html
        contenedor.addEventListener('click', () => {
            localStorage.setItem('ProductoADetallar', JSON.stringify(producto));
        });
    });
}

//Ordenamiento de todos los productos en el html
const OrdenarTodosLosProductos = tipo => {
    switch (tipo){
        case "0":
            arrayProductos.sort(function(a, b){return 0.5 - Math.random()});
            break;
        case "1":
            arrayProductos.sort(function(a, b){return b.precio - a.precio});
            break;
        case "2":
            arrayProductos.sort(function(a, b){return a.precio - b.precio});
            break;
        case "3":
            arrayProductos.sort(function(a, b){return b.rating - a.rating});
            break;
        default:
            break;
    }
}

//Obtenemos Todos los productos del Storage y ubicamos el array en una constante de comportamiento global para este archivo JS
const arrayProductos = getFromDataBase('TodosLosProductos');
arrayProductos.sort(function(a, b){return 0.5 - Math.random()});

//Eventos de productos.html para el ordenamiento y despliegue de los productos
const seleccion = document.getElementById("selection");
seleccion.onchange = () => {
    VaciarElemento("todosLos-productos");
    OrdenarTodosLosProductos(seleccion.value);
    PublicarProductos();
}

//Publicamos todos los productos en el html
PublicarProductos();