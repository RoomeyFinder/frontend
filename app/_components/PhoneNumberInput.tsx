import {
  InputGroup,
  InputLeftAddon,
  Input,
  InputProps,
  BoxProps,
} from "@chakra-ui/react"
import CountryCodeInput from "@/app/_components/CountryCodeInput"
import countryCodes from "@/app/_data/country_codes.json"
import { useState } from "react"

export default function PhoneNumberInput({
  errorProps = {},
  handleCountryCodeChange,
  handlePhoneNumberChange,
  phoneNumber,
  inputVariant,
  isDisabled,
}: {
  errorProps?: BoxProps & InputProps
  handleCountryCodeChange: (value: string) => void
  handlePhoneNumberChange: (value: string) => void
  phoneNumber: string
  inputVariant?: string
  isDisabled?: boolean
}) {
  const [countryCodeSelection, setCountryCodeSelection] = useState("NG")

  return (
    <InputGroup variant={inputVariant} zIndex={10}>
      <InputLeftAddon
        {...errorProps}
        flexBasis={{ base: "30%", md: "25%" }}
        borderLeft="1px solid"
        borderLeftColor="gray.100"
        opacity={isDisabled ? 0.6 : 1}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        _hover={{ _disabled: { backgroundColor: "transparent" } }}
      >
        <CountryCodeInput
          disabled={isDisabled}
          optionSize={12}
          fullWidth
          searchable
          placeholder="+234"
          showSelectedLabel={true}
          className=" unset-country-code-flags"
          selectButtonClassName="unset-country-code-flags"
          selected={countryCodeSelection}
          onSelect={(code: string) => {
            setCountryCodeSelection(code)
            handleCountryCodeChange(
              countryCodes[code as keyof typeof countryCodes]
            )
          }}
        />
      </InputLeftAddon>
      <Input
        isDisabled={isDisabled}
        variant={inputVariant}
        placeholder="Phone number *"
        name="phoneNumber"
        type="number"
        max={16}
        {...errorProps}
        value={phoneNumber}
        onChange={(e) => handlePhoneNumberChange(e.target.value)}
      />
    </InputGroup>
  )
}
