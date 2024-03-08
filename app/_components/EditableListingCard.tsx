import {
  Box,
  ButtonProps,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
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
import { FeatureTag } from "../my-ads/_components/FeaturesInput"
import EyeIcon from "../_assets/SVG/EyeIcon"
import ThreeDotIcon from "../_assets/SVG/ThreeDotIcon"
import { Listing } from "../_types/Listings"
import { useCallback, useContext, useMemo } from "react"
import useAxios, { FetchOptions } from "../_hooks/useAxios"
import useAppToast from "../_hooks/useAppToast"
import { ListingsContext } from "../_providers/ListingsProvider"
import { useRouter } from "next/navigation"

const actionBasedOnStatus = {
  active: "Deactivate",
  deactivated: "Activate",
  draft: "Continue editing",
}

export default function EditableListingCard({ listing }: { listing: Listing }) {
  const status = useMemo(() => {
    if (listing.isActive) return "active"
    if (listing.isDraft) return "draft"
    if (listing.isActive === false && listing.isDraft === false)
      return "deactivated"
    return "active"
  }, [listing])
  const isActive = useMemo(
    () => !listing.isDraft && listing.isActive,
    [listing.isDraft, listing.isActive]
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
      {...(isActive ? { as: Link, href: `/my-ads/${listing._id}` } : {})}
      _hover={{ textDecor: "none", boxShadow: isActive ? "md" : "" }}
    >
      <Flex alignItems="center" gap="1rem">
        <Image
          w={{ base: "5rem", md: "7rem" }}
          h={{ base: "5rem", md: "7rem" }}
          rounded="1.2rem"
          src={listing.photos[0]?.secure_url}
        />
        <Box>
          <Heading
            fontSize="1.6rem"
            fontWeight="400"
            lineHeight="1.6rem"
            mb="1rem"
            noOfLines={1}
          >
            Looking for {listing.lookingFor}.
          </Heading>
          <Flex gap={{ base: ".6rem", md: "1rem" }} alignItems="center">
            <Text fontSize="1.4rem" fontWeight="600" color="gray.main">
              <Show below="lg">
                <Text
                  as="span"
                  fontSize="1.4rem"
                  fontWeight="600"
                  color="gray.main"
                >
                  {listing.features?.length || 0}&nbsp;
                </Text>
              </Show>
              Features
            </Text>
            <ListingFeatures features={listing.features} />
            <Flex as={Text} alignItems="center" fontSize="1.4rem" gap=".8rem">
              <EyeIcon />
              {listing.viewsCount}
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <ListingActions
        listingId={listing._id as string}
        primaryActionText={actionBasedOnStatus[status]}
      />
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
  const { updateListings, listings } = useContext(ListingsContext)
  const toast = useAppToast()
  const { fetchData } = useAxios()

  const handleAction = useCallback(
    async (options: FetchOptions) => {
      if (options.url === "/")
        return router.push(`/my-ads/${listingId}?edit=true`)
      toast.closeAll()
      const res = await fetchData(options)
      toast({
        status: res.statusCode >= 400 ? "error" : "success",
        title: res.message,
      })
      const removeIt = (it: Listing) => it._id !== listingId
      if (options.method === "delete") {
        updateListings({
          drafts: listings?.drafts.filter(removeIt) || [],
          active: listings?.active.filter(removeIt) || [],
          deactivated: listings?.deactivated.filter(removeIt) || [],
        })
      }
      if (res.statusCode === 200 && res.listing) {
        if (res.listing.isActive)
          updateListings({
            ...(listings as any),
            active: [...(listings?.active || []), res.listing],
            deactivated: listings?.deactivated.filter(removeIt),
          })
        else if (res.listing.isDraft)
          updateListings({
            ...(listings as any),
            drafts: [...(listings?.drafts || []), res.listing],
            active: listings?.active.filter(removeIt),
          })
        else if (!res.listing.isDraft && !res.listing.isActive)
          updateListings({
            ...(listings as any),
            active: listings?.active.filter(removeIt),
            deactivated: [...(listings?.deactivated || []), res.listing],
            drafts: listings?.drafts.filter(removeIt),
          })
      }
    },
    [toast, listings, updateListings, listingId, router]
  )

  const renderButtons = useCallback(() => {
    return (
      <>
        <TextButton
          onClick={(e) => {
            e.stopPropagation()
            handleAction(getActionFetchOptions(primaryActionText, listingId))
          }}
        >
          {primaryActionText}
        </TextButton>
        {primaryActionText !== "Continue editing" && (
          <TextButton
            onClick={(e) => {
              e.stopPropagation()
              handleAction(getActionFetchOptions("Continue editing", listingId))
            }}
          >
            Edit
          </TextButton>
        )}
        <TextButton
          color="red.main"
          onClick={(e) => {
            e.stopPropagation()
            handleAction(getActionFetchOptions("Delete", listingId))
          }}
        >
          Delete
        </TextButton>
      </>
    )
  }, [primaryActionText, listingId, handleAction])

  return (
    <>
      <Show below="md">
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <IconButton
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
                {renderButtons()}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Show>
      <Show above="md">
        <HStack spacing="1.5rem" alignItems="start">
          {renderButtons()}
        </HStack>
      </Show>
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
      return { url: `/`, method: "get" }
  }
}

function TextButton({
  children,
  ...rest
}: TextProps & LinkProps & ButtonProps) {
  return (
    <Text as="button" fontSize="1.6rem" fontWeight="600" lineHeight="1.6rem" {...rest}>
      {children}
    </Text>
  )
}

function ListingFeatures({
  features,
}: {
  features: { category: string; value: string }[]
}) {
  return (
    <Show above="lg">
      <HStack gap="1.2rem">
        {features.map((feature) => (
          <FeatureTag
            key={feature.value}
            item={feature}
            editable={false}
            bg="#D9D9D9"
            padding="1rem 2rem"
            rounded=".5rem"
          />
        ))}
      </HStack>
    </Show>
  )
}
