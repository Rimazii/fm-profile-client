import { useMemo, useState } from 'react'
import { Disc3 } from 'lucide-react'
import { useLastfm } from '@/hooks/useLastfm'
import { fetchTopAlbums } from '@/lib/lastfm.api'
import { TrackRowSkeleton } from '@/components/lastfm/TrackRowSkeleton'
import { PeriodSelector } from '@/components/lastfm/PeriodSelector'
import type { TopAlbumsResponse, Period } from '@/types/lastfm'

function getImage(images: TopAlbumsResponse['topalbums']['album'][0]['image']) {
  return images.find((i) => i.size === 'medium')?.['#text'] || ''
}

interface Props {
  username: string
}

export function TopAlbums({ username }: Props) {
  const [period, setPeriod] = useState<Period>('1month')
  const fetcher = useMemo(() => () => fetchTopAlbums(username, 15, period), [username, period])
  const state = useLastfm<TopAlbumsResponse>(fetcher)

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
          <Disc3 className="h-8 w-8 opacity-40" />
          <p className="text-sm">Failed to load — {state.message}</p>
        </div>
      ) : (
        <div className="divide-y divide-border animate-fade-in">
          {state.data.topalbums.album.map((album) => {
            const img = getImage(album.image)
            return (
              <div
                key={`${album.name}-${album.artist.name}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.03] transition-colors"
              >
                <span className="w-5 shrink-0 text-center text-xs text-muted-foreground font-mono">
                  {album['@attr'].rank}
                </span>
                <div className="h-10 w-10 shrink-0 rounded overflow-hidden bg-secondary">
                  {img ? (
                    <img src={img} alt={album.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <Disc3 className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground leading-tight">{album.name}</p>
                  <p className="truncate text-xs text-muted-foreground mt-0.5">{album.artist.name}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground font-mono">
                  {Number(album.playcount).toLocaleString()} plays
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
