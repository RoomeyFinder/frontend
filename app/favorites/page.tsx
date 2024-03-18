"use client"
import { useSearchParams } from "next/navigation"
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react"
import { Suspense, useContext, useMemo } from "react"
import Empty from "../_components/Empty"
import EditableListingCard from "../_components/EditableListingCard"
import FavoritesHeader from "../_components/PageHeader"
import { ListingsContext } from "../_providers/ListingsProvider"
import { FavoritesContext } from "../_providers/FavoritesProvider"
import ListingsGridLayout from "../_components/ListingsGridLayout"

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

  return (
    <Box pos="relative" minH="80dvh">
      <FavoritesHeader
        pathname="/favorites"
        filters={["rooms", "roomies"]}
        heading="Favorites"
        isDisplayDynamic={false}
      />
      {!loading && (!favorites || favorites.length === 0) && (
        <Empty
          text={`${!filter || filter === "rooms" ? "Rooms" : "Roomies"}  you favorite will appear here.`}
        />
      )}

      {loading && (
        <Flex justifyContent="center" alignItems="center" minH="40dvh">
          <Spinner size="xl" color="brand.main" />
        </Flex>
      )}
      {favorites && favorites.length > 0 && <ListingsGridLayout list={["dfjka"]} />}
    </Box>
  )
}
