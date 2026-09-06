document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("form-login");
    const inputPassword = document.getElementById("password");
    const btnTogglePassword = document.getElementById("toggle-password");
    const mensajeLogin = document.getElementById("mensaje-login");

    if (btnTogglePassword && inputPassword) {
        btnTogglePassword.addEventListener("click", function () {
            const esPassword = inputPassword.getAttribute("type") === "password";
            inputPassword.setAttribute("type", esPassword ? "text" : "password");
            btnTogglePassword.setAttribute(
                "aria-label",
                esPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            );
            btnTogglePassword.textContent = esPassword ? "🔒" : "👁️";
        });
    }

    if (formLogin) {
        formLogin.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const inputCorreo = document.getElementById("correo");
            const correo = inputCorreo ? inputCorreo.value.trim() : "";
            const password = inputPassword ? inputPassword.value.trim() : "";

            if (!correo || !password) {
                mostrarMensaje("Por favor, ingresa tu correo y contraseña.", "error");
                return;
            }

            if (password.length < 6) {
                mostrarMensaje("La contraseña debe tener al menos 6 caracteres.", "error");
                return;
            }

            mostrarMensaje(`¡Bienvenido/a! Has iniciado sesión exitosamente con ${correo}.`, "exito");

            try {
                sessionStorage.setItem("usuario_autenticado", correo);
            } catch (e) {
                console.warn("No se pudo guardar la sesión en sessionStorage:", e);
            }
        });
    }

    function mostrarMensaje(texto, tipo) {
        if (!mensajeLogin) return;
        mensajeLogin.textContent = texto;
        mensajeLogin.classList.remove("mensaje-exito", "mensaje-error");

        if (tipo === "exito") {
            mensajeLogin.classList.add("mensaje-exito");
        } else {
            mensajeLogin.classList.add("mensaje-error");
        }
    }
});
