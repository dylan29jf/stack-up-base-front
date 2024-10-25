import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook personalizado para obtener y manejar los parámetros de consulta (query parameters) de la URL.
 *
 * @returns {URLSearchParams} - Una instancia de `URLSearchParams` que permite acceder a los parámetros de consulta de la URL.
 * 
 * @example
 * const searchParams = useQuery()
 * const id = searchParams.get('id')
 */
const useQuery = (): URLSearchParams => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export default useQuery
