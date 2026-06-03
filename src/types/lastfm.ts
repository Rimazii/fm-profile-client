export type Period = '7day' | '1month' | '3month' | '6month' | '12month' | 'overall'

export interface LastfmImage {
  '#text': string
  size: 'small' | 'medium' | 'large' | 'extralarge'
}

export interface LastfmArtistRef {
  name: string
  mbid?: string
  url: string
}

// Recent Tracks
export interface RecentTrack {
  name: string
  mbid?: string
  url: string
  artist: LastfmArtistRef
  album: { '#text': string; mbid?: string }
  image: LastfmImage[]
  date?: { uts: string; '#text': string }
  '@attr'?: { nowplaying: string }
}

export interface RecentTracksResponse {
  recenttracks: {
    track: RecentTrack[]
    '@attr': { user: string; totalPages: string; total: string }
  }
}

// Top Tracks
export interface TopTrack {
  name: string
  mbid?: string
  url: string
  playcount: string
  artist: LastfmArtistRef
  image: LastfmImage[]
  '@attr': { rank: string }
}

export interface TopTracksResponse {
  toptracks: {
    track: TopTrack[]
    '@attr': { user: string; total: string }
  }
}

// Top Albums
export interface TopAlbum {
  name: string
  mbid?: string
  url: string
  playcount: string
  artist: LastfmArtistRef
  image: LastfmImage[]
  '@attr': { rank: string }
}

export interface TopAlbumsResponse {
  topalbums: {
    album: TopAlbum[]
    '@attr': { user: string; total: string }
  }
}

// Top Artists
export interface TopArtist {
  name: string
  mbid?: string
  url: string
  playcount: string
  image: LastfmImage[]
  '@attr': { rank: string }
}

export interface TopArtistsResponse {
  topartists: {
    artist: TopArtist[]
    '@attr': { user: string; total: string }
  }
}
