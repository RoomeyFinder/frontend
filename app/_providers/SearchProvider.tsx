"use client"
import { ReactNode, createContext, useEffect, useState } from "react"
import useManageFetchListings from "../_hooks/useManageFetchListings"
import User from "../_types/User"
import { Listing } from "../_types/Listings"
import { usePathname, useSearchParams } from "next/navigation"

export const SearchContext = createContext<{
  roomies: User[]
  rooms: Listing[]
  loadingRooms: boolean
  loadingRoomies: boolean
  loadMoreRoomies: () => void
  loadMoreRooms: () => void
  hasMoreRoomies: boolean
  hasMoreRooms: boolean
  search: string
  focus: "roomies" | "rooms" | ""
  setSearch: (s: string) => void
  setFocus: (val: "roomies" | "rooms" | "") => void
}>({
  roomies: [],
  rooms: [],
  loadingRooms: false,
  loadingRoomies: false,
  loadMoreRoomies: () => {},
  loadMoreRooms: () => {},
  setSearch: () => {},
  setFocus: () => {},
  hasMoreRoomies: true,
  hasMoreRooms: true,
  search: "",
  focus: "",
})

export default function SearchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [focus, setFocus] = useState<"roomies" | "rooms" | "">(
    (searchParams.get("focus") as any) || ""
  )
  const roomies = useManageFetchListings<User>({
    url: `/users?isProfileComplete=false`,
    method: "get",
    resultKey: "users",
    limit: 12,
  })
  const rooms = useManageFetchListings<Listing>({
    url: "/listings?isActivated=true&isDraft=false",
    method: "get",
    resultKey: "listings",
    limit: 12,
  })
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/" && search.length > 0) setSearch("")
  }, [pathname])

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
        search,
        focus,
        setSearch: (val: string) => setSearch(val),
        setFocus: (val: typeof focus) => setFocus(val),
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
