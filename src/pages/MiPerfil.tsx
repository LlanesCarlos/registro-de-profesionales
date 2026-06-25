import { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { profesionales } from '../data/mockData'

const c = profesionales[0]

const tabs = ['Personal', 'Académica', 'Idiomas', 'Experiencia', 'Patrimonial', 'Documentos']

const nivelOptions = ['básico', 'intermedio', 'avanzado', 'nativo']

const docs = [
  { nombre: 'Cédula de Identidad', estado: 'verificado', fecha: '2023-03-10' },
  { nombre: 'Título Universitario', estado: 'verificado', fecha: '2023-03-10' },
  { nombre: 'Declaración Jurada de Bienes', estado: 'pendiente', fecha: '2024-01-05' },
  { nombre: 'Certificado de Antecedentes', estado: 'vencido', fecha: '2022-12-01' },
  { nombre: 'Acto Administrativo de Designación', estado: 'verificado', fecha: '2023-03-15' },
]

const docColors: Record<string, string> = {
  verificado: 'text-emerald-600 bg-emerald-50 ring-emerald-200',
  pendiente: 'text-amber-600 bg-amber-50 ring-amber-200',
  vencido: 'text-red-600 bg-red-50 ring-red-200',
}

const completeness = 82

export default function MiPerfil() {
  const [tab, setTab] = useState(0)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-4xl space-y-5">
      {/* Profile hero */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              AM
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{c.nombre} {c.apellido}</h2>
              <p className="text-gray-500 text-sm">{c.cargo} · {c.entidad}</p>
              <p className="text-xs text-gray-400 mt-1">C.I. {c.ci} · Perfil: <span className="text-blue-600 font-medium">{c.perfilAsignado}</span></p>
            </div>
          </div>
          {saved && (
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg ring-1 ring-emerald-200 animate-pulse">
              <CheckCircle className="w-4 h-4" /> Cambios guardados
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 font-medium">Completitud del perfil</span>
            <span className="font-bold text-blue-600">{completeness}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: `${completeness}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">Complete todas las secciones para activar su perfil profesional.</p>
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
                tab === i ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Personal */}
          {tab === 0 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Nombres', value: c.nombre, type: 'text' },
                  { label: 'Apellidos', value: c.apellido, type: 'text' },
                  { label: 'C.I. / Documento', value: c.ci, type: 'text' },
                  { label: 'Género', value: c.genero === 'F' ? 'Femenino' : 'Masculino', type: 'text' },
                  { label: 'Email personal', value: c.email, type: 'email' },
                  { label: 'Email laboral', value: c.emailLaboral, type: 'email' },
                  { label: 'Celular', value: c.celular, type: 'text' },
                  { label: 'Teléfono', value: c.telefono, type: 'text' },
                  { label: 'Rubro', value: c.rubro, type: 'text' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      defaultValue={f.value}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Dirección laboral</label>
                  <input defaultValue={c.direccionLaboral} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Dirección particular</label>
                  <input defaultValue={c.direccionParticular} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  <Save className="w-4 h-4" /> Guardar cambios
                </button>
              </div>
            </div>
          )}

          {/* Académica */}
          {tab === 1 && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Nivel de Estudio', 'Institución', 'Especialidad', 'Año finalización', 'Estado'].map((h) => (
                        <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {c.estudios.map((e) => (
                      <tr key={e.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-medium text-gray-900">{e.nivelEstudio}</td>
                        <td className="py-3 px-3 text-gray-600">{e.institucion}</td>
                        <td className="py-3 px-3 text-gray-600">{e.especialidad}</td>
                        <td className="py-3 px-3 text-gray-600">{e.anioFinalizacion}</td>
                        <td className="py-3 px-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${e.completado ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                            {e.completado ? 'Completado' : 'En curso'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end pt-1">
                <button className="px-4 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  + Agregar Estudio
                </button>
              </div>
            </div>
          )}

          {/* Idiomas */}
          {tab === 2 && (
            <div className="space-y-4">
              {c.idiomas.map((i) => (
                <div key={i.id} className="flex flex-wrap gap-4 p-4 border border-gray-100 rounded-xl items-center">
                  <div className="flex-1 min-w-32">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Idioma</p>
                    <p className="font-semibold text-gray-900">{i.idioma}</p>
                  </div>
                  <div className="flex-1 min-w-32">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Nivel Oral</p>
                    <select defaultValue={i.nivelOral} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize bg-white">
                      {nivelOptions.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 min-w-32">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Nivel Escrito</p>
                    <select defaultValue={i.nivelEscrito} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize bg-white">
                      {nivelOptions.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-1">
                <button className="px-4 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  + Agregar Idioma
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  <Save className="w-4 h-4" /> Guardar
                </button>
              </div>
            </div>
          )}

          {/* Experiencia */}
          {tab === 3 && (
            <div className="space-y-3">
              {c.experiencias.map((ex) => (
                <div key={ex.id} className="p-4 border border-gray-100 rounded-xl hover:border-blue-100 transition-colors">
                  <div className="flex flex-wrap gap-2 items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{ex.cargo}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{ex.institucion} · Sector {ex.sector}</p>
                      <p className="text-xs text-gray-400 mt-1">{ex.fechaInicio} — {ex.actual ? 'Presente' : ex.fechaFin}</p>
                    </div>
                    {ex.actual && (
                      <span className="text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-200 px-2.5 py-0.5 rounded-full">Actual</span>
                    )}
                  </div>
                </div>
              ))}
              <button className="px-4 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                + Agregar Experiencia
              </button>
            </div>
          )}

          {/* Patrimonial */}
          {tab === 4 && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Tipo', 'Descripción', 'Valor', 'Moneda'].map((h) => (
                        <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {c.patrimonial.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-3">
                          <span className={`text-xs font-semibold capitalize px-2 py-0.5 rounded-md ${p.tipo === 'activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{p.tipo}</span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-700">{p.descripcion}</td>
                        <td className="py-2.5 px-3 font-mono font-semibold text-gray-900">{p.valor.toLocaleString('es-PY')}</td>
                        <td className="py-2.5 px-3 text-gray-500 text-xs">{p.moneda}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="px-4 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                + Agregar Declaración
              </button>
            </div>
          )}

          {/* Documentos */}
          {tab === 5 && (
            <div className="space-y-3">
              {docs.map((d) => (
                <div key={d.nombre} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{d.nombre}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Cargado: {d.fecha}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold capitalize px-2.5 py-0.5 rounded-full ring-1 ${docColors[d.estado]}`}>{d.estado}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      {d.estado === 'vencido' ? 'Renovar' : 'Ver'}
                    </button>
                  </div>
                </div>
              ))}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-300 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-gray-500">Arrastra un archivo o haz clic para cargar</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG · Máx. 5 MB</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
