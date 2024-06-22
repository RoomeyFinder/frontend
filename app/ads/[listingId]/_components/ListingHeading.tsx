import Globe from "@/app/_assets/SVG/Globe"
import SchoolIcon from "@/app/_assets/SVG/SchoolIcon"
import ShareIcon from "@/app/_assets/SVG/ShareIcon"
import { FavouriteButton } from "@/app/_components/RoomListingCard"
import { FavoriteType } from "@/app/_types/Favorites"
import { Listing } from "@/app/_types/Listings"
import { rentDurationMapping, appendCommaIfLengthNotZero } from "@/app/_utils"
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
        <Text as="span">
          <Text as="span" color="brand.main" fontSize="2.6rem" fontWeight="700">
            {listing.rentAmount?.toLocaleString("en-us", {
              style: "currency",
              currency: "ngn",
              currencyDisplay: "narrowSymbol",
              maximumFractionDigits: 0,
            })}
          </Text>
          <Text as="span" fontSize="1.6rem" fontWeight="400">
            &nbsp;/&nbsp;Roomey&nbsp;/&nbsp;
            {
              rentDurationMapping[
                listing.rentDuration as keyof typeof rentDurationMapping
              ]
            }
          </Text>
        </Text>
        <Text as="span" display="block" fontSize="2.6rem" fontWeight="600">
          {listing.isStudioApartment
            ? "Studio Apartment"
            : (Number(listing.numberOfBedrooms) > 1
              ? listing.numberOfBedrooms
              : "Single") + " bedroom apartment"}
        </Text>
        <Text
          as="span"
          fontSize="1.6rem"
          fontWeight="400"
          display="flex"
          gap={{ base: "2rem", md: "5rem" }}
        >
          <Text as="span" display="flex" gap=".4rem" alignItems="center">
            <Globe />
            <Text as="span">
              {appendCommaIfLengthNotZero(listing.city || "")}
              {appendCommaIfLengthNotZero(listing.state || "") || " "}
              {listing.country}
            </Text>
          </Text>
          {listing.owner?.isStudent && (
            <Text as="span" display="flex" gap=".4rem" alignItems="center">
              <SchoolIcon />
              <Text as="span">{listing.owner?.school}</Text>
            </Text>
          )}
        </Text>
      </Heading>
      <Flex
        gap="1rem"
        display={{ base: isOwnListing ? "flex" : "none", sm: "flex" }}
      >
        <Button
          variant="brand-secondary"
          color="black"
          rounded="full"
          p={{ base: "1.2rem", md: "1.4rem" }}
          onClick={handleShare}
        >
          <ShareIcon />
        </Button>
        {!isOwnListing && (
          <FavouriteButton
            listingId={listing?._id}
            color="black"
            type={FavoriteType.LISTING}
            useConfirmation={false}
            buttonProps={{
              p: { base: "1.2rem", md: "1.8rem" },
              rounded: "full",
              pos: "static",
              bg: "brand.10"
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}
