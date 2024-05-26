import {
  Box,
  ButtonProps,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  LinkProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Show,
  Text,
  TextProps,
  VStack,
} from "@chakra-ui/react"
import { FeatureTag } from "../nexus/ads/_components/FeaturesInput"
import EyeIcon from "../_assets/SVG/EyeIcon"
import ThreeDotIcon from "../_assets/SVG/ThreeDotIcon"
import { Listing } from "../_types/Listings"
import { Fragment, useCallback, useContext, useMemo } from "react"
import useAxios, { FetchOptions } from "../_hooks/useAxios"
import useAppToast from "../_hooks/useAppToast"
import { ListingsContext } from "../_providers/ListingsProvider"
import { useRouter } from "next/navigation"
import { pluralizeText } from "../_utils"
import EditIcon from "../_assets/SVG/EditIcon"
import EditSVG from "../_assets/SVG/Edit"
import TrashIcon from "../_assets/SVG/TrashIcon"

const actionBasedOnStatus = {
  active: "Deactivate",
  deactivated: "Activate",
  draft: "Continue editing",
}

export default function EditableListingCard({ listing }: { listing: Listing }) {
  const router = useRouter()
  const status = useMemo(() => {
    if (listing.isActivated) return "active"
    if (listing.isDraft) return "draft"
    if (listing.isActivated === false && listing.isDraft === false)
      return "deactivated"
    return "active"
  }, [listing])

  const isActivated = useMemo(
    () => !listing.isDraft && listing.isActivated,
    [listing.isDraft, listing.isActivated]
  )

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="white.400"
      rounded="1.2rem"
      w="100%"
      px={{ base: "1rem", md: "2rem" }}
      py="1rem"
      onClick={() => {
        if (isActivated) {
          router.push(`/ads/${listing._id}`)
        }
      }}
      _hover={{ textDecor: "none", boxShadow: isActivated ? "md" : "" }}
    >
      <Flex alignItems="center" gap="1rem">
        <Image
          alt=""
          w={{ base: "5rem", md: "7rem" }}
          h={{ base: "5rem", md: "7rem" }}
          rounded="1.2rem"
          src={listing.photos?.[0]?.secure_url}
        />
        <Box>
          <Heading
            fontSize="1.6rem"
            fontWeight="600"
            lineHeight="1.6rem"
            mb="1rem"
            noOfLines={1}
          >
            {listing.streetAddress}
          </Heading>
          <Flex gap={{ base: ".6rem", md: "1rem" }} alignItems="center">
            <Text fontSize="1.4rem" fontWeight="600" color="gray.main">
              <Text
                as="span"
                fontSize="1.4rem"
                fontWeight="600"
                color="gray.main"
              >
                {listing.features?.length || 0}&nbsp;
              </Text>
              Features
            </Text>
            <Flex as={Text} alignItems="center" fontSize="1.4rem" gap=".8rem">
              <EyeIcon />
              {listing.viewsCount}
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Flex gap={{base: ".8rem", md: "1rem"}} alignItems="center">
        <TextButton aria-label="Edit" as={IconButton}>
          <EditSVG />
        </TextButton>
        <TextButton color="red.main" aria-label="Delete" as={IconButton}>
          <TrashIcon />
        </TextButton>
        <ListingActions
          listingId={listing._id as string}
          primaryActionText={actionBasedOnStatus[status]}
        />
      </Flex>
    </Flex>
  )
}

function ListingActions({
  primaryActionText,
  listingId,
}: {
  primaryActionText: string
  listingId: string
}) {
  const router = useRouter()
  const { updateListing, deleteListing } = useContext(ListingsContext)
  const toast = useAppToast()
  const { fetchData } = useAxios()

  const handleAction = useCallback(
    async (options: FetchOptions) => {
      if (options.url === "/") return router.push(`/ads/${listingId}?edit=true`)
      toast.closeAll()
      const res = await fetchData(options)
      toast({
        status: res.statusCode >= 400 ? "error" : "success",
        title:
          options.method === "delete" ? "Deleted successfully" : res.message,
      })
      if (options.method === "delete") {
        deleteListing(listingId)
      }
      if (res.statusCode === 200 && res.listing)
        updateListing(res.listing as Listing)
    },
    [toast, updateListing, listingId, router, fetchData, deleteListing]
  )

  return (
    <>
      {/* <Show below="md"> */}
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
            }}
            color="gray.main"
            _hover={{ color: "brand.main", bg: "transparent" }}
            p="1rem"
            bg="transparent"
            aria-label="toggle options"
            h="unset"
            w="unset"
          >
            <ThreeDotIcon />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent
          bg="white"
          boxShadow="0px 0px 20px 1px #00000012"
          border="0"
          w="max-content"
          p="1rem"
          rounded="1.2rem"
        >
          <PopoverBody>
            <VStack spacing="1.5rem" alignItems="start">
              <TextButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleAction(
                    getActionFetchOptions(primaryActionText, listingId)
                  )
                }}
                w="full"
              >
                {primaryActionText}
              </TextButton>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

const getActionFetchOptions = (
  primaryActionText: string,
  listingId: string
): FetchOptions => {
  switch (primaryActionText) {
    case "Activate":
      return { url: `/listings/${listingId}/activate`, method: "put" }
    case "Deactivate":
      return { url: `/listings/${listingId}/deactivate`, method: "put" }
    case "Delete":
      return { url: `/listings/${listingId}`, method: "delete" }
    default:
      return { url: "/", method: "get" }
  }
}

function TextButton({
  children,
  ...rest
}: TextProps & LinkProps & ButtonProps) {
  return (
    <Text
      as="button"
      aria-label={rest["aria-label"]}
      fontSize="1.6rem"
      fontWeight="600"
      lineHeight="1.6rem"
      bg="transparent"
      _hover={{ bg: "brand.10" }}
      {...rest}
    >
      {children}
    </Text>
  )
}
