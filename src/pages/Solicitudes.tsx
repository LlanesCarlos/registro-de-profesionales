import { useState } from 'react'
import { Search, Plus, Eye, ChevronLeft, ChevronRight, Building2, Calendar, AlertCircle } from 'lucide-react'
import Badge from '../components/ui/Badge'
import PageHeader from '../components/ui/PageHeader'
import { solicitudes } from '../data/mockData'

const ESTADO_OPTIONS = ['todos', 'borrador', 'enviado', 'aprobado', 'devuelto', 'rechazado']
const PAGE_SIZE = 6

export default function Solicitudes() {
  const [search, setSearch] = useState('')
  const [estado, setEstado] = useState('todos')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = solicitudes.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch = !q || s.nroSolicitud.toLowerCase().includes(q) || s.solicitante.toLowerCase().includes(q) || s.entidad.toLowerCase().includes(q)
    const matchEstado = estado === 'todos' || s.estado === estado
    return matchSearch && matchEstado
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const detail = solicitudes.find((s) => s.id === selected)

  const counts: Record<string, number> = ESTADO_OPTIONS.slice(1).reduce((acc, e) => ({
    ...acc,
    [e]: solicitudes.filter((s) => s.estado === e).length,
  }), {})

  return (
    <div>
      <PageHeader
        title="Solicitudes"
        subtitle="Solicitudes de registro de nuevos perfiles profesionales"
        action={
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" /> Nueva Solicitud
          </button>
        }
      />

      {/* Estado summary chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ESTADO_OPTIONS.map((e) => (
          <button
            key={e}
            onClick={() => { setEstado(e); setPage(1) }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              estado === e
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {e === 'todos' ? 'Todas' : e.charAt(0).toUpperCase() + e.slice(1)}
            {e !== 'todos' && counts[e] !== undefined && (
              <span className={`ml-1.5 text-xs ${estado === e ? 'text-blue-200' : 'text-gray-400'}`}>
                ({counts[e]})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por N° solicitud, nombre, entidad..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase">N° Solicitud</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase">Solicitante</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase hidden md:table-cell">Entidad</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase">Estado</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase hidden lg:table-cell">Vencimiento</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paged.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-10 text-gray-400">No hay solicitudes.</td></tr>
                ) : paged.map((s) => (
                  <tr
                    key={s.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${selected === s.id ? 'bg-blue-50/40' : ''}`}
                    onClick={() => setSelected(s.id === selected ? null : s.id)}
                  >
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs font-semibold text-blue-700">{s.nroSolicitud}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.fechaSolicitud}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{s.solicitante}</p>
                      <p className="text-xs text-gray-400">C.I. {s.ci}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-gray-700 text-sm truncate max-w-40">{s.entidad}</p>
                      <p className="text-xs text-gray-400">{s.cargo}</p>
                    </td>
                    <td className="px-4 py-3"><Badge value={s.estado} /></td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">{s.fechaVencimiento}</td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length}
                </p>
                <div className="flex gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 text-gray-600 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}>{p}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 text-gray-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="w-72 shrink-0">
          {detail ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-blue-700">{detail.nroSolicitud}</span>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
              </div>
              <Badge value={detail.estado} />
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Solicitante</p>
                <p className="font-semibold text-gray-900 text-sm">{detail.solicitante}</p>
                <p className="text-xs text-gray-500">C.I. {detail.ci} · {detail.cargo}</p>
              </div>
              <div className="flex gap-2.5">
                <Building2 className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Entidad</p>
                  <p className="text-sm text-gray-700">{detail.entidad}</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Vencimiento</p>
                  <p className="text-sm text-gray-700">{detail.fechaVencimiento}</p>
                </div>
              </div>
              {detail.areas.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Áreas / Unidades</p>
                  <ul className="space-y-1">
                    {detail.areas.map((u) => (
                      <li key={u} className="text-xs text-gray-700 bg-gray-50 rounded-md px-2.5 py-1.5 border border-gray-100">{u}</li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.observaciones && (
                <div className="flex gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Observaciones</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{detail.observaciones}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-1 border-t border-gray-100">
                {detail.estado === 'enviado' && (
                  <>
                    <button className="flex-1 py-2 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">Aprobar</button>
                    <button className="flex-1 py-2 text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors">Devolver</button>
                  </>
                )}
                {detail.estado !== 'enviado' && (
                  <button className="flex-1 py-2 text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Ver historial</button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 p-8 text-center">
              <Eye className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Selecciona una solicitud para ver su detalle</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
