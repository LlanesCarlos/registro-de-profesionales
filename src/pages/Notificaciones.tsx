import { useState } from 'react'
import { Plus, Search, Bell, Mail, Clock, Users } from 'lucide-react'
import Badge from '../components/ui/Badge'
import PageHeader from '../components/ui/PageHeader'
import { notificaciones } from '../data/mockData'

const tipoIcon: Record<string, React.ElementType> = { email: Mail, alerta: Bell, recordatorio: Clock }

export default function Notificaciones() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = notificaciones.filter(
    (n) =>
      !search ||
      n.asunto.toLowerCase().includes(search.toLowerCase()) ||
      n.tipo.toLowerCase().includes(search.toLowerCase())
  )

  const detail = notificaciones.find((n) => n.id === selected)

  return (
    <div>
      <PageHeader
        title="Notificaciones"
        subtitle="Plantillas de correos y alertas del sistema"
        action={
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" /> Nueva Notificación
          </button>
        }
      />

      <div className="flex gap-5">
        {/* List */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar notificación..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {filtered.map((n) => {
            const Icon = tipoIcon[n.tipo] ?? Bell
            return (
              <button
                key={n.id}
                onClick={() => setSelected(n.id)}
                className={`w-full text-left bg-white rounded-xl border shadow-sm p-4 hover:border-blue-200 transition-all ${
                  selected === n.id ? 'border-blue-300 ring-1 ring-blue-100' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${n.tipo === 'email' ? 'bg-purple-50' : n.tipo === 'alerta' ? 'bg-amber-50' : 'bg-blue-50'}`}>
                    <Icon className={`w-4 h-4 ${n.tipo === 'email' ? 'text-purple-600' : n.tipo === 'alerta' ? 'text-amber-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{n.asunto}</p>
                      <Badge value={n.activo ? 'activo' : 'inactivo'} />
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <Badge value={n.tipo} />
                      <span className="text-xs text-gray-400 capitalize">{n.frecuencia}</span>
                      <span className="text-xs text-gray-400">{n.fechaCreacion}</span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        {detail ? (
          <div className="w-80 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">Detalle de Plantilla</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Asunto</p>
                  <p className="text-sm font-medium text-gray-900">{detail.asunto}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Tipo / Frecuencia</p>
                  <div className="flex gap-2">
                    <Badge value={detail.tipo} />
                    <span className="text-xs capitalize text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">{detail.frecuencia}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Destinatarios</p>
                  <div className="flex flex-wrap gap-1">
                    {detail.destinatarios.map((d) => (
                      <span key={d} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                        <Users className="w-3 h-3" /> {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Contenido</p>
                  <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed border border-gray-100">{detail.contenido}</p>
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 py-2 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">Editar</button>
                  <button className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${detail.activo ? 'border border-red-200 text-red-600 hover:bg-red-50' : 'border border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}>
                    {detail.activo ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-80 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-200 p-8 text-center">
              <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Selecciona una notificación para ver su detalle</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
