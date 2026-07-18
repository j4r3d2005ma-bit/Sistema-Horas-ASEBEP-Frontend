import {
  LayoutDashboard,
  LogOut,
  UserRound,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { sileo } from 'sileo'

import { useUsuario } from '../hooks/useUsuario.js'

function MobileNavigation() {
  const navigate = useNavigate()
  const { limpiarUsuario } = useUsuario()

  function obtenerClase({ isActive }) {
    return isActive
      ? 'mobile-menu__link mobile-menu__link--active'
      : 'mobile-menu__link'
  }

  /*
  - Limpia los datos guardados en el contexto.
  - Después regresa al login e impide volver atrás
  - utilizando el historial del navegador.
  */
  function cerrarSesion() {
    sileo.clear()
    limpiarUsuario()

    /*
    - Cuando implementemos JWT, aquí también
    - eliminaremos el token de la sesión.
    */
    navigate('/login', {
      replace: true,
    })

    sileo.success({
      title: 'Sesión cerrada',
      description:
        'Has salido correctamente del portal ASEBEP.',
    })
  }

  /*
  - Mostramos una confirmación antes de cerrar sesión
  */
  function solicitarCierreSesion() {
    sileo.action({
      title: '¿Cerrar sesión?',
      description:
        'Tendrás que ingresar nuevamente para acceder al portal.',
      duration: 7000,
      button: {
        title: 'Cerrar sesión',
        onClick: cerrarSesion,
      },
    })
  }

  return (

    <nav
      className="mobile-menu"
      aria-label="Navegación móvil"
    >
      <NavLink
        className={obtenerClase}
        to="/dashboard"
      >
        <LayoutDashboard aria-hidden="true" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        className={obtenerClase}
        to="/perfil"
      >
        <UserRound aria-hidden="true" />
        <span>Perfil</span>
      </NavLink>

      <button
        className="mobile-menu__link mobile-menu__logout"
        type="button"
        onClick={solicitarCierreSesion}
        aria-label="Cerrar sesión"
      >
        <LogOut aria-hidden="true" />
        <span>Cerrar sesión</span>
      </button>
    </nav>
  )
}

export default MobileNavigation