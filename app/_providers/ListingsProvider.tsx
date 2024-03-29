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
}>({
  listings: [],
  updateListing: () => {},
  deleteListing: () => {},
  addNewListing: () => {},
  updateLoading: () => {},
  deleteAllListings: () => {},
  loading: true,
})

export default function ListingsProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: listings,
    updateData: updateAllListings,
    deleteData: deleteAllListings,
    loading,
    updateLoading,
  } = useGetFromStorage<Listing[] | null>("RF_USER_LISTINGS")

  const [retriesCount, setRetriesCount] = useState(0)
  const [hasInitialized, setHasInitialized] = useState(false)

  const { fetchData } = useAxios()

  const fetchListings = useCallback(async () => {
    if (listings || !isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/listings/me",
      method: "get",
    })
    if (res.statusCode === 200) {
      setHasInitialized(true)
      updateAllListings(res.listings)
      setRetriesCount(0)
    } else if (res.statusCode === 403) resetAuthorization()
    else {
      setRetriesCount(retriesCount + 1)
    }
    updateLoading(false)
  }, [
    fetchData,
    resetAuthorization,
    listings,
    updateAllListings,
    updateLoading,
    isAuthorized,
  ])

  useEffect(() => {
    if (listings === null && hasInitialized === false && retriesCount < 10)
      fetchListings()
  }, [listings, fetchListings, hasInitialized, retriesCount])

  const updateListing = useCallback(
    (listing: Listing, useSession?: boolean) => {
      updateAllListings(
        listings?.map((it: Listing) => (it._id === listing._id ? listing : it)),
        useSession
      )
    },
    [listings, updateAllListings]
  )
  const deleteListing = useCallback(
    (id: string, useSession?: boolean) => {
      updateAllListings(
        listings?.filter((it: Listing) => it._id !== id),
        useSession
      )
    },
    [listings, updateAllListings]
  )

  const addNewListing = useCallback(
    (listing: Listing) => {
      updateAllListings([...(listings || []), listing])
    },
    [listings, updateAllListings]
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
      }}
    >
      {children}
    </ListingsContext.Provider>
  )
}
