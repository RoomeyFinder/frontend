import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonProps,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  LinkProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextProps,
  VStack,
} from "@chakra-ui/react"
import EyeIcon from "../_assets/SVG/EyeIcon"
import ThreeDotIcon from "../_assets/SVG/ThreeDotIcon"
import { Listing } from "../_types/Listings"
import { ReactNode, useCallback, useMemo, useRef, useState } from "react"
import { FetchOptions } from "../_hooks/useAxios"
import { useRouter } from "next/navigation"
import EditSVG from "../_assets/SVG/Edit"
import TrashIcon from "../_assets/SVG/TrashIcon"
import { useAppDispatch } from "../_redux"
import {
  activateListing,
  deactivateListing,
  deleteListing,
} from "../_redux/thunks/listings.thunk"
import toast from "react-hot-toast"

const actionBasedOnStatus = {
  active: "Deactivate",
  deactivated: "Activate",
  draft: "Continue editing",
}

const buttonProps = {
  bg: "transparent",
  fontSize: "1.6rem",
  fontWeight: "600",
  lineHeight: "1.6rem",
  _hover: { bg: "brand.10" },
}

export default function EditableListingCard({ listing }: { listing: Listing }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false)
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
      _hover={{ textDecor: "none", boxShadow: isActivated ? "md" : "" }}
    >
      <Flex
        alignItems="center"
        gap="1rem"
        onClick={(e) => {
          e.preventDefault()
          console.log(
            isActivated,
            listing.isActivated,
            listing.isDraft,
            listing._id
          )
          if (isActivated) {
            router.push(`/ads/${listing._id}`)
          }
        }}
        href={`/ads/${listing._id}`}
        as={Link}
      >
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
            textAlign="left"
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
      <Flex gap={{ base: ".8rem", md: "1rem" }} alignItems="center">
        <IconButton
          aria-label="Edit"
          onClick={() => {
            router.push(`/nexus/ads/edit?id=${listing._id}`)
          }}
          icon={<EditSVG />}
          {...buttonProps}
        />
        <IconButton
          color="red.main"
          aria-label="Delete"
          onClick={(e) => {
            e.stopPropagation()
            setShowConfirmDeletion(true)
          }}
          icon={<TrashIcon />}
          {...buttonProps}
        />
        <ConfirmDeleteDialog
          isOpen={showConfirmDeletion}
          onClose={() => setShowConfirmDeletion(false)}
          handleConfirmation={() => {
            return dispatch(deleteListing(listing._id))
          }}
          heading="Delete Ad"
        />
        {!listing.isDraft && (
          <ListingActions
            isActiveListing={listing.isActivated === true}
            listingId={listing._id as string}
            primaryActionText={actionBasedOnStatus[status]}
          />
        )}
      </Flex>
    </Flex>
  )
}

function ListingActions({
  primaryActionText,
  listingId,
  isActiveListing,
}: {
  primaryActionText: string
  listingId: string
  isActiveListing: boolean
}) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const handleAction = useCallback(async () => {
    if (primaryActionText === actionBasedOnStatus.draft)
      return router.push(`/ads/${listingId}?edit=true`)
    if (isLoading) return
    setIsLoading(true)
    dispatch(
      isActiveListing
        ? deactivateListing(listingId)
        : activateListing(listingId)
    )
    setIsLoading(false)
  }, [
    listingId,
    dispatch,
    router,
    isLoading,
    isActiveListing,
    primaryActionText,
  ])

  return (
    <>
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
                  handleAction()
                }}
                isLoading={isLoading}
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

export const getActionFetchOptions = (
  primaryActionText: string,
  listingId: string
): FetchOptions => {
  switch (primaryActionText) {
    case "Activate":
      return { url: `/listings/${listingId}/activate`, method: "put" }
    case "Deactivate":
      return { url: `/listings/${listingId}/deactivate`, method: "put" }
    default:
      return { url: "/", method: "get" }
  }
}

function TextButton({
  children,
  ...rest
}: TextProps & LinkProps & ButtonProps) {
  return (
    <Button aria-label={rest["aria-label"]} {...buttonProps} {...rest}>
      {children}
    </Button>
  )
}

function ConfirmDeleteDialog({
  isOpen,
  onClose,
  heading,
  handleConfirmation,
}: {
  isOpen: boolean
  onClose: () => void
  handleConfirmation: () => void
  heading: ReactNode | ReactNode[]
}) {
  const cancelRef = useRef(null)
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="white">
          <AlertDialogHeader fontSize="1.8rem" fontWeight="bold">
            {heading}
          </AlertDialogHeader>

          <AlertDialogBody fontSize="1.4rem">
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              bg="white.400"
              _hover={{ bg: "brand.10" }}
              ref={cancelRef}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              h="unset"
              px="1rem"
              py=".5rem"
              ml={3}
              onClick={() => {
                handleConfirmation()
                onClose()
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
