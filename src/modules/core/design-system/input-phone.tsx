import { Input, Space } from 'antd'
import SelectCountryFlags from './select-country-flags'
import { useEffect, useState } from 'react'

import {
  formatPhoneNumberIntl,
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input'
import { onlyNumbers } from '../utils'

/**
 * Parsea y formatea un número de teléfono con un código de marcación internacional.
 *
 * @template T
 * @param {keyof T} phoneField - La clave en el objeto `values` que corresponde al número de teléfono.
 * @param {keyof T} ladaField - La clave en el objeto `values` que corresponde al código de marcación internacional (lada).
 * @param {T} values - El objeto que contiene el número de teléfono y el código de marcación internacional.
 * @returns {string} - El número de teléfono internacional formateado, o una cadena vacía si no se proporciona el número de teléfono o el código de marcación.
 *
 * @example
 * // Suponiendo que el objeto values es:
 * const values = {
 *   phone: '1234567890',
 *   lada: '52'
 * };
 *
 * const numeroFormateado = parseNumberPhone('phone', 'lada', values);
 * console.log(numeroFormateado); // +52 123 456 7890
 *
 * @example
 * // Con una estructura de objeto diferente:
 * const infoContacto = {
 *   numeroTelefono: '9876543210',
 *   codigoMarcacion: '44'
 * };
 *
 * const numeroFormateado = parseNumberPhone('numeroTelefono', 'codigoMarcacion', infoContacto);
 * console.log(numeroFormateado); // +44 987 654 3210
 */
export function parseNumberPhone<T>(
  phoneField: keyof T,
  ladaField: keyof T,
  values: T,
): string {
  const phoneNumber = values[phoneField] as string
  const lada = values[ladaField] as string

  if (!phoneNumber || !lada) {
    return ''
  }

  if (isPossiblePhoneNumber(`${lada} ${phoneNumber}`)) {
    return formatPhoneNumberIntl(`+${lada} ${phoneNumber}`)
  } else {
    return `+${lada} ${phoneNumber}`
  }
}

/**
 * Extrae el código de país y el número de teléfono de una cadena que contiene ambos.
 *
 * Esta función valida si el número de teléfono es posible y, de ser así, lo analiza
 * para extraer el código de país y el número de teléfono. Si no se puede analizar,
 * intenta separar manualmente el código de país del número de teléfono.
 *
 * @param {string} phone - La cadena que contiene el número de teléfono con el código de país.
 * @returns {{ countryCode: string; cellPhone: string }} Un objeto con el código de país y el número de teléfono.
 *
 * @example
 * // Devuelve { countryCode: "US", cellPhone: "2025550123" }
 * getPhoneNumberWithCountryCode("+1 202 555 0123");
 *
 * @example
 * // Devuelve { countryCode: "", cellPhone: "1234567890" }
 * getPhoneNumberWithCountryCode("1234567890");
 */
export const getPhoneNumberWithCountryCode = (
  phone: string,
): { countryCode: string; cellPhone: string } => {
  function getPhone(phone: string) {
    const countryCode = phone.split(' ')[0].replace('+', '')
    const cellPhone = phone.split(' ').splice(1).join('')
    return { countryCode, cellPhone }
  }

  if (isPossiblePhoneNumber(phone)) {
    const phoneNumber = parsePhoneNumber(phone)

    if (phoneNumber) {
      const countryCode = phoneNumber.country?.replace('+', '')
      const cellPhone = phoneNumber.nationalNumber
      return { countryCode: countryCode ?? '', cellPhone }
    } else {
      return getPhone(phone)
    }
  } else {
    return getPhone(phone)
  }
}

/**
 * Obtiene el país asociado a un código de llamada internacional.
 *
 * Esta función recorre la lista de países disponibles y devuelve el país correspondiente
 * al código de llamada proporcionado.
 *
 * @param {string} code - El código de llamada internacional (incluyendo el '+' inicial).
 * @returns {string | undefined} El país asociado al código de llamada, o `undefined` si no se encuentra.
 *
 * @example
 * // Devuelve "US"
 * getCountryByCallingCode("+1");
 *
 * @example
 * // Devuelve undefined
 * getCountryByCallingCode("+999");
 */
export const getCountryByCallingCode = (code: string): string | undefined => {
  const countries = getCountries()
  for (const country of countries) {
    if (`+${getCountryCallingCode(country)}` === code) {
      return country
    }
  }
  return undefined
}

/**
 * Analiza un número de teléfono para extraer el código de país y el número de teléfono.
 *
 * Esta función intenta parsear un número de teléfono y, si es posible, extrae el código de país y el número.
 * Si no puede parsear el número, intenta separarlos manualmente. Devuelve 'MX' como código de país por defecto si no se puede determinar.
 *
 * @param {string} phone - El número de teléfono a analizar.
 * @returns {{ countryCode: string; phoneNumber: string }} Un objeto con el código de país y el número de teléfono.
 *
 * @example
 * // Devuelve { countryCode: "US", phoneNumber: "2025550123" }
 * getPhoneAndCountryCode("+1 202 555 0123");
 *
 * @example
 * // Devuelve { countryCode: "MX", phoneNumber: "1234567890" }
 * getPhoneAndCountryCode("1234567890");
 */
const getPhoneAndCountryCode = (
  phone: string,
): { countryCode: string; phoneNumber: string } => {
  let countryCode = 'MX'
  let phoneNumber = phone

  try {
    const parsedNumber = parsePhoneNumber(phone)
    if (parsedNumber) {
      countryCode = parsedNumber.country || 'MX'
      phoneNumber = parsedNumber.nationalNumber || phone
    } else {
      const parts = phone.split(' ')
      if (parts.length > 1) {
        const possibleCode = parts[0]
        countryCode = getCountryByCallingCode(possibleCode) || 'MX'
        phoneNumber = parts.slice(1).join(' ')
      }
    }
  } catch (error) {
    const parts = phone.split(' ')
    if (parts.length > 1) {
      const possibleCode = parts[0]
      countryCode = getCountryByCallingCode(possibleCode) || 'MX'
      phoneNumber = parts.slice(1).join(' ')
    }
  }

  return { countryCode, phoneNumber }
}

interface InputPhoneProps {
  initialValue?: string
  disabled?: boolean
  onChange?: (value: string) => void
  isOnlyNumbers?: boolean
  readOnly?: boolean
}

const InputPhone: React.FC<InputPhoneProps> = ({
  disabled,
  onChange,
  initialValue,
  isOnlyNumbers = true,
  readOnly = false,
}) => {
  const [country, setCountry] = useState<string>('MX')
  const [cellPhone, setCellPhone] = useState<string>('')

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialValue && !initialized) {
      const { countryCode, phoneNumber } = getPhoneAndCountryCode(initialValue)
      setCountry(countryCode)
      setCellPhone(phoneNumber)
      setInitialized(true)
    }
  }, [initialValue, initialized])

  const handleChange = (type: 'select' | 'input', value: string) => {
    if (type === 'select') {
      let countryCode = typeof value === 'object' ? (value as any).value : value

      setCountry(countryCode)

      countryCode = `+${getCountryCallingCode(countryCode)}`

      onChange?.(`${countryCode} ${cellPhone}`)
    }

    if (type === 'input') {
      setCellPhone(value)

      const countryCode = `+${getCountryCallingCode(country as any)}`

      onChange?.(`${countryCode} ${value}`)
    }
  }

  return (
    <Space.Compact block>
      <SelectCountryFlags
        value={country}
        onChange={(value: any) => {
          handleChange('select', value)
        }}
        disabled={disabled}
      />
      <Input
        name="cellPhone"
        disabled={disabled}
        onChange={e => {
          handleChange('input', e.target.value)
        }}
        value={cellPhone}
        maxLength={250}
        onKeyDown={isOnlyNumbers ? onlyNumbers : () => {}}
        readOnly={readOnly}
      />
    </Space.Compact>
  )
}

export { InputPhone }
