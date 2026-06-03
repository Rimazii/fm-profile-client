import { useMemo } from 'react'
import { Music, Radio } from 'lucide-react'
import { useLastfm } from '@/hooks/useLastfm'
import { fetchRecentTracks } from '@/lib/lastfm.api'
import { TrackRowSkeleton } from '@/components/lastfm/TrackRowSkeleton'
import type { RecentTracksResponse } from '@/types/lastfm'

function getImage(images: RecentTracksResponse['recenttracks']['track'][0]['image']) {
  return images.find((i) => i.size === 'medium')?.['#text'] || ''
}

interface Props {
  username: string
}

export function RecentTracks({ username }: Props) {
  const fetcher = useMemo(() => () => fetchRecentTracks(username), [username])
  const state = useLastfm<RecentTracksResponse>(fetcher)

  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <div className="divide-y divide-border">
        {Array.from({ length: 10 }).map((_, i) => (
          <TrackRowSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
        <Music className="h-8 w-8 opacity-40" />
        <p className="text-sm">Failed to load tracks — {state.message}</p>
      </div>
    )
  }

  const tracks = state.data.recenttracks.track

  return (
    <div className="divide-y divide-border animate-fade-in">
      {tracks.map((track, i) => {
        const isNowPlaying = !!track['@attr']?.nowplaying
        const img = getImage(track.image)

        return (
          <div
            key={`${track.name}-${i}`}
            className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.03] transition-colors group"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            {/* index / now playing */}
            <span className="w-5 shrink-0 text-center">
              {isNowPlaying ? (
                <Radio className="h-3.5 w-3.5 text-primary animate-pulse" />
              ) : (
                <span className="text-xs text-muted-foreground font-mono">{i + 1}</span>
              )}
            </span>

            {/* artwork */}
            <div className="h-10 w-10 shrink-0 rounded overflow-hidden bg-secondary">
              {img ? (
                <img src={img} alt={track.album['#text']} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Music className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* info */}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground leading-tight">
                {track.name}
              </p>
              <p className="truncate text-xs text-muted-foreground mt-0.5">
                {track.artist.name}
              </p>
            </div>

            {/* timestamp / now playing badge */}
            {isNowPlaying ? (
              <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary font-mono">
                NOW
              </span>
            ) : track.date ? (
              <span className="shrink-0 text-[11px] text-muted-foreground font-mono">
                {track.date['#text'].split(',')[0]}
              </span>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
