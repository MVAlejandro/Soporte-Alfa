import supabase from '../../supabase/supabase-client.js'
// Servicios Supabase
import { updateTicket, deleteTicket } from '../../services/tickets-services.js';
import { ticketsFilter } from './tickets-filter..js'; 
import { renderTicketsTable } from './tickets-table.js'; 
// Utilidades
import { textValidate, inputValidate, selectValidate } from '../../utils/form-validations.js';

// Función para cargar datos en el modal
export async function renderTicketsEditModal(ticket) {
    // Insertar valores en los inputs
    document.getElementById('edit-id-ticket').value = ticket.id_ticket;
    document.getElementById('edit-id').value = ticket.id_ticket;
    document.getElementById('edit-sol-date').value = ticket.fecha_creado;
    document.getElementById('edit-finish-date').value = ticket.fecha_realizado || "-";
    document.getElementById('edit-employee').value = ticket.empleado;
    document.getElementById('edit-unit').value = ticket.unidad;
    document.getElementById('edit-departament').value = ticket.departamento;
    document.getElementById('edit-priority').value = ticket.prioridad;
    document.getElementById('edit-status').value = ticket.estado_cliente;
    document.getElementById('edit-progress').value = ticket.estado_tecnico;
    document.getElementById('edit-description').value = ticket.descripcion;
    document.getElementById('edit-observations').value = ticket.observaciones;
}

// Función para guardar cambios
document.getElementById('btn-edit-entry').addEventListener('click', async function() {
    const form = document.getElementById('ticket-edit-form');
    // Referencias para validación
    const fecha_realizadoIn = document.getElementById('edit-finish-date');
    const estado_clienteIn = document.getElementById('edit-status');
    const estado_tecnicoIn = document.getElementById('edit-progress');
    const descripcionIn = document.getElementById('edit-description');
    const observacionesIn = document.getElementById('edit-observations');

    const estado_clienteError = document.getElementById('error-editStatus');
    const estado_tecnicoError = document.getElementById('error-editProgress');
    const descripcionError = document.getElementById('error-editDescription');

    // Validaciones
    selectValidate(estado_clienteIn, estado_clienteError)
    selectValidate(estado_tecnicoIn, estado_tecnicoError)
    textValidate(descripcionIn, descripcionError)

    const campos = document.querySelectorAll('input, select, textarea')
    if (!inputValidate(campos)) {
        Swal.fire({
            title: 'Atención',
            text: 'Corrige los errores antes de guardar.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return
    }

    const id_ticket = document.getElementById('edit-id-ticket').value;
    const updatedData = {
        estado_cliente: estado_clienteIn.value,
        estado_tecnico: estado_tecnicoIn.value,
        descripcion: descripcionIn.value,
        observaciones: observacionesIn.value
    };

    // Registrar la fecha de completado del ticket
    if (estado_tecnicoIn.value === 'Terminado') {
        fecha_realizadoIn.value = new Date().toISOString().split('T')[0];
        updatedData.fecha_realizado = fecha_realizadoIn.value;
    }

    try {
        await updateTicket(id_ticket, updatedData);

        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });
        
        // Cerrar el modal y mostrar alerta
        bootstrap.Modal.getInstance(document.getElementById('edit-modal')).hide();
        Swal.fire({
            title: 'Ticket actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Recarga la tabla con los datos actualizados
        ticketsFilter(renderTicketsTable);
    } catch (err) {
        console.error('Error al actualizar ticket:', err);
        Swal.fire({
            title: 'Oops...',
            text: 'Ocurrió un error al actualizar el ticket.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
