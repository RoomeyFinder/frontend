import {
  Avatar,
  Box,
  Flex,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react"
import Conversation from "./Conversation"
import ThreeDotIcon, { SmallThreeDotIcon } from "@/app/_assets/SVG/ThreeDotIcon"

export default function ActiveConversation({
  closeConversation,
}: {
  closeConversation: () => void
}) {
  return (
    <>
      <Box
        w="full"
        position="relative"
        h={{ base: "calc(100dvh - 8rem)", sm: "calc(100dvh - 8.7rem)" }}
        overflow="auto"
      >
        <ConversationHeader closeConversation={closeConversation} />
        <Conversation />
      </Box>
    </>
  )
}

function ConversationHeader({
  closeConversation,
}: {
  closeConversation: () => void
}) {
  return (
    <Box position="sticky" top="0" w="full" bg="white">
      <Flex
        justifyContent="space-between"
        bg="brand.10"
        px={{ base: "2rem", sm: "5rem" }}
        alignItems="center"
        h={{ base: "6rem", sm: "9rem" }}
      >
        <Flex gap="1rem" alignItems="center">
          <Avatar />
          <Heading fontSize={{ base: "1.8rem", sm: "2rem" }}>
            Exploit Enomah
          </Heading>
        </Flex>
        <Popover placement="left">
          <PopoverTrigger>
            <Text as="button">
              <SmallThreeDotIcon />
            </Text>
          </PopoverTrigger>
          <PopoverContent bg="white" fontSize="1.4rem" p="1rem" w="max-content">
            <Text
              onClick={closeConversation}
              as="button"
              w="full"
              textAlign="left"
            >
              Close chat
            </Text>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  )
}
