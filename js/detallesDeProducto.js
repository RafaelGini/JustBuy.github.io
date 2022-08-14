//Funciones de verificacion y manejo del array carrito
const inCarrito = (productoVerificar) => { 
    //retorna la posicion del objeto en el array carrito, retorna -1 si no está
    const carrito = getFromDataBase('carrito');
    for (let inx in carrito){
        if (carrito[inx].id == productoVerificar.id) return inx;
    }
    return -1;
}

const LanzarToast = (text) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Toast.fire({
    icon: 'warning',
    title: `${text}`
    });
}

//Funciones similares a los demas JS pero con cambios muy especificos que son requeridos por el archivo detallesDeProducto.html
const subirDetalles = () => {
    const producto = getFromDataBase('ProductoADetallar');
    if (!producto) return;
    const section = document.getElementById("Detalles");
    const {imagen, title, nombre, precio, cantidad, descripcion} = producto;
    section.innerHTML = `
        <div class="col-2 df-row-center"> 
            <img src="../images/${imagen}"> 
        </div>
        <div class="col-2">
            <p>${title}</p>
            <h1>${nombre}</h1>
            <h4>Ars$ ${(precio).toLocaleString('en-US')}</h4>
            <input type="number" value="${cantidad}">
            <a href="carrito.html" class="btn addToCart">Añadir al Carrito</a>
            <h3>Detalles del Producto <i class="fa-solid fa-circle-info"></i></h3>
            <br><p>${descripcion}</p>
        </div>
    `;
    //Eventos para los productos detallados
    const inputNumber = document.querySelector('#Detalles div input');
    inputNumber.addEventListener('change', () => {
        if (inputNumber.value < 0){
            inputNumber.value = 0;
            LanzarToast('La minima cantidad es 0!');
        }
        if (inputNumber.value > 999){
            inputNumber.value = 999;
            LanzarToast('La maxima cantidad es 999!');
        }
        producto.cantidad = inputNumber.value;
        setToDataBase('ProductoADetallar', producto);
    });

    const addToCart = document.querySelector('#Detalles div .addToCart');
    addToCart.addEventListener('click', () => {
        const carrito = getFromDataBase('carrito');
        const productoAgregar = getFromDataBase('ProductoADetallar');
        const inx = inCarrito(productoAgregar);
        if (inx != -1){
            carrito[inx].cantidad = productoAgregar.cantidad;
        } else {
            carrito.push(productoAgregar);
        }
        setToDataBase('justAdded', true);
        setToDataBase('carrito', carrito);
    });
}

const PublicarProductos = (TodosLosProductos) =>{
    const section = document.getElementById("todosLos-productos");
    TodosLosProductos.forEach( producto => {
        const {id, imagen, descripcion, rating, precio} = producto;
        const contenedor = document.createElement("a");
        contenedor.setAttribute("href", "#");
        contenedor.setAttribute("id", `${id}`);
        contenedor.className = "col-4";
        contenedor.innerHTML = `
            <img src="../images/${imagen}" alt= "Producto Destacado">
            <h4>${descripcion}</h4>
            ${ratingDelProducto(rating)}
            <p>$${precio.toLocaleString('en-US')}</p>
        `;
        section.appendChild(contenedor);
        //Eventos para cada nodo producto que se encuentre en el index
        contenedor.addEventListener('click', () => {
            localStorage.setItem('ProductoADetallar', JSON.stringify(producto));
            subirDetalles();
        });
    });
}

const PublicarTodosLosProductos = async () => {
    try{
        const resp = await fetch('../js/data/productos.json');
        const data = await resp.json();
        PublicarProductos(data.productos);
    } catch (e) {
        console.log(`Algun error con un producto: ${e}`);
    }
}

//Publicamos todos los productos en el html
PublicarTodosLosProductos();
subirDetalles();