"use client"
import { MessengerContext } from "@/app/_providers/MessengerProvider"
import { Avatar, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import { useContext } from "react"

export default function Conversations() {
  const { updateActiveConversation, conversations, activeConversation } =
    useContext(MessengerContext)

  if (conversations?.length === 0)
    return (
      <Flex
        h="full"
        justifyContent="center"
        alignItems="start"
        flexDir="column"
        gap="2rem"
        color="#7070704D"
        pb="30rem"
        px="3rem"
      >
        <Heading fontWeight="500" fontSize="2.4rem" color="inherit">
          No Conversations yet
        </Heading>
        <Text fontWeight="400" fontSize="1.4rem">
          Conversations you start will appear hear
        </Text>
      </Flex>
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
          />
        ))}
      </VStack>
    </>
  )
}

function ConversationItem({
  isActive,
  onClick,
}: {
  isActive?: boolean
  onClick: () => void
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
            Exploit Enomah
            <Text
              as="span"
              fontWeight="normal"
              display="block"
              fontSize={{ base: "1.4rem", sm: "1.6rem" }}
              mt=".5rem"
            >
              Latest message text
            </Text>
          </Heading>
        </Box>
      </Flex>
    </>
  )
}
