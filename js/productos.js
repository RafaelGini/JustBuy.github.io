//Funciones para publicar todos productos
const PublicarProductos = (TodosLosProductos) =>{
    const section = document.getElementById('todosLos-productos');
    TodosLosProductos.forEach( producto => {
        const {id, imagen, descripcion, rating, precio, } = producto;
        const contenedor = document.createElement("a");
        contenedor.setAttribute("href", "detallesDeProducto.html");
        contenedor.setAttribute("id", `${id}`);
        contenedor.className = "col-4";
        contenedor.innerHTML = `<img src="../images/${imagen}" alt= "Producto Destacado">
                                <h4>${descripcion}</h4>
                                ${ratingDelProducto(rating)}
                                <p>$${precio.toLocaleString('en-US')}</p>`;
        section.appendChild(contenedor);

        //Eventos para cada nodo producto que se encuentre en el html
        contenedor.addEventListener('click', () => {
            localStorage.setItem('ProductoADetallar', JSON.stringify(producto));
        });
    });
}
const publicarO = async (tipoDeSort, data) => {
    switch (tipoDeSort){
        case "1":
            PublicarProductos(data.sort(function(a, b){return 0.5 - Math.random()}));  
            break;
        case "2":
            PublicarProductos(data.sort(function(a, b){return b.precio - a.precio}));   
            break;
        case "3":
            PublicarProductos(data.sort(function(a, b){return a.precio - b.precio})); 
            break;
        case "4":
            PublicarProductos(data.sort(function(a, b){return b.rating - a.rating})); 
            break;
        default:
            PublicarProductos(data.sort(function(a, b){return a.id - b.id})); 
            break;
    }
}

const Ordenar = async tipoDeSort => {
    const resp = await fetch('/js/data/productos.json');
    const data = await resp.json();
    await publicarO(tipoDeSort, data.productos);
}

//Eventos de productos.html para el ordenamiento y despliegue de los productos
const seleccion = document.getElementById("selection");
seleccion.onchange = async () => {
    VaciarElemento("todosLos-productos");
    Ordenar(seleccion.value);
}

const PublicarTodosLosProductos = async () => {
    try{
        const resp = await fetch('/js/data/productos.json');
        const data = await resp.json();
        PublicarProductos(data.productos);
    } catch (e){
        console.log(`Algun error con un producto: ${e}`);
    }
}

//Publicamos todos los productos en el html
PublicarTodosLosProductos();

