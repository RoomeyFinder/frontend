"use client"
import { ListingsContext } from "@/app/_providers/ListingsProvider"
import { Box, Divider, HStack, Heading, Hide, VStack } from "@chakra-ui/react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext, useEffect, useMemo } from "react"
import ListingHeading from "./_components/ListingHeading"
import ListingPhotos from "./_components/ListingPhotos"
import ListingOwnerOverview from "./_components/ListingOwnerOverview"
import ListingFeatures from "./_components/ListingFeatures"
import ListingAbout from "./_components/ListingAbout"
import ListingMap from "./_components/ListingMap"
import ListingCTAs from "./_components/ListingCTAs"
import { UserContext } from "@/app/_providers/UserProvider"
import ListingForm from "../_components/ListingForm"
import BackButton from "@/app/_components/BackButton"
import { SearchContext } from "@/app/_providers/SearchProvider"
import toast from "react-hot-toast"

export default function ListingPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { listings } = useContext(ListingsContext)
  const { rooms, loadingRooms } = useContext(SearchContext)
  const listingId = useMemo(() => params.listingId, [params])
  const isEditing = useMemo(
    () => searchParams.get("edit") === "true",
    [searchParams]
  )

  const listing = useMemo(
    () =>
      (isEditing ? listings : [...rooms, ...(listings || [])])?.find(
        (it) => it._id === listingId
      ),
    [rooms, listingId, isEditing, listings]
  )
  const { user } = useContext(UserContext)
  const isOwnListing = useMemo(
    () => user?._id === listing?.owner?._id,
    [user?._id, listing?.owner?._id]
  )

  useEffect(() => {
    if (!listing && !loadingRooms) router.push("/ads")
    // if (!isOwnListing && isEditing && !loadingRooms) router.push(`/ads/${listing?._id}`)
  }, [listing, loadingRooms, router, isOwnListing, isEditing])

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
  if (isEditing && listing)
    return (
      <>
        <Box alignItems="start" py="3rem" gap="3rem" w="86%" mx="auto">
          <BackButton />
          <ListingForm edit={true} listing={listing} />
        </Box>
      </>
    )
  if (!listing) return <></>
  return (
    <>
      <VStack
        gap={{ base: "3rem", md: "5rem" }}
        alignItems="start"
        w="100dvw"
        maxW={{ sm: "95%", xl: "160rem" }}
        mx="auto"
        pt={{ base: "4rem", md: "6rem" }}
        pb={{ base: "8rem", md: "12rem" }}
      >
        <HStack w="full">
          <VStack gap="1rem" alignItems="start" w="full">
            <BackButton />
            <ListingHeading
              handleShare={handleShare}
              isOwnListing={isOwnListing}
              listing={listing}
            />
            <ListingPhotos photos={listing?.photos} />
          </VStack>
        </HStack>
        <ListingOwnerOverview listing={listing} isOwnListing={isOwnListing} />
        <Divider
          border={{
            base: ".15rem solid #3A86FF1A",
            md: ".3rem solid #3A86FF1A",
          }}
        />
        <ListingFeatures listing={listing} />
        <ListingAbout listing={listing} />
        <Hide above="sm">
          <Box w="100%" h="30rem">
            <Heading px="1rem" fontSize="2.2rem" fontWeight="600" mb="2rem">
              Location
            </Heading>
            <ListingMap
              lng={listing.location?.coordinates[0]}
              lat={listing.location?.coordinates[1]}
              label={listing.streetAddress}
            />
          </Box>
        </Hide>
      </VStack>
      {!isOwnListing && (
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
