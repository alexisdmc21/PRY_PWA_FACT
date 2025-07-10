import { clientes } from "../data.js";

// Define el componente personalizado para mostrar la lista de clientes
class ClienteList extends HTMLElement {
  // Se llama cuando el elemento se agrega al DOM
  connectedCallback() {
    this.render();
  }
  // Renderiza la lista de clientes en el HTML del componente
  render() {
    this.innerHTML =
      clientes.length === 0
        ? // Si no hay clientes, muestra un mensaje
          "<h3>Clientes Registrados:</h3><p>No hay clientes registrados.</p>"
        : // Si hay clientes, los muestra en una tabla
          `<h3>Clientes Registrados:</h3>
           <table border="1">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>` +
          clientes
            .map((c) => "<tr>" +
              "<td>" + c.nombre + "</td>" +
              "<td>" + c.cedula + "</td>" +
              "<td>" + c.direccion + "</td>" +
              "</tr>")
            .join("");
            "</tbody></table>";
  }
}
// Registra el componente personalizado para poder usar <cliente-list> en HTML
customElements.define("cliente-list", ClienteList);