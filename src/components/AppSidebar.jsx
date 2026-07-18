import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  UserRound,
} from 'lucide-react'
import { NavLink } from 'react-router'

function AppSidebar() {
  /*
   - NavLink conoce la URL actual.
   - isActive será true cuando la dirección coincida
   - con la propiedad to del enlace.
   */
  function obtenerClase({ isActive }) {
    return isActive
      ? 'app-nav__link app-nav__link--active'
      : 'app-nav__link'
  }

  return (
    <aside className="app-sidebar">
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
        <NavLink
          className={obtenerClase}
          to="/dashboard"
        >
          <LayoutDashboard aria-hidden="true" />
          Dashboard
        </NavLink>

        <NavLink className={obtenerClase} to="/perfil">
          <UserRound aria-hidden="true" />
          Perfil
        </NavLink>
      </nav>

      <NavLink className="app-sidebar__logout" to="/login">
        <LogOut aria-hidden="true" />
        Cerrar sesión
      </NavLink>
    </aside>
  )
}

export default AppSidebar