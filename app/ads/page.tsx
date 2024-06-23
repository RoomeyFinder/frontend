"use client"
import { Box, Heading } from "@chakra-ui/react"
import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import Loading from "../_assets/SVG/Loading"
import Empty from "../_components/Empty"
import ListingsGridLayout from "../_components/ListingsGridLayout"
import RoomListingCard from "../_components/RoomListingCard"
import { RoomListingCardSkeleton } from "../_components/Skeletons/ListingCardSkeleton"
import { fetchListings } from "../_redux/thunks/search.thunk"

export default function Search() {
  const { hasFetchedInitialListings } = useAppSelector((store) => store.search)
  const dispatch = useAppDispatch()
  useEffect(() => {
    !hasFetchedInitialListings && dispatch(fetchListings())
  }, [dispatch, hasFetchedInitialListings])
  return <ListingsSection />
}
//search page
function ListingsSection() {
  const { user } = useAppSelector((store) => store.auth)
  const { listings, loading } = useAppSelector((store) => store.search)
  if (listings.length === 0 && !loading) return null
  return (
    <>
      <>
        <ListSectionContainer>
          <Heading variant="md" fontWeight="500">Latest Rooms</Heading>
          {loading ? (
            <Box opacity=".8" mx="auto" w="100%" maxW="40rem">
              <Loading />
            </Box>
          ) : (
            <RoomsList
              rooms={listings}
              allowFavoriting={user !== null}
              loading={loading}
              emptyTextValue={<>No rooms found</>}
            />
          )}
        </ListSectionContainer>
      </>
    </>
  )
}

function ListSectionContainer({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Box
      w={{ base: "95dvw", md: "full" }}
      maxW={{ base: "94%", xl: "123rem" }}
      mx="auto"
      display="flex"
      flexDir="column"
      gap="3rem"
      py={{ base: "3rem", md: "6rem" }}
    >
      {children}
    </Box>
  )
}

function RoomsList({
  rooms,
  // allowFavoriting,
  loading,
  emptyTextValue,
}: {
  rooms: Listing[]
  allowFavoriting: boolean
  loading: boolean
  emptyTextValue: ReactNode
}) {
  if (loading)
    return (
      <ListingsGridLayout
        list={new Array(12).fill(1).map((_, idx) => (
          <RoomListingCardSkeleton key={idx} />
        ))}
      />
    )
  if (rooms.length === 0 && !loading)
    return <Empty heading="Oops" text={emptyTextValue} />
  return (
    <>
      <ListingsGridLayout
        list={rooms.map((room) => (
          <RoomListingCard key={room._id} listing={room} variant="outlined" />
        ))}
        justifyContent="start"
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        alignItems="stretch"
      ></ListingsGridLayout>
    </>
  )
}
