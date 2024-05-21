import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

export default function PinInputElement({
  hasError,
  handleChange,
  value,
}: {
  hasError: boolean
  handleChange: (val: string) => void
  value: string
}) {
  return (
    <HStack gap="0">
      <PinInput
        onChange={(value) => handleChange(value)}
        value={value}
        autoFocus
        placeholder=""
        aria-label="Please enter the code sent to your email"
      >
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "3.5rem", sm: "5rem", md: "6.8rem" }}
          h={{ base: "4rem", sm: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="tranpsarent"
          fontSize="2rem"
          _focusVisible={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "brand.main",
          }}
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "3.5rem", sm: "5rem", md: "6.8rem" }}
          h={{ base: "4rem", sm: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="tranpsarent"
          fontSize="2rem"
          _focusVisible={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "brand.main",
          }}
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "3.5rem", sm: "5rem", md: "6.8rem" }}
          h={{ base: "4rem", sm: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="tranpsarent"
          fontSize="2rem"
          _focusVisible={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "brand.main",
          }}
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "3.5rem", sm: "5rem", md: "6.8rem" }}
          h={{ base: "4rem", sm: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="tranpsarent"
          fontSize="2rem"
          _focusVisible={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "brand.main",
          }}
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "3.5rem", sm: "5rem", md: "6.8rem" }}
          h={{ base: "4rem", sm: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="tranpsarent"
          fontSize="2rem"
          _focusVisible={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "brand.main",
          }}
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "3.5rem", sm: "5rem", md: "6.8rem" }}
          h={{ base: "4rem", sm: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="tranpsarent"
          fontSize="2rem"
          _focusVisible={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "brand.main",
          }}
        />
      </PinInput>
    </HStack>
  )
}
