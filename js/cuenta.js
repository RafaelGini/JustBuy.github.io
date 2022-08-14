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

const RegFormChildren = RegForm.children;
const LoginFormChildren = LoginForm.children;
const RegBtn = RegFormChildren[3];
const LoginBtn = LoginFormChildren[2];
const ForgetPass = LoginFormChildren[3];

const LanzarToast = () => {
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
    icon: 'error',
    title: 'De momento no contamos con serivdores.'
    });
}

RegBtn.addEventListener('click', (e) => {
    e.preventDefault();
    LanzarToast();
});

LoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    LanzarToast();
});

ForgetPass.addEventListener('click', (e) => {
    e.preventDefault();
    LanzarToast();
});