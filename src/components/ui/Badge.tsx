type Variant = 'activo' | 'inactivo' | 'pendiente' | 'suspendido' | 'aprobado' | 'enviado' | 'devuelto' | 'rechazado' | 'borrador' | 'email' | 'alerta' | 'recordatorio' | 'default'

const styles: Record<Variant, string> = {
  activo:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  aprobado:   'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  inactivo:   'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  borrador:   'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  pendiente:  'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  enviado:    'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  suspendido: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  rechazado:  'bg-red-50 text-red-700 ring-1 ring-red-200',
  devuelto:   'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  email:      'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  alerta:     'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  recordatorio: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  default:    'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
}

const labels: Record<string, string> = {
  activo: 'Activo', inactivo: 'Inactivo', pendiente: 'Pendiente', suspendido: 'Suspendido',
  aprobado: 'Aprobado', enviado: 'Enviado', devuelto: 'Devuelto', rechazado: 'Rechazado',
  borrador: 'Borrador', email: 'Email', alerta: 'Alerta', recordatorio: 'Recordatorio',
}

interface Props {
  value: string
  label?: string
}

export default function Badge({ value, label }: Props) {
  const cls = styles[value as Variant] ?? styles.default
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}>
      {label ?? labels[value] ?? value}
    </span>
  )
}
