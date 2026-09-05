function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card-producto");

    const figure = document.createElement("figure");
    const imagen = document.createElement("img");
    imagen.src = `assets/img/${producto.codigo}.jpg`;
    imagen.alt = `${producto.nombre} - ${producto.marca} ${producto.modelo}`;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = `${producto.marca} ${producto.modelo}`;

    figure.appendChild(imagen);
    figure.appendChild(figcaption);

    const info = document.createElement("div");
    info.classList.add("producto-info");

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const categoria = document.createElement("p");
    categoria.classList.add("categoria");
    categoria.textContent = producto.categoria;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = `$${producto.precio}`;

    const stock = document.createElement("p");
    stock.classList.add("stock-status");
    stock.textContent = `Stock disponible: ${producto.stock} unidades`;

    const boton = document.createElement("a");
    boton.href = "contacto.html";
    boton.classList.add("btn-secondary");
    boton.textContent = "Consultar Stock";

    info.appendChild(nombre);
    info.appendChild(categoria);
    info.appendChild(precio);
    info.appendChild(stock);
    info.appendChild(boton);

    tarjeta.appendChild(figure);
    tarjeta.appendChild(info);

    return tarjeta;
}

function renderizarProductos(lista, contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = "";
    for (const producto of lista) {
        const tarjeta = crearTarjetaProducto(producto);
        contenedor.appendChild(tarjeta);
    }
}

function inicializarVistaCatalogo() {
    console.log("Módulo productos.js cargado correctamente.");

    const contenedorDinamico = document.getElementById("catalogo-dinamico");
    if (contenedorDinamico && typeof catalogoInstrumentos !== "undefined") {
        renderizarProductos(catalogoInstrumentos, contenedorDinamico);
        console.log(`Catálogo dinámico renderizado con ${catalogoInstrumentos.length} productos.`);
    }
}

document.addEventListener("DOMContentLoaded", inicializarVistaCatalogo);
