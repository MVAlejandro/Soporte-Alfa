import supabase from '../../supabase/supabase-client.js'
// Utilidades
import { loadOptions } from '../../utils/load-select.js';
import { loadUnits, getDepartament } from '../../services/tickets-services.js';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('tickets-form');

    container.innerHTML = 
        `<div id="tickets-form-container" class="container pt-4 pb-3 collapse">
            <div class="row pb-3 mb-2">
                <div class="col d-flex align-items-center">
                    <h5 class="ms-4">Generar Nuevo Ticket</h5>
                </div>
            </div>
            <!-- Formulario de programación -->
            <form id="ticket-form">
                <div class="row ms-2 me-2">
                    <div class="col-md form-column">
                        <div class="form-title d-flex align-items-center pb-3">
                            <div class="ms-2 me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                            </div>
                            <h5>Datos del solicitante</h5>
                        </div>
                        <div class="ms-2 me-2 pt-3 pb-3">
                            <div class="label-over-border">
                                <label for="emplyee" class="form-label m-2">Solicitante</label>
                                <select id="emplyee" class="form-select" aria-label="Default select example">
                                    <option value="0">Seleccione...</option>

                                </select>
                                <p class="error invalid-feedback" id="emplyee-error" style="color: red;"></p>
                            </div>
                        </div>
                        <div class="ms-2 me-2 pt-2 pb-3">
                            <div class="label-over-border">
                                <label for="departament" class="form-label m-2">Departamento</label>
                                <input type="text" id="departament" class="form-control" placeholder="Departamento perteneciente" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="col-md form-column">
                        <div class="form-title d-flex align-items-center pb-3">
                            <div class="ms-2 me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                    <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1"/>
                                    <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                </svg>
                            </div>
                            <h5>Datos del equipo</h5>
                        </div>
                        <div class="ms-2 me-2 pt-3 pb-3">
                            <div class="label-over-border">
                                <label for="unit" class="form-label m-2">Equipo</label>
                                <select id="unit" class="form-select" aria-label="Default select example" disabled>
                                    <option value="0">Seleccione...</option>

                                </select>
                                <p class="error invalid-feedback" id="unit-error" style="color: red;"></p>
                            </div>
                        </div>
                        <div class="ms-2 me-2 pt-2 pb-3">
                            <div class="label-over-border">
                                <label for="observations" class="form-label m-2">Observaciones</label>
                                <input type="text" id="observations" class="form-control" placeholder="Observaciones adicionales">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row ms-2 me-2">
                    <div id="service-title" class="form-title d-flex align-items-center pb-3">
                    <div class="ms-2 me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                    </div>
                    <h5>Datos del servicio</h5>
                </div>
                    <div class="col-md-6 col-lg-7">
                        <div class="ms-2 me-2 pt-3 pb-3">
                            <div class="label-over-border">
                                <label for="description" class="form-label m-2">Descripción</label>
                                <textarea id="description" class="form-control" rows="8" placeholder="Descripción detallada de la solicitud"></textarea>
                                <p class="error invalid-feedback" id="description-error" style="color: red;"></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5 form-column">
                        <div class="ms-2 me-2 pb-3">
                            <label class="form-label label ms-2 me-2 mb-2">Prioridad</label>
                            <div class="row g-2">
                                <div class="col d-flex priority-container">
                                    <input type="radio" class="btn-check" name="priority" id="p-prevent" value="Preventivo">
                                    <label class="btn btn-priority" for="p-prevent">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                        <p class="ps-2">Preventivo</p>
                                    </label>
                                </div>
                                <div class="col d-flex priority-container">
                                    <input type="radio" class="btn-check" name="priority" id="p-important" value="Importante">
                                    <label class="btn btn-priority" for="p-important">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p class="ps-2">Importante</p>
                                    </label>
                                </div>
                            </div>
                            <div class="row g-2 mt-2">
                                <div class="col d-flex priority-container">
                                    <input type="radio" class="btn-check" name="priority" id="p-urgent" value="Urgente">
                                    <label class="btn btn-priority" for="p-urgent">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p class="ps-2">Urgente</p>
                                    </label>
                                </div>
                                <div class="col d-flex priority-container">
                                    <input type="radio" class="btn-check" name="priority" id="p-vUrgent" value="Muy urgente">
                                    <label class="btn btn-priority" for="p-vUrgent">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                                            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
                                        </svg>
                                        <p class="ps-2">Muy urgente</p>
                                    </label>
                                </div>
                            </div>
                            <p class="error" id="priority-error" style="color: red;"></p>
                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-end pt-4 me-3">
                    <button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center ps-3 pe-3 me-2">Cancelar</button>
                    <button id="btn-add-register" type="button" class="btn btn-primary d-flex align-items-center ps-3 pe-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                        </svg>
                        <p class="ps-2">Generar</p>
                    </button>
                </div>
            </form> 
        </div>`;

    loadOptions('emplyee', 'empleados', 'id_empleado', 'nombre', 'Seleccione...')

    document.getElementById('emplyee').addEventListener('change', async function() {
        const departamentIn = document.getElementById('departament');
        const employeeId = this.value;
        if (employeeId !== "0") {
            await getDepartament(employeeId);
        } else {
            departamentIn.value = '';;
        }
    });

    // Detectar cambio en el select de empleado del formulario
    document.getElementById('emplyee').addEventListener('change', function() {
        const unitSelect = document.getElementById('unit');
        const employeeId = this.value;
        if (employeeId !== "0") {
            unitSelect.disabled = false;
            loadUnits(employeeId);
        } else {
            unitSelect.disabled = true;
            document.getElementById('unit').innerHTML = '<option value="0">Seleccione...</option>';
        }
    });

    const ticketContainer = document.getElementById('tickets-form-container');

    // Crear instancia única de Collapse
    const collapseInstance = new bootstrap.Collapse(ticketContainer, { toggle: false });

    document.getElementById('btn-add-ticket').addEventListener('click', () => {
        collapseInstance.show();
    });

    document.getElementById('btn-cancel').addEventListener('click', () => {
        collapseInstance.hide();
    });
});
