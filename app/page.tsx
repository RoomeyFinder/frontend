"use client"
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react"
import PublishAdClicker from "./_components/PublishAdClicker"
import FeatureCard from "./_components/FeatureCard"
import ChatIcon from "./_assets/SVG/ChatIcon"
import Handlens from "./_assets/SVG/Handlens"
import PeopleGroup from "./_assets/SVG/PeopleGroup"
import {
  LegacyRef,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { SearchContext } from "./_providers/SearchProvider"
import ListingsGridLayout from "./_components/ListingsGridLayout"
import RoomeyListingCard from "./_components/RoomeyListingCard"
import RoomListingCard from "./_components/RoomListingCard"
import User from "./_types/User"
import { Listing } from "./_types/Listings"
import { AuthContext } from "./_providers/AuthContext"
import Empty from "./_components/Empty"
import {
  RoomeyListingCardSkeleton,
  RoomListingCardSkeleton,
} from "./_components/Skeletons/ListingCardSkeleton"

export default function Home() {
  const { roomies, rooms } = useContext(SearchContext)
  return (
    <>
      <Hero />
      {rooms.length >= 12 && roomies.length >= 12 ? (
        <ListingsSection />
      ) : (
        <FeaturesSection />
      )}
    </>
  )
}

function Hero() {
  return (
    <>
      <Flex
        minH="40dvh"
        bg="white.200"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        py={{ base: "8rem", md: "14.6rem" }}
      >
        <Box as="main" maxW="80rem" w="95dvw">
          <Heading as="h1" variant="xl" mb="2.5rem">
            Find Roomies & Rooms.
          </Heading>
          <Divider borderColor="gray.100" />
          <Text
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
            color="gray.main"
            mb="4.9rem"
            lineHeight="2.2rem"
          >
            Whether you&apos;re a student searching for a cozy apartment, a
            professional seeking a shared living space, or a homeowner looking
            for a compatible roommate, we&apos;ve got you covered.
          </Text>
          <Button display="block" mx="auto" variant="main" mb="4.5rem">
            <PublishAdClicker>Publish Your Ad</PublishAdClicker>
          </Button>
          <Link
            color="gray.main"
            fontSize={{ base: "1.3rem", md: "1.675rem" }}
            lineHeight="0"
            href="/help"
          >
            Info & Advice
          </Link>
        </Box>
      </Flex>
    </>
  )
}

function FeaturesSection() {
  return (
    <>
      <Flex
        minH="40dvh"
        bg="white"
        textAlign="center"
        justifyContent="center"
        w="100%"
        py={{ base: "8rem", md: "5rem" }}
      >
        <Box as="section" w="95dvw">
          <Heading as="h1" variant="md" mb="3rem">
            What Roomeyfinder offers
          </Heading>
          <Text
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
            color="gray.main"
            mb="5rem"
            maxW="80rem"
            mx="auto"
            lineHeight="2.2rem"
          >
            Roomeyfinder helps you find your roommates who are schoolmates with ease. We make finding your ideal living situation one less hassle.
          </Text>
          <Flex
            as="ul"
            flexWrap="wrap"
            gap="5rem"
            w="full"
            justifyContent="center"
          >
            <FeatureCard
              iconChild={<PeopleGroup />}
              heading="List your space"
              body="Roomeyfinder helps you effortlessly project and list your available living spaces. Our platform serves as a dedicated avenue to showcase your space and connect with individuals searching for their ideal space."
            />
            <FeatureCard
              iconChild={<Handlens />}
              heading="Find a new space"
              body=" We are here to help you find the perfect living space. Our platform is designed to provide a seamless avenue for discovering spaces that match your preferences. We provide access to a detailed selection of spaces  to help you make informed decisions."
            />
            <FeatureCard
              iconChild={<ChatIcon />}
              heading="Message potential roommates"
              body="Message and get in touch with potential roommates in order to get to k now each other better by using the Roomeyfinder messaging system."
            />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

function ListingsSection() {
  const { isAuthorized } = useContext(AuthContext)
  const {
    roomies,
    rooms,
    hasMoreRoomies,
    hasMoreRooms,
    loadMoreRoomies,
    loadMoreRooms,
    loadingRoomies,
    loadingRooms,
    search,
    focus,
  } = useContext(SearchContext)

  const roomsSectionRef = useRef<HTMLDivElement | null>(null)
  const roomiesSectionRef = useRef<HTMLDivElement | null>(null)
  const allListingsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (focus === "rooms")
      roomsSectionRef.current?.firstElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    if (focus === "roomies")
      roomiesSectionRef.current?.firstElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
  }, [focus])

  const [roomiesFilteredBySearch, filteredRoomsBySearch] = useMemo(() => {
    if (!search) return [roomies, rooms]
    else {
      const isMatch = (obj: { [x: string]: any }) =>
        JSON.stringify(Object.values(obj))
          .toLowerCase()
          .includes(search.toLowerCase())
      const roomiesFiltered = roomies.filter((roomey) => isMatch(roomey))
      const roomsFiltered = rooms.filter((room) => isMatch(room))
      return [roomiesFiltered, roomsFiltered]
    }
  }, [roomies, rooms, search])

  return (
    <>
      <Box ref={allListingsRef}>
        <ListSectionContainer sectionRef={roomiesSectionRef}>
          <Heading variant="md">Latest Roomies</Heading>
          <RoomiesList
            lockProfiles={!isAuthorized}
            roomies={roomiesFilteredBySearch}
            loading={loadingRoomies}
            emptyTextValue={
              <>
                No roomies found
                {search && <Text as="b"> {search}</Text>}
              </>
            }
          />
          {roomies.length > 0 && (
            <ContinueExploring
              text="roomies"
              onClick={() => loadMoreRoomies()}
              show={hasMoreRoomies}
            />
          )}
        </ListSectionContainer>
        <ListSectionContainer sectionRef={roomsSectionRef}>
          <Heading variant="md">Latest Rooms</Heading>
          <RoomsList
            rooms={filteredRoomsBySearch}
            allowFavoriting={isAuthorized}
            loading={loadingRooms}
            emptyTextValue={
              <>
                No rooms found
                {search && <Text as="b"> {search}</Text>}
              </>
            }
          />
          {rooms.length > 0 && (
            <ContinueExploring
              text="rooms"
              onClick={() => loadMoreRooms()}
              show={hasMoreRooms}
            />
          )}
        </ListSectionContainer>
      </Box>
    </>
  )
}

function ListSectionContainer({
  children,
  sectionRef,
}: {
  children: ReactNode | ReactNode[]
  sectionRef?: LegacyRef<HTMLDivElement>
}) {
  return (
    <Box
      w={{ base: "95dvw", md: "full" }}
      maxW={{ md: "84%" }}
      mx="auto"
      display="flex"
      flexDir="column"
      gap="3rem"
      py={{ base: "3rem", md: "6rem" }}
      ref={sectionRef}
    >
      {children}
    </Box>
  )
}
function RoomiesList({
  roomies,
  lockProfiles,
  loading,
  emptyTextValue,
}: {
  roomies: User[]
  lockProfiles: boolean
  loading: boolean
  emptyTextValue: ReactNode
}) {
  if (loading)
    return (
      <ListingsGridLayout
        list={new Array(12).fill(1).map((_, idx) => (
          <RoomeyListingCardSkeleton key={idx} />
        ))}
      />
    )
  if (roomies.length === 0 && !loading)
    return <Empty heading="Oops" text={emptyTextValue} />
  return (
    <>
      <ListingsGridLayout
        list={roomies.map((roomey) => (
          <RoomeyListingCard
            key={roomey._id}
            userId={roomey._id}
            isLocked={lockProfiles}
            name={roomey.firstName}
            ageInYears={
              new Date().getFullYear() - new Date(roomey.dob).getFullYear()
            }
            about={roomey.about}
            profileImage={roomey.profileImage}
          />
        ))}
      ></ListingsGridLayout>
    </>
  )
}

function RoomsList({
  rooms,
  allowFavoriting,
  loading,
  emptyTextValue,
}: {
  rooms: Listing[]
  allowFavoriting: boolean
  loading: boolean
  emptyTextValue: ReactNode
}) {
  if (loading)
    return (
      <ListingsGridLayout
        list={new Array(12).fill(1).map((_, idx) => (
          <RoomListingCardSkeleton key={idx} />
        ))}
      />
    )
  if (rooms.length === 0 && !loading)
    return <Empty heading="Oops" text={emptyTextValue} />
  return (
    <>
      <ListingsGridLayout
        list={rooms.map((room) => (
          <RoomListingCard
            key={room._id}
            ownersName={room.owner?.firstName as string}
            ownersOccupation={room.owner?.occupation as string}
            city={room.city as string}
            rentAmount={room.rentAmount as number}
            rentDuration={room.rentDuration as any}
            title={room.lookingFor as string}
            images={room.photos as []}
            showFavoriteButton={allowFavoriting}
            listingId={room._id as string}
          />
        ))}
      ></ListingsGridLayout>
    </>
  )
}

function ContinueExploring({
  text,
  onClick,
  show,
}: {
  text: ReactNode
  onClick: () => void
  show: boolean
}) {
  if (!show) return null
  return (
    <Text
      color={{ base: "black", md: "brand.main" }}
      fontWeight={{ base: "600", md: "400" }}
      fontSize={{ base: "1.6rem", md: "1.9rem" }}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "start" }}
      alignItems={{ base: "center", md: "baseline" }}
      gap="1.6rem"
      p="0"
      h="unset"
    >
      Continue exploring {text}
      <Button
        onClick={onClick}
        fontSize={{ base: "1.4rem", md: "1.6rem" }}
        variant="brand-secondary"
        bgColor={{ md: "transparent !important" }}
        color={{ md: "gray.main !important" }}
        fontWeight={{ md: "400" }}
        padding={{ md: "0" }}
        _hover={{
          md: { bg: "transparent", color: "black", textDecor: "underline" },
        }}
        _active={{ bg: "transparent" }}
      >
        Show more
      </Button>
    </Text>
  )
}
