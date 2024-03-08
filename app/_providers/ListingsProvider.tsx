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
  listings: {
    active: Listing[]
    drafts: Listing[]
    deactivated: Listing[]
  } | null
  updateListings: (data: User, useSession?: boolean) => void
  deleteListings: () => void
  loading: boolean
  updateLoading: (upd?: boolean) => void
}>({
  listings: null,
  updateListings: () => {},
  deleteListings: () => {},
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
    updateData: updateListings,
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
    if (res.statusCode === 200) updateListings(res.listings)
    else if (res.statusCode === 403) resetAuthorization()
    updateLoading(false)
  }, [
    fetchData,
    resetAuthorization,
    listings,
    updateListings,
    updateLoading,
    isAuthorized,
  ])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  return (
    <ListingsContext.Provider
      value={{
        listings,
        updateListings,
        deleteListings,
        loading,
        updateLoading,
      }}
    >
      {children}
    </ListingsContext.Provider>
  )
}
