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

const Ordenar = tipoDeSort => {
    switch (tipoDeSort){
        case "1":
            fetch('../../data/productos.json')
                .then( Resp => Resp.json() )
                .then( Data => { 
                    PublicarProductos(Data.productos.sort(function(a, b){return 0.5 - Math.random()})) 
                })
                .catch(e => console.log(e));
            break;
        case "2":
            fetch('../../data/productos.json')
                .then( Resp => Resp.json() )
                .then( Data => { 
                    PublicarProductos(Data.productos.sort(function(a, b){return b.precio - a.precio})) 
                })
                .catch(e => console.log(e));
            break;
        case "3":
            fetch('../../data/productos.json')
                .then( Resp => Resp.json() )
                .then( Data => { 
                    PublicarProductos(Data.productos.sort(function(a, b){return a.precio - b.precio})) 
                })
                .catch(e => console.log(e));
            break;
        case "4":
            fetch('../../data/productos.json')
                .then( Resp => Resp.json() )
                .then( Data => { 
                    PublicarProductos(Data.productos.sort(function(a, b){return b.rating - a.rating})) 
                })
                .catch(e => console.log(e));
            break;
        default:
            fetch('../../data/productos.json')
                .then( Resp => Resp.json() )
                .then( Data => { 
                    PublicarProductos(Data.productos.sort(function(a, b){return a.id - b.id})) 
                })
                .catch(e => console.log(e));
            break;
    }
}

//Eventos de productos.html para el ordenamiento y despliegue de los productos
const seleccion = document.getElementById("selection");
seleccion.onchange = () => {
    VaciarElemento("todosLos-productos");
    Ordenar(seleccion.value);
}

const PublicarTodosLosProductos = () => {
    fetch('../../data/productos.json')
    .then( Resp => Resp.json() )
    .then( Data => { PublicarProductos(Data.productos) })
    .catch(e => console.log(`Hubo un problema con un producto ${e}`));
}

//Publicamos todos los productos en el html
PublicarTodosLosProductos();