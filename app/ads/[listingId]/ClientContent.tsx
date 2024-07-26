"use client"
import BackButton from "@/app/_components/BackButton"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"
import useAxios from "@/app/_hooks/useAxios"
import { useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Hide,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Show,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useParams } from "next/navigation"
import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import toast from "react-hot-toast"
import ListingAbout from "./_components/ListingAbout"
import ListingCTAs from "./_components/ListingCTAs"
import ListingFeatures from "./_components/ListingFeatures"
import ListingHeading from "./_components/ListingHeading"
import ListingMap from "./_components/ListingMap"
import ListingPhotos from "./_components/ListingPhotos"
import {
  appendCommaIfLengthNotZero,
  capitalizeFirstLetter,
  pluralizeText,
} from "@/app/_utils"
import ListingInfoCard from "./_components/ListingInfoCard"
import ListingOwnerSection from "./_components/ListingOwnerSection"
import SSOButton from "@/app/_components/Auth/SSOButton"
import { MdFacebook, MdWhatsapp } from "react-icons/md"
import { PiCopyBold } from "react-icons/pi"
import { TbMail } from "react-icons/tb"
import DotSeparator from "@/app/_components/DotSeparator"
import PageLoader from "@/app/_components/PageLoader"
import { AppFooterContent } from "@/app/_components/AppFooter"

export default function ClientContent() {
  const params = useParams()
  const [showShareOptions, setShowShareOptions] = useState(false)
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
        setShowShareOptions(true)
      }
    } else {
      setShowShareOptions(true)
    }
  }, [listing])
  const containerRef = useRef<HTMLDivElement | null>(null)

  if (loading) return <PageLoader />

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
    <Box height="calc(100dvh - 9rem)" overflow="auto" ref={containerRef as any}>
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
              <ListingHeading
                handleShare={handleShare}
                isOwnListing={isOwnListing}
                listing={listing}
              />
              <ListingPhotos photos={listing?.photos} />
            </>
          )}
        </VStack>
        {/* {listing && (
          <ListingOwnerOverview listing={listing} isOwnListing={isOwnListing} />
        )} */}
        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          px={{ base: "1.6rem", sm: "0" }}
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
                <Heading
                  as="button"
                  onClick={() => {
                    containerRef.current?.scrollBy({
                      top: 200000,
                      behavior: "smooth",
                    })
                    console.log(containerRef.current, "dfsdasd")
                  }}
                  fontSize="1.8rem"
                  fontWeight="600"
                  mb=".3rem"
                >
                  Stay with{" "}
                  {capitalizeFirstLetter(listing?.owner?.firstName || "")}
                </Heading>
                <Flex
                  fontSize="1.6rem"
                  columnGap={{ base: ".8rem", sm: "1rem" }}
                  rowGap="0"
                  flexWrap="wrap"
                  justifyContent="start"
                  alignItems={{ base: "center", sm: "center" }}
                  // flexDir={{ base: "column", sm: "row" }}
                >
                  <Text as="span">
                    {listing?.isStudioApartment
                      ? "Studio apartment"
                      : `${listing?.numberOfBedrooms} bedroom apartmennt`}
                  </Text>
                  <Show above="base">
                    <DotSeparator />
                  </Show>
                  <Text as="span">
                    {listing?.currentOccupancyCount}
                    {` ${pluralizeText("occupant", listing?.currentOccupancyCount || 0, "s")}`}
                  </Text>
                  <Show above="base">
                    <DotSeparator />
                  </Show>
                  <Text as="span">
                    Move in by{" "}
                    {new Date(
                      listing?.earliestMoveInDate || Date.now()
                    ).toLocaleDateString("en-gb", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </Text>
                </Flex>
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
            {listing && <ListingOwnerSection listing={listing} />}
          </VStack>
          <VStack
            pos={{ sm: "sticky" }}
            alignItems={{ base: "center", sm: "end" }}
            top="12rem"
            w="full"
            h={{ sm: "60rem" }}
          >
            <ListingInfoCard listing={listing as any} />
          </VStack>
        </SimpleGrid>
      </VStack>
      <AppFooterContent />
      {!isOwnListing && listing && (
        <Hide above="sm">
          <ListingCTAs
            handleShare={handleShare}
            isOwner={isOwnListing}
            listing={listing}
          />
        </Hide>
      )}
      <Modal
        isOpen={showShareOptions}
        onClose={() => setShowShareOptions(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg="white"
          w="95%"
          maxW="56.8rem"
          p="2.4rem"
          rounded="1.4rem"
        >
          <ModalCloseButton
            size="xl"
            color="#313131"
            top="2.4rem"
            left="2.4rem"
            w="fit-content"
            right="unset"
          />
          <ModalBody p="0">
            <Heading fontWeight="600" fontSize="2.6rem" mt="3rem" mb="2rem">
              Share this Listing
            </Heading>
            <HStack gap="1.5rem">
              <Avatar
                borderRadius="1.2rem"
                src={listing?.photos?.[0]?.secure_url}
                size="xl"
              />
              <Text
                as="span"
                display="block"
                fontSize="1.6rem"
                fontWeight="400"
              >
                Stay with{" "}
                {capitalizeFirstLetter(listing?.owner?.firstName || "")}
                <br />
                {listing?.isStudioApartment
                  ? "Studio Apartment"
                  : (Number(listing?.numberOfBedrooms) > 1
                      ? listing?.numberOfBedrooms
                      : "Single") + " bedroom apartment"}{" "}
                in{" "}
                <Text as="span">
                  {appendCommaIfLengthNotZero(listing?.city || "") || " "}{" "}
                  {appendCommaIfLengthNotZero(listing?.state || "") || " "}{" "}
                  {listing?.country}
                </Text>
              </Text>
            </HStack>
            <SimpleGrid columns={2} mt="3rem" mb="2rem" gap="1.2rem">
              <SSOButton
                icon={<PiCopyBold size={20} />}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success("Copied to clipboard!")
                }}
                text={"Copy link"}
                justifyContent="start"
              />
              <SSOButton
                icon={<MdWhatsapp size={20} />}
                onClick={() =>
                  window.open(
                    `https://web.whatsapp.com/send?text=${window.location.href}`
                  )
                }
                text={"Whatsapp"}
                justifyContent="start"
              />
              <SSOButton
                icon={<TbMail size={20} />}
                onClick={() =>
                  window.open(
                    `mailto:?subject=${"Checkout this listing on Roomeyfinder"}&body=${window.location.href}`
                  )
                }
                text={"Email"}
                justifyContent="start"
              />
              <SSOButton
                icon={<MdFacebook size={20} />}
                onClick={() =>
                  window.open(
                    `https://web.facebook.com/share_channel/?link=https://roomeyfinder.netlify.app/ads/65f615685d3eac64cd87a07b&app_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&source_surface=external_reshare&display&hashtag`
                  )
                }
                text={"Facebook"}
                justifyContent="start"
              />
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
