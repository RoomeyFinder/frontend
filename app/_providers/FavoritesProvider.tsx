"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import useAxios from "../_hooks/useAxios"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import Favorite from "../_types/Favorites"
import { logout } from "../_redux/slices/auth.slice"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../_redux"

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
  const [failedToFetch, setFailedToFetch] = useState(false)
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const dispatch = useDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const {
    data: storedFavorites,
    updateData: updateAllFavorites,
    deleteData: deleteAllFavorites,
    loading,
    updateLoading,
  } = useGetFromStorage<Favorite[]>("RF_USER_FAVORITES")
  const [hasInitialized, setHasInitialized] = useState(false)
  const { fetchData } = useAxios()

  const fetchFavorites = useCallback(async () => {
    if (!user) return
    updateLoading(true)
    const res = await fetchData({
      url: "/favorites/me",
      method: "get",
    })
    if (res.statusCode === 200) {
      updateAllFavorites(res.favorites)
      setFavorites(res.favorites)
      setHasInitialized(true)
      updateLoading(false)
    } else if (res.statusCode === 403) dispatch(logout())
    else {
      setRetriesCount(retriesCount + 1)

      if (retriesCount >= 10) {
        updateLoading(false)
        setFailedToFetch(true)
      }
    }
  }, [
    fetchData,
    dispatch,
    updateAllFavorites,
    updateLoading,
    user,
    retriesCount,
  ])

  const retryInitialize = useCallback(() => {
    setRetriesCount(0)
    updateLoading(true)
  }, [updateLoading])

  // useEffect(() => {
  //   const initializeInterval = setInterval(() => {
  //     if (hasInitialized === false && retriesCount < 10) fetchFavorites()
  //   }, 3000)
  //   return () => {
  //     clearInterval(initializeInterval)
  //   }
  // }, [fetchFavorites, hasInitialized, retriesCount])

  useEffect(() => {
    if (failedToFetch && storedFavorites !== null) {
      setFavorites(storedFavorites)
      setHasInitialized(true)
    }
  }, [failedToFetch, storedFavorites])

  const removeFavorite = useCallback(
    (id: string, useSession?: boolean) => {
      const update = favorites?.filter((it: Favorite) => it._id !== id)
      updateAllFavorites([...(update || [])], useSession)
      setFavorites([...(update || [])])
    },
    [favorites, updateAllFavorites]
  )

  const addNewFavorite = useCallback(
    (favorite: Favorite) => {
      const prev = [
        ...((favorites || []) as Favorite[]).filter(
          (it) => it._id !== favorite._id
        ),
      ]
      updateAllFavorites([...prev, favorite])
      setFavorites([...prev, favorite])
    },
    [favorites, updateAllFavorites]
  )
  const deleteSingleFavorite = useCallback(
    (favorite: Favorite) => {
      const update = [
        ...((storedFavorites || []) as Favorite[]).filter(
          (it) => it._id !== favorite._id
        ),
      ]
      updateAllFavorites([...update])
      setFavorites([...update])
    },
    [storedFavorites, updateAllFavorites]
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
