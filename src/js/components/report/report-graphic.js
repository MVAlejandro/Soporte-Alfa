// Servicios Supabase
import { getTickets } from "../../services/tickets-services";

// Función para crear el gráfico por empleados
export async function renderEmployeeGraphic() {
    // Obtener todos los registros
    const allTickets = await getTickets();

    const container = document.getElementById("graphic-personal-container");
    // Limpiar antes de insertar
    container.innerHTML = "";

    if (!allTickets.length) {
        container.innerHTML = `<div class="alert alert-info">No hay datos para mostrar</div>`;
        return;
    }

    // Agrupar tickets por empleado
    const employeeTickets = {};

    allTickets.forEach(ticket => {
        const employee = ticket.empleado;

        if (!employeeTickets[employee]) {
            employeeTickets[employee] = 0;
        }
        employeeTickets[employee]++;
    });

    // Convertir en arreglo, ordenar y tomar solo los primeros 10
    const top10 = Object.entries(employeeTickets).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const labels = top10.map(item => item[0]);
    const data = top10.map(item => item[1]);

    container.innerHTML = '<canvas id="personal-graphic"></canvas>';
    const ctx = document.getElementById('personal-graphic').getContext('2d');

    Chart.register(ChartDataLabels);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{data}]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    formatter: value => value
                },
                tooltip: {
                    callbacks: {
                        label: ctx => `Solicitudes: ${ctx.parsed.y}`
                    },
                    yAlign: 'bottom'
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

// Función para crear el gráfico por departamentos
export async function renderDepartamentGraphic() {
    // Obtener todos los registros
    const allTickets = await getTickets();
    
    const container = document.getElementById("graphic-departament-container");
    // Limpiar antes de insertar
    container.innerHTML = "";

    if (!allTickets.length) {
        container.innerHTML = `<div class="alert alert-info">No hay datos para mostrar</div>`;
        return;
    }

    // Agrupar tickets por departamento
    const departamentTickets = {};

    allTickets.forEach(ticket => {
        const departament = ticket.departamento;

        if (!departamentTickets[departament]) {
            departamentTickets[departament] = 0;
        }
        departamentTickets[departament]++;
    });

    const labels = Object.keys(departamentTickets);
    const data = Object.values(departamentTickets);

    // Generar el gráfico con la información del reporte
    container.innerHTML = '<canvas id="departament-graphic"></canvas>';
    const ctx = document.getElementById('departament-graphic').getContext('2d');

    // Registrar el plugin si es necesario
    Chart.register(ChartDataLabels);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                label: 'Tickets por departamento',
                data
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: '#fff',
                    formatter: value => value
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}