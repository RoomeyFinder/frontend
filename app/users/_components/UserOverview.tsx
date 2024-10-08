import User from "@/app/_types/User"
import CoverAndProfileImage from "@/app/nexus/me/_components/CoverAndProfileImage"
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react"
import defaultCoverImg from "@/app/_assets/images/default-user-cover.png"
import InterestButton from "@/app/_components/InterestButton"
import { getAgeInYears, timeAgo } from "@/app/_utils/date"
import LookingForIcon from "@/app/_assets/SVG/LookingForIcon"
import { ReactNode, useMemo, useState } from "react"
import GenderIcon from "@/app/_assets/SVG/GenderIcon"
import CalenderIcon from "@/app/_assets/SVG/CalenderIcon"
import { ProfileModal } from "@/app/nexus/me/_components/AccountSettingsModal"
import { capitalizeFirstLetter } from "@/app/_utils"
import NoResults from "@/app/_assets/SVG/NoResults"
import TextCheckbox from "@/app/nexus/me/_components/TextCheckbox"
import { Listing } from "@/app/_types/Listings"
import RoomListingCard from "@/app/_components/RoomListingCard"
import BackButton from "@/app/_components/BackButton"
import EditSVG from "@/app/_assets/SVG/Edit"
import { useRouter } from "next/navigation"
import ActiveBall from "@/app/_assets/SVG/ActiveBall"

