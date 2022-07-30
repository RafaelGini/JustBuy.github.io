// --------------------- Constantes ---------------------//
const Carrito = getFromDataBase('carrito');
const mainDiv = document.querySelector(".cart-page");
const ContenedorDeProductos = document.getElementById("CargarCarrito");
const divPrecioTotal = document.querySelector(".total-price");
const IVA = 1.21;

// --------------------- Modulos ---------------------//

const inCarrito = (productoVerificar) => { 
    //retorna la posicion del objeto en el array carrito, retorna -1 si no está
    for (let inx in Carrito) if (Carrito[inx].id == productoVerificar.id) return inx;
    return -1;
}

const TotalCarrito = () => {
    return (!Carrito) ? 0 : Carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
}

const CantidadDeProductos = () => {
    return Carrito.reduce((acc, prod) => acc + parseInt(prod.cantidad), 0);
}

const Descuento = (Cantidad) => {
    return (Cantidad >= 20) ? 40 : (Cantidad > 1) ? Cantidad * 2 : Cantidad;
}

const CargarEncabezadoTabla = () => {
    ContenedorDeProductos.innerHTML = ``;

    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');

    th1.innerHTML = `Producto`;
    th2.innerHTML = `Cantidad`;
    th3.innerHTML = `SubTotal`;
    
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    ContenedorDeProductos.appendChild(tr);
}

const CaragrCarritoVacio = () => {
    const tr2 = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    td1.setAttribute("class", "td-empty");
    td2.setAttribute("class", "td-empty");
    td3.setAttribute("class", "td-empty");

    td1.innerHTML = `<h2>No Hay Productos</h2>`;
    td2.innerHTML = ``;
    td3.innerHTML = ``;

    tr2.appendChild(td1);
    tr2.appendChild(td2);
    tr2.appendChild(td3);
    ContenedorDeProductos.appendChild(tr2);
}

const CargarCarrito = () => {
    CargarEncabezadoTabla();
    if (Carrito == null || !Carrito.length){
        CaragrCarritoVacio();
    } else {
        Carrito.forEach( objeto => { CargarProductoAlCarrito(objeto) });
    }
    CargarTotal();
}

const CargarProductoAlCarrito = (producto) =>{
    const {imagen, nombre, precio, cantidad, id} = producto;
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    tr.setAttribute("id", `producto-${producto.id}`);
    td3.setAttribute("class", "maxWitdh-200px");
    
    td1.innerHTML = `
    <div class="cart-info">
        <img src="../images/${imagen}" alt="${nombre}">
        <div>
            <p>${nombre}</p>
            <small>Precio: $${precio.toLocaleString('en-US')} 1/ud.</small>
            <br>
            <a class="cursor-pointer">Remove</a>
        </div>
    </div>
    `;
    td2.innerHTML = `<input type="number" value="${cantidad}">`;
    td3.innerHTML = `$${(precio * cantidad).toLocaleString('en-US')}`;
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    ContenedorDeProductos.appendChild(tr);

    //Evento: Remover un producto del carrito 
    const removeBtn = document.querySelector(`#producto-${id} .cart-info a`);
    removeBtn.addEventListener('click', () => {
        Carrito.splice(inCarrito(producto), 1);
        setToDataBase('carrito', Carrito);
        CargarCarrito();
    }); 

    //Evento: Alterar la cantidad de un producto 
    const quantityInput = document.querySelector(`#producto-${id} td input`);
    quantityInput.addEventListener('change', () => {
        if (quantityInput.value < 0){
            quantityInput.value = 0;
            alert(`No puede comprar menos de 0 productos`)
        }
        if (quantityInput.value > 999){
            quantityInput.value = 999;
            alert(`El maximo de productos a comprar es 999 unidades`)
        }
        const precioTotalDelProducto = document.querySelector(`#producto-${id}`).lastElementChild;
        const nuevoPrecio = precio * quantityInput.value;
        precioTotalDelProducto.innerHTML = `$${(nuevoPrecio).toLocaleString('en-US')}`;
        Carrito[inCarrito(producto)].cantidad = quantityInput.value;
        setToDataBase('carrito', Carrito);
        CargarTotal();
    }) 
}

const CargarTotal = () => {
    divPrecioTotal.innerHTML = ``;
    const total = TotalCarrito();
    const CantidadProductos = CantidadDeProductos();
    const DescuentoJustBuy = Descuento(CantidadProductos);
    const DescuentoTotal = parseInt((total * (1 - (DescuentoJustBuy / 100)))).toLocaleString('en-US');
    const ContenedorTable = document.createElement('table');
    ContenedorTable.innerHTML = `
    <tr>
        <td>SubTotal</td>
        <td>$${(total).toLocaleString('en-US')}</td>
    </tr>
    <tr>
        <td>Descuento por llevar ${CantidadProductos} productos</td>
        <td class="p-descuento">${DescuentoJustBuy}%</td>
    </tr>
    <tr>
        <td>Total</td>
        <td class="p-descontado" >$${(total).toLocaleString('en-US')}</td>
    </tr>
    <tr>
        <td></td>
        <td class="p-descuento" >$${DescuentoTotal}</td>
    </tr>
    <tr>
        <td><a class="btn-comprar" id="comprar-btn">Comprar</a></td>
    </tr>
    `;
    divPrecioTotal.appendChild(ContenedorTable);

    //Evento: Se presiono el boton de compra
    const btnComprar = document.getElementById("comprar-btn");
    btnComprar.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: 'Buena Elección!',
            text: 'Su compra a sido realizada!',
            footer: 'No se preocupe, usted no ha gastado dinero de verdad'
        });
        while(Carrito.length) Carrito.pop();
        setToDataBase('carrito', Carrito);
        CargarCarrito();
    });
}

const JustAdded = () => {
    if (getFromDataBase('justAdded')){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    
        Toast.fire({
        icon: 'success',
        title: 'Su producto ha sido añadido.'
        });

        setToDataBase('justAdded', false);
    }
}

// --------------------- Ejecucion Principal ---------------------//
JustAdded();
CargarCarrito();