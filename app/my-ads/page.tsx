"use client"
import { useSearchParams } from "next/navigation"
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react"
import { Suspense, useContext, useMemo, useState } from "react"
import ListingForm from "./_components/ListingForm"
import MyAdsHeader from "./_components/PageHeader"
import Empty from "../_components/Empty"
import EditableListingCard from "../_components/EditableListingCard"
import { ListingsContext } from "../_providers/ListingsProvider"

export default function Profile() {
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
  const { listings, loading } = useContext(ListingsContext)
  const currentDisplay = useMemo(
    () => (searchParams.get("filter") || "active") as "active" | "drafts" | "deactivated",
    [searchParams]
  )

  if (searchParams.get("new") === "true") {
    return (
      <Box>
        <ListingForm edit={false} listingId={null} />
      </Box>
    )
  }
  return (
    <Box pos="relative" minH="80dvh">
      <MyAdsHeader />
      {(!listings || listings[currentDisplay].length === 0) && !loading && (
        <Empty text="No Ads" />
      )}
      {listings && listings[currentDisplay].length > 0 && !loading && (
        <VStack
          py="5rem"
          alignItems="start"
          w="90dvw"
          maxW={{ xl: "80%" }}
          mx="auto"
          justifyContent="center"
          gap="1.8rem"
        >
          {listings[currentDisplay].map((listing) => (
            <EditableListingCard listing={listing} key={listing._id} />
          ))}
        </VStack>
      )}
      {loading && <Spinner />}
    </Box>
  )
}
