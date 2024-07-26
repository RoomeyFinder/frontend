import {
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import ProfileAvatar from "./ProfileAvatar"
import User from "../_types/User"
import { FavouriteButton } from "./RoomListingCard"
import { FavoriteType } from "../_types/Favorites"
import { useRouter } from "next/navigation"
import DotSeparator from "./DotSeparator"
import { getAgeInYears } from "../_utils/date"
import { useMemo } from "react"

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
      py="1rem"
      w="100%"
      justifyContent="center"
      px="2rem"
      alignItems="start"
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
      <HStack justifyContent="start" alignItems="center">
        <ProfileAvatar
          imageSrc={user.profileImage?.secure_url}
          width={"5rem"}
          height={"5rem"}
          size="sm"
        />
        <NameAgeAndGender user={user} />
      </HStack>
      {/* {isLocked ? <PadlockDivider /> : <Divider borderColor="white.200" />} */}
      {/* <VStack>{user.about && <AboutSection about={user.about} />}</VStack> */}
    </Flex>
  )
}

function NameAgeAndGender({ user }: { user: User }) {
  const ageInYears = useMemo(
    () => getAgeInYears(new Date(user.dob)),
    [user.dob]
  )
  return (
    <VStack gap=".2rem" justifyContent="center" alignItems="start">
      <Heading
        as="h6"
        fontSize="1.9rem"
        fontWeight="normal"
        lineHeight="1.9rem"
        textTransform="capitalize"
        noOfLines={2}
        textAlign="left"
      >
        {user.firstName} {user.lastName}
      </Heading>
      <Flex
        justifyContent="start"
        textAlign="center"
        alignItems="center"
        gap="1rem"
        w="full"
      >
        <Text
          textTransform="capitalize"
          color="gray.main"
          fontSize="1.4rem"
          fontWeight="500"
        >
          {user.gender}
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

export function AboutSection({ about }: { about: string }) {
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
