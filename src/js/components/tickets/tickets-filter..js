// Servicios Supabase
import { getTickets } from '../../services/tickets-services.js'; 
import { renderTicketsTable } from './tickets-table.js'; 
// Utilidades
import { loadOptions } from '../../utils/load-select.js';

let allTickets = [];

// Cargar las opciones de filtrado al iniciar la página
document.addEventListener('DOMContentLoaded', async () => {
    loadOptions('employee-filter', 'empleados', 'id_empleado', 'nombre','Todos')
})

// Función de filtrado por valores seleccionados
export async function ticketsFilter() {
    const employeeFilter = document.getElementById('employee-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    // Obtener tickets
    allTickets = await getTickets();
        if (!allTickets) return;

    // Ordenar por id
    allTickets.sort((a, b) => a.id_ticket - b.id_ticket);

    // Si no hay filtros activos, mostrar todo
    const filterClean = employeeFilter === '0' && priorityFilter === '0' && statusFilter === '0';

    if (filterClean) {
        renderTicketsTable(allTickets);
        return;
    }

    // Aplicar filtros
    const filtered = allTickets.filter(t => {
        const employeeOk = employeeFilter === '0' || t.id_empleado == employeeFilter;
        const priorityOk = priorityFilter === '0' || t.prioridad == priorityFilter;
        const statusOk = statusFilter === '0' || t.estado_cliente == statusFilter;
        return statusOk && employeeOk && priorityOk;
    });

    renderTicketsTable(filtered);
}
