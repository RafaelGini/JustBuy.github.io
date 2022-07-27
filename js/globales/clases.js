// ------------------------------- Clases -------------------------------//
class Producto {
    constructor(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, rating){
        this.nombre = nombre;
        this.cantidad = 1;
        this.precio = this.precioToARS(TipoMoneda, monto);
        this.rating = this.setValidRating(rating);
        this.imagen = imagen;
        this.etiquetas = arrayEtiquetas;
        this.id = ID_global;
        ID_global++;
    }

    precioToARS(TipoMoneda, monto){
        if (TipoMoneda == ars) return monto * inflacion;
        else return monto * DolarBlueHoy;
    }

    precioToUSD(TipoMoneda, monto){
        if (TipoMoneda == usd) return monto;
        else return monto / DolarBlueHoy;
    }

    setValidRating(rating) {
        if ((rating % 0.5) != 0) rating = Math.round(rating);
        if (rating > 5) return 5;
        if (rating < 0) return 0;
        else return rating;
    }
}

class SmartTv extends Producto {
    constructor(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, pulgadas, resolucion, rating){
        super(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, rating);
        this.pulgadas = pulgadas;
        this.resolucion = resolucion;
        this.descripcion = `${this.nombre}: ${this.pulgadas} - ${this.resolucion}`;
        this.title = `Electrodomesticos / Smart Tv`;
    }
}

class Celular extends Producto {
    constructor(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, almacenamiento, color, rating){
        super(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, rating);
        this.almacenamiento = almacenamiento;
        this.color = color;
        this.descripcion = `${this.nombre}: ${this.almacenamiento} - ${this.color}`;
        this.title = `Moviles / Telefono Movil Ultima Generación`;
    }
}

class Pc extends Producto {
    constructor(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, almacenamiento, pulgadas, rating, GBRam, Grafica, procesador, resolucion){
        super(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, rating);
        this.almacenamiento = almacenamiento;
        this.pulgadas = pulgadas;
        this.GBRam = GBRam;
        this.Grafica = Grafica;
        this.procesador = procesador;
        this.resolucion = resolucion;
        this.descripcion = `${this.nombre}: ${this.Grafica} - ${this.procesador} - ${this.resolucion} - ${this.GBRam} - ${this.almacenamiento}`;
        this.title = `NoteBooks / Pc Profesional Ultima Generación`;
    }
}

class Consola extends Producto {
    constructor(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, almacenamiento, variante, rating){
        super(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, rating);
        this.almacenamiento = almacenamiento;
        this.variante = variante;
        this.descripcion = `${this.nombre}: ${this.almacenamiento} - ${this.variante}`;
        this.title = `Consola De juegos / Ps5`;
    }
}

class Componente extends Producto {
    constructor(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, rating){
        super(nombre, TipoMoneda, monto, imagen, arrayEtiquetas, rating);
        this.descripcion = `${this.nombre}:`;
        this.title = `Componentes / ${this.nombre}`;
    }
}

class Etiquetas {
    constructor(){
        this.EtiquetasIphone = ["Celular", "Celulares", "Movil", "Moviles", "Apple", "Iphone", "Iphones"];
        this.EtiquetasSamsung = ["Celular", "Celulares", "Movil", "Moviles", "Samsung"];
        this.EtiquetaAsusPc = ["Computadora", "Computadoras", "Notebook", "Notebooks", "Pc", "Portatil", "Asus", "Gaming", "Zephyrus", "G14, G15, M16"];
        this.EtiquetaMackBook = ["Apple", "Mackbook", "Mackbooks", "Computadora", "Computadoras", "Notebook", "Notebooks", "Pc", "Portatil", "Gaming", "Pro"];
        this.EtiquetasProcesador = ["Procesador", "Procesadores", "CPU", "intel", "i", "12th gen", "gen", "amd", "Ryzen"];
        this.EtiquetasGrafica = ["Grafica", "GPU", "Gaming"];
        this.EtiquetasSmartTV = ['Televisores', 'Smart TV', 'Plasmas', 'FHD', 'UHD', '4k', 'Pantallas', 'Monitores', 'Pixeles'];
    }
}