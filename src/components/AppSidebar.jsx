import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  UserRound,
} from 'lucide-react'
import { NavLink } from 'react-router'

import { useCerrarSesion } from '../hooks/useCerrarSesion.js'

function AppSidebar() {
  const { solicitarCierreSesion } =
    useCerrarSesion()

  function obtenerClase({ isActive }) {
    return isActive
      ? 'app-nav__link app-nav__link--active'
      : 'app-nav__link'
  }

  return (
    <aside className="app-sidebar">
      {/* Identidad visual de ASEBEP. */}
      <div className="app-brand">
        <div className="app-brand__icon">
          <GraduationCap aria-hidden="true" />
        </div>

        <div>
          <strong>ASEBEP</strong>

          <span>Scholarship Portal</span>
        </div>
      </div>

      <nav
        className="app-nav"
        aria-label="Navegación principal"
      >
        {/* Enlace hacia el panel principal. */}
        <NavLink
          className={obtenerClase}
          to="/dashboard"
        >
          <LayoutDashboard aria-hidden="true" />

          Dashboard
        </NavLink>

        {/* Enlace hacia el perfil del usuario. */}
        <NavLink
          className={obtenerClase}
          to="/perfil"
        >
          <UserRound aria-hidden="true" />

          Perfil
        </NavLink>
      </nav>

      <button
        className="app-sidebar__logout"
        type="button"
        onClick={solicitarCierreSesion}
        aria-label="Cerrar sesión"
      >
        <LogOut aria-hidden="true" />

        Cerrar sesión
      </button>
    </aside>
  )
}

export default AppSidebar