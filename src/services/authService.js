import { apiFetch  } from "./api";

/*
- Envia las crendeciales del formulario al backend.

    Recibimos nombres faciles de entender en el frontend:
    - numeroCuenta
    - contrasena

    Luego los convertimos a los nombres que recibir la API:
    - num_cuenta
    - password
*/

export function iniciarSesion({
    numeroCuenta,
    contrasena
}) {
    return apiFetch('/auth/login', {
        method: 'POST',

        // Utilizamos Content-Type porque estamos enviando
        // informacion en forato JSON

        headers: {
            'Content-Type' : 'application/json',
        },

        // JSON.stringify convierte el objeto de JS en texto JSON.
        body: JSON.stringify({
            num_cuenta: numeroCuenta.trim(),
            password: contrasena,
        }),
    })
}