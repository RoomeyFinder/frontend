"use client"
import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import {
  fetchRoomRecommendations,
  fetchRoomiesRecommendations,
} from "../_redux/thunks/recommendations.thunk"
import useListenForMessengerEvents from "../_socket/eventListeners/messenger"
import useListenForNotificationsEvents from "../_socket/eventListeners/notifications"

export default function LayoutDispatchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  useListenForMessengerEvents()
  useListenForNotificationsEvents()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const { hasFetchedRooms, hasFetchedRoomies, loadingRoomies, loadingRooms } =
    useAppSelector((store) => store.recommendations)

  useEffect(() => {
    if (user) {
      !hasFetchedRooms && !loadingRooms && dispatch(fetchRoomRecommendations())
      !hasFetchedRoomies &&
        !loadingRoomies &&
        dispatch(fetchRoomiesRecommendations())
    }
  }, [
    dispatch,
    hasFetchedRoomies,
    hasFetchedRooms,
    user,
    loadingRoomies,
    loadingRooms,
  ])
  return <>{children}</>
}
