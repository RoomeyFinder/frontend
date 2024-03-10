"use client"
import { ListingsContext } from "@/app/_providers/ListingsProvider"
import { Box, Divider, HStack, Heading, Hide, VStack } from "@chakra-ui/react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useMemo } from "react"
import ListingHeading from "./_components/ListingHeading"
import ListingPhotos from "./_components/ListingPhotos"
import ListingOwnerOverview from "./ListingOwnerOverview"
import ListingFeatures from "./_components/ListingFeatures"
import ListingAbout from "./_components/ListingAbout"
import ListingMap from "./_components/ListingMap"
import ListingCTAs from "./_components/ListingCTAs"

export default function ListingPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { listings, loading } = useContext(ListingsContext)
  const listingId = useMemo(() => params.listingId, [params])
  const isEditing = useMemo(
    () => searchParams.get("edit") === "true",
    [searchParams]
  )

  const listing = useMemo(
    () => listings?.active.find((it) => it._id === listingId),
    [listings?.active, listingId]
  )

  useEffect(() => {
    if (!listing && !loading) router.push("/my-ads")
  }, [listing, loading, router])

  if (isEditing) return <>edit = true</>
  if (!listing) return <></>
  return (
    <>
      <VStack
        gap={{ base: "3rem", md: "5rem" }}
        alignItems="start"
        w="100dvw"
        maxW={{ sm: "95%", xl: "160rem" }}
        mx="auto"
        overflowX="hidden"
        pt={{ base: "4rem", md: "6rem" }}
        pb={{ base: "8rem", md: "12rem" }}
      >
        <HStack>
          <VStack gap="1rem" alignItems="start">
            <ListingHeading listing={listing} />
            <ListingPhotos photos={listing?.photos} />
          </VStack>
          <HStack></HStack>
        </HStack>
        <ListingOwnerOverview listing={listing} />
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
      <Hide above="sm">
        <ListingCTAs />
      </Hide>
    </>
  )
}
