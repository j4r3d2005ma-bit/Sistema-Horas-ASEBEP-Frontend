/*
* Usuario utilizado exclusivamente para desarrollo
*/

// Credenciales ficticias
export const credencialesUsuarioMock = Object.freeze({
  numeroCuenta: '20249999999',
  contrasena: 'AsebepBeta2026!',
})
export const usuarioMock = {
    credenciales: {
        rol: 'becario',
        activo: true,
    },

    // Informacion personal ficticia
datosPersonales: {
    numeroCuenta: credencialesUsuarioMock.numeroCuenta,
    primerNombre: 'Usuario',
    segundoNombre: 'De',
    primerApellido: 'Prueba',
    segundoApellido: 'ASEBEP',
    nombreCompleto:
      'Usuario De Prueba ASEBEP',
    correoPersonal:
      'usuario.prueba@example.com',
    correoInstitucional:
      'usuario.prueba@unah.hn',
    carrera:
      'Licenciatura en Informática Administrativa',
    telefono: '99999999',
    anioNacimiento: 2003,
  },

  datosBecario: {
    periodoInicio: 'III PAC',
    anioInicio: 2024,
    horasAcumuladas: 250,
    horasFaltantes: 130,
    mesesSinPagar: 2,
    estadoBeca: 'activo',
  },
}