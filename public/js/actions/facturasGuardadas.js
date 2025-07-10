import {
  obtenerFacturasGuardadas,
  renderSelectFacturas,
} from "../helpers/facturasGuardadas.js";
import { clientes, productos } from "../data.js";

// Inicializa la sección de facturas guardadas y configura el evento de cambio del selector
export function inicializarFacturasGuardadas() {
  const select = document.getElementById("factura-select");
  const detalle = document.getElementById("factura-detalle");
  renderSelectFacturas(select); // Llena el selector con las facturas guardadas

  // Cuando el usuario selecciona una factura, muestra su detalle
  select.onchange = () => {
    mostrarDetalleFactura(detalle, select.value);
  };

  // Si hay facturas, muestra el detalle de la primera por defecto
  if (select.options.length > 0 && select.value !== "") {
    mostrarDetalleFactura(detalle, select.value);
  } else {
    detalle.innerHTML = "";
  }
}

// Muestra el detalle de una factura seleccionada en el área correspondiente
export function mostrarDetalleFactura(detalleElement, idx) {
  const facturas = obtenerFacturasGuardadas();
  const factura = facturas[idx];
  if (!factura) {
    detalleElement.innerHTML = "";
    return;
  }
  // Busca el cliente por ID para mostrar su nombre
  const cliente = clientes.find((c) => c.id === factura.clienteId);
  // Genera el HTML de los productos de la factura, mostrando nombre y subtotal
  const productosHTML = factura.productos
    .map((p) => {
      const prod = productos.find((prod) => prod.id === p.idProducto);
      const nombre = prod ? prod.nombre : p.idProducto;
      const precio = prod ? prod.precio : "";
      const subtotal = precio * p.cantidad;
      return (
      "<tr>" +
        "<td>" + nombre + "</td>" +
        "<td>" + p.cantidad + "</td>" +
        "<td>$" + subtotal.toFixed(2) + "</td>" +
      "</tr>"
      );
    })
    .join("");
  // Muestra el detalle completo de la factura en el elemento destino
  detalleElement.innerHTML =
    "<table>" +
      "<thead>" +
        "<tr>" +
          "<th>Cliente: </th>" +
           "<td colspan='2'>" + (cliente ? cliente.nombre : "Sin cliente") + "</td>" +
        "</tr>" +
      "</thead>" +
    "<tbody>" +
      "<tr>" +
        "<td colspan='3'>Productos:</td>" +
      "</tr>" +
      "<tr>" +
        "<th>Nombre</th>" +
        "<th>Cantidad</th>" +
        "<th>Subtotal</th>" +
      "</tr>" +
      productosHTML +
      "<tr>" +
        "<th>Total:</th>" +
        "<td colspan='2'>" + factura.total.toFixed(2) + "</td>" +
      "</tr>" +
      "<tr>" +
        "<th>Fecha:</th>" +
        "<td colspan='2'>" + factura.fecha + "</td>" +
      "</tr>" +
    "</tbody>" +
  "</table>"
  ;
}