import { Box, HStack, Text } from "@chakra-ui/react"

import { PinInput, PinInputField } from "@chakra-ui/react"

export default function EmailVerficationForm({
  formData, sectionName, handleChange, error
}: {
  formData: { [x: string]: string | number | boolean, }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
  error: string[]
}) {
  return (
    <Box pb={{ base: "3rem", md: "4.7rem" }}>
      <Text color="gray.100" fontSize={{ base: "1.4rem", md: "1.6rem" }}>Enter the code from your email</Text>
      <HStack mt="2rem">
        <PinInput onChange={(value) => handleChange(sectionName, "verificationToken", value)} value={formData.verificationToken as string} autoFocus placeholder="" aria-label="Please enter the code sent to your email">
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
        </PinInput>
      </HStack>
      <Text as="button" mt="3rem" color="black" fontSize={{ base: "1.4rem", md: "1.6rem" }}>Resend Code</Text>
    </Box>
  )
}