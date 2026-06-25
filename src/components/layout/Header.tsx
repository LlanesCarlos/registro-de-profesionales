import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/profesionales': 'Profesionales',
  '/mi-perfil': 'Mi Perfil',
  '/perfiles': 'Perfiles',
  '/competencias': 'Competencias',
  '/notificaciones': 'Notificaciones',
  '/solicitudes': 'Solicitudes',
}

export default function Header() {
  const location = useLocation()
  const path = '/' + location.pathname.split('/')[1]
  const title = titles[path] ?? 'Detalle'

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <p className="text-xs text-gray-500">Registro de Perfiles Profesionales</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>
      </div>
    </header>
  )
}
