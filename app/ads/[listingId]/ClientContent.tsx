"use client"
import Loading from "@/app/_assets/SVG/Loading"
import BackButton from "@/app/_components/BackButton"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"
import useAxios from "@/app/_hooks/useAxios"
import { useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Hide,
  SimpleGrid,
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
import ListingPhotos from "./_components/ListingPhotos"
import { capitalizeFirstLetter, rentDurationMapping } from "@/app/_utils"
import InterestButton from "@/app/_components/InterestButton"

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
        maxW={{ sm: "90%", md: "88dvw", xl: "125rem" }}
        mx="auto"
        pt={{ base: "7.5rem" }}
        pb={{ base: "8rem", md: "12rem" }}
      >
        <BackButton left="" />
        <VStack gap="1.5rem" alignItems="start" w="full">
          {listing && (
            <>
              <Hide below="sm">
                <ListingHeading
                  handleShare={handleShare}
                  isOwnListing={isOwnListing}
                  listing={listing}
                />
              </Hide>
              <ListingPhotos photos={listing?.photos} />
            </>
          )}
        </VStack>
        {/* {listing && (
          <ListingOwnerOverview listing={listing} isOwnListing={isOwnListing} />
        )} */}

        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          px={{ base: "" }}
          rowGap={{ base: "4rem", sm: "8rem" }}
          display={{ base: "flex", sm: "grid" }}
          flexDir={{ base: "column-reverse" }}
        >
          <VStack alignItems="start" gap="1.8rem">
            <HStack
              alignItems="center"
              gap="1rem"
              w="full"
              mb="1rem"
              px={{ base: "1rem", sm: "0" }}
            >
              <Avatar
                src={listing?.owner?.profileImage?.secure_url}
                name={
                  listing?.owner?.firstName + " " + listing?.owner?.lastName
                }
                size="xl"
              />
              <Box flexGrow="1">
                <Heading fontSize="1.8rem" fontWeight="600" mb=".3rem">
                  Stay with{" "}
                  {capitalizeFirstLetter(listing?.owner?.firstName || "")}
                </Heading>
                <Text fontSize="1.6rem">
                  <Text as="span" color="brand.main" fontWeight="500">
                    I am looking for{" "}
                  </Text>
                  <Text as="span" textTransform="lowercase">
                    {listing?.lookingFor}
                  </Text>
                </Text>
              </Box>
            </HStack>
            {listing && <ListingFeatures listing={listing} />}
            {listing && <ListingAbout listing={listing} />}
            <Box w="100%" h="30rem" px={{ base: "1rem", sm: "0" }}>
              <Heading fontSize="2.2rem" fontWeight="600" mb="2rem">
                Location
              </Heading>
              <ListingMap
                lng={listing?.location?.coordinates[0]}
                lat={listing?.location?.coordinates[1]}
                label={listing?.streetAddress}
              />
            </Box>
          </VStack>
          <VStack
            pos={{ sm: "sticky" }}
            alignItems={{ base: "center", sm: "end" }}
            top="12rem"
            w="full"
            h={{ sm: "60rem" }}
          >
            <VStack
              border="1px solid #ddd"
              rounded="1.2rem"
              boxShadow="rgba(0, 0, 0, 0.12) 0px 6px 16px"
              p="2.4rem"
              w={{ base: "95%", lg: "70%" }}
              gap="1.6rem"
              alignItems="start"
            >
              <HStack fontSize="1.5rem" alignItems="center">
                <Text
                  as="span"
                  color="brand.main"
                  fontSize="2.4rem"
                  fontWeight="700"
                >
                  {listing?.rentAmount?.toLocaleString("en-us", {
                    style: "currency",
                    currency: "ngn",
                    currencyDisplay: "narrowSymbol",
                    maximumFractionDigits: 0,
                  })}
                </Text>
                <Text>per</Text>
                <Text fontWeight="600" textTransform="capitalize">
                  {" "}
                  roomey
                </Text>
                <Text>for</Text>
                <Text fontWeight="600" textTransform="capitalize">
                  {" "}
                  {listing && rentDurationMapping[listing?.rentDuration as keyof typeof rentDurationMapping]}
                </Text>
              </HStack>
              <HStack
                border="1px solid #b0b0b0"
                w="full"
                textTransform="uppercase"
                rounded=".8rem"
              >
                <VStack
                  flexBasis="50%"
                  py="1rem"
                  px="1.2rem"
                  alignItems="start"
                  gap="0"
                >
                  <Text fontWeight="700">Earliest Move-in</Text>
                  <Text fontSize="1.25rem">
                    {new Date(Date.now()).toLocaleDateString("en-us", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </Text>
                </VStack>
                <VStack
                  flexBasis="50%"
                  py="1rem"
                  px="1.2rem"
                  alignItems="start"
                  gap="0"
                  borderLeft="1px solid #222"
                >
                  <Text fontWeight="700">Current no. of occupants</Text>
                  <Text fontSize="1.25rem">
                    {listing?.currentOccupancyCount || 1}
                  </Text>
                </VStack>
              </HStack>
              {listing && (
                <Box w="full">
                  <InterestButton
                    doc={listing?._id}
                    docOwner={listing?.owner?._id || ""}
                    docType="Listing"
                    styleProps={{
                      w: "full",
                      py: "1.6rem",
                    }}
                  />
                </Box>
              )}
            </VStack>
          </VStack>
        </SimpleGrid>
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
