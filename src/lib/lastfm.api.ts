import type {
  RecentTracksResponse,
  TopTracksResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
  Period,
} from '@/types/lastfm'

const BASE_URL = '/api'

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json() as Promise<T>
}

export function fetchRecentTracks(username: string, limit = 15) {
  return apiFetch<RecentTracksResponse>(
    `/recent-tracks/${encodeURIComponent(username)}?limit=${limit}`
  )
}

export function fetchTopTracks(username: string, limit = 15, period: Period = '1month') {
  return apiFetch<TopTracksResponse>(
    `/top-tracks/${encodeURIComponent(username)}?limit=${limit}&period=${period}`
  )
}

export function fetchTopAlbums(username: string, limit = 15, period: Period = '1month') {
  return apiFetch<TopAlbumsResponse>(
    `/top-albums/${encodeURIComponent(username)}?limit=${limit}&period=${period}`
  )
}

export function fetchTopArtists(username: string, limit = 15, period: Period = '1month') {
  return apiFetch<TopArtistsResponse>(
    `/top-artists/${encodeURIComponent(username)}?limit=${limit}&period=${period}`
  )
}
