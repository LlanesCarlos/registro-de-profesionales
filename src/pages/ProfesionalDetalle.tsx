import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Mail, Phone, MapPin, Building2, Edit, Download, CheckCircle, XCircle } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { profesionales } from '../data/mockData'

const tabs = ['Personal', 'Académica', 'Idiomas', 'Experiencia', 'Patrimonial']

export default function ProfesionalDetalle() {
  const { id } = useParams<{ id: string }>()
  const c = profesionales.find((x) => x.id === id)
  const [tab, setTab] = useState(0)

  if (!c) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <p className="text-lg font-medium">Perfil no encontrado</p>
        <Link to="/profesionales" className="mt-3 text-blue-600 hover:underline text-sm">← Volver a la lista</Link>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link to="/profesionales" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver a Profesionales
      </Link>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap gap-4 items-start justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {c.nombre[0]}{c.apellido[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{c.nombre} {c.apellido}</h2>
              <p className="text-gray-500 text-sm">{c.cargo}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge value={c.estadoPerfil} />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                  {c.perfilAsignado}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {c.tipoVinculo}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
              <Download className="w-4 h-4" /> Exportar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              <Edit className="w-4 h-4" /> Editar
            </button>
          </div>
        </div>

        {/* Quick info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100">
          <div className="flex gap-2.5">
            <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Email personal</p>
              <p className="text-sm text-gray-700 break-all">{c.email}</p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Celular</p>
              <p className="text-sm text-gray-700">{c.celular}</p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Rubro</p>
              <p className="text-sm text-gray-700">{c.rubro}</p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Building2 className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Entidad</p>
              <p className="text-sm text-gray-700">{c.entidad}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100 px-4 flex gap-1 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === i
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="p-5">
          {tab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                ['C.I. / Documento', c.ci],
                ['Género', c.genero === 'F' ? 'Femenino' : 'Masculino'],
                ['Email personal', c.email],
                ['Email laboral', c.emailLaboral],
                ['Celular', c.celular],
                ['Teléfono', c.telefono || '—'],
                ['Rubro', c.rubro],
                ['Dirección laboral', c.direccionLaboral],
                ['Dirección particular', c.direccionParticular],
                ['Tipo de vínculo', c.tipoVinculo],
                ['Fecha de asignación', c.fechaAsignacion],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-gray-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 1 && (
            <div className="overflow-x-auto">
              {c.estudios.length === 0 ? (
                <p className="text-gray-400 text-sm">Sin estudios registrados.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Nivel</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Institución</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Especialidad</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Año</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {c.estudios.map((e) => (
                      <tr key={e.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-medium text-gray-900">{e.nivelEstudio}</td>
                        <td className="py-2.5 px-3 text-gray-600">{e.institucion}</td>
                        <td className="py-2.5 px-3 text-gray-600">{e.especialidad}</td>
                        <td className="py-2.5 px-3 text-gray-600">{e.anioFinalizacion}</td>
                        <td className="py-2.5 px-3">
                          {e.completado
                            ? <span className="flex items-center gap-1 text-emerald-600 text-xs"><CheckCircle className="w-3.5 h-3.5" /> Completo</span>
                            : <span className="flex items-center gap-1 text-amber-600 text-xs"><XCircle className="w-3.5 h-3.5" /> En curso</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === 2 && (
            <div className="overflow-x-auto">
              {c.idiomas.length === 0 ? (
                <p className="text-gray-400 text-sm">Sin idiomas registrados.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Idioma</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Nivel Oral</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Nivel Escrito</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {c.idiomas.map((i) => (
                      <tr key={i.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-medium text-gray-900">{i.idioma}</td>
                        <td className="py-2.5 px-3 capitalize text-gray-600">{i.nivelOral}</td>
                        <td className="py-2.5 px-3 capitalize text-gray-600">{i.nivelEscrito}</td>
                        <td className="py-2.5 px-3">
                          <Badge value={i.activo ? 'activo' : 'inactivo'} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === 3 && (
            <div className="space-y-3">
              {c.experiencias.length === 0 ? (
                <p className="text-gray-400 text-sm">Sin experiencia registrada.</p>
              ) : c.experiencias.map((ex) => (
                <div key={ex.id} className="p-4 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                  <div className="flex flex-wrap gap-2 items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{ex.cargo}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{ex.institucion}</p>
                      <p className="text-xs text-gray-400 mt-1">Sector {ex.sector} · {ex.fechaInicio} — {ex.actual ? 'Presente' : ex.fechaFin}</p>
                    </div>
                    {ex.actual && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                        Actual
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 4 && (
            <div className="overflow-x-auto">
              {c.patrimonial.length === 0 ? (
                <p className="text-gray-400 text-sm">Sin declaración patrimonial registrada.</p>
              ) : (
                <>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Descripción</th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Valor</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Moneda</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {c.patrimonial.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="py-2.5 px-3">
                            <span className={`text-xs font-semibold capitalize px-2 py-0.5 rounded-md ${p.tipo === 'activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                              {p.tipo}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-gray-700">{p.descripcion}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-semibold text-gray-900">
                            {p.valor.toLocaleString('es')}
                          </td>
                          <td className="py-2.5 px-3 text-gray-500 text-xs">{p.moneda}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end gap-6 text-sm">
                    <span className="text-gray-500">Total Activos: <span className="font-semibold text-emerald-600">
                      {c.patrimonial.filter(p => p.tipo === 'activo').reduce((s, p) => s + p.valor, 0).toLocaleString('es')}
                    </span></span>
                    <span className="text-gray-500">Total Pasivos: <span className="font-semibold text-red-600">
                      {c.patrimonial.filter(p => p.tipo === 'pasivo').reduce((s, p) => s + p.valor, 0).toLocaleString('es')}
                    </span></span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
