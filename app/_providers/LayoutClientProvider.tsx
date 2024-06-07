"use client"
import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import { checkAuthStatus } from "../_redux/thunks/auth.thunk"
import useProtectRoutes from "../_hooks/useProtectRoutes"
import { fetchUserFavorites } from "../_redux/thunks/favorites.thunk"
import { fetchListings } from "../_redux/thunks/search.thunk"
import {
  fetchRoomRecommendations,
  fetchRoomiesRecommendations,
} from "../_redux/thunks/recommendations.thunk"

export default function LayoutDispatchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const { hasFetchedUserFavorites } = useAppSelector((store) => store.favorites)
  const { hasFetchedRooms, hasFetchedRoomies } = useAppSelector(
    (store) => store.recommendations
  )
  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])
  useEffect(() => {
    if (user) {
      !hasFetchedUserFavorites && dispatch(fetchUserFavorites())
      !hasFetchedRooms && dispatch(fetchRoomRecommendations())
      !hasFetchedRoomies && dispatch(fetchRoomiesRecommendations())
    }
  }, [
    dispatch,
    hasFetchedUserFavorites,
    hasFetchedRoomies,
    hasFetchedRooms,
    user,
  ])
  useProtectRoutes()

  return <>{children}</>
}
