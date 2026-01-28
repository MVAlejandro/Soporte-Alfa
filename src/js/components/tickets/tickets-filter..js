// Servicios Supabase
import { getTickets } from '../../services/tickets-services.js'; 
import { renderTicketsTable } from './tickets-table.js'; 
// Utilidades
import { loadOptions } from '../../utils/load-select.js';

let allTickets = [];

// Función de filtrado por valores seleccionados
export async function ticketsFilter() {
    const typeFilter = document.getElementById('type-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    // Obtener tickets
    allTickets = await getTickets();
        if (!allTickets) return;

    // Ordenar por id
    allTickets.sort((a, b) => a.id_ticket - b.id_ticket);

    // Si no hay filtros activos, mostrar todo
    const filterClean = typeFilter === '0' && priorityFilter === '0' && statusFilter === '0';

    if (filterClean) {
        renderTicketsTable(allTickets);
        return;
    }

    // Aplicar filtros
    const filtered = allTickets.filter(t => {
        const typeOk = typeFilter === '0' || t.tipo == typeFilter;
        const priorityOk = priorityFilter === '0' || t.prioridad == priorityFilter;
        const statusOk = statusFilter === '0' || t.estado_cliente == statusFilter;
        return statusOk && typeOk && priorityOk;
    });

    renderTicketsTable(filtered);
}
