// Estilos generales
import '../../css/style.css'
import '../../css/pages/tickets.css'

// Estilos de componentes
import '../../css/components/navbar.css'
import '../../css/components/footer.css'

// Componentes JS
import '../components/navbar.js';
import '../components/tickets/generate-form.js'

// Servicios Supabase
import { initPage } from '../utils/session-validate.js'; 
import { addTicket } from '../components/tickets/tickets-form.js';
import { ticketsFilter } from '../components/tickets/tickets-filter..js';
import { renderTicketsTable } from '../components/tickets/tickets-table.js';
import { renderTicketsEditModal } from '../components/tickets/tickets-modal.js';
import { generatePDF } from '../components/tickets/tickets-print.js';

document.addEventListener('DOMContentLoaded', async () => {
    await initPage()
    // Generar tabla con el día actual
    await renderTicketsTable()
});

// Declarar el botón de filtrado
document.addEventListener('click', function(e) {
    if (e.target.id === 'filter-btn' || e.target.closest('#filter-btn')) {
        ticketsFilter();
    }
});

// Declarar el botón del formulario
document.addEventListener('click', function(e) {
    if (e.target.id === 'btn-add-register' || e.target.closest('#btn-add-register')) {
        addTicket(e);
    }
});

// Acciones del modal de edición
const editModal = document.getElementById('edit-modal');
// Al abrir modal
editModal.addEventListener('shown.bs.modal', event => {
    const button = event.relatedTarget;
    const ticketData = JSON.parse(button.getAttribute('ticket-data'));
    renderTicketsEditModal(ticketData);

    // Declarar el botón de guardado
    const btnSave = editModal.querySelector('#btn-save');

    // Elimina eventos anteriores para evitar duplicados
    btnSave.onclick = async function () {
        const doc = await generatePDF(ticketData);
        window.open(doc.output('bloburl'), '_blank');
    };
});
// Al cerrar modal
editModal.addEventListener('hidden.bs.modal', () => {
    editModal.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
        e.classList.remove('is-valid', 'is-invalid');
    });

    editModal.querySelectorAll('input, select').forEach(el => {
        el.value = '';
    });
});
