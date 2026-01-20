// Estilos generales
import './css/style.css';
import './css/pages/index.css';

// Estilos de componentes
import './css/components/navbar.css';
import './css/components/footer.css';

// Componentes JS
import './js/components/navbar.js';

// Servicios Supabase
import { createResumeCards } from './js/components/report/report-cards.js'; 
import { reportFilter } from './js/components/report/report-filter.js'; 
import { renderReportTable } from './js/components/report/report-table.js'; 

document.addEventListener('DOMContentLoaded', async () => {
    // Generar tabla con el día actual
    createResumeCards()
    reportFilter(renderReportTable)
    document.getElementById('dateHeader').innerHTML = `${new Date().toISOString().split('T')[0]}`;
});