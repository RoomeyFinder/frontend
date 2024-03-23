"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react"
import useAxios from "../_hooks/useAxios"
import { AuthContext } from "./AuthContext"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import Favorite from "../_types/Favorites"
import useAppToast from "../_hooks/useAppToast"

export const FavoritesContext = createContext<{
  favorites: Favorite[] | null
  addNewFavorite: (data: Favorite, useSession?: boolean) => void
  removeFavorite: (id: string, useSession?: boolean) => void
  deleteAllFavorites: (_id: string, useSession?: boolean) => void
  loading: boolean
  updateLoading: (upd?: boolean) => void
}>({
  favorites: [],
  removeFavorite: () => {},
  addNewFavorite: () => {},
  updateLoading: () => {},
  deleteAllFavorites: () => {},
  loading: true,
})

export default function FavoritesProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: favorites,
    updateData: updateAllFavorites,
    deleteData: deleteAllFavorites,
    loading,
    updateLoading,
  } = useGetFromStorage("RF_USER_FAVORITES")

  const { fetchData } = useAxios()

  const fetchFavorites = useCallback(async () => {
    if (favorites || !isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/favorites/me",
      method: "get",
    })
    if (res.statusCode === 200) updateAllFavorites(res.favorites)
    else if (res.statusCode === 403) resetAuthorization()
    updateLoading(false)
    
  }, [
    fetchData,
    resetAuthorization,
    favorites,
    updateAllFavorites,
    updateLoading,
    isAuthorized,
  ])

  useEffect(() => {
    fetchFavorites()
  }, [])

  const removeFavorite = useCallback(
    (id: string, useSession?: boolean) => {
      updateAllFavorites(
        favorites.filter((it: Favorite) => it._id !== id),
        useSession
      )
    },
    [favorites, updateAllFavorites]
  )

  const addNewFavorite = useCallback(
    (favorite: Favorite) => {
      updateAllFavorites([...(favorites || []), favorite])
    },
    [favorites, updateAllFavorites]
  )

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        removeFavorite,
        addNewFavorite,
        loading,
        updateLoading,
        deleteAllFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
