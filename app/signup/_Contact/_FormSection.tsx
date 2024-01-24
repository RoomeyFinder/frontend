"use client"
import CountryCodeInput from "@/app/_components/CountryCodeInput"
import { GridItem, Input, InputGroup, InputLeftAddon, SimpleGrid, useToast } from "@chakra-ui/react"
import countryCodes from "@/app/_data/country_codes.json"
import { useEffect, useState } from "react"
import { getErrorProps } from "../utils"


export default function ContactForm({
  formData, sectionName, handleChange, error
}: {
  formData: { [x: string]: string  }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
  error: string[]
}) {
  const [countryCodeSelection, setCountryCodeSelection] = useState("NG")
  const toast = useToast()

  useEffect(() => {
    const toastId = "password-toast"
    if (
      toast.isActive(toastId) === false &&
      (error.includes("password") || error.includes("confirmPassword")) && 
      (formData.password.length > 0 || formData.confirmPassword.length > 0)
    ){
      toast({
        id: toastId,
        title: "Passwords must match and must be a minimum of 8 characters!",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
        size: "lgs",
        containerStyle: {
          color: "white",
          fontSize: "1.6rem",
          textAlign: "center"
        }
      })
    }
  }, [error, formData.confirmPassword.length, formData.password.length, toast])

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: "1.8rem", sm: "3rem" }} pb={{ base: "3rem", md: "5rem" }}>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Email address *"
          name="email"
          type="email"
          {...getErrorProps("email", error)}
          value={formData.firstName as string}
          onChange={(e) => handleChange(sectionName, "email", e.target.value)} />
      </GridItem>
      <GridItem>
        <InputGroup variant="filled" zIndex={10}>
          <InputLeftAddon {...getErrorProps("countryCode", error)} flexBasis={{ base: "30%", md: "25%"}} borderLeft="1px solid" borderLeftColor="gray.100">
            <CountryCodeInput optionSize={12} fullWidth searchable placeholder="+234" showSelectedLabel={true} className=" unset-country-code-flags" selectButtonClassName="unset-country-code-flags" selected={countryCodeSelection} onSelect={(code: string) => {
              setCountryCodeSelection(code)
              handleChange(sectionName, "countryCode", countryCodes[code as keyof typeof countryCodes])
            }} />
          </InputLeftAddon>
          <Input
            variant="filled"
            placeholder="Phone number *"
            name="phoneNumber"
            type="tel"
            max={16}
            {...getErrorProps("phoneNumber", error)}
            value={formData.firstName as string}
            onChange={(e) => handleChange(sectionName, "phoneNumber", e.target.value)} />
        </InputGroup>
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Create a password *"
          name="password"
          type="password"
          {...getErrorProps("password", error)}
          value={formData.password as string}
          onChange={(e) => handleChange(sectionName, "password", e.target.value)} />
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Confirm your password *"
          name="confirmPassword"
          type="password"
          {...getErrorProps("confirmPassword", error)}
          value={formData.confirmPassword as string}
          onChange={(e) => handleChange(sectionName, "confirmPassword", e.target.value)} />
      </GridItem>
    </SimpleGrid>
  )
}