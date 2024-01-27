"use client"
import { GridItem, Input, SimpleGrid, useToast } from "@chakra-ui/react"
import { useEffect } from "react"
import { getErrorProps } from "./utils"
import PhoneNumberInput from "@/app/_components/PhoneNumberInput"


export default function ContactForm({
  formData, sectionName, handleChange, error
}: {
  formData: { [x: string]: string }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
  error: string[]
}) {
  const toast = useToast()

  useEffect(() => {
    const toastId = "password-toast"
    if (
      toast.isActive(toastId) === false &&
      (error.includes("password") || error.includes("confirmPassword")) &&
      (formData.password.length > 0 || formData.confirmPassword.length > 0)
    ) {
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
        <PhoneNumberInput
          error={error}
          handleCountryCodeChange={(val) => handleChange(sectionName, "countryCode", val)}
          handlePhoneNumberChange={(val) => handleChange(sectionName, "phoneNumber", val)}
          phoneNumber={formData.phoneNumber} inputVariant="filled" />
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