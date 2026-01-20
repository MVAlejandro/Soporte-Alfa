import supabase from "../supabase/supabase-client";

// Función para insertar nuevos tickets
export async function createTicket(ticketData) {
    const { data, error } = await supabase
        .from('tickets')
        .insert([ticketData]);

    if (error) {
        console.error(error);
        throw error;
    } 
}

// Función para obtener tickets
export async function getTickets() {
    const { data, error } = await supabase
        .from('tickets')
        .select(`
            id_ticket,
            fecha_creado,
            fecha_realizado,
            prioridad,
            descripcion,
            estado_cliente,
            estado_tecnico,
            observaciones,
            id_empleado,
            empleados (
                nombre, 
                id_departamento,
                departamentos (nombre)
                ),
            id_unidad,
            unidades (nombre)
        `);
    
    if (error) {
        console.error('Error obteniendo tickets:', error);
        throw error;
    }
    
    return data.map(ticket => ({
        id_ticket: ticket.id_ticket,
        fecha_creado: ticket.fecha_creado,
        fecha_realizado: ticket.fecha_realizado,
        prioridad: ticket.prioridad,
        descripcion: ticket.descripcion,
        estado_cliente: ticket.estado_cliente,
        estado_tecnico: ticket.estado_tecnico,
        observaciones: ticket.observaciones,
        id_empleado: ticket.id_empleado,
        empleado: ticket.empleados?.nombre,
        departamento: ticket.empleados?.departamentos.nombre,
        id_unidad: ticket.unidades?.id_unidad,
        unidad: ticket.unidades?.nombre
    }));
}

// Función para editar tickets de la base
export async function updateTicket(id_ticket, updatedData) {
    const { data, error } = await supabase
        .from('tickets')
        .update(updatedData)
        .eq('id_ticket', id_ticket);

    if (error) {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar el ticket: ' + error.message);
    }
}

// Función para eliminar tickets de la base
export async function deleteTicket(idTicket) {
    if (!idTicket) {
        alert('No se pudo obtener el ID del ticket a eliminar.');
        return;
    }

    const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id_ticket', idTicket);

    if (error) {
        console.error('Error eliminando ticket:', error);
        alert('Ocurrió un error al eliminar el ticket.');
        return;
    }
};

// Función para cargar las unidades de cada empleado
export async function loadUnits(emplyeeId) {
    const { data, error } = await supabase
        .from('unidades')
        .select('id_unidad, nombre')
        .eq('id_empleado', emplyeeId);

    const unitSelect = document.getElementById('unit');
    unitSelect.innerHTML = '<option value="0">Seleccione...</option>';

    if (error) {
        console.error("Error cargando equipos:", error);
        return;
    }

    data.forEach(unidad => {
        const option = document.createElement('option');
        option.value = unidad.id_unidad;
        option.textContent = unidad.nombre;
        unitSelect.appendChild(option);
    });
}

// Función para cargar el departamento del empleado
export async function getDepartament(emplyeeId) {
    const { data, error } = await supabase
        .from('empleados')
        .select(`
            id_empleado,
            id_departamento,
            departamentos (nombre)
        `)
        .eq('id_empleado', emplyeeId)
        .single();

    if (error) {
        console.error("Error cargando equipos:", error);
        return;
    }

    const departmentIn = document.getElementById('departament');
    departmentIn.value = data.departamentos?.nombre;
}