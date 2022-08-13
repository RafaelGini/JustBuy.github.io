// ------------------------------- Clases -------------------------------//
class Cuenta {
    constructor(user, email, pass){
        this.user = user;
        this.email = email;
        this.pass = pass;
        this.cantidadDeCompras = 0;
        this.nivel = this.setLevel();
        this.beneficio = this.setBeneficio();
        this.alwaysOpen = false;
    }
    setLevel(){
        if (this.cantidadDeCompras > 100) return 6;
        if (this.cantidadDeCompras > 50) return 5;
        if (this.cantidadDeCompras > 25) return 4;
        if (this.cantidadDeCompras > 10) return 3;
        if (this.cantidadDeCompras > 5) return 2;
        else return 1;
    }
    setBeneficio(){
        if (this.nivel == 6) return [3, 48];
        if (this.nivel == 5) return [2, 48];
        if (this.nivel == 4) return [2, 40];
        if (this.nivel == 3) return [1.5, 40];
        if (this.nivel == 2) return [1.5, 30];
        else return [1.2, 30];
    }
}