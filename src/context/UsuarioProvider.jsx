import { useState } from 'react'

import UsuarioContext from './UsuarioContext.js'
import { obtenerUsuario } from '../services/usuarioService.js'

/*
- Este componente envolverá las rutas que necesitan utilizar
- la información del usuario.
*/
export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargandoUsuario, setCargandoUsuario] =
    useState(false)
  const [errorUsuario, setErrorUsuario] =
    useState(null)

  /*
  - Consulta los datos reales del usuario mediante
  - GET /usuario/{num_cuenta}.
  - Después guarda el resultado para compartirlo con
  - Dashboard y Perfil.
  */
  async function cargarUsuario(numeroCuenta) {
    setCargandoUsuario(true)
    setErrorUsuario(null)

    try {
      const usuarioObtenido = await obtenerUsuario(
        numeroCuenta,
      )

      setUsuario(usuarioObtenido)

      return usuarioObtenido
    } catch (error) {
      setUsuario(null)
      setErrorUsuario(error)

      /*
      - Volvemos a lanzar el error para que Login pueda
      - mostrarlo posteriormente.
      */
      throw error
    } finally {
      setCargandoUsuario(false)
    }
  }

  /*
  - Elimina de la memoria los datos del usuario.
  - La utilizaremos cuando se cierre la sesión.
  */
  function limpiarUsuario() {
    setUsuario(null)
    setErrorUsuario(null)
  }

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        cargandoUsuario,
        errorUsuario,
        cargarUsuario,
        limpiarUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  )
}