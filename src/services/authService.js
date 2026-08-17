import { apiFetch } from './api.js'
import {
    guardarSesion,
    limpiarSesion,
} from './sesionService.js'

/*
* Envia las credenciales del formulario del backend
* Frontend: numeroCuenta & contrasena
* API: num_cuenta & password
*/
export async function iniciarSesion({
    numeroCuenta,
    contrasena,
}) {
    // Convertimos el numero de cuenta en texto para evitar problemas
    const numeroCuentaNormalizado = String(
        numeroCuenta ?? '',
    ).trim()

    // Espereamos la respuesta del access_token antes de construir la sesion
    const respuestaLogin = await apiFetch(
        '/auth/login',
        {
            method: 'POST',
            //Indicamos que el cuerpo de la peticion contiene JSON.
            headers: {
                'Content-Type': 'application/json',
            },

            // JSON. stringify convierte el objeto de JS en texto JSON que FastAPI ocupa
            body: JSON.stringify({
                num_cuenta: numeroCuentaNormalizado,
                password: contrasena,
            }),
        },
    )

    /*
    * guardarSesion:
    - Extrae el JWT de access_token
    - Decodifica su payload
    - Obtiene num_cuenta, rol y exp.
    - Guarda la sesion en sessionStorage

    * Si el JWT no contiene num_cuenta, se produce un error
    */
   return guardarSesion(respuestaLogin)
}

// Cerrar sesion elimina el JWT almacenado en el navegador
export function cerrarSesion() {
    limpiarSesion()
}
