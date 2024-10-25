import { useState, useEffect } from 'react'

/**
 * Hook personalizado para evaluar y rastrear si una consulta de medios (media query) se cumple.
 *
 * @param {string} query - La consulta de medios a evaluar (e.g., '(min-width: 768px)').
 * @returns {boolean} - `true` si la consulta de medios se cumple, `false` en caso contrario.
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 520px)')
 */
function useMediaQuery(query: string): boolean {
  // Estado para almacenar si la consulta se cumple o no
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Función para evaluar la consulta de medios
    const mediaQueryList = window.matchMedia(query)
    const documentChangeHandler = () => setMatches(mediaQueryList.matches)

    // Evaluamos la consulta inicialmente
    documentChangeHandler()

    // Agregamos un listener para detectar cambios en la consulta
    mediaQueryList.addEventListener('change', documentChangeHandler)

    // Limpiamos el listener cuando el componente se desmonta
    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler)
    }
  }, [query]) // Se vuelve a ejecutar si la consulta de medios cambia

  return matches
}

export default useMediaQuery
