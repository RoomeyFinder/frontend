"use client"
import { Flex } from "@chakra-ui/react"
// import ActiveConversation from "./_Components/ActiveConversation"
// import Conversations from "./_Components/Conversations"
// import Banner from "./_Components/Banner"
// import { MessengerContext } from "../../_providers/MessengerProvider"
import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import ActiveConversation from "./_Components/ActiveConversation"
import InactiveConversationView from "./_Components/InactiveConversationView"
import { useRouter, useSearchParams } from "next/navigation"
import {
  addNewConversation,
  setActiveConversation,
} from "../_redux/slices/conversations.slice"
import { socket } from "../_socket/socket"
import { logout } from "../_redux/slices/auth.slice"
import PageLoader from "../_components/PageLoader"
import STORAGE_KEYS from "../STORAGE_KEYS"
import useAxios from "../_hooks/useAxios"
import toast from "react-hot-toast"

export default function Messenger() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}
function Page() {
  const { fetchData } = useAxios()
  const { user } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!socket.connected && user !== null) socket.connect()
    const tokenInLocalStorage = localStorage.getItem(STORAGE_KEYS.RF_TOKEN)
    console.log(tokenInLocalStorage, socket.auth, "debug")
    if (!tokenInLocalStorage && (socket.auth as any)?.token === null) {
      dispatch(logout())
    }
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

  const [toastId, setToastId] = useState("")
  const fetchConversation = useCallback(
    async (otherUser: string) => {
      const res = await fetchData({
        url: `/conversations/me/single?otherUser=${otherUser}`,
        method: "get",
      })
      if (res.statusCode === 200) {
        dispatch(setActiveConversation(res.conversation))
        dispatch(addNewConversation(res.conversation))
      } else {
        setToastId(toast.error("Oops, that conversation was not found."))
        router.push("/messenger")
      }
    },
    [fetchData, router]
  )

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
      } else fetchConversation(otherUser)
    }
  }, [searchParams, router, conversations, dispatch])

  useEffect(() => {
    toast.remove(toastId)
  }, [toastId])

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
          {loading && <PageLoader />}
        </Flex>
      </Flex>
    </>
  )
}
