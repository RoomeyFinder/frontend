"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Box, Button, Flex, Spinner, VStack } from "@chakra-ui/react"
import { Suspense, useContext, useMemo } from "react"
import ListingForm from "./_components/ListingForm"
import MyAdsHeader from "../_components/PageHeader"
import Empty from "../_components/Empty"
import EditableListingCard from "../_components/EditableListingCard"
import { ListingsContext } from "../_providers/ListingsProvider"

export default function MyAds() {
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
  const router = useRouter()
  const { listings, loading } = useContext(ListingsContext)
  const currentDisplay = useMemo(
    () =>
      (searchParams.get("filter") || "active") as
        | "active"
        | "drafts"
        | "deactivated",
    [searchParams]
  )

  const listingsToDisplay = useMemo(() => {
    if (!listings) return []
    if (currentDisplay === "active")
      return listings.filter((it) => it.isActivated === true)
    else if (currentDisplay === "drafts")
      return listings.filter((it) => it.isDraft === true)
    else
      return listings.filter(
        (it) => it.isActivated === false && it.isDraft === false
      )
  }, [listings, currentDisplay])

  if (searchParams.get("new") === "true") {
    return (
      <Box>
        <ListingForm edit={false} />
      </Box>
    )
  }
  return (
    <Box pos="relative" minH="80dvh">
      <MyAdsHeader pathname="/my-ads" filters={["active", "drafts", "deactivated"]}>
        <Button
          onClick={() => router.push(`/my-ads?new=true`)}
          variant="brand-secondary"
          minW={{ md: "18.5rem" }}
          ml="auto"
        >
          Create ad
        </Button>
      </MyAdsHeader>
      {listingsToDisplay.length === 0 && !loading && <Empty text="No Ads" />}
      {listingsToDisplay.length > 0 && !loading && (
        <VStack
          py="5rem"
          alignItems="start"
          w="90dvw"
          maxW={{ xl: "80%" }}
          mx="auto"
          justifyContent="center"
          gap="1.8rem"
        >
          {listingsToDisplay.map((listing) => (
            <EditableListingCard listing={listing} key={listing._id} />
          ))}
        </VStack>
      )}
      {loading && <Spinner />}
    </Box>
  )
}
