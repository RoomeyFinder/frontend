"use client"
import ReactFlagsSelect from "react-flags-select"
import countryCodes from "@/app/_data/country_codes.json"

const CountryCodeInput = ({ 
  onSelect, 
  selected,
  searchable,
  showSelectedLabel,
  showSecondaryLabel,
  showOptionLabel,
  showSecondaryOptionLabel,
  selectedSize,
  optionSize,
  fullWidth,
  alignOptionsToRight,
  id,
  rfsKey,
  disabled,
  selectButtonClassName,
  className,
  placeholder
}: {
  onSelect: (code: string) => void
  selected: string
  searchable?: boolean
  customLabels?: {[x:string]: string | { primary: string, secondary: string }}
  showSelectedLabel?: boolean
  showSecondaryLabel?: boolean
  showOptionLabel?: boolean
  showSecondaryOptionLabel?: boolean
  selectedSize?: number
  optionSize?: number
  fullWidth?: boolean
  alignOptionsToRight?: boolean
  id?: string
  rfsKey?: string
  disabled?: boolean
  className?: string
  selectButtonClassName?: string
  placeholder?: string
}) => {
  return <>
    <ReactFlagsSelect
      placeholder={placeholder}
      countries={Object.keys(countryCodes)}
      customLabels={countryCodes}
      selected={selected}
      onSelect={onSelect}
      searchable={searchable}
      showSelectedLabel={showSelectedLabel}
      showSecondarySelectedLabel={showSecondaryLabel}
      showOptionLabel={showOptionLabel}
      showSecondaryOptionLabel={showSecondaryOptionLabel}
      selectedSize={selectedSize}
      optionsSize={optionSize}
      className={className}
      selectButtonClassName={selectButtonClassName}
      fullWidth={fullWidth}
      alignOptionsToRight={alignOptionsToRight}
      disabled={disabled}
      id={id}
      rfsKey={rfsKey}
    />
  </>
}

export default CountryCodeInput