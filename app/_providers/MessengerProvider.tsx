"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import Conversation from "../_types/Conversation"
import { AuthContext } from "./AuthContext"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import useAxios from "../_hooks/useAxios"
import useGetSocket from "../_hooks/useGetSocket"
import { Socket, io } from "socket.io-client"

export const MessengerContext = createContext<{
  activeConversation: Conversation | null
  updateActiveConversation: (convo: Conversation) => void
  closeActiveConversation: () => void
  conversations: Conversation[]
  socket: Socket<any, any>
  loading: boolean
    }>({
      activeConversation: null,
      updateActiveConversation: () => {},
      closeActiveConversation: () => {},
      conversations: [],
      socket: io(),
      loading: true
    })

export default function MessengerProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const { socket } = useGetSocket("/conversations", {})
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: cachedConversations,
    updateData: updateCachedConversations,
    updateLoading,
    loading
  } = useGetFromStorage<Conversation[]>("RF_USER_CONVERSATIONS")
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [hasFetched, setHasFetched] = useState(false)
  const { fetchData } = useAxios()
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null)

  const updateActiveConversation = useCallback(
    (newConversation: Conversation) => {
      setActiveConversation(newConversation)
    },
    []
  )

  const closeActiveConversation = useCallback(() => {
    setActiveConversation(null)
  }, [])

  const fetchConversations = useCallback(async () => {
    if (hasFetched|| !isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/conversations",
      method: "get",
    })
    if (res.statusCode === 200) {
      updateCachedConversations(res.conversations)
      setConversations(res.conversations)
    } else if (res.statusCode === 403) resetAuthorization()
    else {
      if (cachedConversations) setConversations(cachedConversations)
    }
    setHasFetched(true)
    updateLoading(false)
  }, [
    fetchData,
    resetAuthorization,
    updateCachedConversations,
    updateLoading,
    cachedConversations,
    hasFetched,
    isAuthorized
  ])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])
  return (
    <MessengerContext.Provider
      value={{
        activeConversation,
        updateActiveConversation,
        closeActiveConversation,
        conversations,
        socket,
        loading
      }}
    >
      {children}
    </MessengerContext.Provider>
  )
}
