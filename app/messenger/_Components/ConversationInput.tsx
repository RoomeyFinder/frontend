import SendIcon from "@/app/_assets/SVG/SendIcon"
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react"

export default function ConversationInput() {
  return (
    <>
      <InputGroup
        bg="white"
        p="1.2rem"
        shadow="0px 0px 3px 3px #00000008"
        rounded="1.2rem"
      >
        <Input border="0" p="0" />
        <InputRightAddon
          border="0"
          color="brand.main"
          bg="brand.10"
          w={{ base: "4rem", md: "6rem" }}
          h={{ base: "4rem", md: "6rem" }}
          _hover={{ bg: "brand.50" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="1.2rem"
        >
          <SendIcon />
        </InputRightAddon>
      </InputGroup>
    </>
  )
}
