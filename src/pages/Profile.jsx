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
import { useUsuario } from '../hooks/useUsuario.js'
import '../styles/AppLayout.css'
import '../styles/Profile.css'

/*
 * Prepara estados y roles para mostrarlos
 * de una forma más fácil de leer.
 *
 * Por ejemplo:
 * - becario -> Becario
 * - admin_horas -> Admin horas
 */
function prepararEtiqueta(valor) {
  const texto = String(valor ?? '')
    .trim()
    .replace(/_/g, ' ')
    .toLowerCase()

  if (!texto) {
    return 'Sin información'
  }

  return (
    texto.charAt(0).toUpperCase() +
    texto.slice(1)
  )
}


function mostrarDato(valor) {
  const texto = String(valor ?? '').trim()

  return texto || 'No disponible'
}

function Profile() {
  /*
   * Obtenemos la información real compartida
   * por UsuarioProvider.
   */
  const {
    usuario,
    cargandoUsuario,
    errorUsuario,
    cargarUsuario,
  } = useUsuario()

  const credenciales =
    usuario?.credenciales

  const datosPersonales =
    usuario?.datosPersonales

  const datosBecario =
    usuario?.datosBecario

  const rol = prepararEtiqueta(
    credenciales?.rol,
  )

  const estadoUsuario =
    credenciales?.activo
      ? `${rol} activo`
      : `${rol} inactivo`

  /*
   * Utilizamos el estado de beca enviado por el servidor.
   *
   * Si no existe, usamos como respaldo el estado
   * general de las credenciales.
   */
  const estadoBeca = prepararEtiqueta(
    datosBecario?.estadoBeca ||
      (credenciales?.activo
        ? 'activo'
        : 'inactivo'),
  )

  const horasFaltantes = Math.max(
    0,
    datosBecario?.horasFaltantes ?? 0,
  )

  /*
   * Preparamos un mensaje usando únicamente la
   * información real de horas.
   */
  const descripcionEstadoBeca =
    horasFaltantes === 0
      ? 'Actualmente no tienes horas faltantes registradas.'
      : `Actualmente tienes ${horasFaltantes} ${
          horasFaltantes === 1
            ? 'hora pendiente'
            : 'horas pendientes'
        } por completar.`

  /*
   * Permite volver a consultar la información si
   * anteriormente ocurrió un error.
   */
  function reintentarCarga() {
    cargarUsuario().catch(() => undefined)
  }

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

          {/*
           * Mostramos este estado cuando se realiza
           * nuevamente una consulta del usuario.
           */}
          {cargandoUsuario && (
            <section
              className="profile-identity"
              role="status"
              aria-live="polite"
            >
              <div className="profile-identity__information">
                <div className="profile-name">
                  <h2>
                    Cargando información
                  </h2>
                </div>

                <p>
                  Estamos consultando los datos de tu
                  perfil.
                </p>
              </div>
            </section>
          )}

          {/*
           * Si la consulta falla, evitamos mostrar
           * información vacía o datos simulados.
           */}
          {!cargandoUsuario && errorUsuario && (
            <section
              className="profile-identity"
              role="alert"
            >
              <div className="profile-identity__information">
                <div className="profile-name">
                  <h2>
                    No pudimos cargar tu perfil
                  </h2>
                </div>

                <p>
                  {errorUsuario.message ||
                    'Ocurrió un error al consultar tus datos.'}
                </p>
              </div>

              <div className="profile-actions">
                <button
                  className="profile-button profile-button--primary"
                  type="button"
                  onClick={reintentarCarga}
                >
                  Intentar nuevamente
                </button>
              </div>
            </section>
          )}

          {/*
           * Protección adicional si no existe información
           * ni un error registrado.
           */}
          {!cargandoUsuario &&
            !errorUsuario &&
            !usuario && (
              <section
                className="profile-identity"
                role="status"
              >
                <div className="profile-identity__information">
                  <div className="profile-name">
                    <h2>
                      Información no disponible
                    </h2>
                  </div>

                  <p>
                    No encontramos datos de perfil para
                    mostrar en este momento.
                  </p>
                </div>
              </section>
            )}

          {/*
           * El perfil principal solamente se muestra
           * cuando UsuarioProvider contiene información.
           */}
          {!cargandoUsuario &&
            !errorUsuario &&
            usuario && (
              <>
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
                        {mostrarDato(
                          datosPersonales
                            ?.nombreCompleto,
                        )}
                      </h2>

                      <span>
                        <ShieldCheck
                          aria-hidden="true"
                        />

                        {estadoUsuario}
                      </span>
                    </div>

                    <p>
                      <IdCard aria-hidden="true" />

                      N.º{' '}
                      {mostrarDato(
                        datosPersonales
                          ?.numeroCuenta,
                      )}
                    </p>
                  </div>

                  <div className="profile-actions">
                    {/*
                     * Estos botones son visuales por ahora.
                     */}
                    <button
                      className="profile-button profile-button--secondary"
                      type="button"
                      disabled
                      title="Disponible próximamente"
                    >
                      <Pencil aria-hidden="true" />
                      Editar perfil
                    </button>

                    <button
                      className="profile-button profile-button--primary"
                      type="button"
                      disabled
                      title="Disponible próximamente"
                    >
                      <LockKeyhole
                        aria-hidden="true"
                      />
                      Cambiar contraseña
                    </button>
                  </div>
                </section>

                <section className="profile-grid">
                  {/* dl representa una lista de términos y valores. */}
                  <article className="profile-card">
                    <header className="profile-card__header">
                      <UserRound
                        aria-hidden="true"
                      />

                      <h2>Datos personales</h2>
                    </header>

                    <dl className="profile-details">
                      <div>
                        <dt>Rol</dt>

                        <dd>{rol}</dd>
                      </div>

                      <div>
                        <dt>Correo personal</dt>

                        <dd>
                          <Mail aria-hidden="true" />

                          {mostrarDato(
                            datosPersonales
                              ?.correoPersonal,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt>Teléfono</dt>

                        <dd>
                          <Phone aria-hidden="true" />

                          {mostrarDato(
                            datosPersonales
                              ?.telefono,
                          )}
                        </dd>
                      </div>
                    </dl>
                  </article>

                  <article className="profile-card">
                    <header className="profile-card__header">
                      <School aria-hidden="true" />

                      <h2>
                        Información académica
                      </h2>
                    </header>

                    <dl className="profile-details profile-details--academic">
                      <div>
                        <dt>Carrera</dt>

                        <dd>
                          {mostrarDato(
                            datosPersonales
                              ?.carrera,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt>Año de inicio</dt>

                        <dd>
                          {mostrarDato(
                            datosBecario?.anioInicio,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt>Periodo de inicio</dt>

                        <dd>
                          {mostrarDato(
                            datosBecario
                              ?.periodoInicio,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt>
                          Correo institucional
                        </dt>

                        <dd>
                          <Mail aria-hidden="true" />

                          {mostrarDato(
                            datosPersonales
                              ?.correoInstitucional,
                          )}
                        </dd>
                      </div>
                    </dl>
                  </article>
                </section>

                {/* Estado general de la beca. */}
                <section className="scholarship-status">
                  <div className="scholarship-status__icon">
                    <GraduationCap
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h2>
                      Estado de la beca:{' '}
                      {estadoBeca}
                    </h2>

                    <p>
                      {descripcionEstadoBeca}
                    </p>
                  </div>

                  <ShieldCheck
                    className="scholarship-status__watermark"
                    aria-hidden="true"
                  />
                </section>
              </>
            )}

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