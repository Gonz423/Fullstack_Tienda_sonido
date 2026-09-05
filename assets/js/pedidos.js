const formPedidos = document.querySelector("#form-pedidos");
const inputNumeroPedido = document.querySelector("#numero-pedido");
const resultadoBusqueda = document.querySelector("#resultado-busqueda");
const btnLimpiar = document.querySelector("#btn-limpiar");
const filasPedidos = document.querySelectorAll("#tabla-pedidos-body tr");

if (formPedidos) {
    formPedidos.addEventListener("submit", function (e) {
        e.preventDefault();
        const busqueda = inputNumeroPedido.value.trim().replace("#", "");

        if (!busqueda) return;

        let encontrado = false;

        filasPedidos.forEach(fila => {
            const textoFila = fila.textContent;
            if (textoFila.includes(busqueda)) {
                fila.style.display = "";
                encontrado = true;
            } else {
                fila.style.display = "none";
            }
        });

        resultadoBusqueda.style.display = "block";
        btnLimpiar.style.display = "inline-block";

        if (encontrado) {
            resultadoBusqueda.style.backgroundColor = "rgba(123, 75, 58, 0.15)";
            resultadoBusqueda.style.color = "var(--color-texto)";
            resultadoBusqueda.textContent = "Pedido #" + busqueda + " localizado en el sistema.";
        } else {
            resultadoBusqueda.style.backgroundColor = "rgba(185, 102, 34, 0.15)";
            resultadoBusqueda.style.color = "var(--color-detalle)";
            resultadoBusqueda.textContent = "No se encontró el pedido #" + busqueda + ". Verifica el número e intenta nuevamente.";
        }
    });

    btnLimpiar.addEventListener("click", function () {
        inputNumeroPedido.value = "";
        filasPedidos.forEach(fila => fila.style.display = "");
        resultadoBusqueda.style.display = "none";
        btnLimpiar.style.display = "none";
    });
}