"use client"
import { ReactNode, createContext } from "react"
import useManageFetchListings from "../_hooks/useManageFetchListings"
import User from "../_types/User"
import { Listing } from "../_types/Listings"

export const SearchContext = createContext<{
  roomies: User[]
  rooms: Listing[]
  loadingRooms: boolean
  loadingRoomies: boolean
  loadMoreRoomies: () => void
  loadMoreRooms: () => void
  hasMoreRoomies: boolean
  hasMoreRooms: boolean
}>({
  roomies: [],
  rooms: [],
  loadingRooms: false,
  loadingRoomies: false,
  loadMoreRoomies: () => {},
  loadMoreRooms: () => {},
  hasMoreRoomies: true,
  hasMoreRooms: true,
})

export default function SearchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const roomies = useManageFetchListings<User>({
    url: `/users?isProfileComplete=false`,
    method: "get",
    resultKey: "users",
  })
  const rooms = useManageFetchListings<Listing>({
    url: "/listings?isActivated=true&isDraft=false",
    method: "get",
    resultKey: "listings",
  })
  return (
    <SearchContext.Provider
      value={{
        roomies: roomies["users"] as User[],
        rooms: rooms["listings"] as Listing[],
        loadingRoomies: roomies.loading,
        loadingRooms: rooms.loading,
        loadMoreRoomies: roomies.goToNextPage,
        loadMoreRooms: rooms.goToNextPage,
        hasMoreRoomies: roomies.hasMore,
        hasMoreRooms: rooms.hasMore,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
