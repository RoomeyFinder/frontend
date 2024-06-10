import { Flex, Heading, VStack } from "@chakra-ui/react"
import RoomListingCard from "./RoomListingCard"
import { Listing } from "../_types/Listings"

export default function RecommendedListings({
  listings,
}: {
  listings: Listing[]
}) {
  if (listings.length === 0) return null
  return (
    <VStack alignItems="start" mt="4rem" gap="1.6rem">
      <Heading as="h2" fontWeight="500" fontSize="2rem">
        Recommended listings for you
      </Heading>
      <Flex rounded="1.2rem" p="1.5rem" gap="1.5rem" boxShadow="mdz">
        {listings.map((listing) => (
          <RoomListingCard
            key={listing._id}
            listing={listing}
            variant="outlined"
          />
        ))}
      </Flex>
    </VStack>
  )
}
