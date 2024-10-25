import { Select } from 'antd'
import { CountryCode } from 'node_modules/libphonenumber-js/types'
import React, { useEffect } from 'react'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'

import en from 'react-phone-number-input/locale/en'
import es from 'react-phone-number-input/locale/es'
import pt from 'react-phone-number-input/locale/pt'
import FlagComponent from './flag'

import { useLanguageStore } from '../zustand'
import { filterOption } from '../utils'

interface ISelectCountryFlagsProps {
  value: string
  onChange: (
    value: string,
    option:
      | {
          label: any
          value: CountryCode
        }
      | {
          label: any
          value: CountryCode
        }[],
  ) => void
  disabled?: boolean
}

const SelectCountryFlags: React.FC<ISelectCountryFlagsProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [locale, setLocale] = React.useState<any>(en)

  const { language } = useLanguageStore()

  useEffect(() => {
    switch (language) {
      case 'es':
        setLocale(es)
        break
      case 'pt':
        setLocale(pt)
        break
      default:
        setLocale(en)
        break
    }
  }, [language])

  return (
    <Select
      className="max-w-[110px] w-full"
      disabled={disabled}
      showSearch
      labelInValue
      filterOption={filterOption}
      popupMatchSelectWidth={false}
      options={getCountries()
        .filter(x => x)
        .map(x => ({ label: locale[x], value: x }))
        .sort((a, b) => a.label.localeCompare(b.label))}
      onChange={onChange}
      optionRender={option => {
        return (
          <div
            key={option.value}
            role="listitem"
            className="relative flex items-center gap-2 text-sm">
            <FlagComponent
              country={option.data.value}
              countryName={option.data.label}
            />
            <span className="flex-1 text-sm">{option.label}</span>
            {option.value && (
              <span className="text-foreground/50 text-sm">
                {`+${getCountryCallingCode(option.data.value)}`}
              </span>
            )}
          </div>
        )
      }}
      labelRender={props => {
        if (!props.value) return null

        return (
          <span className="text-sm flex items-center justify-start gap-x-2">
            <FlagComponent
              country={props.value as any}
              countryName={props.value as any}
            />
            {`+${getCountryCallingCode(props.value as any)}`}
          </span>
        )
      }}
      value={value}
    />
  )
}
export default SelectCountryFlags
