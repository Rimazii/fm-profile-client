import { useState, useEffect, useCallback } from 'react'

type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

export function useLastfm<T>(
  fetcher: (() => Promise<T>) | null
): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({ status: 'idle' })

  const run = useCallback(() => {
    if (!fetcher) return
    setState({ status: 'loading' })
    fetcher()
      .then((data) => setState({ status: 'success', data }))
      .catch((err: unknown) =>
        setState({
          status: 'error',
          message: err instanceof Error ? err.message : 'Unknown error',
        })
      )
  }, [fetcher])

  useEffect(() => {
    run()
  }, [run])

  return { ...state, refetch: run }
}
