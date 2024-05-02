"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import useAxios from "../_hooks/useAxios"
import { AuthContext } from "./AuthContext"
import Notification from "../_types/Notification"

export const NotificationsContext = createContext<{
  notifications: Notification[]
  isSessionStorage?: boolean
  loading: boolean
  addNewNotification: (notification: Notification) => void
  failedToFetch: boolean
    }>({
      notifications: [],
      isSessionStorage: undefined,
      loading: true,
      addNewNotification: () => {},
      failedToFetch: false,
    })
export default function NotificationProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const [retriesCount, setRetriesCount] = useState(0)
  const [failedToFetch, setFailedToFetch] = useState(false)
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: storedNotifications,
    updateData: updateAllNotifications,
    updateLoading,
  } = useGetFromStorage<Notification[]>("RF_USER_FAVORITES")
  const [isFetchingNotifications, setIsFetchingNotifications] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false)
  const { fetchData } = useAxios()

  const fetchNotifications = useCallback(async () => {
    if (!isAuthorized) return
    setIsFetchingNotifications(true)
    updateLoading(true)
    const res = await fetchData({
      url: "/notifications/me",
      method: "get",
    })
    if (res.statusCode === 200) {
      updateAllNotifications(res.notifications)
      setNotifications(res.notifications)
      setHasInitialized(true)
      updateLoading(false)
      setIsFetchingNotifications(false)
    } else if (res.statusCode === 403) resetAuthorization()
    else {
      setRetriesCount(retriesCount + 1)

      if (retriesCount >= 10) {
        updateLoading(false)
        setFailedToFetch(true)
        setIsFetchingNotifications(false)
      }
    }
  }, [
    fetchData,
    resetAuthorization,
    updateAllNotifications,
    updateLoading,
    isAuthorized,
    retriesCount,
  ])

  useEffect(() => {
    const initializeInterval = setInterval(() => {
      if (hasInitialized === false && retriesCount < 10) fetchNotifications()
    }, 3000)
    return () => {
      clearInterval(initializeInterval)
    }
  }, [fetchNotifications, hasInitialized, retriesCount])

  useEffect(() => {
    if (failedToFetch && storedNotifications !== null) {
      setNotifications(storedNotifications)
      setHasInitialized(true)
    }
  }, [failedToFetch, storedNotifications])

  const addNewNotification = useCallback(
    (notification: Notification) => {
      const prev = [
        ...((notifications || []) as Notification[]).filter(
          (it) => it._id !== notification._id
        ),
      ]
      updateAllNotifications([...prev, notification])
      setNotifications([...prev, notification])
    },
    [notifications, updateAllNotifications]
  )

  // const markAllNotificationsAsSeen = useCallback(() => {
  //   const update = notifications.map((it) => ({ ...it, seen: true }))
  //   setNotifications(() => [...update])
  //   updateAllNotifications([...update])
  // }, [notifications, updateAllNotifications])
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        loading: isFetchingNotifications,
        addNewNotification,
        failedToFetch,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}
