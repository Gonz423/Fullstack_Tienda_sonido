function validarCodigoPedido(valor) {
    var limpio = valor ? valor.trim() : "";

    if (limpio === "") {
        console.log("Debe ingresar un número de pedido.");
        return false;
    }

    var numeroLimpio = limpio.indexOf("#") === 0 ? limpio.substring(1) : limpio;

    if (!/^[0-9]+$/.test(numeroLimpio)) {
        console.log("Error [Búsqueda Pedido]: El número de pedido debe contener únicamente dígitos numéricos.");
        return false;
    }

    if (numeroLimpio.length < 4 || numeroLimpio.length > 8) {
        console.log("Error [Búsqueda Pedido]: El número de pedido debe tener entre 4 y 8 dígitos (actual: " + numeroLimpio.length + ").");
        return false;
    }

    console.log("Formato de número de pedido válido -> #" + numeroLimpio);
    return true;
}

function procesarBusquedaPedido(evento) {
    evento.preventDefault();
    console.log("Inicio de la consulta de pedido. Procesando entrada del usuario...");

    var inputPedido = document.getElementById("numero-pedido");
    var valorIngresado = inputPedido ? inputPedido.value : "";

    var esValido = validarCodigoPedido(valorIngresado);

    if (!esValido) {
        console.log("Resultado: Consulta rechazada. Ingrese un código válido.");
        return;
    }

    var codigoBuscado = valorIngresado.trim().replace("#", "");

    var pedidosRegistrados = ["10425", "10418", "10390"];
    var encontrado = false;

    for (var i = 0; i < pedidosRegistrados.length; i++) {
        if (pedidosRegistrados[i] === codigoBuscado) {
            encontrado = true;
            break;
        }
    }

    if (encontrado) {
        console.log("Estado del pedido: Pedido #" + codigoBuscado + " localizado con éxito en el sistema.");
       try {
            var consultaPedido = {
                numeroPedido: codigoBuscado,
                fechaConsulta: new Date().toISOString()
            };
            localStorage.setItem("ultimoPedidoConsultado", JSON.stringify(consultaPedido));
            console.log("Persistencia: Pedido #" + codigoBuscado + " registrado en localStorage.");
        } catch (error) {
            console.log("Error al guardar en localStorage:", error);
        }
    } else {
        console.log("Aviso [Búsqueda Pedido]: El pedido #" + codigoBuscado + " no se encuentra en el historial.");
    }

    console.log("=== FIN DE LA CONSULTA ===");
}

document.addEventListener("DOMContentLoaded", function () {
    var formPedidos = document.getElementById("form-pedidos");
    var btnLimpiar = document.getElementById("btn-limpiar");

    if (formPedidos) {
        formPedidos.addEventListener("submit", procesarBusquedaPedido);
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", function () {
            console.log("Interacción: Solicitud para reiniciar visualización de pedidos recibida.");
        });
    }
});