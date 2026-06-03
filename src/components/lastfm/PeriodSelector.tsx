import { cn } from '@/lib/utils'
import type { Period } from '@/types/lastfm'

const PERIODS: { value: Period; label: string }[] = [
  { value: '7day', label: '7 days' },
  { value: '1month', label: '1 month' },
  { value: '3month', label: '3 months' },
  { value: '6month', label: '6 months' },
  { value: '12month', label: '12 months' },
  { value: 'overall', label: 'All time' },
]

interface PeriodSelectorProps {
  value: Period
  onChange: (p: Period) => void
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={cn(
            'rounded px-3 py-1 text-xs font-body font-medium transition-all duration-150',
            value === p.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
