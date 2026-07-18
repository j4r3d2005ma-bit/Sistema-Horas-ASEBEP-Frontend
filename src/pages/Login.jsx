import { useState } from 'react'
import { sileo } from 'sileo'
import { iniciarSesion } from '../services/authService.js'
import { Link } from 'react-router'
import '../styles/Login.css'

// Valores que tendrá el formulario cuando se cargue la página.
const formularioInicial = {
  numeroCuenta: '',
  contrasena: '',
}


function IconoOjo({ visible }) {
  if (visible) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 4.2A10.4 10.4 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-2.7 3.8" />
        <path d="M6.6 6.6C3.8 8.5 2 12 2 12s3.5 8 10 8c1.8 0 3.3-.4 4.6-1" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

function Login() {
  /*
   - useState permite que React recuerde información.
   - formulario: guarda lo escrito en los inputs.
   - errores: guarda los mensajes de validación.
   - mostrarContrasena: controla si la contraseña se ve o se oculta.
   - mensaje: muestra el resultado exitoso de la petición.
   - enviando: indica si estamos esperando una respuesta del backend.
   - errorServidor: guarda errores de la API o de conexión.
   */
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})
  const [mostrarContrasena, setMostrarContrasena] =
    useState(false)
  const [enviando, setEnviando] = useState(false)

  /*
   - Esta función se ejecuta cada vez que el usuario escribe.
   - event.target representa el input que produjo el cambio.
   */
  function manejarCambio(event) {
    const { name, value } = event.target

    /*
     - Copiamos los valores anteriores con ...valoresAnteriores
     - y actualizamos únicamente el campo que cambió.
     */
    setFormulario((valoresAnteriores) => ({
      ...valoresAnteriores,
      [name]: value,
    }))

    // Limpieza de campo
    if (errores[name]) {
      setErrores((erroresAnteriores) => ({
        ...erroresAnteriores,
        [name]: '',
      }))
    }

  }

  /*
   - Comprueba los datos antes de permitir el envío.
   - Devuelve un objeto con los errores encontrados.
   */
  function validarFormulario() {
    const nuevosErrores = {}

    if (!formulario.numeroCuenta.trim()) {
      nuevosErrores.numeroCuenta =
        'Ingresa tu número de cuenta.'
    } else if (!/^\d+$/.test(formulario.numeroCuenta)) {
      nuevosErrores.numeroCuenta =
        'El número de cuenta solo puede contener números.'
    }

    if (!formulario.contrasena) {
      nuevosErrores.contrasena =
        'Ingresa tu contraseña.'
    }

    return nuevosErrores
  }

