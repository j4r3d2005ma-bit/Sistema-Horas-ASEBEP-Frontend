import { useState } from 'react'
import {
  OTPInput,
  REGEXP_ONLY_DIGITS,
} from 'input-otp'
import {
  ArrowLeft,
  Circle,
  CircleCheck,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react'
import { Link } from 'react-router'
import '../styles/PasswordRecovery.css'
import {
  notificarError,
  notificarInformacion,
} from '../services/notificationService.js'

/*
- Dominio institucional UNAH.
*/
const PATRON_CORREO_INSTITUCIONAL =
  /^[^\s@]+@unah\.hn$/i

const ID_SOLICITUD_PIN = 'solicitud-pin'
const ID_VERIFICACION_PIN = 'verificacion-pin'
const ID_NUEVA_CONTRASENA = 'nueva-contrasena'

/*
- Cada slot representa visualmente un dígito.
- input-otp mantiene internamente un único input accesible.
*/
function PinSlot({
  char,
  hasFakeCaret,
  isActive,
}) {
  const clase = isActive
    ? 'pin-slot pin-slot--active'
    : 'pin-slot'

  return (
    <div className={clase}>
      {char}

      {hasFakeCaret && (
        <span
          className="pin-slot__caret"
          aria-hidden="true"
        />
      )}
    </div>
  )
}


// Representa cada requisito de seguridad.
function Requisito({ cumplido, children }) {
  return (
    <li
      className={
        cumplido
          ? 'password-requirement password-requirement--complete'
          : 'password-requirement'
      }
    >
      {cumplido ? (
        <CircleCheck aria-hidden="true" />
      ) : (
        <Circle aria-hidden="true" />
      )}

      <span>{children}</span>
    </li>
  )
}

function PasswordRecovery() {
  const [correo, setCorreo] = useState('')
  const [errorCorreo, setErrorCorreo] =
    useState('')
  const [pin, setPin] = useState('')

  const [contrasena, setContrasena] =
    useState('')
  const [confirmacion, setConfirmacion] =
    useState('')

  const [mostrarContrasena, setMostrarContrasena] =
    useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState(false)

  /*
  - Permanecerá en false hasta que el backend confirme
  - correctamente el PIN.
  - No simularemos una verificación exitosa.
  */
  const pinVerificado = false

  const correoValido =
    PATRON_CORREO_INSTITUCIONAL.test(
      correo.trim(),
    )

  const requisitos = {
    longitud: contrasena.length >= 10,
    mayusculaMinuscula:
      /[a-z]/.test(contrasena) &&
      /[A-Z]/.test(contrasena),
    numero: /\d/.test(contrasena),
    especial:
      /[^A-Za-z0-9]/.test(contrasena),
    coinciden:
      Boolean(contrasena) &&
      contrasena === confirmacion,
  }

  const totalCumplidos =
    Object.values(requisitos).filter(Boolean).length

  const porcentajeFortaleza =
    (totalCumplidos / 5) * 100

  let etiquetaFortaleza = 'Sin evaluar'

  if (totalCumplidos >= 1) {
    etiquetaFortaleza = 'Débil'
  }

  if (totalCumplidos >= 3) {
    etiquetaFortaleza = 'Media'
  }

  if (totalCumplidos === 5) {
    etiquetaFortaleza = 'Fuerte'
  }

  /*
  - Valida el correo antes de solicitar el PIN.
  - La llamada real se agregará cuando tenga el endpoint o la pueden agregar ustedes.
  */
  function solicitarPin(event) {
    event.preventDefault()

    if (!correo.trim()) {
      setErrorCorreo(
        'Ingresa tu correo institucional.',
      )
      return
    }

    if (!correoValido) {
      setErrorCorreo(
        'Utiliza un correo institucional @unah.hn.',
      )
      return
    }

    setErrorCorreo('')

    notificarInformacion({
      id: ID_SOLICITUD_PIN,
      titulo: 'Solicitud preparada',
      descripcion: 'EN PROCESO',
    })
  }

  /*
  - Comprueba únicamente que el PIN tenga seis dígitos.
  - El backend será responsable de verificar si es correcto.
  */
function verificarPin() {
  // Verificamos que tenga un formato valido
  if (!correoValido) {
    setErrorCorreo(
      'Primero ingresa un correo institucional válido.',
    )

    return
  }

  /*
   * Si el PIN no contiene exactamente seis dígitos,
   * mostramos el error y detenemos la función.
   */
  if (pin.length !== 6) {
    notificarError({
      id: ID_VERIFICACION_PIN,
      titulo: 'PIN incompleto',
      descripcion:
        'Ingresa los seis dígitos enviados a tu correo.',
    })

    return
  }

  /*
   * Esta parte solo se ejecuta cuando el correo
   * es válido y el PIN contiene seis dígitos.
   */
  notificarInformacion({
    id: ID_VERIFICACION_PIN,
    titulo: 'PIN preparado',
    descripcion: 'EN PROCESO',
  })
}

  /*
  - La actualización permanecerá deshabilitada
  - mientras el PIN no haya sido verificado por la API.
  */
  function actualizarContrasena(event) {
    event.preventDefault()

    if (!pinVerificado) {
      return
    }

    if (totalCumplidos !== 5) {
      notificarError({
        id: ID_NUEVA_CONTRASENA,
        titulo: 'Revisa la contraseña',
        descripcion: 'Debes cumplir todos los requisitos de seguridad.',
      })
      return
    }
  }

  return (
    <div className="security-page">
      <header className="security-topbar">
        <Link
          className="security-brand"
          to="/login"
          aria-label="Volver al inicio de sesión"
        >
          <span className="security-brand__icon">
            <GraduationCap aria-hidden="true" />
          </span>

          <strong>ASEBEP</strong>
        </Link>

        <span>Configuración de seguridad</span>
      </header>

      <main className="security-main">
        <Link
          className="security-back"
          to="/login"
        >
          <ArrowLeft aria-hidden="true" />
          Volver al inicio de sesión
        </Link>

        <header className="security-heading">
          <p>Protección de la cuenta</p>
          <h1>Seguridad de la cuenta</h1>

          <span>
            Actualiza tu contraseña para mantener tu
            cuenta ASEBEP protegida.
          </span>
        </header>

        {/* Primer paso: correo institucional y PIN. */}
        <section
          className="security-card"
          aria-labelledby="verification-title"
        >
          <header className="security-card__header">
            <span className="security-step">
              1
            </span>

            <div>
              <h2 id="verification-title">
                Verificación de identidad
              </h2>

              <p>
                Recibe y confirma un PIN en tu correo
                institucional.
              </p>
            </div>
          </header>

          <div className="security-card__body">
            <form
              className="institutional-email"
              onSubmit={solicitarPin}
              noValidate
            >
              <div className="security-field">
                <label htmlFor="institutional-email">
                  Correo institucional
                </label>

                <div className="security-input-control">
                  <Mail aria-hidden="true" />

                  <input
                    id="correo-institucional"
                    name="correo"
                    type="email"
                    autoComplete="email"
                    placeholder="nombre@unah.hn"
                    value={correo}
                    onChange={(event) => {
                      setCorreo(event.target.value)
                      setErrorCorreo('')
                    }}
                    aria-invalid={Boolean(
                      errorCorreo,
                    )}
                    aria-describedby={
                      errorCorreo
                        ? 'institutional-email-error'
                        : undefined
                    }
                  />
                </div>

                {errorCorreo && (
                  <small
                    id="institutional-email-error"
                    className="security-error"
                    role="alert"
                  >
                    {errorCorreo}
                  </small>
                )}
              </div>

              <button
                className="security-button security-button--secondary"
                type="submit"
              >
                <Mail aria-hidden="true" />
                Enviar PIN
              </button>
            </form>

            <div
              className="security-divider"
              aria-hidden="true"
            />

            <div className="pin-section">
              <div className="pin-section__heading">
                <KeyRound aria-hidden="true" />

                <div>
                  <h3>Ingresa el PIN</h3>
                  <p>
                    Escribe el código de seis dígitos
                    enviado a tu correo.
                  </p>
                </div>
              </div>

              <OTPInput
                maxLength={6}
                value={pin}
                onChange={setPin}
                pattern={REGEXP_ONLY_DIGITS}
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label="Código PIN de seis dígitos"
                containerClassName="pin-input"
                render={({ slots }) => (
                  <>
                    <div className="pin-group">
                      {slots
                        .slice(0, 3)
                        .map((slot, index) => (
                          <PinSlot
                            key={`pin-first-${index}`}
                            {...slot}
                          />
                        ))}
                    </div>

                    <span
                      className="pin-separator"
                      aria-hidden="true"
                    >
                      –
                    </span>

                    <div className="pin-group">
                      {slots
                        .slice(3)
                        .map((slot, index) => (
                          <PinSlot
                            key={`pin-second-${index}`}
                            {...slot}
                          />
                        ))}
                    </div>
                  </>
                )}
              />

              <button
                className="security-button security-button--primary"
                type="button"
                onClick={verificarPin}
                disabled={pin.length !== 6}
              >
                <ShieldCheck aria-hidden="true" />
                Verificar PIN
              </button>

              <p className="resend-pin">
                ¿No recibiste el código?

                <button
                  type="button"
                  onClick={solicitarPin}
                >
                  Reenviar PIN
                </button>
              </p>
            </div>
          </div>
        </section>

        {/* Segundo paso: creación de la contraseña. */}
        <section
          className={
            pinVerificado
              ? 'security-card'
              : 'security-card security-card--disabled'
          }
          aria-labelledby="password-title"
          aria-disabled={!pinVerificado}
        >
          <header className="security-card__header">
            <span className="security-step security-step--secondary">
              2
            </span>

            <div>
              <h2 id="password-title">
                Nueva contraseña
              </h2>

              <p>
                Crea una contraseña segura para tu
                cuenta.
              </p>
            </div>
          </header>

          <form
            className="password-layout"
            onSubmit={actualizarContrasena}
          >
            <fieldset
              className="password-fields"
              disabled={!pinVerificado}
            >
              <div className="security-field">
                <label htmlFor="new-password">
                  Nueva contraseña
                </label>

                <div className="password-input">
                  <LockKeyhole aria-hidden="true" />

                  <input
                    id="new-password"
                    type={
                      mostrarContrasena
                        ? 'text'
                        : 'password'
                    }
                    autoComplete="new-password"
                    placeholder="Ingresa tu contraseña"
                    value={contrasena}
                    onChange={(event) =>
                      setContrasena(
                        event.target.value,
                      )
                    }
                  />

                  <button
                    type="button"
                    aria-label={
                      mostrarContrasena
                        ? 'Ocultar contraseña'
                        : 'Mostrar contraseña'
                    }
                    onClick={() =>
                      setMostrarContrasena(
                        (valor) => !valor,
                      )
                    }
                  >
                    {mostrarContrasena ? (
                      <EyeOff aria-hidden="true" />
                    ) : (
                      <Eye aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="security-field">
                <label htmlFor="confirm-password">
                  Confirmar contraseña
                </label>

                <div className="password-input">
                  <LockKeyhole aria-hidden="true" />

                  <input
                    id="confirm-password"
                    type={
                      mostrarConfirmacion
                        ? 'text'
                        : 'password'
                    }
                    autoComplete="new-password"
                    placeholder="Repite tu contraseña"
                    value={confirmacion}
                    onChange={(event) =>
                      setConfirmacion(
                        event.target.value,
                      )
                    }
                  />

                  <button
                    type="button"
                    aria-label={
                      mostrarConfirmacion
                        ? 'Ocultar confirmación'
                        : 'Mostrar confirmación'
                    }
                    onClick={() =>
                      setMostrarConfirmacion(
                        (valor) => !valor,
                      )
                    }
                  >
                    {mostrarConfirmacion ? (
                      <EyeOff aria-hidden="true" />
                    ) : (
                      <Eye aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <button
                className="security-button security-button--primary security-button--full"
                type="submit"
                disabled={
                  !pinVerificado ||
                  totalCumplidos !== 5
                }
              >
                Actualizar contraseña
              </button>
            </fieldset>

            <aside
              className="password-security"
              aria-label="Requisitos de seguridad"
            >
              <h3>Requisitos de seguridad</h3>

              <ul>
                <Requisito
                  cumplido={requisitos.longitud}
                >
                  Mínimo 10 caracteres
                </Requisito>

                <Requisito
                  cumplido={
                    requisitos.mayusculaMinuscula
                  }
                >
                  Mayúsculas y minúsculas
                </Requisito>

                <Requisito
                  cumplido={requisitos.numero}
                >
                  Al menos un número
                </Requisito>

                <Requisito
                  cumplido={requisitos.especial}
                >
                  Al menos un carácter especial
                </Requisito>

                <Requisito
                  cumplido={requisitos.coinciden}
                >
                  Las contraseñas coinciden
                </Requisito>
              </ul>

              <div className="password-strength">
                <div>
                  <span>Fortaleza</span>
                  <strong>
                    {etiquetaFortaleza}
                  </strong>
                </div>

                <div
                  className="password-strength__track"
                  aria-label={`Fortaleza: ${etiquetaFortaleza}`}
                >
                  <span
                    style={{
                      width: `${porcentajeFortaleza}%`,
                    }}
                  />
                </div>
              </div>
            </aside>
          </form>
        </section>

        {/* Información de soporte. */}
        <aside className="security-help">
          <div className="security-help__icon">
            <ShieldQuestion aria-hidden="true" />
          </div>

          <div>
            <h2>¿Necesitas ayuda adicional?</h2>

            <p>
              Si tienes problemas para recibir el PIN,
              contacta al equipo de ASEBEP en{' '}
              <a href="mailto:consultasasebep@gmail.com">
                consultasasebep@gmail.com
              </a>
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default PasswordRecovery