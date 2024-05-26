"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Box, Button, Flex, Spinner, VStack } from "@chakra-ui/react"
import { Suspense, useEffect, useMemo } from "react"
import ListingForm from "./_components/ListingForm"
import MyAdsHeader from "../../_components/PageHeader"
import EditableListingCard from "../../_components/EditableListingCard"
import CenteredSpinner from "../../_components/CenteredSpinner"
import FailureUIWithRetryButton from "../../_components/FailureUIWithRetryButton"
import Empty from "../../_components/Empty"
import BackButton from "../../_components/BackButton"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { fetchUserListings } from "@/app/_redux/thunks/listings.thunk"

export default function MyAds() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUserListings())
  }, [dispatch])
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
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { listings, loading, errorMessage, hasError } = useAppSelector(
    (store) => store.listings
  )
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
      <Box alignItems="start" py="3rem" gap="3rem" w="86%" mx="auto">
        <BackButton />
        <ListingForm edit={false} />
      </Box>
    )
  }
  return (
    <Box pos="relative" minH="80dvh">
      <MyAdsHeader
        pathname="/nexus/ads"
        heading={`${currentDisplay} ${!currentDisplay.toLowerCase().includes("drafts") ? "ads" : ""}`}
        filters={["active", "drafts", "deactivated"]}
      >
        <Button
          onClick={() => router.push("/nexus/ads?new=true")}
          variant="brand-secondary"
          minW={{ md: "18.5rem" }}
          ml="auto"
        >
          Create ad
        </Button>
      </MyAdsHeader>
      {hasError && !loading && (
        <FailureUIWithRetryButton
          text={errorMessage}
          handleRetry={() => dispatch(fetchUserListings())}
        />
      )}
      {listingsToDisplay.length === 0 && !loading && (
        <Empty
          heading={`You do not have any ${currentDisplay} ${currentDisplay !== "drafts" ? "ads" : ""}`}
          text={"Ads you create will appear here."}
        />
      )}
      {listingsToDisplay.length > 0 && !loading && (
        <VStack
          py="5rem"
          alignItems="start"
          w="100%"
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
      {loading && <CenteredSpinner />}
    </Box>
  )
}
