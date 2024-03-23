import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react"
import FavouriteIcon from "../_assets/SVG/Favourite"
import imgOne from "../_assets/images/sample.png"
import ListingCardImageCarousel from "./ListingCardImageCarousel"
import DotSeparator from "./DotSeparator"
import { rentDurationMapping } from "../_utils"
import { Photo } from "../_types/User"
import { useCallback, useContext, useState } from "react"
import { FavoriteType } from "../_types/Favorites"
import useAxios from "../_hooks/useAxios"
import { FavoritesContext } from "../_providers/FavoritesProvider"
import useAppToast from "../_hooks/useAppToast"
import { Listing } from "../_types/Listings"

export default function RoomListingCard({
  variant,
  showFavoriteButton = false,
  ownersName,
  ownersOccupation,
  // city,
  isFavourite,
  rentAmount,
  rentDuration,
  images,
  listingId,
}: {
  variant?: "outlined" | "default"
  showFavoriteButton?: boolean
  ownersName: string
  ownersOccupation: string
  city: string
  isFavourite: boolean
  rentAmount: number
  rentDuration: Listing["rentDuration"]
  title: string
  images: Photo[]
  listingId: string
}) {
  return (
    <Flex
      w="95dvw"
      padding={variant === "outlined" ? "1rem": "0"}
      maxW={{ base: "32rem", sm: "28.3rem" }}
      alignItems="start"
      flexDir="column"
      gap=".5rem"
      pos="relative"
      border={variant === "outlined" ? "1px solid #7070704D" : ""}
      borderRadius="1.2rem"
      background="transparent"
      cursor="pointer"
      _hover={{ background: "white" }}
    >
      {showFavoriteButton && (
        <FavouriteButton
          color="white"
          isFavourite={isFavourite}
          onToggleFavorite={() => {}}
          listingId={listingId}
          type={FavoriteType.LISTING}
        />
      )}
      <Box w="full" pos="relative">
        <ListingCardImageCarousel
          slides={images}
          swiperSlideContent={({ slide }) => (
            <Image
              key={slide.secure_url}
              src={slide.secure_url}
              w="100%"
              h="100%"
              minH="27.7rem"
              rounded="1.2rem"
            />
          )}
        />
      </Box>
      <OwnersInfo ownersName={ownersName} />
      <AboutSection
        rentAmount={rentAmount}
        rentDuration={rentDuration}
        title={"Single Bedroom in Beautiful Mbuoba for lease just testing"}
        ownersOccupation={ownersOccupation}
        location={"Port Harcourt"}
        apartmentType={"4 Rooms"}
      />
    </Flex>
  )
}

export function FavouriteButton({
  isFavourite,
  color,
  onToggleFavorite,
  type,
  listingId,
}: {
  isFavourite: boolean
  color?: string
  onToggleFavorite?: () => void
  listingId: string
  type: FavoriteType
}) {
  const toast = useAppToast()
  const { addNewFavorite, favorites } = useContext(FavoritesContext)
  const { fetchData } = useAxios()
  const [loading, setLoading] = useState(false)
  const handleToggleFavourite = useCallback(async () => {
    setLoading(true)
    const body = {
      doc: listingId,
      type,
    }
    const res = await fetchData({ url: "/favorites/me", method: "post", body })
    if(res.statusCode === 201){
      addNewFavorite(res.favorite)
    }else toast({ status: "error", title: res.message || "Something went wrong"})
    setLoading(false)
  }, [type, fetchData])
  return (
    <Box
      onClick={handleToggleFavourite}
      as="button"
      pos="absolute"
      color={color || "inherit"}
      top="5%"
      zIndex={"10"}
      right="8%"
    >
      {loading ? (
        <Spinner color="brand.main" />
      ) : (
        <FavouriteIcon isFilled={isFavourite} />
      )}
    </Box>
  )
}

function OwnersInfo({ ownersName }: { ownersName: string }) {
  return (
    <Flex gap=".8rem" alignItems="center">
      <Avatar w={25} h={25} src={imgOne.src} />
      <Heading
        as="h6"
        fontSize="1.6rem"
        fontWeight="normal"
        lineHeight="1.6rem"
      >
        Stay with {ownersName}
      </Heading>
    </Flex>
  )
}

function AboutSection({
  title,
  ownersOccupation,
  location,
  apartmentType,
  rentAmount,
  rentDuration,
}: {
  title: string
  ownersOccupation: string
  location: string
  apartmentType: string
  rentDuration: Listing["rentDuration"]
  rentAmount: number
}) {
  return (
    <Flex flexDir="column" textAlign="left" gap=".5rem">
      <Heading noOfLines={1} as="h6" fontSize="1.6rem" lineHeight="1.8rem">
        {title}
      </Heading>
      <Text
        fontSize="1.6rem"
        lineHeight="1.8rem"
        color="gray.main"
        // noOfLines={1}
        display="flex"
        gap="1rem"
        alignItems="center"
      >
        <Text as="span" whiteSpace="nowrap">
          {apartmentType}
        </Text>

        <DotSeparator backgroundColor="gray.100" w=".4rem" h=".4rem" />
        <Text as="span" noOfLines={1} maxW="6.7rem">
          {ownersOccupation}
        </Text>

        <DotSeparator backgroundColor="gray.100" w=".4rem" h=".4rem" />
        <Text as="span">{location}</Text>
      </Text>
      <Text as="b" fontSize="1.6rem" lineHeight="1.8rem">
        ₦{rentAmount.toLocaleString("en-us")}/
        {rentDurationMapping[(rentDuration || "") as keyof typeof rentDurationMapping]}
      </Text>
    </Flex>
  )
}
