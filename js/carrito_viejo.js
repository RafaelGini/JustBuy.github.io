// --------------------- Ejecucion Principal ---------------------//
const Carrito = getFromDataBase('carrito');
const ContenedorDeProductos = document.getElementById("CargarCarrito");

CargarCarritoHTML();

// --------------------- Modulos ---------------------//
const CargarCarritoHTML = () => {
    if (Carrito == null || Carrito.length == 0){
        CargarCarritoVacio();
    } else {
        Carrito.forEach( objeto => {
            CargarProductoAlCarrito(objeto);
        });
        CargarTotal();
    }
}

const CargarCarritoVacio = () => {
    const mainDiv = document.querySelector(".cart-page");
    mainDiv.innerHTML = ``;

    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');

    th1.innerHTML = `Producto`;
    th2.innerHTML = `Cantidad`;
    th3.innerHTML = `SubTotal`;
    
    ContenedorDeProductos.innerHTML = ``;
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    ContenedorDeProductos.appendChild(tr);

    const tr2 = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    td1.innerHTML = `<h2>No Hay Productos</h2><br><br><br>`;
    td2.innerHTML = ``;
    td3.innerHTML = ``;

    tr2.appendChild(td1);
    tr2.appendChild(td2);
    tr2.appendChild(td3);
    ContenedorDeProductos.appendChild(tr2);

    const divPrecioTotal = document.createElement('div');
    divPrecioTotal.setAttribute("class", "total-price");

    mainDiv.appendChild(ContenedorDeProductos);
    mainDiv.appendChild(divPrecioTotal);

    const ContenedorTable = document.createElement('table');
    ContenedorTable.innerHTML = `<tr>
                                     <td>SubTotal</td>
                                     <td>$0</td>
                                 </tr>
                                 <tr>
                                     <td>IVA</td>
                                     <td>21%</td>
                                 </tr>
                                 <tr>
                                     <td>Total</td>
                                     <td>$0</td>
                                 </tr>`;
    divPrecioTotal.appendChild(ContenedorTable);
}


const CargarProductoAlCarrito = (producto) =>{
    const tr = document.createElement('tr');
    tr.setAttribute("id", `producto-${producto.id}`)
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    
    td1.innerHTML = `<div class="cart-info">
                         <img src="../images/${producto.imagen}" alt="${producto.nombre}">
                         <div>
                             <p>${producto.nombre}</p>
                             <small>Precio: $${producto.precio.toLocaleString('en-US')} 1/ud.</small>
                             <br>
                             <a class="cursor-pointer">Remove</a>
                         </div>
                     </div>`;
    td2.innerHTML = `<input type="number" value="${producto.cantidad}">`;
    td3.innerHTML = `$${(producto.precio * producto.cantidad).toLocaleString('en-US')}`;
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    ContenedorDeProductos.appendChild(tr);

    //Eventos a los botones
    const removeBtn = document.querySelector(`#producto-${producto.id} .cart-info a`);
    removeBtn.addEventListener('click', () => {
        ContenedorDeProductos.removeChild(document.getElementById(`producto-${producto.id}`));
        Carrito.splice(inCarrito(producto), 1);
        setToDataBase('carrito', Carrito);
        CargarCarritoHTML();
    });

    const quantityInput = document.querySelector(`#producto-${producto.id} td input`);
    quantityInput.addEventListener('change', () => {
        if (quantityInput.value < 0){
            quantityInput.value = 0;
        }
        const precioTotalDelProducto = document.querySelector(`#producto-${producto.id}`).lastElementChild;
        const nuevoprecio = producto.precio * quantityInput.value;
        precioTotalDelProducto.innerHTML = `$${(nuevoprecio).toLocaleString('en-US')}`;
        Carrito[inCarrito(producto)].cantidad = quantityInput.value;
        setToDataBase('carrito', Carrito);
        VaciarTotal();
        CargarTotal();
    })
}

const VerificarCarritoVacio = () => {
    return (document.getElementById("CargarCarrito").firstElementChild.children.length < 2);
}


const VaciarTotal = () => {
    const ContenedorDetotal = document.querySelector('.cart-page .total-price');
    ContenedorDetotal.innerHTML = ` `;
}

const CargarTotal = () => {
    const ContenedorDetotal = document.querySelector('.cart-page .total-price');
    const ContenedorTable = document.createElement('table');
    const IVA = 1.21;
    const total = TotalCarrito();
    ContenedorTable.innerHTML = `<tr>
                                     <td>SubTotal</td>
                                     <td>$${(total).toLocaleString('en-US')}</td>
                                 </tr>
                                 <tr>
                                     <td>IVA</td>
                                     <td>21%</td>
                                 </tr>
                                 <tr>
                                     <td>Total</td>
                                     <td>$${(total * IVA).toLocaleString('en-US')}</td>
                                 </tr>`;
    ContenedorDetotal.appendChild(ContenedorTable);
}

const TotalCarrito = () =>{
    if (Carrito == null || Carrito.length == 0) return 0;
    return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
}


const inCarrito = (productoVerificar) => { 
    //retorna la posicion del objeto en el array carrito, retorna -1 si no está
    const carrito = getFromDataBase('carrito');
    for (let inx in carrito){
        if (carrito[inx].id == productoVerificar.id) return inx;
    }
    return -1;
}
