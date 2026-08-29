# Tienda Sonido Vivo - Sistema de Gestión y E-Commerce

## Descripción del Proyecto
Este proyecto corresponde al desarrollo de una solución web integral para la **Tienda Sonido Vivo**, una tienda especializada en instrumentos y equipos musicales ubicada en Viña del Mar. El sistema automatiza el catálogo de productos, la atención a clientes remotos, el flujo de ventas e-commerce, la gestión de inventario en tiempo real y la administración de usuarios.

---

## Requisitos del Sistema

### 1. Requisitos Técnicos Obligatorios (Stack Tecnológico)
* **Frontend:** SPA construida íntegramente con **React**.
* **Diseño Responsive:** Adaptable a dispositivos móviles (≥ 360 px con menú hamburguesa), tabletas (≥ 768 px) y escritorios (≥ 1280 px).
* **Backend:** Microservicios independientes desarrollados con **Spring Boot (Java)**.
* **Comunicación:** API REST sobre HTTP (`GET`, `POST`, `PUT`, `DELETE`) con payloads en formato **JSON**.
* **Base de Datos:** Modelo relacional normalizado (mínimo 3FN) en **MySQL** (o PostgreSQL/Oracle), con bases de datos independientes por microservicio.
* **Seguridad:** Control de Acceso Basado en Roles (RBAC) con autenticación segura (JWT / tokens) y contraseñas encriptadas.
* **Panel de Administración:** Módulo de React exclusivo para el rol `Administrador` (gestión de usuarios y roles).
* **Mapas:** Integración de mapa interactivo (**Leaflet / Google Maps**) para mostrar la ubicación de la tienda física y puntos de retiro.
* **Módulo de Pedidos:** Carrito de compras, selección de envío/retiro y seguimiento del estado del pedido (*en preparación*, *despachado*, *entregado*).
* **Cloud & Despliegue:** Contenedorización con **Docker** y despliegue en la nube de **AWS**.

---

### 2. Requisitos de Negocio y Funcionales
* **Catálogo Digital:** Publicación en línea de 340+ productos con precios y stock actualizado en tiempo real.
* **Flujo E-Commerce:** Permite a clientes remotos agregar productos al carrito, procesar la compra online y realizar el seguimiento de pedidos.
* **Control de Inventario Automático:** Descuento automático de stock tras cada venta en línea o presencial, evitando sobreventas.
* **Visualización de Stock Multi-Dispositivo:** Consulta en tiempo real del inventario disponible por parte de vendedores y el dueño desde cualquier lugar.
* **Reportes de Ventas:** Generación de métricas y resúmenes periódicos de ventas sin depender de libros contables o planillas manuales.
* **Geolocalización de Tienda y Puntos de Retiro:** Mapa interactivo con indicaciones para llegar a la sucursal física.

---

### 3. Roles de Usuario y Permisos (RBAC)

| Rol | Descripción | Permisos y Accesos |
| :--- | :--- | :--- |
| **Administrador** | Gestiona el sistema completo | Acceso total. Crea, edita y desactiva usuarios. Asigna roles. Accede a todos los reportes y estadísticas. |
| **Vendedor / Empleado** | Personal operativo de la tienda | Gestiona productos y pedidos. Actualiza el stock de inventario y cambia el estado de los pedidos. |
| **Cliente** | Usuario final que compra en línea | Navega por el catálogo, gestiona su carrito de compras, realiza pedidos y consulta su historial personal de compras. |

---

### 4. Restricciones y Condiciones del Contexto
* **Usabilidad:** Interfaz simple e intuitiva para usuarios no técnicos (vendedores habituados a WhatsApp/Instagram y cliente final).
* **Soporte Multi-Dispositivo:** Diseñado para navegación fluida en móviles Android (vendedores en bodega), PC de escritorio (tienda) y Laptop (dueño).
* **Confidencialidad:** Protección estricta de datos personales de clientes y transacciones financieras.
* **Disponibilidad:** Dependiente de conexión a Internet estable (WiFi/Datos móviles).

---

## Arquitectura de Microservicios
- Cada microservicio Spring Boot maneja su propia base de datos y archivo de configuración independiente.
- Las rutas REST siguen la convención `/api/<recurso>` (ej. `/api/usuarios`, `/api/productos`, `/api/pedidos`).
- Respuestas estandarizadas en formato `JSON` para todas las peticiones, incluyendo manejo de errores.