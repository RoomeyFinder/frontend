import {
  Avatar,
  Box,
  Button,
  ButtonProps,
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
import {
  MouseEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { FavoriteType } from "../_types/Favorites"
import { Listing } from "../_types/Listings"
import { useRouter } from "next/navigation"
import { AuthModalContext } from "../_providers/AuthModalProvider"
import { useAppDispatch, useAppSelector } from "../_redux"
import { addFavorite, deleteFavorite } from "../_redux/thunks/favorites.thunk"

export default function RoomListingCard({
  listing,
  variant,
  showFavoriteButton = false,
  useConfirmationToRemoveFavorite = false,
}: {
  variant?: "outlined" | "default"
  showFavoriteButton?: boolean
  listing: Listing
  useConfirmationToRemoveFavorite?: boolean
}) {
  const router = useRouter()
  const { user } = useAppSelector((store) => store.auth)
  const { open: showAuthModal } = useContext(AuthModalContext)

  return (
    <Flex
      onClick={() =>
        user
          ? router.push(`/ads/${listing._id}`)
          : showAuthModal({
              title: "Sign in to view this listing",
              nextUrl: `/ads/${listing._id}`,
            })
      }
      w="100%"
      padding={variant === "outlined" ? "1rem" : "0"}
      alignItems="start"
      flexDir="column"
      gap=".5rem"
      pos="relative"
      border={variant === "outlined" ? "1px solid #7070704D" : ""}
      borderRadius="1.2rem"
      background="transparent"
      cursor="pointer"
    >
      {showFavoriteButton && (
        <FavouriteButton
          color="white"
          listingId={listing._id}
          useConfirmation={useConfirmationToRemoveFavorite}
          type={FavoriteType.LISTING}
        />
      )}
      <Box w="full" pos="relative">
        <ListingCardImageCarousel
          slides={listing.photos}
          height="27rem"
          swiperSlideContent={({ slide }) => (
            <Image
              key={slide.secure_url}
              src={slide.secure_url}
              bg="brand.50"
              w="100%"
              h="full"
              rounded="1.2rem"
              objectFit="cover"
              alt=""
            />
          )}
        />
      </Box>
      <Box p=".5rem" roundedBottom="1.2rem">
        <OwnersInfo
          ownersName={`${listing.owner?.firstName} ${listing.owner?.lastName}`}
        />
        <AboutSection
          rentAmount={listing.rentAmount || 0}
          rentDuration={listing.rentDuration}
          title={listing?.streetAddress as string}
          ownersOccupation={listing.owner?.occupation || ""}
          location={"Port Harcourt"}
          apartmentType={
            listing.isStudioApartment
              ? "Studio apartment"
              : `${listing.numberOfBedrooms} Bedrooms`
          }
          featuresCount={listing.features?.length || 0}
        />
      </Box>
    </Flex>
  )
}

export function FavouriteButton({
  color,
  type,
  listingId,
  buttonProps = {},
  useConfirmation = true,
}: {
  color?: string
  listingId: string
  type: FavoriteType
  buttonProps?: ButtonProps
  useConfirmation?: boolean
}) {
  const { favorites } = useAppSelector((store) => store.favorites)
  const dispatch = useAppDispatch()
  const favorite = useMemo(
    () => favorites?.find((it) => it.doc?._id === listingId),
    [favorites, listingId]
  )
  const [isFavorite, setIsFavorite] = useState(() => Boolean(favorite))

  const [loading, setLoading] = useState(false)
  const getChildren = useCallback(
    () =>
      loading ? (
        <Spinner color="brand.main" />
      ) : (
        <FavouriteIcon isFilled={isFavorite} />
      ),
    [loading, isFavorite]
  )
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false)

  const handleFavoriteClick: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation()
      setLoading(true)
      setIsFavorite((prev) => !prev)
      if (!favorite) dispatch(addFavorite({ doc: listingId, type }))
      else {
        useConfirmation
          ? setShowRemoveConfirmation(true)
          : dispatch(deleteFavorite(favorite?._id))
      }
      setLoading(false)
    },
    [dispatch, favorite, listingId, type, useConfirmation]
  )
  return (
    <Box
      onClick={handleFavoriteClick}
      as="button"
      pos="absolute"
      color={color || "inherit"}
      top="5%"
      zIndex={"120"}
      right="8%"
      {...buttonProps}
    >
      {getChildren()}
      <Box
        display={showRemoveConfirmation ? "block" : "none"}
        pos="absolute"
        zIndex="130"
        top="50%"
        right="100%"
        bg="white"
        rounded="1.2rem"
        p="1.2rem"
        fontSize="1.6rem"
        textAlign="center"
        w="95dvw"
        maxW="22rem"
        fontWeight="600"
        boxShadow="md"
      >
        <Text as="h6" color="#222222" mb="1.5rem">
          Are you sure you want to remove this favorite?
        </Text>
        <Flex justifyContent="center" alignItems="center" gap="1.5rem">
          <Text
            role="button"
            py=".8rem"
            px="1.5rem"
            rounded="1.2rem"
            color="red.main"
            _hover={{ bg: "red.main", color: "white" }}
            onClick={(e) => {
              e.stopPropagation()
              setLoading(true)
              dispatch(deleteFavorite(favorite?._id))
              setShowRemoveConfirmation(false)
              setLoading(false)
            }}
          >
            Remove
          </Text>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setShowRemoveConfirmation(false)
            }}
            as="p"
            role="button"
            py="1rem"
            variant="brand-secondary"
          >
            Cancel
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

function OwnersInfo({ ownersName }: { ownersName: string }) {
  return (
    <Flex gap=".8rem" alignItems="center">
      <Avatar w={35} h={35} src={imgOne.src} />
      <Heading
        as="h6"
        fontSize="1.6rem"
        fontWeight="normal"
        lineHeight="1.6rem"
      >
        Stay with{" "}
        <Text as="span" textTransform="capitalize">
          {ownersName}
        </Text>
      </Heading>
    </Flex>
  )
}

function AboutSection({
  title,
  apartmentType,
  rentAmount,
  rentDuration,
  featuresCount,
}: {
  title: string
  ownersOccupation: string
  location: string
  apartmentType: string
  rentDuration: Listing["rentDuration"]
  rentAmount: number
  featuresCount: number
}) {
  return (
    <Flex flexDir="column" textAlign="left" gap=".5rem">
      <Heading
        noOfLines={1}
        as="h6"
        fontSize="1.6rem"
        mt="1rem"
        lineHeight="1.8rem"
      >
        {title}
      </Heading>
      <Text
        fontSize="1.6rem"
        lineHeight="1.8rem"
        color="gray.main"
        display="flex"
        gap="1rem"
        alignItems="center"
      >
        <Text as="span" whiteSpace="nowrap">
          {apartmentType}
        </Text>
        <DotSeparator backgroundColor="gray.100" w=".4rem" h=".4rem" />
        <Text as="span">{featuresCount} features</Text>
      </Text>
      <Text as="b" fontSize="1.6rem" lineHeight="1.8rem">
        ₦{rentAmount.toLocaleString("en-us")}/
        {
          rentDurationMapping[
            (rentDuration || "") as keyof typeof rentDurationMapping
          ]
        }
      </Text>
    </Flex>
  )
}
