// Servicios Supabase
import { getTickets } from '../../services/tickets-services.js';

// Función para generar las cards de resumen generales
export async function createResumeCards() {
    // Obtener todos los registros
    const allTickets = await getTickets();

    renderTotal(allTickets);
    renderPending(allTickets);
    renderFinished(allTickets);
    renderAverage(allTickets);
}

// Función para crear la card de tickets totales
export async function renderTotal(tickets = []) {
    const element = document.getElementById("tickets-text");
    // Limpiar elemento antes de insertar
    element.textContent = "";

    if (!tickets.length) {
        element.textContent = `-`;
        element.className = "general-report-cant text-muted";
        return;
    }

    // Generar el contenido
    element.textContent = `${tickets.length.toLocaleString('en-US')}`;
}

// Función para crear la card de tickets pendientes
export async function renderPending(tickets = []) {
    const element = document.getElementById("pending-text");
    // Limpiar elemento antes de insertar
    element.textContent = "";
    element.className = "general-report-cant text-muted"

    if (!tickets.length) {
        element.textContent = `-`;
        return;
    }

    // Calcular pendientes
    const pendingTickets = tickets.filter(t => t.estado_cliente === "Pendiente" || t.estado_cliente === "Inconcluso");

    // Generar el contenido
    element.textContent = `${pendingTickets.length.toLocaleString('en-US') || 0}`;
    element.className = `general-report-cant text-danger`;
}

// Función para crear la card de tickets finalizados
export async function renderFinished(tickets = []) {
    const element = document.getElementById("finished-text");
    // Limpiar elemento antes de insertar
    element.textContent = "";
    element.className = "general-report-cant text-muted"

    if (!tickets.length) {
        element.textContent = `-`;
        return;
    }

    // Calcular terminados
    const finishedTickets = tickets.filter(t => t.estado_cliente === "Terminado");

    // Generar el contenido
    element.textContent = `${finishedTickets.length.toLocaleString('en-US') || 0}`;
    element.className = `general-report-cant text-success`;
}

// Función para crear la card de promedio de finalización
export async function renderAverage(tickets = []) {
    const element = document.getElementById("average-text");
    // Limpiar elemento antes de insertar
    element.textContent = "";
    element.className = "general-report-cant text-muted"

    if (!tickets.length) {
        element.textContent = `-`;
        return;
    }

    // Obtener solo los tickets terminados que tengan fechas
    const finishedTickets = tickets.filter(t => t.estado_cliente === "Terminado")

    if (!finishedTickets.length) {
        element.textContent = `-`;
        return;
    }

    // Calcular promedio de días
    const totalDays = finishedTickets.reduce((acc, t) => {
        const start = new Date(t.fecha_creado);
        const end = new Date(t.fecha_realizado);
        return acc + (end - start) / (1000 * 60 * 60 * 24); // MS por día
    }, 0);

    const averageDays = (totalDays / finishedTickets.length).toFixed(1);

    // Generar el contenido
    element.textContent = `${averageDays || 0} días`;
    element.className = `general-report-cant text-warning`;
}