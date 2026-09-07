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

    verificarRecursosMultimedia();
}

function verificarRecursosMultimedia() {
    var archivosAComprobar = [
        "assets/img/poster-video.jpg",
        "assets/audio/demo-amplificador.mp3",
        "assets/video/tour-tienda.mp4"
    ];

    console.log("Comprobando disponibilidad de archivos multimedia...");

    for (var i = 0; i < archivosAComprobar.length; i++) {
        var ruta = archivosAComprobar[i];
        comprobarRecurso(ruta);
    }
}

function comprobarRecurso(ruta) {
    var peticion = new XMLHttpRequest();
    peticion.open("HEAD", ruta, true);

    peticion.onreadystatechange = function () {
        if (peticion.readyState === 4) {
            if (peticion.status === 200) {
                console.log("Archivo disponible -> " + ruta);
            } else {
                console.log("Archivo ausente o no localizado -> " + ruta);
            }
        }
    };

    peticion.onerror = function () {
        console.log("No se pudo localizar el recurso -> " + ruta);
    };

    try {
        peticion.send();
    } catch (e) {
        console.log("Excepción al consultar " + ruta);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    inicializarPaginaInicio();
});