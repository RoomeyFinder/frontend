import ShareIcon from "@/app/_assets/SVG/ShareIcon"
import { FavouriteButton } from "@/app/_components/RoomListingCard"
import { FavoriteType } from "@/app/_types/Favorites"
import { Listing } from "@/app/_types/Listings"
import InterestButton from "@/app/_components/InterestButton"
import { Button, Flex } from "@chakra-ui/react"

export default function ListingCTAs({
  isOwner,
  listing,
  handleShare,
}: {
  isOwner: boolean
  listing: Listing
  handleShare: () => void
}) {
  return (
    <>
      <Flex
        pos="sticky"
        insetX="0"
        bottom={{ base: "0" }}
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        py="1rem"
        px="1rem"
        boxShadow="0px -2px 2px #0000000f"
      >
        <Flex gap="1rem">
          <Button
            onClick={handleShare}
            variant="brand-secondary"
            rounded="full"
            p="1rem"
          >
            <ShareIcon />
          </Button>

          <FavouriteButton
            listingId={listing?._id}
            type={FavoriteType.LISTING}
            useConfirmation={false}
            buttonProps={{
              variant: "brand-secondary",
              position: "static",
              bg: "brand.10",
              p: "1rem",
              rounded: "full",
            }}
            color="brand.main"
          />
        </Flex>
        {!isOwner && (
          <InterestButton
            doc={listing?._id}
            docType={"Listing"}
            docOwner={listing.owner?._id as string}
          />
        )}
      </Flex>
    </>
  )
}
