import { Box, HStack, Text } from "@chakra-ui/react"

import { PinInput, PinInputField } from "@chakra-ui/react"

export default function EmailVerficationForm() {

  return (
    <Box pb={{ base: "3rem", md: "4.7rem" }}>
      <Text color="gray.100" fontSize={{ base: "1.4rem", md: "1.6rem" }}>Enter the code from your email</Text>
      <HStack mt="2rem">
        <PinInput autoFocus placeholder="" aria-label="Please enter the code sent to your email">
          <PinInputField mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" borderColor="gray.100" bg="white.300" fontSize="2rem" />
          <PinInputField mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" borderColor="gray.100" bg="white.300" fontSize="2rem" />
          <PinInputField mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" borderColor="gray.100" bg="white.300" fontSize="2rem" />
          <PinInputField mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" borderColor="gray.100" bg="white.300" fontSize="2rem" />
          <PinInputField mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" borderColor="gray.100" bg="white.300" fontSize="2rem" />
          <PinInputField mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" borderColor="gray.100" bg="white.300" fontSize="2rem" />
        </PinInput>
      </HStack>
      <Text as="button" mt="3rem" color="black" fontSize={{ base: "1.4rem", md: "1.6rem" }}>Resend Code</Text>
    </Box>
  )
}