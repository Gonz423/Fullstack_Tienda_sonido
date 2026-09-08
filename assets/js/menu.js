function inicializarPaginaInicio() {
    console.log("Tienda Sonido Vivo: Iniciando Sistema...");

    if (typeof catalogoInstrumentos !== "undefined" && Array.isArray(catalogoInstrumentos)) {
        console.log("Inventario central cargado: " + catalogoInstrumentos.length + " productos disponibles.");
    }

    try {
        var sesionGuardada = localStorage.getItem("sesionUsuario");
        if (sesionGuardada) {
            var datosSesion = JSON.parse(sesionGuardada);
            console.log("Sesión activa detectada: " + datosSesion.correo);
        } else {
            console.log("Estado de usuario: Invitado (sin sesión activa).");
        }
    } catch (error) {
        console.log("Error al consultar el almacenamiento local:", error);
    }
}

function configurarMenuHamburguesa() {
    var botonMenu = document.getElementById("boton-menu");
    var menuPrincipal = document.getElementById("menu-principal") || document.querySelector(".menu");

    if (botonMenu && menuPrincipal) {
        botonMenu.addEventListener("click", function () {
            var estaAbierto = menuPrincipal.classList.toggle("menu-abierto");
            botonMenu.setAttribute("aria-expanded", estaAbierto ? "true" : "false");
            botonMenu.textContent = estaAbierto ? "✕" : "☰";
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    configurarMenuHamburguesa();
    inicializarPaginaInicio();
});