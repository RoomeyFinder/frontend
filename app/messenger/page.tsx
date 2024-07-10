"use client"
import { Flex, Spinner } from "@chakra-ui/react"
// import ActiveConversation from "./_Components/ActiveConversation"
// import Conversations from "./_Components/Conversations"
// import Banner from "./_Components/Banner"
// import { MessengerContext } from "../../_providers/MessengerProvider"
import {
  Suspense,
  useEffect,
  useMemo,
} from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import ActiveConversation from "./_Components/ActiveConversation"
import InactiveConversationView from "./_Components/InactiveConversationView"
import Loading from "../_assets/SVG/Loading"
import { useRouter, useSearchParams } from "next/navigation"
import { setActiveConversation } from "../_redux/slices/conversations.slice"
import { socket } from "../_socket/socket"
import { logout } from "../_redux/slices/auth.slice"

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
  const { user } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!socket.connected && user !== null) socket.connect()
    if ((socket.auth as any).token === null) dispatch(logout())
  }, [user, dispatch])
  const { activeConversation, conversations, loading } = useAppSelector(
    (store) => store.conversations
  )
  const showChat = useMemo(
    () => activeConversation !== null,
    [activeConversation]
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    const conversationId = searchParams.get("convoId")
    const otherUser = searchParams.get("otherUser")
    if (conversationId) {
      const conversation = conversations.find((it) => it._id === conversationId)
      if (conversation) {
        router.push("/messenger")
        dispatch(setActiveConversation(conversation))
      }
    }
    if (otherUser) {
      const conversation = conversations.find(
        (it) => it.otherUser?._id === otherUser || it.creator?._id === otherUser
      )
      if (conversation) {
        router.push("/messenger")
        dispatch(setActiveConversation(conversation))
      }
    }
  }, [searchParams, router, conversations, dispatch])

  return (
    <>
      <Flex
        height={{ base: "100dvh", sm: "100%" }}
        overflow="hidden"
        pos="relative"
        bg="#3a86ff0a"
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
              <ActiveConversation socket={socket} />
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
