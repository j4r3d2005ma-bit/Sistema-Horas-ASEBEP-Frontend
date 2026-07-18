import {
  ArrowRight,
  CalendarDays,
  Clock3,
  GraduationCap,
  Scale,
  WalletCards,
} from 'lucide-react'

import AppSidebar from '../components/AppSidebar.jsx'
import MobileNavigation from '../components/MobileNavigation.jsx'
import '../styles/AppLayout.css'
import '../styles/Dashboard.css'

/*
 - Estos datos son para pruebas visuales.
 */
const datosDashboard = {
  nombre: 'Juan',
  horasAcumuladas: 65,
  metaHoras: 140,
  horasRestantes: 75,
  ultimoPago: '12 Mayo',
  proximaCuota: 'Jun 01',
}

function Dashboard() {
  const porcentaje = Math.round(
    (datosDashboard.horasAcumuladas /
      datosDashboard.metaHoras) *
      100,
  )

  return (
    /*
     - app-layout pertenece a AppLayout.css.
     - Divide la pantalla entre la barra lateral
     - y el contenido principal.
     */
    <div className="app-layout">
      {/* Navegación compartida con la página de perfil. */}
      <AppSidebar />

      <section className="app-content">
        {/* Encabezado superior compartido. */}
        <header className="app-topbar">
          <div className="app-topbar__brand">
            <GraduationCap aria-hidden="true" />
            <strong>ASEBEP</strong>
          </div>

          <span className="app-topbar__section">
            Dashboard
          </span>
        </header>

        <main className="dashboard-main">
          {/* Saludo principal del estudiante. */}
          <header className="dashboard-welcome">
            <p className="dashboard-eyebrow">
              Panel principal
            </p>

            <h1>
              Hola, <span>{datosDashboard.nombre}</span>
            </h1>

            <p>
              Bienvenido a tu panel de control de becas.
              Aquí está el resumen de tu progreso.
            </p>
          </header>

          {/* Sección de progreso de horas acumuladas. */}
          <section
            className="hours-panel"
            aria-labelledby="hours-title"
          >
            <GraduationCap
              className="hours-watermark"
              aria-hidden="true"
            />

            <div className="hours-panel__heading">
              <div>
                <h2 id="hours-title">
                  Horas acumuladas
                </h2>

                <p>Ciclo académico 2023–2024</p>
              </div>

              <span className="status-badge">
                En curso
              </span>
            </div>

            <div className="hours-number">
              <strong>
                {datosDashboard.horasAcumuladas}
              </strong>

              <span>
                / {datosDashboard.metaHoras} horas
              </span>
            </div>

            {/*
             * Barra de progreso accesible.
             * aria-valuenow contiene el progreso actual.
             * aria-valuemax contiene la meta total.
             */}
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Progreso de horas acumuladas"
              aria-valuemin="0"
              aria-valuemax={
                datosDashboard.metaHoras
              }
              aria-valuenow={
                datosDashboard.horasAcumuladas
              }
            >
              <span
                className="progress-value"
                style={{
                  width: `${porcentaje}%`,
                }}
              />
            </div>

            <div className="hours-panel__footer">
              <span>
                <Clock3 aria-hidden="true" />

                {datosDashboard.horasRestantes} horas
                restantes
              </span>

              <span>
                Progreso total: {porcentaje}%
              </span>
            </div>
          </section>

          {/* Resumen de aportaciones y multas. */}
          <section
            className="dashboard-summary"
            aria-label="Resumen financiero"
          >
            {/* Tarjeta de aportaciones. */}
            <article className="summary-card">
              <div className="summary-card__icon summary-card__icon--blue">
                <WalletCards aria-hidden="true" />
              </div>

              <div className="summary-card__content">
                <div>
                  <span className="summary-card__label">
                    Aportaciones
                  </span>

                  <h2>Al día</h2>
                </div>

                <span className="positive-status">
                  <span aria-hidden="true"></span>
                  Sin pagos pendientes
                </span>

                <div className="summary-card__details">
                  <span>
                    <CalendarDays aria-hidden="true" />

                    Próxima cuota:{' '}
                    {datosDashboard.proximaCuota}
                  </span>

                  <span>
                    Último pago:{' '}
                    {datosDashboard.ultimoPago}
                  </span>
                </div>
              </div>

              {/*
               * Este botón todavía no ejecuta ninguna acción.
               * Se conectará cuando exista el endpoint
               * del historial de aportaciones.
               */}
              <button
                className="summary-action"
                type="button"
                title="Disponible cuando conectemos la API"
              >
                Ver historial
                <ArrowRight aria-hidden="true" />
              </button>
            </article>

            {/* Tarjeta de multas. */}
            <article className="summary-card">
              <div className="summary-card__icon summary-card__icon--red">
                <Scale aria-hidden="true" />
              </div>

              <div className="summary-card__content">
                <div>
                  <span className="summary-card__label">
                    Multas
                  </span>

                  <h2>Ninguna</h2>
                </div>

                <p className="summary-card__description">
                  No tienes penalizaciones pendientes en tu
                  registro.
                </p>
              </div>
            </article>
          </section>
        </main>

        {/*
         * Navegación inferior para celulares.
         * AppLayout.css la oculta en computadoras.
         */}
        <MobileNavigation />
      </section>
    </div>
  )
}

export default Dashboard