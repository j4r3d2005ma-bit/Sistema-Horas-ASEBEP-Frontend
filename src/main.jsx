import { StrictMode }  from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import App from './App.jsx'
import { UsuarioProvider } from './context/UsuarioProvider.jsx'
import './index.css'

/* BrowserRouter permite que React cambie de pantalla
utilizando direcciones como /login y /dashboard sin recargar
completamente el navegador */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Todos los componentes podran acceder al mismo usuario. */}
    <UsuarioProvider>
    <App />
    </UsuarioProvider>
    </BrowserRouter>
  </StrictMode>,
)