import GenderIcon from "@/app/_assets/SVG/GenderIcon"
import GradCap from "@/app/_assets/SVG/GradCap"
import { PeopleGroupSmall } from "@/app/_assets/SVG/PeopleGroup"
import DotSeparator from "@/app/_components/DotSeparator"
import InterestButton from "@/app/_components/InterestButton"
import ProfileAvatar from "@/app/_components/ProfileAvatar"
import { Listing } from "@/app/_types/Listings"
import { pluralizeText } from "@/app/_utils"
import {
  HStack,
  VStack,
  Tooltip,
  Flex,
  Hide,
  Show,
  Text,
  Box,
} from "@chakra-ui/react"
import { ReactNode } from "react"

export default function ListingOwnerOverview({
  listing,
  isOwnListing,
}: {
  listing: Listing
  isOwnListing: boolean
}) {
  return (
    <HStack
      pos="sticky"
      alignItems="center"
      px={{ base: "1rem", md: 0 }}
      w="full"
    >
      <HStack gap="2rem" w="full" alignItems="center">
        <ProfileAvatar
          size="small"
          imageSrc={listing.photos?.[0]?.secure_url}
          width={{ base: "7rem", md: "8rem" }}
          height={{ base: "7rem", md: "8rem" }}
          showVerifiedBadge={true}
        />
        <VStack gap=".8rem" alignItems="start">
          <VStack lineHeight="normal" alignItems="start" gap=".5rem">
            <Text
              as="span"
              textTransform="capitalize"
              fontWeight="700"
              fontSize="1.6rem"
            >
              {listing.owner?.firstName}
            </Text>
            <Tooltip label={listing.lookingFor} fontSize="1.4rem">
              <Text as="span" fontSize="1.6rem" noOfLines={1}>
                I am <b>looking for</b> {listing.lookingFor}
              </Text>
            </Tooltip>
          </VStack>
          <Flex
            as={Text}
            fontSize={{ base: "1.2rem", md: "1.6rem" }}
            textTransform="capitalize"
            alignItems="center"
            gap="1rem"
          >
            <OwnerFeature icon={<GenderIcon />} text={listing.owner?.gender} />
            <OwnerFeature
              icon={<PeopleGroupSmall />}
              text={`${listing.currentOccupancyCount} 
                ${pluralizeText("Occupant", listing.currentOccupancyCount as number, "s")}`}
            />
            {listing.owner?.isStudent && (
              <OwnerFeature icon={<GradCap />} text={"Student"} />
            )}
          </Flex>
        </VStack>
      </HStack>
      {!isOwnListing && (
        <Box
          ml="auto"
          alignSelf={{ sm: "end", md: "center" }}
          display={{ base: "none", sm: "block" }}
        >
          <InterestButton
            docOwner={listing.owner?._id || ""}
            doc={listing._id}
            docType={"Listing"}
          />
        </Box>
      )}
    </HStack>
  )
}

function OwnerFeature({ icon, text }: { icon: ReactNode; text: ReactNode }) {
  return (
    <Flex as="span" alignItems="center" gap=".5rem" fontSize="1.2rem">
      <Hide above="sm">
        <DotSeparator />
      </Hide>
      <Show above="sm">{icon}</Show>
      <Text as="span">{text}</Text>
    </Flex>
  )
}
