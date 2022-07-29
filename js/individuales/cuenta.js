const LoginForm = document.getElementById('LoginForm');
const RegForm = document.getElementById('RegForm');
const Indicator = document.getElementById('Indicator');
const span1 = document.getElementById('form-btn-login');
const span2 = document.getElementById('form-btn-regis');

span1.addEventListener('click', () => {
    RegForm.style.transform = 'translateX(300px)';
    LoginForm.style.transform = 'translateX(300px)';
    Indicator.style.transform = 'translateX(0px)';
});

span2.addEventListener('click', () => {
    RegForm.style.transform = 'translateX(0px)';
    LoginForm.style.transform = 'translateX(0px)';
    Indicator.style.transform = 'translateX(100px)';
});

const existe = (username, Cuentas) => {
    let existe = false;
    Cuentas.forEach( cuenta => {
        if (cuenta.user == username) existe = true;
    });
    return existe;
}

const RegFormChildren = RegForm.children;
const LoginFormChildren = LoginForm.children;

const RegBtn = RegFormChildren[3];
RegBtn.addEventListener('click', (e) => {
    const Cuentas = getFromDataBase('cuentas');
    if (existe(RegFormChildren[0].value, Cuentas)){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El nombre de usuario ya fué utilizado',
            footer: 'Probablemente haya sido usted'
          });
    } else {
        const nuevaCuenta = new Cuenta(RegFormChildren[0].value, RegFormChildren[1].value, RegFormChildren[2].value);
        Cuentas.push(nuevaCuenta);
        Swal.fire(
            'Felicitaciones!',
            'Su cuenta ha sido creada!',
            'success'
        );
        
        Swal.fire({
        title: '¿Le gustaría dejar la cuenta abierta?',
        text: "Deberá iniciar sesión sino!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
        }).then((result) => {
        if (result.isConfirmed) nuevaCuenta.alwaysOpen = true
        });
        
        const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
        })
        
        Toast.fire({
        icon: 'success',
        title: 'Compre muchos productos JustBuy y suba de nivel para obtener beneficios!'
        });

        setToDataBase('cuentas', Cuentas);
    }
});
