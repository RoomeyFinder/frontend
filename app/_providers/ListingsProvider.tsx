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
import User, { Listing } from "../_types/Listings"
import useGetFromStorage from "../_hooks/useGetFromStorage"

export const ListingsContext = createContext<{
  listings: Listing[] | null
  addNewListing: (data: Listing, useSession?: boolean) => void
  updateListing: (data: Listing, useSession?: boolean) => void
  deleteListing: (_id: string, useSession?: boolean) => void
  loading: boolean
  updateLoading: (upd?: boolean) => void
}>({
  listings: [] ,
  updateListing: () => {},
  deleteListing: () => {},
  addNewListing: () => {},
  updateLoading: () => {},
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
    deleteData: deleteListings,
    loading,
    updateLoading,
  } = useGetFromStorage("RF_USER_LISTINGS")

  const { fetchData } = useAxios()

  const fetchListings = useCallback(async () => {
    if (listings || !isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/listings/me",
      method: "get",
    })
    if (res.statusCode === 200) updateAllListings(res.listings)
    else if (res.statusCode === 403) resetAuthorization()
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
    fetchListings()
  }, [fetchListings])

  const updateListing = useCallback(
    (listing: Listing, useSession?: boolean) => {
      updateAllListings(
        listings.map((it: Listing) => (it._id === listing._id ? listing : it)),
        useSession
      )
    },
    [listings, updateAllListings]
  )
  const deleteListing = useCallback(
    (id: string, useSession?: boolean) => {
      updateAllListings(
        listings.filter((it: Listing) => (it._id !== id)),
        useSession
      )
    },
    [listings, updateAllListings]
  )

  const addNewListing = useCallback((listing: Listing) => {
    updateAllListings([...listings, listing])
  }, [listings, updateAllListings])

  return (
    <ListingsContext.Provider
      value={{
        listings,
        updateListing,
        deleteListing,
        addNewListing,
        loading,
        updateLoading,
      }}
    >
      {children}
    </ListingsContext.Provider>
  )
}
