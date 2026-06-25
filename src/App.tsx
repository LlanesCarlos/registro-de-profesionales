import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Profesionales from './pages/Profesionales'
import ProfesionalDetalle from './pages/ProfesionalDetalle'
import MiPerfil from './pages/MiPerfil'
import Perfiles from './pages/Perfiles'
import Competencias from './pages/Competencias'
import Notificaciones from './pages/Notificaciones'
import Solicitudes from './pages/Solicitudes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profesionales" element={<Profesionales />} />
          <Route path="profesionales/:id" element={<ProfesionalDetalle />} />
          <Route path="mi-perfil" element={<MiPerfil />} />
          <Route path="perfiles" element={<Perfiles />} />
          <Route path="competencias" element={<Competencias />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="solicitudes" element={<Solicitudes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
