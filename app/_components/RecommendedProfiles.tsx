import { Flex, Heading, VStack } from "@chakra-ui/react"
import User from "../_types/User"
import RoomeyListingCard from "./RoomeyListingCard"

export default function RecommendedProfiles({
  profiles,
}: {
  profiles: User[]
}) {
  if (profiles.length === 0) return null
  return (
    <VStack alignItems="start" mt="4rem" gap="1.6rem">
      <Heading as="h2" fontWeight="500" fontSize="2rem">
        Recommended profiles for you
      </Heading>
      <Flex rounded="1.2rem" p="1.5rem" gap="1.5rem" boxShadow="mdz">
        {profiles.map((profile) => (
          <RoomeyListingCard
            key={profile._id}
            user={profile}
            isLocked={false}
            variant="outlined"
          />
        ))}
      </Flex>
    </VStack>
  )
}
