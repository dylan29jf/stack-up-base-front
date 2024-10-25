export const generateDynamicQueryString = (
  filterState: {
    [key: string]: any
  },
  hiddenFields?: string[],
): string => {
  // Filtrar los pares clave-valor que no están vacíos o son undefined
  const queryEntries = Object.entries(filterState)

  // Mapear las entradas a un formato de cadena "clave=valor" y unirlas con "&"
  const queryString = queryEntries
    .filter(([key]) => !hiddenFields?.includes(key))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${encodeURIComponent(value.join(','))}`
      }

      return `${key}=${encodeURIComponent(value || '')}`
    })

  const [firstQueryString, ...rest] = queryString

  // Añadir el parámetro fijo typeReport al principio de la cadena
  return `${firstQueryString}&${rest.join('&')}`
}

export const cleanFilterState = (filterState: {
  [key: string]: any
}): { [key: string]: any } => {
  const cleanedState: { [key: string]: any } = {}

  const queryEntries = Object.entries(filterState)

  for (const [key, value] of queryEntries) {
    if (Array.isArray(value)) {
      cleanedState[key] = []
      break
    }

    cleanedState[key] = ''
  }

  return cleanedState
}
