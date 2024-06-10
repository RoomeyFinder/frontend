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

export default function LayoutDispatchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const { hasFetchedUserFavorites } = useAppSelector((store) => store.favorites)
  const { hasFetchedUserInterests } = useAppSelector((store) => store.interests)
  const { hasFetchedRooms, hasFetchedRoomies } = useAppSelector(
    (store) => store.recommendations
  )
  useEffect(() => {
    if (user) {
      !hasFetchedUserFavorites && dispatch(fetchUserFavorites())
      !hasFetchedUserInterests && dispatch(fetchUsersInterests())
      !hasFetchedRooms && dispatch(fetchRoomRecommendations())
      !hasFetchedRoomies && dispatch(fetchRoomiesRecommendations())
    }
  }, [
    dispatch,
    hasFetchedUserFavorites,
    hasFetchedUserInterests,
    hasFetchedRoomies,
    hasFetchedRooms,
    user,
  ])
  useProtectRoutes()

  return <>{children}</>
}
