import { toast } from 'sonner'
// Duraciones de las notificaciones
const DURACIONES = Object.freeze({
    normal: 4500,
    error: 6000,
    confirmacion: 7000,
})

/* Construimos las opciones comunes de las notificaciones
- Descripcion
- Duracion
- id
*/
function construirOpciones({
    descripcion,
    duracion,
    id,
}) {
    const opciones = {
    descripcion: descripcion,
    duration: duracion,
}

// Se agrega el identificador cuando fue proporcionado.
if (id) {
    opciones.id = id
}
return opciones
}

// Muestra una operacion completada con exito
export function notificarExito({
    titulo,
    descripcion,
    duracion = DURACIONES.normal,
    id,
}) {
    return toast.success(
        titulo,
        construirOpciones({
            descripcion,
            duracion,
            id,
        }),
    )
}

// Muestra un error que requiere atencion del usuario
export function notificarError({
    titulo,
    descripcion,
    duracion = DURACIONES.error,
    id,
}) {
    return toast.error(
        titulo,
        construirOpciones({
            descripcion,
            duracion,
            id,
        }),
    )
}

// Muestra un mensaje informativo
export function notificarInformacion({
    titulo,
    descripcion,
    duracion = DURACIONES.normal,
    id,
}) {
    return toast.info(
        titulo,
        construirOpciones({
            descripcion,
            duracion,
            id,
        }),
    )
}

// Muestra un mensaje de advertencia que el usuario debe tener en cuenta
export function notificarAdvertencia({
    titulo,
    descripcion,
    duracion = DURACIONES.normal,
    id,
}) {
    return toast.warning(
        titulo,
        construirOpciones({
            descripcion,
            duracion,
            id,
        }),
    )
}

// Notificacion con acciones de confirmacion/cancelacion
export function solicitarConfirmacion({
    titulo,
    descripcion,
    textoConfirmar = 'Confirmar',
    textoCancelar = 'Cancelar',
    alConfirmar,
    alCancelar,
    duracion = DURACIONES.confirmacion,
    id,
}) {
    return toast.warning(titulo, {
        ...construirOpciones({
            descripcion,
            duracion,
            id,
        }),
        
        // Sonner ejecuta esta funcion cunado el usuario presiona el boton principal
        action: {
            label: textoConfirmar,
            onClick: () => {
                if (typeof alConfirmar === 'function') {
                    alConfirmar()
                }
            },
        },

        // La segunda accion permite cancelar de manera explicita la notificacion, en caso de que el usuario no quiera confirmar
        cancel: {
            label: textoCancelar,
            onClick: () => {
                if (typeof alCancelar === 'function') {
                    alCancelar()
                }
            },
        },
    })
}

// Cierra una notificacion especifica
export function limpiarNotificaciones(id) {
    toast.dismiss(id)
}