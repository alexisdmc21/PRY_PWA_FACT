import { productos } from "../data.js";

// Define el componente personalizado para mostrar la lista de productos
class ProductoList extends HTMLElement {
  // Se llama cuando el elemento se agrega al DOM
  connectedCallback() {
    this.render();
  }
  // Renderiza la lista de productos en el HTML del componente
  render() {
    this.innerHTML =
      productos.length === 0
        ? // Si no hay productos, muestra un mensaje
          "<h3>Productos Registrados:</h3><p>No hay productos registrados.</p>"
        : // Si hay productos, los muestra en una lista
          `<h3>Productos Registrados:</h3>
           <table border="1" class="tablaRegistroProducto">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Código</th>
                  <th>Precio</th>
                </tr>
              </thead
              <tbody>` +
          productos
            .map((p) => "<tr>" +
                          "<td>" + p.nombre + "</td>" +
                          "<td>" + p.id + "</td>" +
                          "<td>" + p.precio + "</td>" +
                        "</tr>")
            .join("");
            `</tbody></table>`;
  }
}
// Registra el componente personalizado para poder usar <producto-list> en HTML
customElements.define("producto-list", ProductoList);