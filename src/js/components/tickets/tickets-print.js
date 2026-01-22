
export async function generatePDF(ticket) {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        format: 'letter'
    });

    // Función para trazar un rectángulo
    // punto inicial = {x,y}, ancho(px) = {w}, alto(px) = {h} y grosor de línea = {m}
    function drawRect (x, y, w, h, m) {
        doc.setDrawColor(0);
        doc.setLineWidth(m); 
        doc.rect(x, y, w, h); 
    }

    // Función para generar texto con posición centrada en su contenedor
    // texto = {txt}, ancho del contenedor = {cont} y altura a colocar = [y]
    function textCenter (txt, cont, y) {
        const textWidth = doc.getStringUnitWidth(txt) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const x = (cont / 2) - (textWidth / 2);
        doc.text(txt, x, y);
    }

    // DOCUMENTO PDF //
    // Margen
    drawRect(10, 10, (215.9 - 2 * 10),( 279.4 - 2 * 10), 0.5);

    // Imagen 
    doc.addImage('/assets/images/logo-color-png-396x324.png', 'PNG', 20, 20, 29, 23);

    // Encabezado centrado
    doc.setFontSize(16);
    textCenter("PALLETS ALFA TEXCOCO", 215.9, 30);
    doc.setFontSize(12);
    textCenter("Ticket de mantenimiento", 215.9, 37);

    // Folio y fecha 
    doc.setFontSize(10);
    drawRect(175, 20, 25, 5, 0.1);
    drawRect(175, 25, 25, 5, 0.1);
    textCenter("Folio", 375, 24)
    textCenter(`T-${ticket.id_ticket}`, 375, 29);

    drawRect(175, 32, 25, 5, 0.1);
    drawRect(175, 37, 25, 5, 0.1);
    textCenter("Fecha", 375, 36);
    textCenter(ticket.fecha_creado, 375, 41);

    // Tabla solicitante
    drawRect(15, 48, 186, 61, 0.1);
    drawRect(15, 48, 186, 6, 0.1);

    // Cliente
    doc.setFontSize(11);
    textCenter("SOLICITANTE DEL SERVICIO", 215.9, 52.5);
    // Insertar información del cliente
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Nombre:`, 25, 62);
    doc.setFont("helvetica", "normal");
    doc.text(`${ticket.empleado}`, 25, 67);

    doc.setFont("helvetica", "bold");
    doc.text(`Departamento:`, 153, 62);
    doc.setFont("helvetica", "normal");
    doc.text(`${ticket.departamento}`, 153, 67);

    doc.setFont("helvetica", "bold");
    doc.text(`Equipo:`, 25, 74);
    doc.setFont("helvetica", "normal");
    doc.text(`${ticket.unidad}`, 25, 79);

    doc.setFont("helvetica", "bold");
    doc.text(`Prioridad:`, 153, 74);
    doc.setFont("helvetica", "normal");
    doc.text(`${ticket.prioridad}`, 153, 79);

    doc.setFont("helvetica", "bold");
    doc.text(`Descripción:`, 25, 86);
    doc.setFont("helvetica", "normal");
    doc.text(ticket.descripcion, 25, 91,{ maxWidth: 166 });

    // // Tabla técnico
    drawRect(15, 116, 186, 64, 0.1);
    drawRect(15, 116, 186, 6, 0.1);

    // Técnico
    doc.setFontSize(11);
    textCenter("SUPERVISOR DE MANTENIMIENTO", 215.9, 120.5);
    // Insertar información del supervisor
    doc.setFontSize(10);
    doc.text(`Fecha programada:  ________________`, 125, 129);

    doc.text(`Material y/o refacciones:   _______________________________________________________________`, 25, 136);
    doc.text(`____________________________________________________________________________________`, 25, 142);

    doc.setFont("helvetica", "bold");
    doc.text(`Observaciones:`, 25, 149);
    doc.setFont("helvetica", "normal");
    doc.text(`${ticket.observaciones}`, 25, 155, { maxWidth: 166 });

    doc.text(`¿La falla genera paro de producción?           Sí             No             No aplica              Tiempo: __________`, 25, 174);
    drawRect(101, 170, 5, 5, 0.1);
    drawRect(118.5, 170, 5, 5, 0.1);
    drawRect(146, 170, 5, 5, 0.1);

    // Tabla cumplimiento
    drawRect(15, 187, 186, 33, 0.1);
    drawRect(15, 187, 186, 6, 0.1);

    // Seguimiento
    doc.setFontSize(11);
    textCenter("CUMPLIMIENTO Y/O REPROGRAMACIÓN", 215.9, 191.5);
    // Insertar información del reporte
    doc.setFontSize(10);
    doc.text(`¿Se cumplió la tarea?                     Sí                       No`, 25, 200);
    drawRect(87, 196, 5, 5, 0.1);
    drawRect(114, 196, 5, 5, 0.1);

    doc.text(`En caso de no cumplir, anotar motivo: _____________________________________________________`, 25, 207);
    doc.text(`____________________________________________________________________________________`, 25, 213);

    // Espacio de firmas
    // drawRect(15, 229, 186, 33, 0.1);
    // drawRect(15, 229, 62, 33, 0.1);
    // drawRect(77, 229, 62, 33, 0.1);
    // drawRect(139, 229, 62, 33, 0.1);

    doc.setFontSize(10);
    textCenter("_________________________", 91, 250)
    textCenter("Firma Realizó", 91, 256)

    textCenter("_________________________", 215.9, 250)
    textCenter("Firma Supervisó", 215.9, 256)

    textCenter("_________________________", 340, 250)
    textCenter("Firma Supervisó", 340, 256)

    return doc;
}
