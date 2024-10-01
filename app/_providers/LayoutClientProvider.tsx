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
      if (
        user.preferences?.lookingFor === "room" ||
        user.preferences?.lookingFor === "both" ||
        !user.preferences?.lookingFor
      )
        !hasFetchedRooms &&
          !loadingRooms &&
          dispatch(fetchRoomRecommendations())

      if (
        user.preferences?.lookingFor === "roommate" ||
        user.preferences?.lookingFor === "both" ||
        !user.preferences?.lookingFor
      )
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
    user,
  ])
  return <>{children}</>
}
