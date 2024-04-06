"use client"
import { MessengerContext } from "@/app/_providers/MessengerProvider"
import { UserContext } from "@/app/_providers/UserProvider"
import Conversation, { Message } from "@/app/_types/Conversation"
import User from "@/app/_types/User"
import { Avatar, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import { useCallback, useContext } from "react"

export default function Conversations() {
  const { updateActiveConversation, conversations, activeConversation } =
    useContext(MessengerContext)
  const { user } = useContext(UserContext)
  const getOtherUser = useCallback(
    (conversation: Conversation) => {
      if (conversation?.creator?._id === user?._id)
        return conversation?.otherUser
      return conversation?.creator
    },
    [user]
  )
  return (
    <>
      <VStack
        alignItems="start"
        w="full"
        position="relative"
        h={{ base: "calc(100dvh - 8rem)", sm: "calc(100dvh - 8.7rem)" }}
        overflow="auto"
        py="2rem"
      >
        {conversations.map((convo) => (
          <ConversationItem
            key={convo._id}
            onClick={() => updateActiveConversation(convo)}
            isActive={activeConversation?._id === convo._id}
            otherUser={getOtherUser(convo)}
            latestMessage={convo.latestMessage}
          />
        ))}
      </VStack>
    </>
  )
}

function ConversationItem({
  isActive,
  onClick,
  otherUser,
  latestMessage,
}: {
  isActive?: boolean
  onClick: () => void
  otherUser: User
  latestMessage: Message | null
}) {
  return (
    <>
      <Flex
        gap="1rem"
        minH={{ base: "6rem", sm: "8rem" }}
        pl={{ base: "1.5rem", md: "4rem" }}
        alignItems="center"
        w="full"
        bg={isActive ? "brand.10" : ""}
        onClick={onClick}
        cursor="pointer"
      >
        <Avatar
          w={{ base: "3rem", md: "5rem" }}
          h={{ base: "3rem", md: "5rem" }}
        />
        <Box>
          <Heading fontSize={{ base: "1.2rem", md: "1.6rem" }}>
            {otherUser?.firstName} {otherUser?.lastName}
            <Text
              as="span"
              fontWeight="normal"
              display="block"
              fontSize={{ base: "1.4rem", sm: "1.6rem" }}
              mt=".5rem"
            >
              {latestMessage?.text}
            </Text>
          </Heading>
        </Box>
      </Flex>
    </>
  )
}
