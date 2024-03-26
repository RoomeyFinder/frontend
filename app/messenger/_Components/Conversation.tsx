import { VStack } from "@chakra-ui/react"
import Message from "./Message"

export default function Conversation() {
  return (
    <>
      <VStack
        gap="3rem"
        alignItems="start"
        px={{ base: "3rem", md: "5rem" }}
        py="3rem"
      >
        <Message shadow="md" />
        <Message shadow="md" />
        <Message ml="auto" shadow="sm" />
        <Message shadow="md" />
      </VStack>
    </>
  )
}
