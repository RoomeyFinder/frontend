"use client"
import { GridItem, Input, SimpleGrid } from "@chakra-ui/react"
import { getErrorPropsV1 } from "./utils"
import PhoneNumberInput from "@/app/_components/PhoneNumberInput"
import ErrorText from "../_components/Auth/ErrorText"

export default function ContactForm({
  formData,
  sectionName,
  handleChange,
  error,
}: {
  formData: { [x: string]: string }
  sectionName: string
  handleChange: (
    stageName: string,
    name: string,
    value: string | number | boolean
  ) => void
  error: { [x: string]: string }
}) {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2 }}
      spacing={{ base: "1.8rem", sm: "3rem" }}
      pb={{ base: "3rem", md: "5rem" }}
    >
      <GridItem>
        <PhoneNumberInput
          errorProps={{ ...getErrorPropsV1(error.phoneNumber) }}
          handleCountryCodeChange={(val) =>
            handleChange(sectionName, "countryCode", val)
          }
          handlePhoneNumberChange={(val) =>
            handleChange(sectionName, "phoneNumber", val)
          }
          phoneNumber={formData.phoneNumber}
          inputVariant="filled"
        />
        {error.phoneNumber && <ErrorText>{error.phoneNumber}</ErrorText>}
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Email address *"
          name="email"
          type="email"
          value={formData.firstName as string}
          onChange={(e) => handleChange(sectionName, "email", e.target.value)}
          {...getErrorPropsV1(error.email)}
        />
        {error.email && <ErrorText>{error.email}</ErrorText>}
      </GridItem>
      <GridItem>
        <Input
          {...getErrorPropsV1(error.password)}
          variant="filled"
          placeholder="Create a password *"
          name="password"
          type="password"
          value={formData.password as string}
          onChange={(e) =>
            handleChange(sectionName, "password", e.target.value)
          }
        />
        {error.password && <ErrorText>{error.password}</ErrorText>}
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Confirm your password *"
          name="confirmPassword"
          type="password"
          {...getErrorPropsV1(error.confirmPassword)}
          value={formData.confirmPassword as string}
          onChange={(e) =>
            handleChange(sectionName, "confirmPassword", e.target.value)
          }
        />
        {error.confirmPassword && (
          <ErrorText>{error.confirmPassword}</ErrorText>
        )}
      </GridItem>
    </SimpleGrid>
  )
}
