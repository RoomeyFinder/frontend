"use client"
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Hide,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext, useEffect, useMemo } from "react"
import ListingHeading from "./_components/ListingHeading"
import ListingPhotos from "./_components/ListingPhotos"
import ListingOwnerOverview from "./_components/ListingOwnerOverview"
import ListingFeatures from "./_components/ListingFeatures"
import ListingAbout from "./_components/ListingAbout"
import ListingMap from "./_components/ListingMap"
import ListingCTAs from "./_components/ListingCTAs"
import ListingForm from "../_components/ListingForm"
import BackButton from "@/app/_components/BackButton"
import { SearchContext } from "@/app/_providers/SearchProvider"
import toast from "react-hot-toast"
import { useAppSelector } from "@/app/_redux"
import NoResults from "@/app/_assets/SVG/NoResults"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"

export default function ListingPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { listings, loading } = useAppSelector((store) => store.search)
  const listingId = useMemo(() => params.listingId, [params])

  const listing = useMemo(
    () => listings?.find((it) => it._id === listingId),
    [listings]
  )
  const { user } = useAppSelector((store) => store.auth)
  const isOwnListing = useMemo(
    () => user?._id === listing?.owner?._id,
    [user?._id, listing?.owner?._id]
  )
  const handleShare = useCallback(async () => {
    const shareData = {
      url: window.location.href,
      title: "RoomeyFinder",
      text: `Stay with ${listing?.owner?.firstName}`,
    }
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        toast.error("Unable to share, something went wrong")
        console.log(err)
      }
    } else {
      navigator.clipboard.writeText(shareData.url)
      toast.success("Copied to clipboard!")
    }
  }, [listing])
  if (!listing && !loading)
    return (
      <>
        <NoResultsDisplay
          heading="Oops! Ad not found!"
          body={
            <VStack>
              <Text fontSize="1.6rem">
                We couldn't find that ad. It may have been deleted
              </Text>
              <Button variant="brand" mt="2.4rem">
                Find other ads
              </Button>
            </VStack>
          }
        />
      </>
    )
  return (
    <>
      <VStack
        gap={{ base: "3rem", md: "5rem" }}
        alignItems="start"
        w="95%"
        maxW={{ sm: "95%", xl: "160rem" }}
        mx="auto"
        pt={{ base: "4rem", md: "6rem" }}
        pb={{ base: "8rem", md: "12rem" }}
      >
        <HStack w="full">
          <VStack gap="1rem" alignItems="start" w="full">
            <BackButton />
            {listing && (
              <ListingHeading
                handleShare={handleShare}
                isOwnListing={isOwnListing}
                listing={listing}
              />
            )}
            <ListingPhotos photos={listing?.photos} />
          </VStack>
        </HStack>
        {listing && (
          <ListingOwnerOverview listing={listing} isOwnListing={isOwnListing} />
        )}
        <Divider
          border={{
            base: ".15rem solid #3A86FF1A",
            md: ".3rem solid #3A86FF1A",
          }}
        />
        {/* <ListingFeatures listing={listing} /> */}
        {listing && <ListingAbout listing={listing} />}
        <Hide above="sm">
          <Box w="100%" h="30rem">
            <Heading px="1rem" fontSize="2.2rem" fontWeight="600" mb="2rem">
              Location
            </Heading>
            <ListingMap
              lng={listing?.location?.coordinates[0]}
              lat={listing?.location?.coordinates[1]}
              label={listing?.streetAddress}
            />
          </Box>
        </Hide>
      </VStack>
      {!isOwnListing && listing && (
        <Hide above="sm">
          <ListingCTAs
            handleShare={handleShare}
            isOwner={isOwnListing}
            listing={listing}
          />
        </Hide>
      )}
    </>
  )
}
