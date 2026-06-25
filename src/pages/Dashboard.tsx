import { Users, UserCheck, Clock, FileText, TrendingUp, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import { profesionales, solicitudes } from '../data/mockData'

const recent = profesionales.slice(0, 6)

const activity = [
  { text: 'Perfil de Ana M. González aprobado', time: 'Hace 10 min', icon: CheckCircle, color: 'text-emerald-500' },
  { text: 'Nueva solicitud SOL-2024-008 recibida', time: 'Hace 45 min', icon: FileText, color: 'text-blue-500' },
  { text: 'Solicitud SOL-2024-007 rechazada', time: 'Hace 2 h', icon: AlertCircle, color: 'text-red-500' },
  { text: 'Perfil de Diego F. López actualizado', time: 'Hace 3 h', icon: RotateCcw, color: 'text-amber-500' },
  { text: 'Nueva competencia "Contratos y Acuerdos" publicada', time: 'Hace 5 h', icon: TrendingUp, color: 'text-violet-500' },
]

export default function Dashboard() {
  const activos = profesionales.filter((c) => c.estadoPerfil === 'activo').length
  const pendientes = profesionales.filter((c) => c.estadoPerfil === 'pendiente').length
  const solPendientes = solicitudes.filter((s) => s.estado === 'enviado').length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Profesionales" value={profesionales.length} icon={Users} color="blue" trend="Registrados en el sistema" />
        <StatCard label="Perfiles Activos" value={activos} icon={UserCheck} color="emerald" trend={`${Math.round((activos / profesionales.length) * 100)}% del total`} />
        <StatCard label="Perfiles Pendientes" value={pendientes} icon={Clock} color="amber" trend="Requieren revisión" />
        <StatCard label="Solicitudes Pendientes" value={solPendientes} icon={FileText} color="violet" trend="En espera de aprobación" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Profesionales */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Profesionales Recientes</h3>
            <Link to="/profesionales" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recent.map((c) => (
              <Link
                key={c.id}
                to={`/profesionales/${c.id}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold shrink-0">
                  {c.nombre[0]}{c.apellido[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{c.nombre} {c.apellido}</p>
                  <p className="text-xs text-gray-500 truncate">{c.cargo} · {c.entidad}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge value={c.estadoPerfil} />
                  <p className="text-xs text-gray-400">{c.fechaCreacion}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Actividad Reciente</h3>
          </div>
          <div className="p-5 space-y-4">
            {activity.map((a) => (
              <div key={a.text} className="flex gap-3">
                <a.icon className={`w-4 h-4 mt-0.5 shrink-0 ${a.color}`} />
                <div className="min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribution Chart (CSS bars) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Distribución por Rubro</h3>
        <div className="space-y-3">
          {Object.entries(
            profesionales.reduce((acc, p) => { acc[p.rubro] = (acc[p.rubro] || 0) + 1; return acc }, {} as Record<string, number>)
          )
            .sort((a, b) => b[1] - a[1])
            .map(([rubro, count]) => (
            <div key={rubro} className="flex items-center gap-3">
              <p className="text-sm text-gray-600 w-40 shrink-0">{rubro}</p>
              <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${(count / profesionales.length) * 100}%` }}
                />
              </div>
              <p className="text-sm font-semibold text-gray-700 w-6 text-right">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
