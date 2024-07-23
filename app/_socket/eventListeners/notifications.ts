import useGetListener from "../useGetListener"
import { NOTIFICATION_EVENTS } from "../events"
import { useAppDispatch } from "@/app/_redux"
import { socket } from "../socket"
import { addNewNotification } from "@/app/_redux/slices/notifications.slice"

export default function useListenForNotificationsEvents() {
  const dispatch = useAppDispatch()
  const useListener = useGetListener(socket)
  useListener(NOTIFICATION_EVENTS.NOTIFICATION, (val) => {
    dispatch(
      addNewNotification({
        notification: val.notification || {},
        statusCode: val?.statusCode,
      })
    )
  })
}
