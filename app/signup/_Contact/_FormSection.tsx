import CountryCodeInput from "@/app/_components/CountryCodeInput"
import { GridItem, Input, InputGroup, InputLeftAddon, SimpleGrid } from "@chakra-ui/react"
import countryCodes from "@/app/_data/country_codes.json"
import { useState } from "react"


export default function ContactForm({
  formData, sectionName, handleChange
}: {
  formData: { [x: string]: string | number | boolean }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
}) {
  const [countryCodeSelection, setCountryCodeSelection] = useState("NG")
  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: "1.8rem", sm: "3rem" }} pb={{ base: "3rem", md: "5rem" }}>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Email address *"
          name="email"
          value={formData.firstName as string}
          onChange={(e) => handleChange(sectionName, "email", e.target.value)} />
      </GridItem>
      <GridItem>
        <InputGroup variant="filled" zIndex={10}>
          <InputLeftAddon flexBasis={{ base: "30%", md: "25%"}} borderLeft="1px solid" borderLeftColor="gray.100">
            <CountryCodeInput optionSize={12} fullWidth searchable placeholder="+234" showSelectedLabel={true} className="unset-country-code-flags" selectButtonClassName="unset-country-code-flagsunset-country-code-flags" selected={countryCodeSelection} onSelect={(code: string) => {
              setCountryCodeSelection(code)
              handleChange(sectionName, "countryCode", countryCodes[code as keyof typeof countryCodes])
            }} />
          </InputLeftAddon>
          <Input
            variant="filled"
            placeholder="Phone number *"
            name="phone"
            max={16}
            value={formData.firstName as string}
            onChange={(e) => handleChange(sectionName, "phone", e.target.value)} />
        </InputGroup>
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Create a password *"
          name="password"
          value={formData.password as string}
          onChange={(e) => handleChange(sectionName, "password", e.target.value)} />
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Confirm your password *"
          name="confirmPassword"
          value={formData.confirmPassword as string}
          onChange={(e) => handleChange(sectionName, "confirmPassword", e.target.value)} />
      </GridItem>
    </SimpleGrid>
  )
}