// URL principal del backend
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || ''
).replace(/\/$/, '')

// Error personalizado para la respuesta de la API
export class ApiError extends Error {
    constructor(message, status, details = null) {
        super(message)

        this.name = 'ApiError'
        this.status = status
        this.details = details
    }
}

/*
- Funcion central para consumir la API con fetch
- Todos los servicios utilizaran esta funcion para no repetir
*/
export async function apiFetch(endpoint, options = {}) {
    if (!API_BASE_URL) {
        throw new ApiError(
            'La URL del backend no está configurada.',
            0,
        )
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,

            headers: {
                Accept: 'application/json',
                ...options.headers,
            },
        },
    )

    // Algunas respuestas exitosas pueden venir sin contenido
    if (response.status === 204) {
        return null
    }

    const contentType =
        response.headers.get('Content-type') || ''

        /*FastApi debe devolver application/json*/

    if (!contentType.includes('application/json')) {
        throw new ApiError(
            'El servidor no devolvió una respuesta JSON. Verifica la URL y la configuración del backend.',
            response.status,
        )
    }

    const data = await response.json()
    /*
    - fetch no lanza automaticamente un error cuando recibe
    - codigos como 400, 401, 404 o 500.
    */
   if (!response.ok) {
    throw new ApiError(
        data.detail || 'No fue posible completar la solicitud.',
        response.status,
        data,
    )
   }

   return data
}