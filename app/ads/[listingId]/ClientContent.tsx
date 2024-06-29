"use client"
import Loading from "@/app/_assets/SVG/Loading"
import BackButton from "@/app/_components/BackButton"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"
import useAxios from "@/app/_hooks/useAxios"
import { useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
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
import { useParams } from "next/navigation"
import { useState, useMemo, useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import ListingAbout from "./_components/ListingAbout"
import ListingCTAs from "./_components/ListingCTAs"
import ListingFeatures from "./_components/ListingFeatures"
import ListingHeading from "./_components/ListingHeading"
import ListingMap from "./_components/ListingMap"
import ListingOwnerOverview from "./_components/ListingOwnerOverview"
import ListingPhotos from "./_components/ListingPhotos"

export default function ClientContent() {
  const params = useParams()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const listingId = useMemo(() => params.listingId, [params])
  const { fetchData } = useAxios()
  const [error, setError] = useState("")
  const fetchListingById = useCallback(async () => {
    const res = await fetchData({
      url: `/listings/${listingId}`,
      method: "get",
    })
    if (res.statusCode === 200) {
      setListing(res.listing)
    } else {
      setError(res.message || "Listing not found")
    }
    setLoading(false)
  }, [listingId, fetchData])

  useEffect(() => {
    fetchListingById()
  }, [fetchListingById])

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

  if (loading)
    return (
      <VStack w="full" minH="80dvh" alignItems="center" justifyContent="center">
        <Loading />
      </VStack>
    )

  if (!listing && !loading)
    return (
      <>
        <NoResultsDisplay
          heading="Oops! Ad not found!"
          body={
            <VStack>
              <Text fontSize="1.6rem">
                {error ||
                  "We couldn&apos;t find that ad. It may have been deleted"}
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
        gap={{ base: "3rem" }}
        alignItems="start"
        w="95%"
        maxW={{ sm: "95%", xl: "120rem" }}
        mx="auto"
        pt={{ base: "4rem", md: "2rem" }}
        pb={{ base: "8rem", md: "12rem" }}
      >
        <HStack w="full">
          <VStack gap="1.5rem" alignItems="start" w="full">
            <BackButton />
            {listing && (
              <>
                <ListingHeading
                  handleShare={handleShare}
                  isOwnListing={isOwnListing}
                  listing={listing}
                />
                <ListingPhotos photos={listing?.photos} />
              </>
            )}
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
        {listing && <ListingFeatures listing={listing} />}
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
