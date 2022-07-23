// ------------------------------- Funciones Globales, abstractas y reutilizables -------------------------------//
const ratingDelProducto = rating => {
    let listado = "";
    for (let i = 0; i < Math.floor(rating); i++){
        listado += '<i class="fa-solid fa-star"></i>';
    }
    if (rating - Math.floor(rating) != 0){
        listado += '<i class="fa-solid fa-star-half-stroke"></i>';
        rating++;
    }
    for (let i = 0; i < 5 - Math.floor(rating); i++){
        listado += '<i class="fa-regular fa-star"></i>';
    }
    return `<div class="rating">${listado}</div>`;
}

const VaciarElemento = IdContainer => {
    if (document.getElementById(IdContainer) == null) return;
    let section = document.getElementById(IdContainer);
    section.innerHTML = ``;
}

const menutoggle = () => {
    if(MenuItems.style.maxHeight == "0px"){
        MenuItems.style.maxHeight = "400px";
    } else {
        MenuItems.style.maxHeight = "0px";
    }
}

let MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";
