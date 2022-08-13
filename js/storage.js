// ------------------------------- Funciones Storage -------------------------------//
const getFromDataBase = CLAVE => JSON.parse(localStorage.getItem(CLAVE));
const setToDataBase = (CLAVE, VALOR) => localStorage.setItem(CLAVE, JSON.stringify(VALOR))

// ------------------------------- Si es la primera vez en JustBuy -------------------------------//
if (!getFromDataBase('AlreadyLogged')){
    localStorage.clear();
    setToDataBase('AlreadyLogged', true);
    setToDataBase('justAdded', false);
    setToDataBase('carrito', []);
    setToDataBase('ProductoADetallar', null);
    console.log('Se cargaron todos los datos');
}