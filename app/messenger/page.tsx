"use client"
import { Flex, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react"
import ActiveConversation from "./_Components/ActiveConversation"
import Conversations from "./_Components/Conversations"
import Banner from "./_Components/Banner"
import { MessengerContext } from "../_providers/MessengerProvider"
import { useContext, useMemo } from "react"
import InactiveConversationView from "./_Components/InactiveConversationView"
import NoConversation from "./_Components/NoConversations"

export default function Page() {
  const { activeConversation, conversations, loading } =
    useContext(MessengerContext)
  const showChat = useMemo(
    () => activeConversation !== null,
    [activeConversation]
  )

  return (
    <>
      <SimpleGrid
        height={{ base: "calc(100dvh - 8rem)", sm: "calc(100dvh - 8.7rem)" }}
        overflow="hidden"
        columns={{ base: 6, md: 4 }}
        pos="relative"
      >
        <GridItem
          colSpan={{ base: 6, sm: 2, md: 1 }}
          display={{ base: showChat ? "none" : "block", sm: "block" }}
          borderRight={{ sm: "1px solid #7070704D" }}
          justifyContent="center"
          alignItems="center"
        >
          <Banner />
          {!loading &&
            (conversations.length > 0 ? <Conversations /> : <NoConversation />)}
          {loading && (
            <Flex minH="40dvh" justifyContent="center" alignItems="center">
              <Spinner size="xl" color="brand.main" />
            </Flex>
          )}
        </GridItem>
        <GridItem
          colSpan={{ base: 6, sm: 4, md: 3 }}
          display={{ base: showChat ? "block" : "none", sm: "block" }}
          overflow="hidden"
          justifyContent="center"
          alignItems="center"
        >
          {!loading &&
            (activeConversation ? (
              <ActiveConversation />
            ) : (
              <InactiveConversationView />
            ))}
          {loading && (
            <Flex minH="60dvh" justifyContent="center" alignItems="center">
              <Spinner size="xl" color="brand.main" />
            </Flex>
          )}
        </GridItem>
      </SimpleGrid>
    </>
  )
}
