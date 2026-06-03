import { useMemo, useState } from 'react'
import { Mic2 } from 'lucide-react'
import { useLastfm } from '@/hooks/useLastfm'
import { fetchTopArtists } from '@/lib/lastfm.api'
import { TrackRowSkeleton } from '@/components/lastfm/TrackRowSkeleton'
import { PeriodSelector } from '@/components/lastfm/PeriodSelector'
import type { TopArtistsResponse, Period } from '@/types/lastfm'

function getImage(images: TopArtistsResponse['topartists']['artist'][0]['image']) {
  return images.find((i) => i.size === 'medium')?.['#text'] || ''
}

interface Props {
  username: string
}

export function TopArtists({ username }: Props) {
  const [period, setPeriod] = useState<Period>('1month')
  const fetcher = useMemo(() => () => fetchTopArtists(username, 15, period), [username, period])
  const state = useLastfm<TopArtistsResponse>(fetcher)

  return (
    <div>
      <div className="px-4 pb-4">
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      {state.status === 'loading' || state.status === 'idle' ? (
        <div className="divide-y divide-border">
          {Array.from({ length: 10 }).map((_, i) => <TrackRowSkeleton key={i} />)}
        </div>
      ) : state.status === 'error' ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
          <Mic2 className="h-8 w-8 opacity-40" />
          <p className="text-sm">Failed to load — {state.message}</p>
        </div>
      ) : (
        <div className="divide-y divide-border animate-fade-in">
          {state.data.topartists.artist.map((artist) => {
            const img = getImage(artist.image)
            return (
              <div
                key={artist.name}
                className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.03] transition-colors"
              >
                <span className="w-5 shrink-0 text-center text-xs text-muted-foreground font-mono">
                  {artist['@attr'].rank}
                </span>
                <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden bg-secondary">
                  {img ? (
                    <img src={img} alt={artist.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <Mic2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{artist.name}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground font-mono">
                  {Number(artist.playcount).toLocaleString()} plays
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
