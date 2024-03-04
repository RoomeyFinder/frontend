"use client"
import { useSearchParams } from "next/navigation"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import { Suspense } from "react"
import ListingForm from "./_components/ListingForm"
import MyAdsHeader from "./_components/PageHeader"
import Empty from "../_components/Empty"

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
    <Box pos="relative" h="calc(100dvh - 23%)">
      <MyAdsHeader />
      <Empty text="No Ads"/>
    </Box>
  )
}
