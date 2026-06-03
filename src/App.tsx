import { useState, useRef } from 'react'
import { Search, Music2, Radio, Disc3, Mic2, BarChart2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RecentTracks } from '@/components/lastfm/RecentTracks'
import { TopTracks } from '@/components/lastfm/TopTracks'
import { TopAlbums } from '@/components/lastfm/TopAlbums'
import { TopArtists } from '@/components/lastfm/TopArtists'

type Tab = 'recent' | 'top-tracks' | 'top-albums' | 'top-artists'

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'recent', label: 'Recent', icon: <Radio className="h-3.5 w-3.5" /> },
  { id: 'top-tracks', label: 'Top Tracks', icon: <Music2 className="h-3.5 w-3.5" /> },
  { id: 'top-albums', label: 'Top Albums', icon: <Disc3 className="h-3.5 w-3.5" /> },
  { id: 'top-artists', label: 'Top Artists', icon: <Mic2 className="h-3.5 w-3.5" /> },
]

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [activeUsername, setActiveUsername] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('recent')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSearch() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setActiveUsername(trimmed)
    setActiveTab('recent')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-sm tracking-tight">scrobbles</span>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a Last.fm username…"
              className={cn(
                'w-full rounded-lg bg-secondary pl-9 pr-4 py-2 text-sm',
                'text-foreground placeholder:text-muted-foreground',
                'border border-transparent focus:border-primary/40 focus:outline-none',
                'transition-colors font-body'
              )}
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={!inputValue.trim()}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium font-display transition-all',
              'bg-primary text-primary-foreground',
              'hover:bg-primary/90 active:scale-[0.98]',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            Go
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-6">
        {!activeUsername ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 animate-fade-up">
            <div className="rounded-full bg-primary/10 p-5">
              <Music2 className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-lg">Search a username</p>
              <p className="text-sm text-muted-foreground mt-1">
                Enter a Last.fm username to see their listening history
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-up">
            {/* User label */}
            <div className="mb-5 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-display font-semibold text-lg">{activeUsername}</span>
              <a
                href={`https://www.last.fm/user/${activeUsername}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-1"
              >
                ↗ last.fm
              </a>
            </div>

            {/* Tabs */}
            <div className="mb-5 flex gap-1 bg-secondary/60 rounded-lg p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 rounded px-3 py-2',
                    'text-xs font-medium font-body transition-all duration-150',
                    activeTab === tab.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              {activeTab === 'recent' && <RecentTracks username={activeUsername} />}
              {activeTab === 'top-tracks' && <TopTracks username={activeUsername} />}
              {activeTab === 'top-albums' && <TopAlbums username={activeUsername} />}
              {activeTab === 'top-artists' && <TopArtists username={activeUsername} />}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
