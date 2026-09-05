import { NavLink } from "react-router";
import logoAsebep from '../assets/asebep-logo.png'; 
import '../styles/NavbarPublico.css';

export default function NavbarPublico() {
    const getLinkStyle = ({ isActive }) => ({
        fontWeight: isActive ? '700' : '600',
        borderBottom: isActive ? '3px solid #0056b3' : '3px solid transparent',
    });

    return (
        <header className="navbar-header">
            <div className="navbar-container">
                
                {/* Logo a la par de ASEBEP */}
                <NavLink to="/" className="navbar-brand">
                    <img 
                        src={logoAsebep} 
                        alt="Logo ASEBEP" 
                        className="navbar-logo"
                    />
                    <div>
                        <span className="navbar-brand-title">ASEBEP</span>
                        <span className="navbar-brand-subtitle">Portal de Gestión de Becas</span>
                    </div>
                </NavLink>

                {/* Enlaces de navegación */}
                <nav className="navbar-nav">
                    <NavLink to="/" className="navbar-link" style={getLinkStyle}>Inicio</NavLink>
                    <NavLink to="/beneficios" className="navbar-link" style={getLinkStyle}>Beneficios</NavLink>
                    <NavLink to="/como-funciona" className="navbar-link" style={getLinkStyle}>Cómo funciona</NavLink>
                    <NavLink to="/preguntas-frecuentes" className="navbar-link" style={getLinkStyle}>Preguntas frecuentes</NavLink>
                </nav>

                {/* Botón de Iniciar Sesión */}
                <div>
                    <NavLink 
                        to="/login" 
                        className="navbar-login-btn"
                    >
                        Iniciar sesión
                    </NavLink>
                </div>

            </div>
        </header>
    );
}