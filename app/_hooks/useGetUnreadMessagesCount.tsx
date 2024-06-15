import { useMemo } from "react"
import { useAppSelector } from "../_redux"

export default function useGetUnreadMessagesCount() {
  const { conversations } = useAppSelector((store) => store.conversations)
  const unseenMessagesCount = useMemo(
    () => conversations.reduce((acc, curr) => acc + curr.unreadMsgsCount, 0),
    [conversations]
  )
  return unseenMessagesCount < 100 ? unseenMessagesCount : 99
}
