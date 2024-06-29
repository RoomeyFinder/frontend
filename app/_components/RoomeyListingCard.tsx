import { Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import ProfileAvatar from "./ProfileAvatar"
import PadlockDivider from "../_assets/SVG/PadlockDivider"
import User from "../_types/User"
import { FavouriteButton } from "./RoomListingCard"
import { FavoriteType } from "../_types/Favorites"
import { useRouter } from "next/navigation"
import DotSeparator from "./DotSeparator"

export default function RoomeyListingCard({
  variant,
  isLocked = false,
  user,
  useConfirmationToRemoveFavorite = false,
}: {
  variant?: "outlined" | "default"
  isLocked?: boolean
  user: User
  useConfirmationToRemoveFavorite?: boolean
}) {
  const router = useRouter()

  return (
    <Flex
      py="2rem"
      w="100%"
      alignItems="center"
      flexDir="column"
      gap="1.5rem"
      pos="relative"
      border={variant === "outlined" ? "1px solid #7070704D" : ""}
      borderRadius="1.2rem"
      background="transparent"
      cursor="pointer"
      h="full"
      onClick={() => router.push(`/users/${user._id}`)}
      _hover={{ background: "white", shadow: "md", textDecor: "underline" }}
    >
      {!isLocked && (
        <FavouriteButton
          listingId={user._id}
          type={FavoriteType.USER}
          useConfirmation={useConfirmationToRemoveFavorite}
        />
      )}
      <ProfileAvatar
        imageSrc={user.profileImage?.secure_url}
        width={100}
        height={100}
      />
      <NameAgeAndGender
        name={`${user.firstName} ${user.lastName}`}
        ageInYears={
          user && user.settings?.isAgeVisibleOnProfile
            ? new Date(Date.now()).getFullYear() -
              new Date(user?.dob || Date.now()).getFullYear()
            : 0
        }
        gender={user.gender}
      />
      {isLocked ? <PadlockDivider /> : <Divider borderColor="white.200" />}
      <VStack>{user.about && <AboutSection about={user.about} />}</VStack>
    </Flex>
  )
}

function NameAgeAndGender({
  name,
  ageInYears,
  gender,
}: {
  name: string
  ageInYears?: number
  gender: string
}) {
  return (
    <VStack gap="1rem" alignItems="center">
      <Heading
        as="h6"
        fontSize="1.9rem"
        fontWeight="normal"
        lineHeight="1.9rem"
        textTransform="capitalize"
      >
        {name}
      </Heading>
      <Flex alignItems="center" gap="1rem">
        <Text
          textTransform="capitalize"
          color="gray.main"
          fontSize="1.4rem"
          fontWeight="500"
        >
          {gender}
        </Text>
        {ageInYears ? (
          <>
            <DotSeparator />
            <Text
              fontSize="1.4rem"
              fontWeight="normal"
              lineHeight="2.4rem"
              color="gray.100"
            >
              {ageInYears ? `${ageInYears}yrs` : ""}
            </Text>
          </>
        ) : null}
      </Flex>
    </VStack>
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
        w="85%"
        maxW="24rem"
        noOfLines={3}
        h="4.6rem"
        whiteSpace="wrap"
        mx="auto"
      >
        {about}
      </Text>
    </Flex>
  )
}
