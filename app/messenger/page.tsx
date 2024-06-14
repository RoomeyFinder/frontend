"use client"
import { GridItem, Flex, Spinner } from "@chakra-ui/react"
// import ActiveConversation from "./_Components/ActiveConversation"
// import Conversations from "./_Components/Conversations"
// import Banner from "./_Components/Banner"
// import { MessengerContext } from "../../_providers/MessengerProvider"
import {
  Suspense,
  useMemo,
  // useContext, useEffect, useMemo
} from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import ActiveConversation from "./_Components/ActiveConversation"
import InactiveConversationView from "./_Components/InactiveConversationView"
import Loading from "../_assets/SVG/Loading"
// import InactiveConversationView from "./_Components/InactiveConversationView"
// import NoConversation from "./_Components/NoConversations"
// import { useRouter, useSearchParams } from "next/navigation"

export default function Messenger() {
  return (
    <Suspense
      fallback={
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" thickness=".4rem" />
        </Flex>
      }
    >
      <Page />
    </Suspense>
  )
}
function Page() {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  const { activeConversation, conversations, loading } = useAppSelector(
    (store) => store.conversations
  )
  const dispatch = useAppDispatch()
  const showChat = useMemo(
    () => activeConversation !== null,
    [activeConversation]
  )

  // useEffect(() => {
  //   const conversationId = searchParams.get("convoId")
  //   if (conversationId) {
  //     const conversation = conversations.find((it) => it._id === conversationId)
  //     if (conversation) {
  //       router.push("/messenger")
  //       updateActiveConversation(conversation)
  //     }
  //   }
  // }, [searchParams, updateActiveConversation, router, conversations])

  return (
    <>
      <Flex
        height={{ base: "100dvh", sm: "100%" }}
        overflow="hidden"
        pos="relative"
      >
        <Flex
          display={{ base: showChat ? "block" : "none", sm: "block" }}
          overflow="hidden"
          justifyContent="center"
          alignItems="center"
          w="full"
          h="full"
        >
          {!loading &&
            (activeConversation ? (
              <ActiveConversation />
            ) : (
              <InactiveConversationView />
            ))}
          {loading && (
            <Flex minH="60dvh" justifyContent="center" alignItems="center">
              <Loading />
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  )
}
