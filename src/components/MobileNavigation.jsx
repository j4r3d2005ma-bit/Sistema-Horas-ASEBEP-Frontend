import {
  LayoutDashboard,
  LogOut,
  UserRound,
} from 'lucide-react'
import { NavLink } from 'react-router'

import { useCerrarSesion } from '../hooks/useCerrarSesion.js'

function MobileNavigation() {
  const { solicitarCierreSesion } =
    useCerrarSesion()

  function obtenerClase({ isActive }) {
    return isActive
      ? 'mobile-menu__link mobile-menu__link--active'
      : 'mobile-menu__link'
  }

  return (
    <nav
      className="mobile-menu"
      aria-label="Navegación móvil"
    >
      {/* Enlace hacia el panel principal. */}
      <NavLink
        className={obtenerClase}
        to="/dashboard"
      >
        <LayoutDashboard aria-hidden="true" />

        <span>Dashboard</span>
      </NavLink>

      {/* Enlace hacia la información del usuario. */}
      <NavLink
        className={obtenerClase}
        to="/perfil"
      >
        <UserRound aria-hidden="true" />

        <span>Perfil</span>
      </NavLink>

      <button
        className={
          'mobile-menu__link mobile-menu__logout'
        }
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