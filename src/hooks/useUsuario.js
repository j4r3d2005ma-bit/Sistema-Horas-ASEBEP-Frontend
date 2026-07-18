import { useContext } from 'react'

import UsuarioContext from '../context/UsuarioContext.js'

/*
- Hook personalizado para acceder fácilmente al contexto.
- para evitar redundancia en codigo.
*/
export function useUsuario() {
  const contexto = useContext(UsuarioContext)

  if (!contexto) {
    throw new Error(
      'useUsuario debe utilizarse dentro de UsuarioProvider.',
    )
  }

  return contexto
}