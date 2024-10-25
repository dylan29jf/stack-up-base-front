import React from 'react'
import { FlagProps } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

const FlagComponent: React.FC<FlagProps> = ({ country, countryName }) => {
  const Flag = flags[country]

  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm flex-shrink-0">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

export default FlagComponent
