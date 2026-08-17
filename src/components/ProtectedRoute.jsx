import { Navigate, useLocation } from 'react-router'
import { useUsuario } from '../hooks/useUsuario.js'

// Protege las paginas que necesitan una sesion valida.
function ProtectedRoute({ children }) {
    const location = useLocation()

    /*
    * autenticado indica si existe un JWT valido.
    * sesionComprobada evita redirigir antes de que
    * UsuarioProvider revise sessionStorage.
    */
   const {
    autenticado,
    sesionComprobada,
   } = useUsuario()

   // Mientras no se comprueba la sesion, no mostramos la pagina protegida
   if (!sesionComprobada) {
    return null
   }

   // Si no existe una sesion valida, enviamos al usuario al login.
   if (!autenticado) {
    return (
        <Navigate to="/login" replace state={{
            desde:
                location.pathname + location.search,
            }}
        />
    )
   }

   return children
}

export default ProtectedRoute