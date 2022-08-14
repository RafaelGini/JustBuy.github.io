//Funciones para publicar todos productos
const GenerarContenedorDeProducto = producto => {
    const {id, imagen, descripcion, rating, precio, } = producto;
    const contenedor = document.createElement("a");
    contenedor.setAttribute("href", "detallesDeProducto.html");
    contenedor.setAttribute("id", `${id}`);
    contenedor.className = "col-4";
    contenedor.innerHTML = `
        <img src="../images/${imagen}" alt= "Producto Destacado">
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

const PublicarProductos = (TodosLosProductos) => {
    const section = document.getElementById('todosLos-productos');
    TodosLosProductos.forEach( producto => {
        section.appendChild(GenerarContenedorDeProducto(producto));
    });
}

const publicarOrdenado = (tipoDeSort, data) => {
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

const agregarEventos = array => {
    const seleccion = document.getElementById("selection");
    seleccion.onchange = () => {
        VaciarElemento("todosLos-productos");
        publicarOrdenado(seleccion.value, array);
    }
}

//Llamamos una vez a fetch
const fetchData = async () => {
    try {
        const resp = await fetch('../js/data/productos.json');
        const data = await resp.json();
        const {productos} = data;
        PublicarProductos(productos);
        agregarEventos(productos);
    } catch (e) {
        console.log(`Algun error con un producto: ${e}`);
    }
}

//Cargamos la data
fetchData();
