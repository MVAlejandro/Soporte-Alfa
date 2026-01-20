import supabase from '../../supabase/supabase-client.js'
// Servicios Supabase
import { createTicket } from '../../services/tickets-services.js'; 
import { renderTicketsTable } from './tickets-table.js';
// Utilidades
import { textValidate, inputValidate, selectValidate, radioValidate } from '../../utils/form-validations.js';

// Función para agregar un conteo de forma manual
export async function addTicket(event) {
    event.preventDefault()

    // Capturar el botón que disparó el evento
    const btn = event.target.closest('#btn-add-register');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Subiendo...';
    }

    const form = document.getElementById('ticket-form');
    // Referencias para validación
    const id_empleadoIn = document.getElementById('emplyee')
    const id_unidadIn = document.getElementById('unit')
    const prioridadIn = document.querySelectorAll('input[name="priority"]')
    const descripcionIn = document.getElementById('description')
    const observacionesIn = document.getElementById('observations')
    // Referencias para errores
    const id_empleadoError = document.getElementById('emplyee-error')
    const id_unidadError = document.getElementById('unit-error')
    const prioridadError = document.getElementById('priority-error')
    const descripcionError = document.getElementById('description-error')

    // Validaciones
    selectValidate(id_empleadoIn, id_empleadoError)
    selectValidate(id_unidadIn, id_unidadError)
    radioValidate(prioridadIn, prioridadError)
    textValidate(descripcionIn, descripcionError)

    const campos = form.querySelectorAll('input, select, textarea')
    if (!inputValidate(campos)) {
        Swal.fire({
            title: 'Atención',
            text: 'Corrige los errores antes de guardar.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });

        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                </svg>
                <p class="ps-2">Generar</p>`;
        }
        return
    }

    const prioridad = document.querySelector('input[name="priority"]:checked').value;
    const fecha_creado = new Date();

    // Guardar valores
    const newTicketData = {
        id_empleado: id_empleadoIn.value, 
        id_unidad: id_unidadIn.value, 
        prioridad,
        descripcion: descripcionIn.value,
        observaciones: observacionesIn.value,
        fecha_creado: fecha_creado.toISOString().split('T')[0]
    };
    
    try {
        await createTicket(newTicketData);
        Swal.fire({
            title: 'Ticket generado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });
    
        // Recarga la tabla con los datos actualizados
        await renderTicketsTable();
    } catch (err) {
        console.error('Error al generar ticket:', err);
        Swal.fire({
            title: 'Oops...',
            text: 'Ocurrió un error al generar el ticket.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                </svg>
                <p class="ps-2">Generar</p>`;
        }
    }
}
