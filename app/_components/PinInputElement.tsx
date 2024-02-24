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
    <HStack>
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
          w={{ base: "5rem", md: "6.5rem" }}
          h={{ base: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="white.300"
          fontSize="2rem"
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "5rem", md: "6.5rem" }}
          h={{ base: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="white.300"
          fontSize="2rem"
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "5rem", md: "6.5rem" }}
          h={{ base: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="white.300"
          fontSize="2rem"
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "5rem", md: "6.5rem" }}
          h={{ base: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="white.300"
          fontSize="2rem"
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "5rem", md: "6.5rem" }}
          h={{ base: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="white.300"
          fontSize="2rem"
        />
        <PinInputField
          borderColor={hasError ? "red" : "gray.100"}
          mr={{ base: ".8rem", md: "2rem" }}
          w={{ base: "5rem", md: "6.5rem" }}
          h={{ base: "5rem", md: "6.5rem" }}
          rounded="1.2rem"
          bg="white.300"
          fontSize="2rem"
        />
      </PinInput>
    </HStack>
  )
}
