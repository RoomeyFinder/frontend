import { Divider, Flex, Heading, Text } from "@chakra-ui/react"
import ProfileAvatar from "./ProfileAvatar"
import PadlockDivider from "../_assets/SVG/PadlockDivider"
import DotSeparator from "./DotSeparator"
import { Photo } from "../_types/User"
import { FavouriteButton } from "./RoomListingCard"
import { FavoriteType } from "../_types/Favorites"

export default function RoomeyListingCard({
  variant,
  isLocked = false,
  name,
  ageInYears,
  about,
  isFavourite,
  profileImage,
  userId,
}: {
  variant?: "outlined" | "default"
  isLocked?: boolean
  name: string
  ageInYears: number
  about: string
  isFavourite: boolean
  profileImage?: Photo
  userId: string
}) {
  return (
    <Flex
      py="2rem"
      w="95dvw"
      maxW={{ base: "95dvw", sm: "28.3rem" }}
      alignItems="center"
      flexDir="column"
      gap="1.5rem"
      pos="relative"
      border={variant === "outlined" ? "1px solid #7070704D" : ""}
      borderRadius="1.2rem"
      background="transparent"
      cursor="pointer"
      _hover={{ background: "white" }}
    >
      {!isLocked && (
        <FavouriteButton
          isFavourite={isFavourite}
          listingId={userId}
          type={FavoriteType.USER}
        />
      )}
      <ProfileAvatar
        imageSrc={profileImage?.secure_url}
        width={180}
        height={180}
        showVerifiedBadge
      />
      <NameAndAge name={name} ageInYears={ageInYears} />
      {isLocked ? <PadlockDivider /> : <Divider borderColor="white.200" />}
      <AboutSection about={about} />
    </Flex>
  )
}

function NameAndAge({
  name,
  ageInYears,
}: {
  name: string
  ageInYears: number
}) {
  return (
    <Flex gap="1rem" alignItems="center">
      <Heading
        as="h6"
        fontSize="1.9rem"
        fontWeight="normal"
        lineHeight="1.9rem"
      >
        {name}
      </Heading>
      <DotSeparator />
      <Text
        fontSize="1.4rem"
        fontWeight="normal"
        lineHeight="2.4rem"
        color="gray.100"
      >
        {ageInYears}yrs
      </Text>
    </Flex>
  )
}

function AboutSection({ about }: { about: string }) {
  return (
    <Flex flexDir="column" textAlign="center" gap="1rem">
      <Heading as="h6" fontSize="1.6rem" lineHeight="1.6rem">
        About Me
      </Heading>
      <Text
        fontSize="1.2rem"
        lineHeight="1.7rem"
        color="gray.main"
        maxW="24rem"
        noOfLines={3}
        h="4.6rem"
      >
        {about}
      </Text>
    </Flex>
  )
}
