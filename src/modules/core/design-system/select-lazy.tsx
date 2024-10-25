import { Select, SelectProps, Spin } from 'antd'
import { useMemo, useRef, useState } from 'react'
import { debounce } from 'lodash'

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>
  debounceTimeout?: number
  minLength?: number
}

/**
 * Componente personalizado de selección con búsqueda asíncrona y debounce.
 *
 * @template ValueType
 * @param {DebounceSelectProps<ValueType>} props - Las propiedades del componente.
 * @param {(search: string) => Promise<ValueType[]>} props.fetchOptions - Función asíncrona para obtener las opciones basadas en la búsqueda.
 * @param {number} [props.debounceTimeout=800] - Tiempo de espera en milisegundos para aplicar debounce a la búsqueda.
 * @returns {JSX.Element} - Componente de selección personalizado.
 */
function SelectLazy<
  ValueType extends {
    key?: string
    label: React.ReactNode
    value: string | number
    name?: string
  } = any,
>({
  fetchOptions,
  debounceTimeout = 800,
  minLength = 3,
  ...props
}: Readonly<DebounceSelectProps<ValueType>>): JSX.Element {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<ValueType[]>([])
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    /**
     * Función interna para cargar las opciones basadas en el valor de búsqueda.
     *
     * @param {string} value - El valor de búsqueda introducido por el usuario.
     */
    const loadOptions = (value: string) => {
      if (value === '' || value.length < minLength) {
        // Si el valor de búsqueda es vacío, limpia las opciones actuales y establece el estado de carga
        setOptions([])
        setFetching(false)
        return
      }
      // Incrementa el valor de fetchRef para identificar la solicitud actual
      fetchRef.current += 1
      const fetchId = fetchRef.current

      // Resetea las opciones actuales y establece el estado de carga
      setOptions([])
      setFetching(true)

      // Llama a la función fetchOptions para obtener nuevas opciones
      fetchOptions(value).then(newOptions => {
        // Verifica si el fetchId coincide con el valor actual de fetchRef
        // Esto asegura que solo se utilicen los resultados de la solicitud más reciente
        if (fetchId !== fetchRef.current) {
          // Si el ID no coincide, se ignora el resultado de esta solicitud
          return
        }

        // Actualiza las opciones con los nuevos datos y desactiva el estado de carga
        setOptions(newOptions)
        setFetching(false)
      })
    }

    // Devuelve la función loadOptions envuelta en un debounce para limitar la frecuencia de ejecución
    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={
        fetching ? <Spin size="small" className="mx-auto" /> : null
      }
      {...props}
      options={options}
    />
  )
}

export default SelectLazy
