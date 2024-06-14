"use client"
import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import useProtectRoutes from "../_hooks/useProtectRoutes"
import { fetchUserFavorites } from "../_redux/thunks/favorites.thunk"
import {
  fetchRoomRecommendations,
  fetchRoomiesRecommendations,
} from "../_redux/thunks/recommendations.thunk"
import { fetchUsersInterests } from "../_redux/thunks/interests.thunk"
import { fetchUserListings } from "../_redux/thunks/listings.thunk"
import { fetchUserConversations } from "../_redux/thunks/conversations.thunk"
import useListenForMessengerEvents from "../_socket/eventListeners/messenger"

export default function LayoutDispatchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  useListenForMessengerEvents()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const { hasFetchedUserFavorites } = useAppSelector((store) => store.favorites)
  const { hasFetchedUserInterests } = useAppSelector((store) => store.interests)
  const { hasFetchedUserConversations } = useAppSelector((store) => store.conversations)
  const { hasFetchedRooms, hasFetchedRoomies } = useAppSelector(
    (store) => store.recommendations
  )
  const { hasFetchedUserListings } = useAppSelector((store) => store.listings)
  useEffect(() => {
    !hasFetchedUserListings && dispatch(fetchUserListings())
  }, [dispatch, hasFetchedUserListings])
  useEffect(() => {
    if (user) {
      !hasFetchedUserFavorites && dispatch(fetchUserFavorites())
      !hasFetchedRooms && dispatch(fetchRoomRecommendations())
      !hasFetchedRoomies && dispatch(fetchRoomiesRecommendations())
      !hasFetchedUserConversations && dispatch(fetchUserConversations())
    }
  }, [
    dispatch,
    hasFetchedUserConversations,
    hasFetchedUserFavorites,
    hasFetchedUserInterests,
    hasFetchedRoomies,
    hasFetchedRooms,
    user,
  ])
  useProtectRoutes()

  return <>{children}</>
}
