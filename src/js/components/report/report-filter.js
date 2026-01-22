// Servicios Supabase
import { getTickets } from '../../services/tickets-services.js'; 
import { renderReportTable } from './report-table.js'; 

let allTickets = [];

// Cargar las opciones de filtrado al iniciar la página
document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('start-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('end-date').value = new Date().toISOString().split('T')[0];
})

// Función de filtrado por valores seleccionados
export async function reportFilter(renderCallback) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Obtener tickets
    allTickets = await getTickets();
        if (!allTickets) return;

    // Ordenar por id
    allTickets.sort((a, b) => a.id_ticket - b.id_ticket);

    // Si no hay filtros activos, mostrar todo
    const filterClean = !startDate && !endDate;

    if (filterClean) {
        renderReportTable([]);
        return;
    }

    const start = startDate ? new Date(startDate) : new Date(NaN);
    const end = endDate ? new Date(endDate) : new Date(NaN);

    // Aplicar filtros
    const filtered = allTickets.filter(t => {
        const dateOk =
                (!isNaN(start) ? new Date(t.fecha_creado) >= start : true) &&
                (!isNaN(end) ? new Date(t.fecha_creado) <= end : true);
        return dateOk;
    });

    if (renderCallback) {
        renderCallback(filtered);
    }

    return filtered;
}
