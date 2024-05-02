import { useContext } from "react"
import useGetListener from "../useGetListener"
import { CONVERSATION_EVENTS } from "../events"
import { MessengerContext } from "@/app/_providers/MessengerProvider"
import { MessagesContext } from "@/app/_providers/MessagesProvider"

export default function useListenForMessengerEvents() {
  const { socket } = useContext(MessengerContext)
  const { updateMessages } = useContext(MessagesContext)
  const useListener = useGetListener(socket)
  useListener(CONVERSATION_EVENTS.MESSAGE, (val) => updateMessages(val.message))
}
