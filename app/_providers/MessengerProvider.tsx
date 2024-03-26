"use client"
import { ReactNode, createContext, useCallback, useState } from "react"
import Conversation from "../_types/Conversation"

export const MessengerContext = createContext<{
  activeConversation: Conversation | null
  updateActiveConversation: (convo: Conversation) => void
  closeActiveConversation: () => void
  conversations: Conversation[]
}>({
  activeConversation: null,
  updateActiveConversation: () => {},
  closeActiveConversation: () => {},
  conversations: []
})

export default function MessengerProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [conversations, setConversations] = useState([])
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
  return (
    <MessengerContext.Provider
      value={{
        activeConversation,
        updateActiveConversation,
        closeActiveConversation,
        conversations
      }}
    >
      {children}
    </MessengerContext.Provider>
  )
}
