"use client"
import { useSearchParams } from "next/navigation"
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react"
import { Suspense, useContext, useMemo } from "react"
import Empty from "../_components/Empty"
import FavoritesHeader from "../_components/PageHeader"
import { FavoritesContext } from "../_providers/FavoritesProvider"
import ListingsGridLayout from "../_components/ListingsGridLayout"
import CenteredSpinner from "../_components/CenteredSpinner"
import RoomListingCard from "../_components/RoomListingCard"
import RoomeyListingCard from "../_components/RoomeyListingCard"
import { FavoriteType } from "../_types/Favorites"
import User from "../_types/User"
import { Listing } from "../_types/Listings"

export default function Favorites() {
  return (
    <Suspense
      fallback={
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" thickness=".4rem" />
        </Flex>
      }
    >
      <Renderer />
    </Suspense>
  )
}

function Renderer() {
  const searchParams = useSearchParams()
  const filter = useMemo(() => {
    return searchParams.get("filter")
  }, [searchParams])
  const { favorites, loading } = useContext(FavoritesContext)
  const favoritesToDisplay = useMemo(
    () =>
      (favorites || []).filter((it) => {
        if (filter === "roomies") return it.type === FavoriteType.USER
        return it.type === FavoriteType.LISTING
      }),
    [favorites, filter]
  )
  return (
    <Box pos="relative" minH="80dvh">
      <FavoritesHeader
        pathname="/favorites"
        filters={["rooms", "roomies"]}
        heading="Favorites"
        isDisplayDynamic={false}
      />
      {!loading && (!favoritesToDisplay || favoritesToDisplay.length === 0) && (
        <Empty
          text={`${!filter || filter === "rooms" ? "Rooms" : "Roomies"}  you favorite will appear here.`}
        />
      )}

      {loading && <CenteredSpinner />}
      <Box
        px={{ base: "2.5%", sm: "3%", md: "4%", lg: "10.5%" }}
        py={{ base: "3rem", md: "5rem" }}
        w="full"
      >
        {favoritesToDisplay && favoritesToDisplay.length > 0 && (
          <ListingsGridLayout
            list={favoritesToDisplay.map((favorite) => (
              <FavoriteComponent
                document={favorite.doc}
                key={favorite._id}
                filter={filter}
              />
            ))}
            justifyContent="start"
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
          />
        )}
      </Box>
    </Box>
  )
}

function FavoriteComponent({
  filter,
  document,
}: {
  filter: string | null
  document: User | Listing
}) {
  if (filter === "roomies") {
    let roomey = document as User
    return (
      <RoomeyListingCard
        name={roomey.firstName}
        ageInYears={
          new Date().getFullYear() - new Date(roomey.dob).getFullYear()
        }
        about={roomey.about}
        isFavourite={true}
        userId={roomey._id}
        variant="outlined"
      />
    )
  }
  let listing = document as Listing
  return (
    <RoomListingCard
      ownersName={listing.owner?.firstName as string}
      ownersOccupation={listing.owner?.occupation as string}
      city={listing.city as string}
      isFavourite={true}
      rentAmount={(listing.rentAmount || 0) as number}
      rentDuration={listing.rentDuration as any}
      title={listing.lookingFor as string}
      images={listing.photos || []}
      listingId={listing._id}
      variant="outlined"
      showFavoriteButton
    />
  )
}
