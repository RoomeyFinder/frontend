import useGetListener from "../useGetListener"
import { CONVERSATION_EVENTS } from "../events"

import { useAppDispatch } from "@/app/_redux"
import { addNewMessage, socket } from "@/app/_redux/slices/messages.slice"

export default function useListenForMessengerEvents() {
  const dispatch = useAppDispatch()
  const useListener = useGetListener(socket)
  useListener(CONVERSATION_EVENTS.MESSAGE, (val) => dispatch(addNewMessage(val)))
}
