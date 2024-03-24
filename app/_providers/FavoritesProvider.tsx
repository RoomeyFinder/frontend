"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import useAxios from "../_hooks/useAxios"
import { AuthContext } from "./AuthContext"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import Favorite from "../_types/Favorites"
import useAppToast from "../_hooks/useAppToast"

export const FavoritesContext = createContext<{
  favorites: Favorite[] | null
  addNewFavorite: (data: Favorite, useSession?: boolean) => void
  deleteSingleFavorite: (data: Favorite, useSession?: boolean) => void
  removeFavorite: (id: string, useSession?: boolean) => void
  deleteAllFavorites: (_id: string, useSession?: boolean) => void
  loading: boolean
  updateLoading: (upd?: boolean) => void
  hasInitialized: boolean
  retriesCount: number
  retryInitialize: () => void
}>({
  favorites: [],
  removeFavorite: () => {},
  addNewFavorite: () => {},
  deleteSingleFavorite: () => {},
  updateLoading: () => {},
  deleteAllFavorites: () => {},
  loading: true,
  retriesCount: 0,
  hasInitialized: false,
  retryInitialize: () => {},
})

export default function FavoritesProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const [retriesCount, setRetriesCount] = useState(0)
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: favorites,
    updateData: updateAllFavorites,
    deleteData: deleteAllFavorites,
    loading,
    updateLoading,
  } = useGetFromStorage("RF_USER_FAVORITES")
  const [hasInitialized, setHasInitialized] = useState(false)
  const { fetchData } = useAxios()

  const fetchFavorites = useCallback(async () => {
    if (favorites || !isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/favorites/me",
      method: "get",
    })
    if (res.statusCode === 200) {
      updateAllFavorites(res.favorites)
      setHasInitialized(true)
      updateLoading(false)
    } else if (res.statusCode === 403) resetAuthorization()
    else {
      setRetriesCount(retriesCount + 1)
      if (retriesCount === 9) updateLoading(false)
    }
  }, [
    fetchData,
    resetAuthorization,
    favorites,
    updateAllFavorites,
    updateLoading,
    isAuthorized,
    retriesCount,
  ])

  const retryInitialize = useCallback(() => {
    setRetriesCount(0)
    updateLoading(true)
  }, [])

  useEffect(() => {
    const initializeInterval = setInterval(() => {
      if (hasInitialized === false && retriesCount < 10) fetchFavorites()
    }, 3000)
    return () => {
      clearInterval(initializeInterval)
    }
  }, [fetchFavorites, hasInitialized, retriesCount])

  useEffect(() => {
    if (favorites !== null && hasInitialized === false) setHasInitialized(true)
  }, [favorites, hasInitialized])

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
      console.log("favorite", favorites, "ljhgdfs")
      updateAllFavorites([
        ...((favorites || []) as Favorite[]).filter(
          (it) => it._id !== favorite._id
        ),
        favorite,
      ])
    },
    [favorites, updateAllFavorites]
  )
  const deleteSingleFavorite = useCallback(
    (favorite: Favorite) => {
      updateAllFavorites([
        ...((favorites || []) as Favorite[]).filter(
          (it) => it._id !== favorite._id
        ),
      ])
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
        retriesCount,
        hasInitialized,
        retryInitialize,
        deleteSingleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
