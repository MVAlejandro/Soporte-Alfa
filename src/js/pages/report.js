// Estilos generales
import '../../css/style.css'
import '../../css/pages/report.css'

// Estilos de componentes
import '../../css/components/navbar.css'
import '../../css/components/footer.css'

// Componentes JS
import '../components/navbar.js';

// Servicios Supabase
import { createResumeCards } from '../components/report/report-cards.js';
import { renderEmployeeGraphic, renderDepartamentGraphic } from '../components/report/report-graphic.js';
import { reportFilter } from '../components/report/report-filter.js'; 
import { renderReportTable } from '../components/report/report-table.js';

let filteredTickets = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Generar tabla con el día actual
    createResumeCards()
    renderEmployeeGraphic()
    renderDepartamentGraphic()
    filteredTickets = await reportFilter(renderReportTable);
});

// Declarar el botón de filtrado
document.addEventListener('click', async function(e) {
    if (e.target.id === 'filter-btn' || e.target.closest('#filter-btn')) {
        filteredTickets = await reportFilter(renderReportTable);
    }
});

// Declarar el botón de impresión
document.getElementById('print-btn').addEventListener('click', function() {
    window.print();
});

// Declarar el botón de exportación a Excel
document.getElementById("export-btn").addEventListener('click', function() {
    if (!filteredTickets.length) {
        Swal.fire({
            title: 'Atención',
            text: 'No hay datos para exportar.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }

    const dataForExcel = filteredTickets.map(t => ({
        ID: t.id_ticket,
        Fecha_creacion: new Date(t.fecha_creado),
        Fecha_realizado: new Date(t.fecha_realizado),
        Cliente: t.empleado,
        Departamento: t.departamento,
        Equipo: t.unidad,
        Prioridad: t.prioridad,
        Estado_1: t.estado_cliente,
        Estado_2: t.estado_tecnico,
        Descripción: t.descripcion,
        Observaciones: t.observaciones
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    XLSX.writeFile(wb, `reporte_tickets_${new Date().toISOString().split('T')[0]}.xlsx`);
});