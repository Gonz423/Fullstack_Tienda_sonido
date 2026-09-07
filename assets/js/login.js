 function validarCorreoLogin(valor) {
    var limpio = valor ? valor.trim() : "";
    if (limpio === "") {
        console.log("El campo de correo electrónico está vacío.");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio)) {
        console.log("El correo electrónico no tiene un formato válido.");
        return false;
    }
    console.log("El correo electrónico es válido. ( "+limpio+" )");
    return true;
}
function validarContrasenaLogin(valor) {
    var limpio = valor ? valor.trim() : "";
    if (limpio === "") {
        console.log("El campo de contraseña está vacío.");
        return false;
    }
    if (limpio.length < 6) {
        console.log("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }
    var tieneLongitud = limpio.length >= 6 && limpio.length <= 20;
    var tieneMayuscula = /[A-Z]/.test(limpio);
    var tieneMinuscula = /[a-z]/.test(limpio);
    var tieneNumero = /[0-9]/.test(limpio);
    var tieneEspecial = /[¡!@/='`_,;|°¬[#$~%^&*()+,.?":{}|<>]/.test(limpio);

    if (!tieneLongitud) {
        console.log("La contraseña no debe exceder los 20 caracteres.");
    }
    if (!tieneMayuscula) {
        console.log("La contraseña debe contener al menos una letra mayúscula.");
    }
    if (!tieneMinuscula) {
        console.log("La contraseña debe contener al menos una letra minúscula.");
    }
    if (!tieneNumero) {
        console.log("La contraseña debe contener al menos un número.");
    }
    if(!tieneEspecial) {
        console.log("La contraseña debe contener al menos un carácter especial.");
    }
    var contrasenaValida = tieneLongitud && tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
    if (contrasenaValida) {
        console.log("La contraseña cumple con los requisitos de seguridad.( "+limpio+" ) Inicio de sesión exitoso.");
        return true;
    }

    return false;
}


function validarFormularioLogin(evento) {
    evento.preventDefault();
    console.log("Validando formulario de inicio de sesión...");

    var inputCorreo = document.getElementById("correo");
    var inputPassword = document.getElementById("password")|| document.getElementById("password");

    var valorCorreo = inputCorreo ? inputCorreo.value : "";
    var valorPassword = inputPassword ? inputPassword.value : "";

    var correoValido = validarCorreoLogin(valorCorreo);
    var contrasenaValida = validarContrasenaLogin(valorPassword);

    if (correoValido && contrasenaValida) {
        console.log("Formulario de inicio de sesión válido.");
    try {
        var sesion= {
            correo: validarCorreoLogin(valorCorreo),
            fechaCreacion: new Date().toISOString()
        };
        
        localStorage.setItem("sesionUsuario", JSON.stringify(sesion));
        console.log("Sesión guardada en localStorage.");
    } catch (error) {
        console.log("Error al guardar la sesión:", error);
        } 
    console.log("Validación de formulario de inicio de sesión completada. \n Usuario autentificado correctamente: " + correoValido);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var formularioLogin = document.getElementById("form-login") || document.querySelector(".form-login");

    if (formularioLogin) {
        formularioLogin.addEventListener("submit", validarFormularioLogin);
    }
});
