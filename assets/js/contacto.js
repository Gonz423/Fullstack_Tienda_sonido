function validarTextoSimple(valor, nombreCampo, min, max) {
    var limpio = valor ? valor.trim() : "";
    if (limpio === "") {
        console.log(nombreCampo + ": El campo es obligatorio.");
        return false;
    }
    if (limpio.length < min) {
        console.log(nombreCampo + ": Debe contener al menos " + min + " caracteres (actual: " + limpio.length + ").");
        return false;
    }
    if (limpio.length > max) {
        console.log(nombreCampo + ": No puede exceder los " + max + " caracteres (actual: " + limpio.length + ").");
        return false;
    }
    console.log(nombreCampo + ": Campo válido. ( " + limpio + " )");
    return true;
}

function validarCorreoContacto(valor) {
    var limpio = valor ? valor.trim() : "";
    if (limpio === "") {
        console.log("Correo: El campo de correo electrónico está vacío.");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio)) {
        console.log("Correo: El correo electrónico no tiene un formato válido.");
        return false;
    }
    console.log("Correo: El correo electrónico es válido. ( " + limpio + " )");
    return true;
}

function validarTelefonoContacto(valor) {
    var limpio = valor ? valor.trim() : "";

    if (limpio === "") {
        console.log("Teléfono: El teléfono de contacto es obligatorio.");
        return false;
    }


    var patronFormato = /^\+?[0-9\s-]{9,16}$/;
    var soloDigitos = limpio.replace(/[^0-9]/g, "");

    if (!patronFormato.test(limpio) || soloDigitos.length < 8 || soloDigitos.length > 12) {
        console.log("Teléfono: Formato no válido. Use entre 8 y 12 dígitos (admite espacios y prefijo, ej: +56 9 1234 5678).");
        return false;
    }

    console.log("Teléfono: El teléfono es válido. ( " + limpio + " )");
    return true;
}

function validarTipoConsulta(valor) {
    if (!valor || valor === "") {
        console.log("Consulta: Debe seleccionar un tipo de consulta.");
        return false;
    }
    console.log("Consulta: Opción seleccionada -> " + valor);
    return true;
}

function validarNumeroPedidoOpcional(valor, tipoConsulta) {
    var limpio = valor ? valor.trim() : "";
    var patronPedido = /^[0-9]{5,9}$/;

if (limpio !== "") {
        if (!patronPedido.test(limpio)) {
            console.log("Pedido: Si ingresa un número de pedido, debe ser numérico entre 5 y 9 dígitos.");
            return false;
        }
        console.log("Pedido: Número de pedido opcional válido. ( " + limpio + " )");
    }

    return true;
}

function validarTerminosContacto(checkbox) {
    if (!checkbox || !checkbox.checked) {
        console.log("Condiciones: Falta confirmar los datos verídicos y aceptar las condiciones de uso.");
        return false;
    }
    console.log("Condiciones: Condiciones de uso aceptadas.");
    return true;
}


function procesarFormularioContacto(evento) {
    evento.preventDefault();
    console.log("Formulario de contacto enviado. Iniciando validación...");

    var inputNombre = document.getElementById("nombre");
    var inputApellidos = document.getElementById("Apellidos");
    var inputCorreo = document.getElementById("correo");
    var inputTelefono = document.getElementById("telefono");
    var selectConsulta = document.getElementById("consulta");
    var inputPedido = document.getElementById("numero-pedido");
    var textareaMensaje = document.getElementById("mensaje");
    var checkTerminos = document.getElementById("acepta-condiciones");

    var valorNombre = inputNombre ? inputNombre.value : "";
    var valorApellidos = inputApellidos ? inputApellidos.value : "";
    var valorCorreo = inputCorreo ? inputCorreo.value : "";
    var valorTelefono = inputTelefono ? inputTelefono.value : "";
    var valorConsulta = selectConsulta ? selectConsulta.value : "";
    var valorPedido = inputPedido ? inputPedido.value : "";
    var valorMensaje = textareaMensaje ? textareaMensaje.value : "";

    var nombreValido = validarTextoSimple(valorNombre, "Nombre", 3, 80);
    var apellidosValido = validarTextoSimple(valorApellidos, "Apellidos", 3, 80);
    var correoValido = validarCorreoContacto(valorCorreo);
    var telefonoValido = validarTelefonoContacto(valorTelefono);
    var consultaValida = validarTipoConsulta(valorConsulta);
    var pedidoValido = validarNumeroPedidoOpcional(valorPedido, valorConsulta);
    var mensajeValido = validarTextoSimple(valorMensaje, "Mensaje", 10, 300);
    var terminosValidos = validarTerminosContacto(checkTerminos);

    var formularioValido = nombreValido && apellidosValido && correoValido && 
                           telefonoValido && consultaValida && pedidoValido && 
                           mensajeValido && terminosValidos;

    if (formularioValido) {
        console.log("Formulario de contacto válido.");

        try {
            var consultaGuardada = {
                nombre: valorNombre.trim(),
                apellidos: valorApellidos.trim(),
                correo: valorCorreo.trim().toLowerCase(),
                telefono: valorTelefono.trim(),
                tipoConsulta: valorConsulta,
                numeroPedido: valorPedido.trim(),
                mensaje: valorMensaje.trim(),
                fechaEnvio: new Date().toISOString()
            };
            localStorage.setItem("ultimaConsultaContacto", JSON.stringify(consultaGuardada));
            console.log("Consulta almacenada exitosamente en localStorage.");
        } catch (error) {
            console.log("Error al guardar la consulta en localStorage:", error);
        }
        location.href = "confirmacion.html";
    } else {
        console.log("Formulario de contacto inválido. Por favor revise los errores señalados arriba.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var formulario = document.querySelector(".formulario-consultas");

    if (formulario) {
        formulario.addEventListener("submit", procesarFormularioContacto);
    }
});