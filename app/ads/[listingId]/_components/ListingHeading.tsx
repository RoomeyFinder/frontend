import ShareIcon from "@/app/_assets/SVG/ShareIcon"
import { FavouriteButton } from "@/app/_components/RoomListingCard"
import { FavoriteType } from "@/app/_types/Favorites"
import { Listing } from "@/app/_types/Listings"
import { appendCommaIfLengthNotZero } from "@/app/_utils"
import { Button, Flex, Heading, Text } from "@chakra-ui/react"

export default function ListingHeading({
  listing,
  isOwnListing,
  handleShare,
}: {
  listing: Listing
  isOwnListing: boolean
  handleShare: () => void
}) {
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: "1rem", md: "0" }}
    >
      <Heading as="h1" display="flex" flexDir="column" gap="1rem">
        <Text as="span" display="block" fontSize="2.6rem" fontWeight="600">
          {listing.isStudioApartment
            ? "Studio Apartment"
            : (Number(listing.numberOfBedrooms) > 1
                ? listing.numberOfBedrooms
                : "Single") + " bedroom apartment"}{" "}
          in{" "}
          <Text as="span">
            {appendCommaIfLengthNotZero(listing.city || "") || " "}&nbsp;
            {appendCommaIfLengthNotZero(listing.state || " ") || " "}&nbsp;
            {listing.country}
          </Text>
        </Text>
      </Heading>
      <Flex
        gap="1rem"
        display={{ base: isOwnListing ? "flex" : "none", sm: "flex" }}
        alignItems="center"
      >
        <Button
          variant="brand-secondary"
          color="#222222"
          rounded="full"
          p={{ base: "1.2rem", md: "1.4rem" }}
          onClick={handleShare}
        >
          <ShareIcon />
        </Button>
        {!isOwnListing && (
          <FavouriteButton
            listingId={listing?._id}
            color="#222222"
            type={FavoriteType.LISTING}
            useConfirmation={false}
            buttonProps={{
              p: { base: "1.2rem", md: "1.8rem" },
              rounded: "full",
              pos: "static",
              bg: "brand.10",
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}
