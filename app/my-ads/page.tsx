"use client"
import { useSearchParams } from "next/navigation"
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react"
import { Suspense } from "react"
import ListingForm from "./_components/ListingForm"
import MyAdsHeader from "./_components/PageHeader"
import Empty from "../_components/Empty"
import EditableListingCard from "../_components/EditableListingCard"

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
      {/* <Empty text="No Ads"/> */}
      <VStack
        py="5rem"
        alignItems="start"
        w="90dvw"
        maxW={{ lg: "80%" }}
        mx="auto"
        justifyContent="center"
        gap="1.8rem"
      >
        {/* <EditableListingCard />
        <EditableListingCard />
        <EditableListingCard />
        <EditableListingCard /> */}
        <EditableListingCard />
      </VStack>
    </Box>
  )
}
