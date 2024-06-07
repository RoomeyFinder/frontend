"use client"
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { Suspense, useMemo } from "react"
import ListingsGridLayout from "../../_components/ListingsGridLayout"
import CenteredSpinner from "../../_components/CenteredSpinner"
import RoomListingCard from "../../_components/RoomListingCard"
import RoomeyListingCard from "../../_components/RoomeyListingCard"
import Favorite, { FavoriteType } from "../../_types/Favorites"
import User from "../../_types/User"
import { Listing } from "../../_types/Listings"
import { withPrependPortal } from "@/app/_components/_HOC/withPrependPortal"
import AppNotification from "@/app/_components/AppNotification"
import { resetError } from "@/app/_redux/slices/favorites.slice"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"

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
  const dispatch = useAppDispatch()
  const { favorites, loading, hasError, errorMessage } = useAppSelector(
    (store) => store.favorites
  )
  const favoriteRooms = useMemo(
    () =>
      favorites.filter((it) => {
        return it.type === FavoriteType.LISTING
      }),
    [favorites]
  )
  const favoriteRoomies = useMemo(
    () =>
      favorites.filter((it) => {
        return it.type === FavoriteType.USER
      }),
    [favorites]
  )
  return (
    <Box pos="relative" py="3rem">
      {withPrependPortal(
        <AppNotification
          onClose={() => {
            dispatch(resetError())
          }}
        >
          {hasError && errorMessage}
        </AppNotification>,
        document.body
      )}
      <Heading
        mb={{ base: "2.2rem" }}
        w="full"
        px={{ base: "2rem", md: "5rem" }}
        fontSize={{ base: "2.6rem", sm: "3.2rem" }}
        fontWeight="500"
      >
        Favorites
      </Heading>
      <Tabs isFitted variant="line" colorScheme="blackAlpha" size="lg">
        <TabList fontSize="1.4rem">
          <Tab
            px="0"
            fontSize={{ base: "1.4rem", md: "1.6rem" }}
            fontWeight="600"
          >
            Rooms ({favoriteRooms.length})
          </Tab>
          <Tab
            px="0"
            fontSize={{ base: "1.4rem", md: "1.6rem" }}
            fontWeight="600"
          >
            Roomies ({favoriteRoomies.length})
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            {
              <FavoritesList
                currentDisplay="Listings"
                favorites={favoriteRooms}
                loading={loading}
              />
            }
          </TabPanel>
          <TabPanel px="0">
            {
              <FavoritesList
                currentDisplay="Users"
                favorites={favoriteRoomies}
                loading={loading}
              />
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
      {loading && <CenteredSpinner />}
    </Box>
  )
}

function FavoritesList({
  favorites,
  currentDisplay,
  loading,
}: {
  favorites: Favorite[]
  currentDisplay: string
  loading: boolean
}) {
  if (favorites.length === 0 && !loading)
    return (
      <NoResultsDisplay
        heading={<>Oops! Nothing here.</>}
        body={<>{currentDisplay} you mark as favorite will appear here.</>}
      />
    )
  return (
    <Box w="full" py="4rem" h="100dvh" px={{ base: "1.8rem", md: "4rem" }}>
      <ListingsGridLayout
        list={favorites.map((favorite) => (
          <FavoriteComponent
            document={favorite.doc}
            key={favorite._id}
            filter={FavoriteType.LISTING}
          />
        ))}
        justifyContent="start"
        columns={{ base: 1, sm: 2, lg: 3 }}
        alignItems="stretch"
      />
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
    const roomey = document as User
    return <RoomeyListingCard user={roomey} variant="outlined" />
  }
  const listing = document as Listing
  return (
    <RoomListingCard variant="outlined" showFavoriteButton listing={listing} />
  )
}
