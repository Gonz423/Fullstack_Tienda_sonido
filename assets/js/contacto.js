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


function mostrarMensajeContacto(mensaje, esExito) {
    var contenedor = document.getElementById("mensaje-contacto");
    if (!contenedor) return;
    contenedor.textContent = mensaje;
    contenedor.className = "mensaje-contacto " + (esExito ? "mensaje-exito" : "mensaje-error");
    contenedor.classList.remove("campo-oculto");
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
    if (!nombreValido) {
        mostrarMensajeContacto("Por favor, ingresa un nombre válido (mínimo 3 caracteres).", false);
        if (inputNombre) inputNombre.focus();
        return;
    }

    var apellidosValido = validarTextoSimple(valorApellidos, "Apellidos", 3, 80);
    if (!apellidosValido) {
        mostrarMensajeContacto("Por favor, ingresa tus apellidos (mínimo 3 caracteres).", false);
        if (inputApellidos) inputApellidos.focus();
        return;
    }

    var correoValido = validarCorreoContacto(valorCorreo);
    if (!correoValido) {
        mostrarMensajeContacto("Por favor, ingresa un correo electrónico válido (ejemplo: usuario@correo.cl).", false);
        if (inputCorreo) inputCorreo.focus();
        return;
    }

    var telefonoValido = validarTelefonoContacto(valorTelefono);
    if (!telefonoValido) {
        mostrarMensajeContacto("Por favor, ingresa un teléfono válido (entre 8 y 12 dígitos, ej: +56 9 1234 5678).", false);
        if (inputTelefono) inputTelefono.focus();
        return;
    }

    var consultaValida = validarTipoConsulta(valorConsulta);
    if (!consultaValida) {
        mostrarMensajeContacto("Por favor, selecciona un tipo de consulta.", false);
        if (selectConsulta) selectConsulta.focus();
        return;
    }

    var pedidoValido = validarNumeroPedidoOpcional(valorPedido, valorConsulta);
    if (!pedidoValido) {
        mostrarMensajeContacto("Si ingresas un número de pedido opcional, debe ser numérico entre 4 y 8 dígitos.", false);
        if (inputPedido) inputPedido.focus();
        return;
    }

    var mensajeValido = validarTextoSimple(valorMensaje, "Mensaje", 10, 300);
    if (!mensajeValido) {
        mostrarMensajeContacto("Por favor, ingresa el detalle de tu consulta (mínimo 10 caracteres).", false);
        if (textareaMensaje) textareaMensaje.focus();
        return;
    }

    var terminosValidos = validarTerminosContacto(checkTerminos);
    if (!terminosValidos) {
        mostrarMensajeContacto("Debes confirmar los datos verídicos y aceptar las condiciones de uso.", false);
        if (checkTerminos) checkTerminos.focus();
        return;
    }

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

    mostrarMensajeContacto("¡Consulta enviada con éxito! Redirigiendo...", true);

    setTimeout(function () {
        location.href = "confirmacion.html";
    }, 1200);
}

document.addEventListener("DOMContentLoaded", function () {
    var formulario = document.querySelector(".formulario-consultas");

    if (formulario) {
        formulario.addEventListener("submit", procesarFormularioContacto);
    }
});