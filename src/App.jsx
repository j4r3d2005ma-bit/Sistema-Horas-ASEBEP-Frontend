import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from 'sileo'
import 'sileo/styles.css'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import PasswordRecovery from './pages/PasswordRecovery.jsx'

function App() {
  return (
  <>
    {/* Toaster es el contenedor global de las notificaciones. */}
    <Toaster
      position="top-right"
      offset={{ top: 20, right: 16}}
      theme="light"
      options={{
        duration: 4500,
        roundness: 16,
      }}
  />

    {/* Routes revisa la URL actual y decide que pagina mostrar.*/}
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/recuperar-contrasena" element={<PasswordRecovery />} />

        {/* Una URL desconocida regresa al dashboard */}
        <Route
        path="*"
        element={<Navigate to="/login" replace />}
        />
    </Routes>
  </>
  )
}

export default App