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
import { Socket, io } from "socket.io-client"

export const MessengerContext = createContext<{
  activeConversation: Conversation | null
  updateActiveConversation: (convo: Conversation) => void
  closeActiveConversation: () => void
  conversations: Conversation[]
  socket: Socket<any, any> | null
  loading: boolean
    }>({
      activeConversation: null,
      updateActiveConversation: () => {},
      closeActiveConversation: () => {},
      conversations: [],
      socket: null,
      loading: true,
    })

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations`, {
  // ...options,
  // auth: {
  //   token,
  // },
  reconnectionAttempts: 0,
})
export default function MessengerProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const { resetAuthorization, isAuthorized, token } = useContext(AuthContext)
  const {
    data: cachedConversations,
    updateData: updateCachedConversations,
    updateLoading,
    loading,
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
    if (hasFetched || !isAuthorized) return
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
    isAuthorized,
  ])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  useEffect(() => {
    if(!socket.connected){
      socket.auth = { ...(socket.auth || {}), token }
      socket.connect()
    }
  }, [token])
  return (
    <MessengerContext.Provider
      value={{
        activeConversation,
        updateActiveConversation,
        closeActiveConversation,
        conversations,
        socket,
        loading,
      }}
    >
      {children}
    </MessengerContext.Provider>
  )
}
