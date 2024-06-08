import GenderIcon from "@/app/_assets/SVG/GenderIcon"
import GradCap from "@/app/_assets/SVG/GradCap"
import { PeopleGroupSmall } from "@/app/_assets/SVG/PeopleGroup"
import DotSeparator from "@/app/_components/DotSeparator"
import ProfileAvatar from "@/app/_components/ProfileAvatar"
import { Listing } from "@/app/_types/Listings"
import { pluralizeText } from "@/app/_utils"
import { InterestButton } from "__archive/profile/_components/ProfileOverview"
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
    <HStack pos="sticky" alignItems="center" px={{ base: "1rem", md: 0 }} w="full">
      <HStack gap="2rem" w="full">
        <ProfileAvatar
          size="small"
          imageSrc={listing.photos?.[0]?.secure_url}
          width={{ base: "6rem", md: "9.4rem" }}
          height={{ base: "6rem", md: "9.4rem" }}
          showVerifiedBadge={true}
        />
        <VStack gap=".5rem" alignItems="start">
          <VStack lineHeight="normal" alignItems="start" gap=".5rem">
            <Text as="span" fontWeight="700" fontSize="2.2rem">
              {listing.owner?.firstName}
            </Text>
            <Tooltip label={listing.lookingFor} fontSize="lg">
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
            isOwner={false}
            variant=""
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
    <Flex as="span" alignItems="center" gap=".5rem">
      <Hide above="sm">
        <DotSeparator />
      </Hide>
      <Show above="sm">{icon}</Show>
      <Text as="span">{text}</Text>
    </Flex>
  )
}
