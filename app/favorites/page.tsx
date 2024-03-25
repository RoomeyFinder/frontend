"use client"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Box,
  Button,
  Flex,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react"
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
import NoWifi from "../_assets/SVG/NoWifi"

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
  const { favorites, loading, retriesCount, hasInitialized, retryInitialize } =
    useContext(FavoritesContext)
  const favoritesToDisplay = useMemo(
    () =>
      (favorites || []).filter((it) => {
        if (filter === "roomies") return it.type === FavoriteType.USER
        return it.type === FavoriteType.LISTING
      }),
    [favorites, filter]
  )
  const router = useRouter()
  return (
    <Box pos="relative" minH="80dvh">
      <FavoritesHeader
        pathname="/favorites"
        filters={["rooms", "roomies"]}
        heading="Favorites"
        isDisplayDynamic={false}
      />
      {!loading &&
        hasInitialized &&
        (!favoritesToDisplay || favoritesToDisplay.length === 0) && (
          <Empty
            text={`${!filter || filter === "rooms" ? "Rooms" : "Roomies"}  you favorite will appear here.`}
          />
        )}
      {retriesCount === 10 && !hasInitialized && (
        <Empty
          heading="Oops!"
          text={
            <VStack
              as="span"
              alignItems="start"
              justifyContent="start"
              gap="2rem"
            >
              <Text as="span">
                An error was encountered while trying to load your favorites
              </Text>
              <Button
                variant="brand-secondary"
                minW="16rem"
                onClick={() => retryInitialize()}
              >
                retry
              </Button>
            </VStack>
          }
          icon={<NoWifi />}
        />
      )}

      {loading && <CenteredSpinner />}
      <Box
        px={{ base: "2.5%", sm: "3%", md: "4%", lg: "10.5%" }}
        py={{ base: "3rem", md: "5rem" }}
        w="full"
      >
        {hasInitialized &&
          favoritesToDisplay &&
          favoritesToDisplay.length > 0 && (
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