/*
 - Esta función se ejecuta cuando se envía el formulario.
 - Primero valida los campos y después llama a la API.
 - async permite utilizar await para esperar al backend.
*/
  async function manejarEnvio(event) {
    // Evita que el navegador recargue la página.
    event.preventDefault()

    const nuevosErrores = validarFormulario()

    /*
    - Object.keys obtiene los nombres de las propiedades.
    - Si hay errores, detenemos el envío del formulario.
    */
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    setErrores({})

    /*
    - Cambiamos enviando a true mientras esperamos.
    - Esto desactiva el botón y evita peticiones duplicadas.
    */
    setEnviando(true)

    try {
      /*
      - iniciarSesion pertenece a authService.js.
      - authService utiliza apiFetch para comunicarse
      - con el endpoint /auth/login.
      */
      await iniciarSesion({
        numeroCuenta: formulario.numeroCuenta,
        contrasena: formulario.contrasena,
      })

      /*
      - La respuesta eventualmente tendrá el JWT.
      - Por seguridad, no la mostramos en la consola.
      */
      sileo.success({
        title: 'Inicio de sesión correcto',
        description: 'Bienvenido al portal de becas ASEBEP.',
      })
    } catch (error) {
      let descripcionError = ''

      // Codigo 401
      if (error.status === 401) {
        descripcionError =
          'El número de cuenta o la contraseña son incorrectos.'
      } else if (!error.status) {
        descripcionError =
          'No fue posible conectarse con el servidor.'
      } else {
        /*
        - apiFetch prepara un mensaje para respuestas
        - como 400, 404, 422 o 500.
        */
        descripcionError =
          error.message ||
          'No fue posible completar la solicitud.'
      }

      sileo.error({
        title: 'No fue posible iniciar sesión',
        description: descripcionError,
        duration: 6000,
      })
    } finally {

      setEnviando(false)
    }
  }

  return (
    <main className="login-page">
      <section
        className="login-content"
        aria-labelledby="login-title"
      >
        {/* Identidad visual de ASEBEP */}
        <header className="brand">
          <div
            className="brand__icon"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24">
              <path d="M3 9.25 12 5l9 4.25L12 13.5 3 9.25Z" />
              <path d="M7 11.1v5.1c2.9 2 7.1 2 10 0v-5.1" />
              <path d="M21 9.25v5" />
            </svg>
          </div>

          <div>
            <h1 id="login-title">ASEBEP</h1>
            <p>Portal de Gestión de Becas</p>
          </div>
        </header>

        {/* Este mensaje aparece solamente en dispositivos pequeños. */}
        <div className="login-intro">
          <h2>Bienvenido</h2>

          <p>
            Ingresa tus credenciales para acceder a tu
            panel de becario.
          </p>
        </div>

        {/* onSubmit conecta el formulario con manejarEnvio */}
        <form
          className="login-card"
          onSubmit={manejarEnvio}
          noValidate
        >
          <div className="form-field">
            <label htmlFor="numero-cuenta">
              Número de cuenta
            </label>

            <input
              id="numero-cuenta"
              name="numeroCuenta"
              type="text"
              inputMode="numeric"
              autoComplete="username"
              placeholder="Ej. 20240001"
              value={formulario.numeroCuenta}
              onChange={manejarCambio}
              aria-invalid={Boolean(
                errores.numeroCuenta,
              )}
              aria-describedby={
                errores.numeroCuenta
                  ? 'error-numero-cuenta'
                  : undefined
              }
            />

            {errores.numeroCuenta && (
              <small
                className="field-error"
                id="error-numero-cuenta"
                role="alert"
              >
                {errores.numeroCuenta}
              </small>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="contrasena">
              Contraseña
            </label>

            <div className="password-control">
              <input
                id="contrasena"
                name="contrasena"
                type={
                  mostrarContrasena
                    ? 'text'
                    : 'password'
                }
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
                value={formulario.contrasena}
                onChange={manejarCambio}
                aria-invalid={Boolean(
                  errores.contrasena,
                )}
                aria-describedby={
                  errores.contrasena
                    ? 'error-contrasena'
                    : undefined
                }
              />

              <button
                className="password-toggle"
                type="button"
                aria-label={
                  mostrarContrasena
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
                aria-pressed={mostrarContrasena}
                title={
                  mostrarContrasena
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
                onClick={() =>
                  setMostrarContrasena(
                    (valorAnterior) =>
                      !valorAnterior,
                  )
                }
              >
                <IconoOjo
                  visible={mostrarContrasena}
                />
              </button>
            </div>

            {errores.contrasena && (
              <small
                className="field-error"
                id="error-contrasena"
                role="alert"
              >
                {errores.contrasena}
              </small>
            )}
          </div>

          {/*
            - disabled impide enviar varias peticiones.
            - aria-busy informa que el botón está procesando.
          */}
          <button
            className="login-button"
            type="submit"
            disabled={enviando}
            aria-busy={enviando}
          >
            {enviando ? (
              'Iniciando sesión...'
            ) : (
              <>
                Iniciar sesión{' '}
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </form>

        <nav
          className="access-links"
          aria-label="Opciones de acceso"
        >
          <Link to="/recuperar-contrasena">
            ¿Olvidaste tus datos?
          </Link>

          <a href="#configurar-cuenta">
            Configura tu cuenta
          </a>
        </nav>

        <footer className="login-footer">
          <p>© 2026 ASEBEP · Portal de Becas</p>

          <div>
            <a href="#privacidad">Privacidad</a>
            <a href="#terminos">Términos</a>
          </div>
        </footer>
      </section>
    </main>
  )
}

export default Login