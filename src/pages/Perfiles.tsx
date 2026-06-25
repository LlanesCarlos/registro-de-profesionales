import { useState } from 'react'
import { Plus, ChevronDown, ChevronRight, Users } from 'lucide-react'
import Badge from '../components/ui/Badge'
import PageHeader from '../components/ui/PageHeader'
import { perfiles } from '../data/mockData'

export default function Perfiles() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const toggle = (id: string) => setExpanded((e) => (e === id ? null : id))

  return (
    <div>
      <PageHeader
        title="Perfiles de Acceso"
        subtitle="Gestión de roles y permisos del sistema"
        action={
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" /> Nuevo Perfil
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        {perfiles.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs font-semibold text-gray-600 leading-tight">{p.nombre}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{p.cantidadUsuarios}</p>
            <p className="text-xs text-gray-400">usuarios</p>
          </div>
        ))}
      </div>

      {/* Table / accordion */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50 grid grid-cols-12 gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-4">Perfil</div>
          <div className="col-span-3 hidden md:block">Descripción</div>
          <div className="col-span-2 hidden lg:block">Usuarios</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-1" />
        </div>

        <div className="divide-y divide-gray-50">
          {perfiles.map((p) => (
            <div key={p.id}>
              <button
                onClick={() => toggle(p.id)}
                className="w-full grid grid-cols-12 gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left items-center"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                    {p.nombre[0]}
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">{p.nombre}</span>
                </div>
                <div className="col-span-3 hidden md:block text-sm text-gray-500 truncate">{p.descripcion}</div>
                <div className="col-span-2 hidden lg:block">
                  <span className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Users className="w-3.5 h-3.5 text-gray-400" /> {p.cantidadUsuarios}
                  </span>
                </div>
                <div className="col-span-2">
                  <Badge value={p.activo ? 'activo' : 'inactivo'} />
                </div>
                <div className="col-span-1 flex justify-end">
                  {expanded === p.id ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {expanded === p.id && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4 bg-gray-50/50">
                  <p className="text-sm text-gray-600 mb-3">{p.descripcion}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Roles asignados</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.roles.map((r) => (
                      <span key={r} className="text-xs font-mono bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md">{r}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 bg-white rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">Editar</button>
                    <button className="px-3 py-1.5 text-xs font-medium border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors bg-white">Gestionar roles</button>
                    <button className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ml-auto bg-white ${p.activo ? 'border border-red-200 text-red-600 hover:bg-red-50' : 'border border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}>
                      {p.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
