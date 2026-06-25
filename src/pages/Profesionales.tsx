import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Download, Plus, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import Badge from '../components/ui/Badge'
import PageHeader from '../components/ui/PageHeader'
import { profesionales } from '../data/mockData'

const ESTADO_OPTIONS = ['todos', 'activo', 'inactivo', 'pendiente', 'suspendido']
const ENTIDAD_OPTIONS = ['todas', ...Array.from(new Set(profesionales.map((c) => c.entidad)))]
const PAGE_SIZE = 8

export default function Profesionales() {
  const [search, setSearch] = useState('')
  const [estado, setEstado] = useState('todos')
  const [entidad, setEntidad] = useState('todas')
  const [page, setPage] = useState(1)

  const filtered = profesionales.filter((c) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      `${c.nombre} ${c.apellido}`.toLowerCase().includes(q) ||
      c.ci.includes(q) ||
      c.entidad.toLowerCase().includes(q) ||
      c.cargo.toLowerCase().includes(q)
    const matchEstado = estado === 'todos' || c.estadoPerfil === estado
    const matchEntidad = entidad === 'todas' || c.entidad === entidad
    return matchSearch && matchEstado && matchEntidad
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (v: string) => { setSearch(v); setPage(1) }
  const handleEstado = (v: string) => { setEstado(v); setPage(1) }
  const handleEntidad = (v: string) => { setEntidad(v); setPage(1) }

  return (
    <div>
      <PageHeader
        title="Registro de Perfiles Profesionales"
        subtitle={`${filtered.length} perfil${filtered.length !== 1 ? 'es' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              <Plus className="w-4 h-4" />
              Nuevo Perfil
            </button>
          </div>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, CI, entidad..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={estado}
            onChange={(e) => handleEstado(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {ESTADO_OPTIONS.map((o) => (
              <option key={o} value={o}>{o === 'todos' ? 'Todos los estados' : o.charAt(0).toUpperCase() + o.slice(1)}</option>
            ))}
          </select>
          <select
            value={entidad}
            onChange={(e) => handleEntidad(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white max-w-48"
          >
            {ENTIDAD_OPTIONS.map((o) => (
              <option key={o} value={o}>{o === 'todas' ? 'Todas las entidades' : o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Profesional</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">C.I.</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Cargo / Entidad</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Rubro</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Perfil</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Fecha Reg.</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    No se encontraron perfiles con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                paged.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                          {c.nombre[0]}{c.apellido[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{c.nombre} {c.apellido}</p>
                          <p className="text-xs text-gray-400">{c.genero === 'F' ? 'Femenino' : 'Masculino'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{c.ci}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-gray-900">{c.cargo}</p>
                      <p className="text-xs text-gray-400 truncate max-w-48">{c.entidad}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{c.rubro}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{c.perfilAsignado}</span>
                    </td>
                    <td className="px-4 py-3"><Badge value={c.estadoPerfil} /></td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">{c.fechaCreacion}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/profesionales/${c.id}`}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors inline-flex"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    p === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
