import { apiFetch } from './api.js'

/*
 - Valida y prepara el número de cuenta.
 - Aunque contenga únicamente números, lo manejamos como texto
 - porque es un identificador y no una cantidad matemática.
*/
function prepararNumeroCuenta(numeroCuenta) {
  const cuenta = String(numeroCuenta ?? '').trim()

  if (!cuenta) {
    throw new Error('El número de cuenta es obligatorio.')
  }

  if (!/^\d+$/.test(cuenta)) {
    throw new Error(
      'El número de cuenta solamente puede contener números.',
    )
  }

  return cuenta
}

/*
 - Construye el nombre completo usando únicamente
 - los nombres y apellidos que existan.
 - filter(Boolean) elimina valores null, undefined o vacíos.
*/
function construirNombreCompleto(datosPersonales) {
  return [
    datosPersonales.p_nombre,
    datosPersonales.s_nombre,
    datosPersonales.p_apellido,
    datosPersonales.s_apellido,
  ]
    .filter(Boolean)
    .join(' ')
}

/*
 - Convierte los nombres enviados por el backend
 - a nombres más fáciles de utilizar en React.
 - Esta función evita llenar los componentes de propiedades
 - como p_nombre, correo_inst o horas_acumuladas.
*/
function normalizarUsuario(datosApi) {
  const credenciales = datosApi.credenciales ?? {}
  const personales = datosApi.datos_personales ?? {}
  const becario = datosApi.datos_becario ?? {}

  return {
    credenciales: {
      rol: credenciales.rol ?? '',
      activo: Boolean(credenciales.active),
    },

    datosPersonales: {
      numeroCuenta: String(personales.num_cuenta ?? ''),
      primerNombre: personales.p_nombre ?? '',
      segundoNombre: personales.s_nombre ?? '',
      primerApellido: personales.p_apellido ?? '',
      segundoApellido: personales.s_apellido ?? '',
      nombreCompleto: construirNombreCompleto(personales),
      correoPersonal: personales.correo_personal ?? '',
      correoInstitucional: personales.correo_inst ?? '',
      carrera: personales.carrera ?? '',
      telefono: personales.telefono ?? '',
      anioNacimiento:
        personales.anio_nacimiento ?? null,
    },

    datosBecario: {
      periodoInicio: becario.periodo_inicio ?? '',
      anioInicio: becario.anio_inicio ?? null,
      horasAcumuladas:
        Number(becario.horas_acumuladas) || 0,
      horasFaltantes:
        Number(becario.horas_faltantes) || 0,
      mesesSinPagar:
        Number(becario.meses_sin_pagar) || 0,
      estadoBeca: becario.estado_beca ?? '',
    },
  }
}

/*
 - Consulta un usuario mediante:
 - GET /usuario/{num_cuenta}
*/
export async function obtenerUsuario(numeroCuenta) {
  const cuenta = prepararNumeroCuenta(numeroCuenta)

  const datosApi = await apiFetch(
    `/usuario/${encodeURIComponent(cuenta)}`,
    {
      method: 'GET',
    },
  )

  return normalizarUsuario(datosApi)
}