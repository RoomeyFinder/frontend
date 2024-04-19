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
import { Listing } from "../_types/Listings"
import useGetFromStorage from "../_hooks/useGetFromStorage"

export const ListingsContext = createContext<{
  listings: Listing[] | null
  addNewListing: (data: Listing, useSession?: boolean) => void
  updateListing: (data: Listing, useSession?: boolean) => void
  deleteListing: (_id: string, useSession?: boolean) => void
  deleteAllListings: (_id: string, useSession?: boolean) => void
  loading: boolean
  updateLoading: (upd?: boolean) => void
  reloadListings: () => void
  failedToFetch: boolean
  retriesCount: number
    }>({
      listings: [],
      updateListing: () => {},
      deleteListing: () => {},
      addNewListing: () => {},
      updateLoading: () => {},
      deleteAllListings: () => {},
      loading: true,
      reloadListings: () => {},
      failedToFetch: false,
      retriesCount: 0,
    })

export default function ListingsProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: storedListings,
    updateData: updateAllListings,
    deleteData: deleteAllListings,
    loading,
    updateLoading,
  } = useGetFromStorage<Listing[] | null>("RF_USER_LISTINGS")

  const [failedToFetch, setFailedToFetch] = useState(false)
  const [listings, setListings] = useState<Listing[]>([])
  const [retriesCount, setRetriesCount] = useState(0)
  const [hasInitialized, setHasInitialized] = useState(false)

  const { fetchData } = useAxios()

  const fetchListings = useCallback(async () => {
    if (!isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/listings/me",
      method: "get",
    })
    if (res.statusCode === 200) {
      setHasInitialized(true)
      updateAllListings(res.listings)
      setListings(res.listings)
      setRetriesCount(0)
    } else if (res.statusCode === 403) resetAuthorization()
    else {
      setFailedToFetch(true)
      setRetriesCount(retriesCount + 1)
    }
    updateLoading(false)
  }, [
    fetchData,
    resetAuthorization,
    updateAllListings,
    updateLoading,
    isAuthorized,
    retriesCount
  ])

  useEffect(() => {
    if (
      storedListings === null &&
      hasInitialized === false &&
      retriesCount < 10
    )
      fetchListings()
  }, [storedListings, fetchListings, hasInitialized, retriesCount])

  useEffect(() => {
    if (failedToFetch && !loading && storedListings !== null)
      setListings(storedListings)
  }, [failedToFetch, loading, storedListings])

  const updateListing = useCallback(
    (listing: Listing, useSession?: boolean) => {
      const update = (storedListings || []).map((it: Listing) =>
        it._id === listing._id ? listing : it
      )
      updateAllListings(update, useSession)
      setListings(update)
    },
    [storedListings, updateAllListings]
  )
  const deleteListing = useCallback(
    (id: string, useSession?: boolean) => {
      const update = (storedListings || []).filter(
        (it: Listing) => it._id !== id
      )
      updateAllListings(update, useSession)
      setListings(update)
    },
    [storedListings, updateAllListings]
  )

  const addNewListing = useCallback(
    (listing: Listing) => {
      updateAllListings([...(storedListings || []), listing])
      setListings([...(storedListings || []), listing])
    },
    [storedListings, updateAllListings]
  )

  return (
    <ListingsContext.Provider
      value={{
        listings,
        updateListing,
        deleteListing,
        addNewListing,
        loading,
        updateLoading,
        deleteAllListings,
        failedToFetch,
        reloadListings: () => {
          fetchListings()
          setRetriesCount(1)
        },
        retriesCount,
      }}
    >
      {children}
    </ListingsContext.Provider>
  )
}
