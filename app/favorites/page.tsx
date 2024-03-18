"use client"
import { useSearchParams } from "next/navigation"
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react"
import { Suspense, useContext, useMemo } from "react"
import Empty from "../_components/Empty"
import EditableListingCard from "../_components/EditableListingCard"
import FavoritesHeader from "../_components/PageHeader"
import { ListingsContext } from "../_providers/ListingsProvider"

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
  return (
    <Box pos="relative" minH="80dvh">
      <FavoritesHeader
        pathname="/favorites"
        filters={["rooms", "roomies"]}
        heading="Favorites"
        isDisplayDynamic={false}
      />
    </Box>
  )
}
