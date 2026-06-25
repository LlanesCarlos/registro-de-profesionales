import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus, Search } from 'lucide-react'
import Badge from '../components/ui/Badge'
import PageHeader from '../components/ui/PageHeader'
import { competencias } from '../data/mockData'

const modalityColor: Record<string, string> = {
  presencial: 'bg-violet-50 text-violet-700',
  virtual: 'bg-sky-50 text-sky-700',
  híbrido: 'bg-teal-50 text-teal-700',
}

export default function Competencias() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = competencias.filter(
    (c) =>
      !search ||
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.descripcion.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (id: string) => setExpanded((e) => (e === id ? null : id))

  return (
    <div>
      <PageHeader
        title="Competencias"
        subtitle="Gestión de competencias y cursos asociados"
        action={
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" /> Nueva Competencia
          </button>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar competencia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((comp) => (
          <div key={comp.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => toggle(comp.id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-bold shrink-0">
                  {comp.id}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900">{comp.nombre}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate max-w-lg">{comp.descripcion}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-xs text-gray-500">{comp.cursos.length} curso{comp.cursos.length !== 1 ? 's' : ''}</span>
                <Badge value={comp.activo ? 'activo' : 'inactivo'} />
                {expanded === comp.id ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            {expanded === comp.id && (
              <div className="border-t border-gray-100 px-5 pb-5">
                <p className="text-sm text-gray-600 mt-4 mb-3">{comp.descripcion}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Cursos Asociados</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {comp.cursos.map((curso) => (
                    <div key={curso.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{curso.nombre}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{curso.duracion}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md shrink-0 ml-2 ${modalityColor[curso.modalidad]}`}>
                        {curso.modalidad}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">Editar</button>
                  <button className="px-3 py-1.5 text-xs font-medium border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">+ Agregar Curso</button>
                  <button className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ml-auto ${comp.activo ? 'border border-red-200 text-red-600 hover:bg-red-50' : 'border border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}>
                    {comp.activo ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
