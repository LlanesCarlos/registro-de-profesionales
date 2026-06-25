import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  User,
  Settings,
  Shield,
  Award,
  Bell,
  FileText,
  ChevronDown,
  ChevronRight,
  BookUser,
} from 'lucide-react'

interface NavItem {
  to?: string
  label: string
  icon: React.ElementType
  children?: { to: string; label: string; icon: React.ElementType }[]
}

const nav: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profesionales', label: 'Profesionales', icon: Users },
  { to: '/mi-perfil', label: 'Mi Perfil', icon: User },
  {
    label: 'Administración',
    icon: Settings,
    children: [
      { to: '/perfiles', label: 'Perfiles', icon: Shield },
      { to: '/competencias', label: 'Competencias', icon: Award },
      { to: '/notificaciones', label: 'Notificaciones', icon: Bell },
    ],
  },
  { to: '/solicitudes', label: 'Solicitudes', icon: FileText },
]

const linkBase =
  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150'
const linkInactive = 'text-slate-400 hover:text-white hover:bg-slate-800'
const linkActive = 'text-white bg-blue-600 shadow-md'

export default function Sidebar() {
  const location = useLocation()
  const adminPaths = ['/perfiles', '/competencias', '/notificaciones']
  const [adminOpen, setAdminOpen] = useState(() =>
    adminPaths.some((p) => location.pathname.startsWith(p))
  )

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 flex flex-col z-30">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 bg-slate-950 shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
          <BookUser className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm leading-tight truncate">Portal de Perfiles</p>
          <p className="text-blue-400 text-xs leading-tight truncate">Registro Profesional</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
        {nav.map((item) => {
          if (item.children) {
            const isAnyActive = item.children.some((c) =>
              location.pathname.startsWith(c.to)
            )
            return (
              <div key={item.label}>
                <button
                  onClick={() => setAdminOpen((o) => !o)}
                  className={`${linkBase} w-full justify-between ${
                    isAnyActive ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </span>
                  {adminOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {adminOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-3">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `${linkBase} ${isActive ? linkActive : linkInactive}`
                        }
                      >
                        <child.icon className="w-4 h-4 shrink-0" />
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <NavLink
              key={item.to}
              to={item.to!}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      {/* User */}
      <div className="shrink-0 px-3 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            AM
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">Ana M. González</p>
            <p className="text-slate-500 text-xs truncate">Directora Administrativa</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
