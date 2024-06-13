import { useMemo } from "react"
import { useAppSelector } from "../_redux"

export default function useGetUnseenNotificationsCount() {
  const { notifications } = useAppSelector((store) => store.notifications)
  const unseenNotificationsCount = useMemo(
    () => notifications.filter((notif) => notif.seen === false).length,
    [notifications]
  )
  return unseenNotificationsCount < 100 ? unseenNotificationsCount : 99
}
