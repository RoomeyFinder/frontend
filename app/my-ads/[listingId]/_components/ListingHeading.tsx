import Globe from "@/app/_assets/SVG/Globe"
import HeartIcon from "@/app/_assets/SVG/HeartIcon"
import SchoolIcon from "@/app/_assets/SVG/SchoolIcon"
import ShareIcon from "@/app/_assets/SVG/ShareIcon"
import { Listing } from "@/app/_types/Listings"
import { rentDurationMapping, appendCommaIfLengthNotZero } from "@/app/_utils"
import { Button, Flex, Heading, Text } from "@chakra-ui/react"

export default function ListingHeading({
  listing,
  isOwnListing,
}: {
  listing: Listing
  isOwnListing: boolean
}) {
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: "1rem", md: "0" }}
    >
      <Heading as="h1" display="flex" flexDir="column" gap=".6rem">
        <Text as="span">
          <Text as="span" color="brand.main" fontSize="2.4rem" fontWeight="700">
            {listing.rentAmount.toLocaleString("en-us", {
              style: "currency",
              currency: "ngn",
              currencyDisplay: "narrowSymbol",
              maximumFractionDigits: 0,
            })}
          </Text>
          <Text as="span" fontSize="1.6rem" fontWeight="400">
            /
            {
              rentDurationMapping[
                listing.rentDuration as keyof typeof rentDurationMapping
              ]
            }
          </Text>
        </Text>
        <Text as="span" display="block" fontSize="2.4rem" fontWeight="600">
          {listing.isStudioApartment
            ? "Studio Apartment"
            : (+listing.numberOfBedrooms > 1
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
        gap=".2rem"
        display={{ base: isOwnListing ? "flex" : "none", md: "flex" }}
      >
        <Button
          variant="brand-secondary"
          color="black"
          rounded="full"
          p={{ base: "1.2rem", md: "1.8rem" }}
        >
          <ShareIcon />
        </Button>
        {!isOwnListing && (
          <Button
            variant="brand-secondary"
            color="black"
            rounded="full"
            p={{ base: "1.2rem", md: "1.8rem" }}
          >
            <HeartIcon />
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
