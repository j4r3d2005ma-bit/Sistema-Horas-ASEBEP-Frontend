// Clave utilizada para identificar la sesion de ASEBEP
const CLAVE_SESION = 'asebep_sesion'

// Error especializado para problemas relacionados con la creacion/recuperacion de una sesion
export class SesionError extends Error {
    constructor(mensaje) {
        super(mensaje)

        this.name = 'SesionError'
    }
}

/*
* Obtiene sessionStorage de manera segura.
- Mantiene la sesion al recargar la pagina
- Elimina la informacion al cerrar la pestaña
- El JWT solamente tendra una hora de duracion
*/
function obtenerAlmacenamientoSesion() {
    if (typeof window === 'undefined') {
        return null
    }

    try {
        return window.sessionStorage
    } catch {
        return null
    }
}

function decodificarBase64Url(valor) {
    const base64 = valor
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        
    const relleno = '='.repeat(
    (4 - (base64.length % 4)) % 4,
  )

    const contenidoBinario = window.atob(
    `${base64}${relleno}`,
  )

    const bytes = Uint8Array.from(
    contenidoBinario,
    (caracter) => caracter.charCodeAt(0),
  )

  return new TextDecoder().decode(bytes)
}

function obtenerPayloadJwt(token) {
    if (typeof token !== 'string' || !token.trim()) {
        throw new SesionError('La respuesta del servidor no contiene un JWT.',

        )
    }

    const partesToken = token.split('.')

    if (partesToken.length !== 3) {
        throw new SesionError('El token recibido no tiene una estructura JWT válida.',
        )
    }

    try {
        const payloadTexto = decodificarBase64Url(
            partesToken[1],
        )

        const payload = JSON.parse(payloadTexto)

        if(
            !payload ||
            typeof payload !== 'object' ||
            Array.isArray(payload)
        ) {
            throw new SesionError(
                'El contenido del JWT no es válido.',
            )
        }

        return payload
    } catch (error) {
        // Si el error ya fue creado por nosotros, conservamos su mensaje original
        if (error instanceof SesionError) {
            throw error
        }

        throw new SesionError(
            'No fue posible interpretar el JWT recibido.',
        )
    }
}

// Obtenemos y validamos el numero de cuenta firmado por el JWT
function obtenerNumeroCuenta(payload) {
    const numeroCuenta = String(
        payload.num_Cuenta ?? '',
    ).trim()

    if (!numeroCuenta) {
        throw new SesionError(
            'El JWT no contiene el número de cuenta del usuario.',
        )
    }

    if (!/^\d+$/.test(numeroCuenta)) {
        throw new SesionError(
            'El número de cuenta contenido en el JWT no es válido.',
        )
    }

    return numeroCuenta
}

// Obtiene el rol firmado dentro del JWT
function obtenerRol(payload) {
    const rol = typeof payload.rol === 'string' ? payload.rol.trim() : ''

    if (!rol) {
        throw new SesionError(
            'El JWT no contiene el rol del usuario.',
        ) 
    }

    return rol
}

// Comprueba que el JWT incluya una fecha de expiracion valida
function validarExpiracion(payload) {
    if (typeof payload.exp !== 'number' || !Number.isFinite(payload.exp)) {
        throw new SesionError(
            'El JWT no contiene una fecha de expiración válida.',
        )
    }

    if (payload.exp * 1000 <= Date.now()) {
        throw new SesionError(
            'La sesión recibida ya se encuentra vencida.',
        )
    }
}

/*
* Guarda la sesion
* El num_cuenta se obtendra del payload del JWT
*/
export function guardarSesion(respuestaLogin) {
    const token = respuestaLogin?.access_token
    const payload = obtenerPayloadJwt(token)

    validarExpiracion(payload)

    const sesion = {
        access_token: token,
        tipoToken: 'Bearer',
        numeroCuenta: obtenerNumeroCuenta(payload),
        rol: obtenerRol(payload),
        expiraEn: payload.exp,
    }

    const almacenamiento = obtenerAlmacenamientoSesion()

    if (!almacenamiento) {
        throw new SesionError(
            'El almacenamiento de sesión no está disponible.',
        )
    }

    try {
        almacenamiento.setItem(
            CLAVE_SESION,
            JSON.stringify(sesion),
        )
    } catch {
        throw new SesionError(
            'No fue posible guardar la sesión en el navegador.',
        )
    }

    return sesion
}

/*
* Recupera y vuelve a validar la sesion almacenada.
- Si el JWT esta vencido, incompleto o fue alterado,
- se elimina la sesion y devuelve null
*/
export function obtenerSesion() {
    const almacenamiento = obtenerAlmacenamientoSesion()

    if (!almacenamiento) {
        return null
    }

    try {
        const sesionGuardada = almacenamiento.getItem(CLAVE_SESION)

        if (!sesionGuardada) {
            return null
        }

        const sesion = JSON.parse(sesionGuardada)
        const payload = obtenerPayloadJwt(
            sesion.access_token,
        )

        validarExpiracion(payload)

        // Reconstruimos estos datos desde el JWT
        return {
            access_token: sesion.accessToken,
            tipoToken: 'Bearer',
            numeroCuenta: obtenerNumeroCuenta(payload),
            rol: obtenerRol(payload),
            expiraEn: payload.exp,
        }
    } catch {
        limpiarSesion()

        return null
    }
}

// Devuelve unicamente el JWT
export function obtenerTokenAcceso() {
    return obtenerSesion()?.accessToken ?? null
}

/*
* Devuelve el numero de cuenta del usuario autenticado.
* Se utilizara para consultar: GET /usuario/{num_cuenta}
*/
export function obtenerNumeroCuentaSesion() {
    return obtenerSesion()?.numeroCuenta ?? null
}

/*
* Devuelve el rol del usuario autenticado.
*/
export function obtenerRolSesion() {
    return obtenerSesion()?.rol ?? null
}

/*
* Elimina la sesion del navegador
- El usuario cierre sesion
- El JWT expire
- La API responda con un error 401
*/
export function limpiarSesion() {
    const almacenamiento = obtenerAlmacenamientoSesion()

    if (!almacenamiento) {
        return
    }

    try {
        almacenamiento.removeItem(CLAVE_SESION)
    } catch {
        // No lanzamos otro error durante el cierre de sesion
        return
    }
}