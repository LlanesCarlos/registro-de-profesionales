import type { LucideIcon } from 'lucide-react'

interface Props {
  label: string
  value: string | number
  icon: LucideIcon
  color: 'blue' | 'emerald' | 'amber' | 'violet'
  trend?: string
}

const colors = {
  blue:    { bg: 'bg-blue-50',    icon: 'bg-blue-600',    text: 'text-blue-600' },
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-600', text: 'text-emerald-600' },
  amber:   { bg: 'bg-amber-50',   icon: 'bg-amber-500',   text: 'text-amber-600' },
  violet:  { bg: 'bg-violet-50',  icon: 'bg-violet-600',  text: 'text-violet-600' },
}

export default function StatCard({ label, value, icon: Icon, color, trend }: Props) {
  const c = colors[color]
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {trend && <p className="text-xs text-gray-400 mt-1">{trend}</p>}
      </div>
      <div className={`${c.bg} p-3 rounded-xl`}>
        <Icon className={`w-6 h-6 ${c.text}`} />
      </div>
    </div>
  )
}
