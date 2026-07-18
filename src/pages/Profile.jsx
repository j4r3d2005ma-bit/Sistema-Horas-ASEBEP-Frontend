import {
  GraduationCap,
  IdCard,
  LockKeyhole,
  Mail,
  Pencil,
  Phone,
  School,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import AppSidebar from '../components/AppSidebar.jsx'
import MobileNavigation from '../components/MobileNavigation.jsx'
import '../styles/AppLayout.css'
import '../styles/Profile.css'

/*
 - Información visual de prueba hasta implementar los endpoints.
 */
const datosPerfil = {
  nombre: 'Juan Pérez',
  numeroCuenta: '20191001234',
  identificacion: '0801-2000-12345',
  correoPersonal: 'juan.perez@example.com',
  telefono: '+504 9988-7766',
  carrera: 'Ingeniería en Sistemas',
  facultad: 'Facultad de Ingeniería',
  anioInicio: '2019',
  periodoActual: 'Segundo Periodo',
  mesIngreso: 'Mayo',
  correoInstitucional: 'j.perez@asebep.edu.hn',
}

function Profile() {
  return (
    <div className="app-layout">
      <AppSidebar />

      <section className="app-content">
        <header className="app-topbar">
          <div className="app-topbar__brand">
            <GraduationCap aria-hidden="true" />
            <strong>ASEBEP</strong>
          </div>

          <span className="app-topbar__section">
            Mi perfil
          </span>
        </header>

        <main className="profile-page">
          <header className="profile-heading">
            <p>Perfil del estudiante</p>
            <h1>Mi perfil</h1>
          </header>

          {/* Tarjeta principal de identidad. */}
          <section
            className="profile-identity"
            aria-labelledby="student-name"
          >
            <div
              className="profile-avatar"
              aria-hidden="true"
            >
              <UserRound />
            </div>

            <div className="profile-identity__information">
              <div className="profile-name">
                <h2 id="student-name">
                  {datosPerfil.nombre}
                </h2>

                <span>
                  <ShieldCheck aria-hidden="true" />
                  Becario activo
                </span>
              </div>

              <p>
                <IdCard aria-hidden="true" />
                N.º {datosPerfil.numeroCuenta}
              </p>
            </div>

            <div className="profile-actions">
              {/*
               * Estos botones son visuales por ahora.
               * Su funcionamiento dependerá de los endpoints.
               */}
              <button
                className="profile-button profile-button--secondary"
                type="button"
                title="Disponible próximamente"
              >
                <Pencil aria-hidden="true" />
                Editar perfil
              </button>

              <button
                className="profile-button profile-button--primary"
                type="button"
                title="Disponible próximamente"
              >
                <LockKeyhole aria-hidden="true" />
                Cambiar contraseña
              </button>
            </div>
          </section>

          <section className="profile-grid">
            {/* dl representa una lista de términos y valores. */}
            <article className="profile-card">
              <header className="profile-card__header">
                <UserRound aria-hidden="true" />
                <h2>Datos personales</h2>
              </header>

              <dl className="profile-details">
                <div>
                  <dt>Identificación</dt>
                  <dd>{datosPerfil.identificacion}</dd>
                </div>

                <div>
                  <dt>Correo personal</dt>
                  <dd>
                    <Mail aria-hidden="true" />
                    {datosPerfil.correoPersonal}
                  </dd>
                </div>

                <div>
                  <dt>Teléfono</dt>
                  <dd>
                    <Phone aria-hidden="true" />
                    {datosPerfil.telefono}
                  </dd>
                </div>
              </dl>
            </article>

            <article className="profile-card">
              <header className="profile-card__header">
                <School aria-hidden="true" />
                <h2>Información académica</h2>
              </header>

              <dl className="profile-details profile-details--academic">
                <div>
                  <dt>Carrera</dt>
                  <dd>{datosPerfil.carrera}</dd>
                </div>

                <div>
                  <dt>Facultad</dt>
                  <dd>{datosPerfil.facultad}</dd>
                </div>

                <div>
                  <dt>Año de inicio</dt>
                  <dd>{datosPerfil.anioInicio}</dd>
                </div>

                <div>
                  <dt>Periodo actual</dt>
                  <dd>{datosPerfil.periodoActual}</dd>
                </div>

                <div>
                  <dt>Mes de ingreso</dt>
                  <dd>{datosPerfil.mesIngreso}</dd>
                </div>

                <div>
                  <dt>Correo institucional</dt>
                  <dd>{datosPerfil.correoInstitucional}</dd>
                </div>
              </dl>
            </article>
          </section>

          {/* Estado general de la beca. */}
          <section className="scholarship-status">
            <div className="scholarship-status__icon">
              <GraduationCap aria-hidden="true" />
            </div>

            <div>
              <h2>Tu beca está al día</h2>
              <p>
                No tienes trámites pendientes por el momento.
                Mantén tu índice académico para conservar tus
                beneficios.
              </p>
            </div>

            <ShieldCheck
              className="scholarship-status__watermark"
              aria-hidden="true"
            />
          </section>

          <footer className="profile-footer">
            <p>
              © {new Date().getFullYear()} ASEBEP · Gestión de
              Becas Estudiantiles
            </p>

            <nav aria-label="Enlaces legales">
              <a href="#terminos">Términos</a>
              <a href="#privacidad">Privacidad</a>
              <a href="#soporte">Soporte</a>
            </nav>
          </footer>
        </main>

        <MobileNavigation />
      </section>
    </div>
  )
}

export default Profile