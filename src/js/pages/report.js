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
// Usar SheetJS

document.addEventListener('DOMContentLoaded', async () => {
    // Generar tabla con el día actual
    createResumeCards()
    renderEmployeeGraphic()
    renderDepartamentGraphic()
    reportFilter(renderReportTable)
});

// Declarar el botón de filtrado
document.addEventListener('click', function(e) {
    if (e.target.id === 'filter-btn' || e.target.closest('#filter-btn')) {
        reportFilter();
    }
});

// Declarar el botón de impresión
document.getElementById('print-btn').addEventListener('click', function() {
    window.print();
});