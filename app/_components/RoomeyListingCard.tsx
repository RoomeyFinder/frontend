import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import ProfileAvatar from "./ProfileAvatar"
import PadlockDivider from "../_assets/SVG/PadlockDivider"
import DotSeparator from "./DotSeparator"
import User from "../_types/User"
import { FavouriteButton } from "./RoomListingCard"
import { FavoriteType } from "../_types/Favorites"
import { useRouter } from "next/navigation"

export default function RoomeyListingCard({
  variant,
  isLocked = false,
  user,
}: {
  variant?: "outlined" | "default"
  isLocked?: boolean
  user: User
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
      _hover={{ background: "white", shadow: "md" }}
    >
      {!isLocked && (
        <FavouriteButton listingId={user._id} type={FavoriteType.USER} />
      )}
      <ProfileAvatar
        imageSrc={user.profileImage?.secure_url}
        width={100}
        height={100}
      />
      <NameAndAge
        name={`${user.firstName} ${user.lastName}`}
        ageInYears={
          user && user.settings.isAgeVisibleOnProfile
            ? new Date(Date.now()).getFullYear() -
              new Date(user?.dob || Date.now()).getFullYear()
            : 0
        }
      />
      {isLocked ? <PadlockDivider /> : <Divider borderColor="white.200" />}
      <Box onClick={() => router.push(`/users/${user._id}`)}>
        {user.about && <AboutSection about={user.about} />}
      </Box>
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
        textTransform="capitalize"
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
        {ageInYears || "**"}yrs
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
