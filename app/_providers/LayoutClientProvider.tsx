"use client"
import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import { checkAuthStatus } from "../_redux/thunks/auth.thunk"
import useProtectRoutes from "../_hooks/useProtectRoutes"
import { fetchUserFavorites } from "../_redux/thunks/favorites.thunk"
import { fetchListings } from "../_redux/thunks/search.thunk"

export default function LayoutDispatchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const dispatch = useAppDispatch()
  const { hasFetchedUserFavorites } = useAppSelector((store) => store.favorites)
  const { hasFetchedInitialListings } = useAppSelector((store) => store.search)
  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])
  useEffect(() => {
    !hasFetchedInitialListings && dispatch(fetchListings())
    !hasFetchedUserFavorites && dispatch(fetchUserFavorites())
  }, [dispatch, hasFetchedUserFavorites, hasFetchedInitialListings])
  useProtectRoutes()

  return <>{children}</>
}
