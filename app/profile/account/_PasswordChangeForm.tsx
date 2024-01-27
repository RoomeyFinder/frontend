import InputLabel from "@/app/_components/InputLabel"
import { Flex, Heading, InputGroup, Input, Button } from "@chakra-ui/react"


export default function PasswordChangeForm(){
  return (
    <Flex
      maxW="85.5rem"
      gap={{ base: "1.5rem", lg: "3rem" }}
      flexDir="column"
    >
      <Heading
        size="md"
        variant="700"
        as="h2"
      >
        Password
      </Heading>
      <InputGroup flexDir="column" gap="1rem">
        <InputLabel>Current password</InputLabel>
        <Input placeholder="00000000" />
      </InputGroup>
      <Button variant="brand-secondary" fontWeight="400" maxW="18.5rem">
        Change Password
      </Button>
    </Flex>
  )
}