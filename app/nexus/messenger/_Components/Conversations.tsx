"use client"
import { MessengerContext } from "@/app/_providers/MessengerProvider"
import Conversation, { Message } from "@/app/_types/Conversation"
import User from "@/app/_types/User"
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useContext, useMemo, useState } from "react"
import Banner from "./Banner"
import { MessagesContext } from "@/app/_providers/MessagesProvider"
import NoConversation from "./NoConversations"
import { useAppSelector } from "@/app/_redux"

export default function Conversations() {
  const { messages } = useContext(MessagesContext)
  const { updateActiveConversation, conversations, activeConversation } =
    useContext(MessengerContext)
  const { user } = useAppSelector(store => store.auth)
  const getOtherUser = useCallback(
    (conversation: Conversation) => {
      if (conversation?.creator?._id === user?._id)
        return conversation?.otherUser
      return conversation?.creator
    },
    [user]
  )
  const checkForUnreadMessagesCount = useCallback(
    (convo: Conversation) => {
      return messages.filter(
        (msg) =>
          msg.conversationId === convo._id &&
          msg.seen === false &&
          getOtherUser(convo)._id === msg.recipient
      ).length
    },
    [messages, getOtherUser]
  )
  const [searchValue, setSearchValue] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("All")

  const conversationsThatMatchSearch = useMemo(() => {
    if (searchValue.trim().length === 0) return conversations
    return conversations.filter((convo) => {
      return (
        convo.latestMessage?.text.toLowerCase().includes(searchValue) ||
        `${getOtherUser(convo)?.firstName} ${getOtherUser(convo)?.lastName}`
          .toLowerCase()
          .includes(searchValue)
      )
    })
  }, [searchValue, conversations, getOtherUser])

  const conversationsThatMatchFilter = useMemo(() => {
    switch (selectedFilter) {
    case "All":
      return conversationsThatMatchSearch
    case "Unread":
      return conversationsThatMatchSearch.filter(
        (convo) => checkForUnreadMessagesCount(convo) > 0
      )
    case "Read":
      return conversationsThatMatchSearch.filter(
        (convo) => checkForUnreadMessagesCount(convo) === 0
      )
    default:
      return conversationsThatMatchSearch
    }
  }, [conversationsThatMatchSearch, selectedFilter, checkForUnreadMessagesCount])

  return (
    <>
      <Banner
        selectedFilter={selectedFilter}
        onSelectFilter={(val) => setSelectedFilter(val)}
        onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
      />
      <VStack
        alignItems="start"
        w="full"
        position="relative"
        h={{ base: "calc(100dvh - 8rem)", sm: "calc(100dvh - 8.7rem)" }}
        overflow="auto"
        py="2rem"
      >
        {conversationsThatMatchFilter.map((convo) => (
          <ConversationItem
            key={convo._id}
            onClick={() => updateActiveConversation(convo)}
            isActive={activeConversation?._id === convo._id}
            otherUser={getOtherUser(convo)}
            latestMessage={convo.latestMessage}
            countOfUnreadMsgs={checkForUnreadMessagesCount(convo)}
          />
        ))}
        {conversationsThatMatchFilter.length === 0 && <>
          <NoConversation heading="No Conversations match your search" body="Try removing some filters"/>
        </>}
      </VStack>
    </>
  )
}

function ConversationItem({
  isActive,
  onClick,
  otherUser,
  latestMessage,
  countOfUnreadMsgs,
}: {
  isActive?: boolean
  onClick: () => void
  otherUser: User
  latestMessage: Message | null
  countOfUnreadMsgs: number
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
        <Flex
          rounded="full"
          p=".2rem"
          border="1px solid"
          borderColor="brand.main"
        >
          <Avatar
            w={{ base: "3rem", md: "5rem" }}
            h={{ base: "3rem", md: "5rem" }}
            src={otherUser?.profileImage?.secure_url}
            name={`${otherUser?.firstName} ${otherUser?.lastName}`}
            bg="brand.50"
          />
        </Flex>
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
        {countOfUnreadMsgs ? (
          <Badge
            ml="auto"
            bg="brand.main"
            color="white"
            rounded="full"
            p=".4rem"
            w="2.4rem"
            h="2.4rem"
            justifyContent="center"
            alignItems="center"
            display="flex"
            mr={{ base: "1.5rem", md: "4rem" }}
            fontWeight="700"
            fontSize="1rem"
          >
            {countOfUnreadMsgs}
          </Badge>
        ) : null}
      </Flex>
    </>
  )
}