export const lookingForMappings = {
  both: "a Roommate and an Apartment",
  room: "an apartment",
  roommate: "a Roommate",
  none: "",
}
export const preferredRoommateGenderMappings = {
  male: "a Male roommate",
  female: "a Female roommate",
  both: "a Male or Female roommate",
}
export default function UserOverview({
  user,
  usersListings = [],
  isLoggedIn,
  isOwnProfile,
}: {
  user: User
  usersListings?: Listing[]
  isLoggedIn: boolean
  isOwnProfile: boolean
}) {
  const [showMore, setShowMore] = useState(false)
  const aboutPreview = useMemo(() => user.about?.slice(0, 600), [user.about])
  const router = useRouter()
  const lastSeen = useMemo(
    () => user?.lastSeen && timeAgo(new Date(user?.lastSeen)),
    [user.lastSeen]
  )
  return (
    <Box minH="calc(100vh - 9rem)" w="full">
      <BackButton />
      <Box
        w="full"
        bg="linear-gradient(to top, #FFFFFF, rgb(255 255 221 / 24%), rgb(255 255 221 / 27%), rgb(131 166 212 / 30%), rgb(59 134 255 / 25%))"
      >
        <Box maxW="125rem" mx="auto" pos="relative" h={{ lg: "25rem" }}>
          <CoverAndProfileImage
            coverImage={user?.coverImage?.secure_url || defaultCoverImg.src}
            profileImage={user?.profileImage?.secure_url || ""}
            isFullHeightCoverImage
          />
          <HStack
            alignItems="end"
            pl={{ base: "1.2rem", sm: "21rem", lg: "25rem" }}
            pr={{ base: "1.2rem", sm: "3rem", lg: "5rem" }}
            pt={{ base: "3rem", sm: "2rem", lg: "2rem" }}
          >
            <VStack gap=".6rem" alignItems="start">
              <Heading
                textTransform="capitalize"
                fontSize={{ base: "1.8rem", sm: "2.4rem", lg: "3.2rem" }}
                fontWeight="600"
                textAlign="start"
              >
                {user.firstName} {user.lastName}
              </Heading>
              <Text
                as="span"
                fontSize="1.2rem"
                color={lastSeen === "Just now" ? "green" : "gray.100"}
                display="flex"
                alignItems="center"
                gap=".5rem"
              >
                {lastSeen === "Just now" ? (
                  <>
                    <ActiveBall color="#14b474" />
                    <Text as="span" fontSize="1.4rem">Active</Text>
                  </>
                ) : (
                  `Last seen: ${lastSeen} ago`
                )}
              </Text>
              <Flex
                gap=".8rem"
                fontSize="1.5rem"
                color="gray.main"
                fontWeight="600"
                justifyContent="start"
                flexWrap="wrap"
              >
                {user.settings?.isAgeVisibleOnProfile && (
                  <Text>
                    {user.dob && getAgeInYears(new Date(user.dob))}yrs
                  </Text>
                )}
                <Text textTransform="capitalize">{user.gender}</Text>
                {user.settings?.isOccupationVisibleOnProfile && (
                  <Text>
                    {user.isStudent
                      ? `Student @${user.school}`
                      : user.occupation}
                  </Text>
                )}
                {user.settings?.isStateOfOriginVisibleOnProfile && (
                  <Text>From {user.stateOfOrigin}</Text>
                )}
              </Flex>
            </VStack>
            <Box ml="auto">
              {isOwnProfile ? (
                <Button
                  variant="brand-secondary"
                  bg="brand.main"
                  color="white"
                  _hover={{ filter: "brightness(115%)" }}
                  display="flex"
                  gap="1.6rem"
                  alignItems="center"
                  fontWeight="600"
                  py={{ base: "1rem" }}
                  px={{ base: "1.2rem" }}
                  onClick={() => router.push("/nexus/me/edit")}
                >
                  Edit Profile <EditSVG />
                </Button>
              ) : (
                <InterestButton
                  doc={user._id}
                  docType={"User"}
                  docOwner={user._id}
                />
              )}
            </Box>
          </HStack>
        </Box>
      </Box>
      <Tabs
        colorScheme="blackAlpha"
        maxW="125rem"
        mx="auto"
        mt={{ base: "3rem", lg: "15rem" }}
      >
        <TabList>
          <Tab
            fontSize={{ base: "1.4rem", sm: "1.6rem" }}
            fontWeight="600"
            pb={{ base: ".8rem", lg: "2rem" }}
            px={{ base: "2rem", sm: "4rem", lg: "2.5rem" }}
            mr={{ base: "2.5rem", lg: "4rem" }}
          >
            Bio
          </Tab>
          <Tab
            fontSize={{ base: "1.4rem", sm: "1.6rem" }}
            fontWeight="600"
            pb={{ base: ".8rem", lg: "2rem" }}
            px={{ base: "2rem", sm: "4rem", lg: "2.5rem" }}
            mr={{ base: "2.5rem", lg: "4rem" }}
          >
            Lifestyle
          </Tab>
          <Tab
            fontSize={{ base: "1.2rem", sm: "1.6rem" }}
            fontWeight="600"
            pb={{ base: ".8rem", lg: "2rem" }}
            px={{ base: "2rem", sm: "4rem", lg: "2.5rem" }}
          >
            Listings
          </Tab>
        </TabList>

        <TabPanels
          mt={{ base: "2rem", lg: "4rem" }}
          pb="4rem"
          w="90%"
          mx="auto"
        >
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="2rem">
              <ProfileCard heading="Intro">
                <VStack alignItems="start" gap="1.5rem">
                  <ProfileIconTextPair
                    startText="Looking for"
                    mainText={
                      lookingForMappings[
                        user.preferences
                          ?.lookingFor as keyof typeof lookingForMappings
                      ] || "----"
                    }
                    icon={<LookingForIcon />}
                  />
                  <ProfileIconTextPair
                    startText="Preferrably"
                    mainText={
                      preferredRoommateGenderMappings[
                        user.preferences
                          ?.preferredRoomiesGender as keyof typeof preferredRoommateGenderMappings
                      ] || "----"
                    }
                    icon={<GenderIcon />}
                  />
                  <ProfileIconTextPair
                    startText="Earliest move date"
                    mainText={new Date(
                      user.preferences?.earliestMoveDate || Date.now()
                    ).toLocaleDateString("en-us", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      weekday: "short",
                    })}
                    icon={<CalenderIcon />}
                  />
                </VStack>
              </ProfileCard>
              <ProfileCard heading="About">
                <VStack alignItems="start">
                  <Text noOfLines={5} fontSize="1.5rem">
                    {user.about}
                  </Text>
                  {aboutPreview?.length === 600 && (
                    <Text
                      as="button"
                      fontSize="1.4rem"
                      display="flex"
                      alignItems="center"
                      fontWeight="600"
                      onClick={() => setShowMore(true)}
                    >
                      Show more
                    </Text>
                  )}
                  <ProfileModal
                    onClose={() => setShowMore(false)}
                    isOpen={showMore}
                    heading={`About ${capitalizeFirstLetter(user.firstName)}`}
                    maxWidth="60rem"
                  >
                    <Text fontSize="1.6rem">{user.about}</Text>
                  </ProfileModal>
                </VStack>
              </ProfileCard>
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            {(!user.preferences?.lifestyle ||
              user.preferences.lifestyle.length === 0) && (
              <Box w="full" maxW="50rem" mx="auto">
                <NoResults />
                <Heading
                  mx="auto"
                  textAlign="center"
                  pt="2rem"
                  fontSize="2.8rem"
                  fontWeight="600"
                >
                  Oops, nothing to show
                </Heading>
              </Box>
            )}
            <HStack flexWrap="wrap" gap="1.5rem">
              {user.preferences?.lifestyle.map((lifestyle) => (
                <Lifestyle key={lifestyle}>{lifestyle}</Lifestyle>
              ))}
            </HStack>
          </TabPanel>
          <TabPanel>
            {(!usersListings || usersListings.length === 0) && (
              <Box w="full" maxW="50rem" mx="auto">
                <NoResults />
                <Heading
                  mx="auto"
                  textAlign="center"
                  pt="2rem"
                  fontSize="2.8rem"
                  fontWeight="600"
                >
                  Oops, nothing to show
                </Heading>
                {isOwnProfile && (
                  <Button
                    variant="brand"
                    fontWeight="600"
                    mt="2rem"
                    mx="auto"
                    py="1.2rem"
                    onClick={() => router.push("/nexus/ads/new")}
                  >
                    Create ad
                  </Button>
                )}
              </Box>
            )}
            <SimpleGrid
              flexWrap="wrap"
              gap="1.5rem"
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            >
              {usersListings.map((listing) => (
                <RoomListingCard
                  key={listing._id}
                  listing={listing}
                  showFavoriteButton={isLoggedIn}
                  variant="outlined"
                />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export function ProfileIconTextPair({
  icon,
  mainText,
  startText,
}: {
  icon: ReactNode
  mainText: ReactNode
  startText: ReactNode
}) {
  return (
    <>
      <HStack
        as="p"
        fontSize="1.5rem"
        alignItems="center"
        justifyContent="start"
        gap="1.2rem"
      >
        {icon}
        <Text as="span">
          <Text as="span">{startText}</Text>{" "}
          <Text as="span" fontWeight="600">
            {mainText}
          </Text>
        </Text>
      </HStack>
    </>
  )
}
export function Lifestyle({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <>
      <TextCheckbox isSelected name={""} value={""}>
        {children}
      </TextCheckbox>
    </>
  )
}

export function ProfileCard({
  children,
  heading,
}: {
  children: ReactNode | ReactNode[]
  heading: ReactNode
}) {
  return (
    <Card rounded="1.2rem">
      <CardHeader>
        <Heading
          fontSize={{ base: "1.8rem", md: "2rem" }}
          fontWeight="600"
          mb="1rem"
        >
          {heading}
        </Heading>
        <Divider />
      </CardHeader>
      <CardBody px="1.5rem">{children}</CardBody>
    </Card>
  )
}
