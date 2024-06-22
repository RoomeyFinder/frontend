import useGetListener from "../useGetListener"
import { CONVERSATION_EVENTS } from "../events"

import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { addNewMessage } from "@/app/_redux/slices/messages.slice"
import { socket } from "../socket"
import { updateUnreadMsgsCount } from "@/app/_redux/slices/conversations.slice"

export default function useListenForMessengerEvents() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const useListener = useGetListener(socket)
  useListener(CONVERSATION_EVENTS.MESSAGE, (val) => {
    dispatch(addNewMessage(val))
    dispatch(
      updateUnreadMsgsCount({
        ...(val || {}),
        isSender: val?.message?.sender === user?._id,
      })
    )
  })
}
