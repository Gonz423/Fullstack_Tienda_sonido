function validarPrecioProducto(precio) {
    if (typeof precio !== "number" || isNaN(precio)) {
        console.log("Debe ser un valor numérico.");
        return false;
    }
    if (precio <= 0) {
        console.log("Debe ser mayor a 0 (recibido: " + precio + ").");
        return false;
    }
    return true;
}

function validarStockProducto(stock) {
    if (typeof stock !== "number" || isNaN(stock)) {
        console.log("Debe ser un valor numérico.");
        return false;
    }
    if (stock < 0) {
        console.log("Debe ser un valor positivo (recibido: " + stock + ").");
        return false;
    }
    return true;
}

function validarDatosGenerales(nombre, categoria) {
    if (!nombre || nombre.trim() === "") {
        console.log("El nombre no puede estar vacío.");
        return false;
    }
    if (!categoria || categoria.trim() === "") {
        console.log("La categoría es obligatoria.");
        return false;
    }
    return true;
}

function procesarCatalogoProductos() {
    console.log("Iniciando procesamiento del catálogo de productos...");

    var listaProductos = null;

    if (typeof catalogoInstrumentos !== "undefined" && Array.isArray(catalogoInstrumentos)) {
        listaProductos = catalogoInstrumentos;
    } else if (typeof productos !== "undefined" && Array.isArray(productos)) {
        listaProductos = productos;
    } else if (typeof catalogo !== "undefined" && Array.isArray(catalogo)) {
        listaProductos = catalogo;
    }

    if (!listaProductos || listaProductos.length === 0) {
        console.log("No se encontró el arreglo de productos en app.js.");
        return;
    }

    console.log("Total de productos cargados desde app.js: " + listaProductos.length);

    var productosValidados = [];
    var productosConError = 0;

    for (var i = 0; i < listaProductos.length; i++) {
        var prod = listaProductos[i];

        var precioNumerico = typeof prod.precio === "string" 
            ? parseInt(prod.precio.replace(/[^0-9]/g, ""), 10) 
            : prod.precio;

        var stockNumerico = typeof prod.stock === "string" 
            ? parseInt(prod.stock.replace(/[^0-9]/g, ""), 10) 
            : prod.stock;

        var datosValidos = validarDatosGenerales(prod.nombre, prod.categoria);
        var precioValido = validarPrecioProducto(precioNumerico);
        var stockValido = validarStockProducto(stockNumerico);

        if (datosValidos && precioValido && stockValido) {
            console.log("Producto #" + (i + 1) + "]: " + prod.nombre + " | " + prod.categoria + " | $" + precioNumerico + " | Stock: " + stockNumerico);
            
            productosValidados.push({
                codigo: prod.codigo || ("producto: " + (i + 1)),
                nombre: prod.nombre,
                categoria: prod.categoria,
                precio: precioNumerico,
                stock: stockNumerico
            });
        } else {
            console.log("Producto #" + (i + 1) + ": Inconsistencias en el producto: " + (prod.nombre || "Sin nombre"));
            productosConError = productosConError + 1;
        }
    }


    try {
        var resumenCatalogo = {
            total: productosValidados.length,
            fechaValidacion: new Date().toISOString(),
            items: productosValidados
        };
        localStorage.setItem("catalogoVerificado", JSON.stringify(resumenCatalogo));
        console.log("Catálogo verificado almacenado (" + productosValidados.length + " ítems).");
    } catch (error) {
        console.log("Error al persistir el catálogo:", error);
    }

    console.log("Resumen: " + productosValidados.length + " productos aprobados, " + productosConError + "rechazados.");
}

document.addEventListener("DOMContentLoaded", function () {
    procesarCatalogoProductos();
});