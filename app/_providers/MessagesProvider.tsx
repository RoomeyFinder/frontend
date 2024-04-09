"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { Message } from "../_types/Conversation"
import { AuthContext } from "./AuthContext"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import useAxios from "../_hooks/useAxios"

export const MessagesContext = createContext<{
  updateMessages: (convo: Message) => void
  messages: Message[]
}>({
  updateMessages: () => {},
  messages: [],
})

export default function MessagesProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: cachedMessages,
    updateData: updateCachedMessages,
    updateLoading,
  } = useGetFromStorage<Message[]>("RF_USER_MESSAGES")
  const [messages, setMessages] = useState<Message[]>([])
  const [hasFetched, setHasFetched] = useState(false)
  const { fetchData } = useAxios()

  const updateMessages = useCallback(
    (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage])
      updateCachedMessages([...(cachedMessages || messages), newMessage])
    },
    [cachedMessages]
  )

  const fetchMessages = useCallback(async () => {
    if (hasFetched || !isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/messages",
      method: "get",
    })
    if (res.statusCode === 200) {
      updateCachedMessages(res.messages)
      setMessages(res.messages)
    } else if (res.statusCode === 403) resetAuthorization()
    else {
      if (cachedMessages) setMessages(cachedMessages)
    }
    setHasFetched(true)
    updateLoading(false)
  }, [
    fetchData,
    resetAuthorization,
    updateCachedMessages,
    updateLoading,
    cachedMessages,
    hasFetched,
    updateMessages,
  ])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])
  return (
    <MessagesContext.Provider
      value={{
        updateMessages,
        messages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}
