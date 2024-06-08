"use client"
import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react"
import FeatureCard from "./_components/FeatureCard"
import ChatIcon from "./_assets/SVG/ChatIcon"
import Handlens from "./_assets/SVG/Handlens"
import { LegacyRef, ReactNode } from "react"
import ListingsGridLayout from "./_components/ListingsGridLayout"
import RoomListingCard from "./_components/RoomListingCard"
import { Listing } from "./_types/Listings"
import Empty from "./_components/Empty"
import { useAppSelector } from "./_redux"
import { RoomListingCardSkeleton } from "./_components/Skeletons/ListingCardSkeleton"
import Image from "next/image"
import heroImage from "./_assets/images/hero-image.jpg"
import ForRent from "./_assets/SVG/ForRent"
import Loading from "./_assets/SVG/Loading"
import { useRouter } from "next/navigation"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <ListingsSection />
    </>
  )
}

function Hero() {
  const { user } = useAppSelector((store) => store.auth)
  return (
    <>
      <Flex
        minH="40dvh"
        bg="white"
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ base: "column", md: "row" }}
        px={{ base: "3rem", md: "8rem", lg: "0" }}
        py={{ base: "5rem", md: "10rem" }}
        maxW="125rem"
        mx="auto"
      >
        <Box as="main">
          <Heading
            as="h1"
            variant="xl"
            fontWeight="500"
            mb="2.5rem"
            fontSize={{ base: "4rem", md: "7rem" }}
          >
            Find Roomies & Rooms.
          </Heading>

          <Text
            fontSize={{ base: "1.6rem", md: "2rem" }}
            color="gray.main"
            mb="4.9rem"
            lineHeight="150%"
          >
            Whether you&apos;re a student searching for a cozy apartment, a
            professional seeking a shared living space, or a homeowner looking
            for a compatible roommate, we&apos;ve got you covered.
          </Text>
          <Button
            px="3rem"
            py="1.5rem"
            as={Link}
            href={user ? "/nexus/me" : "/signup"}
            variant={"brand"}
            fontSize="2rem"
            width="fit-content"
            fontWeight="700"
          >
            Get Started
          </Button>
        </Box>
        <Box maxW={{ base: "100vw", md: "60rem", lg: "60rem" }}>
          <Image
            src={heroImage}
            alt="Hero image for Roomeyfinder. Two ladies sitting on a blue couch having coffee"
          />
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
        bg="#f5f9ff"
        textAlign="center"
        justifyContent="center"
        w="100%"
        px={{ base: "3rem", md: "8rem", lg: "8rem" }}
        py={{ base: "5rem", md: "8rem" }}
      >
        <Box as="section">
          <Heading
            as="h1"
            variant="md"
            mb="3rem"
            fontSize={{ base: "3rem", md: "5rem" }}
            fontWeight="600"
          >
            What Roomeyfinder offers
          </Heading>
          <Text
            fontSize={{ base: "1.7rem", md: "2.6rem" }}
            mb="5rem"
            maxW="80rem"
            mx="auto"
            lineHeight="3rem"
          >
            Find your perfect roommate effortlessly.
          </Text>
          <Flex
            as="ul"
            flexWrap="wrap"
            gap="3rem"
            w="full"
            justifyContent="center"
          >
            <FeatureCard
              iconChild={<ForRent />}
              heading="List your space"
              body="Roomeyfinder helps you effortlessly project and list your available living spaces. Our platform serves as a dedicated avenue to showcase your space and connect with individuals searching for their ideal space."
            />
            <FeatureCard
              iconChild={<Handlens />}
              heading="Find a new space"
              body=" Our platform is designed to provide a seamless avenue for discovering spaces that match your preferences. We provide access to a detailed selection of spaces  to help you make the best choice."
            />
            <FeatureCard
              iconChild={<ChatIcon />}
              heading="Message potential roommates"
              body="Message and get in touch with potential roommates in order to get to know each other  by using the Roomeyfinder messaging system."
            />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

function ListingsSection() {
  const { user } = useAppSelector((store) => store.auth)
  const { listings, loading } = useAppSelector((store) => store.search)
  const router = useRouter()
  if (listings.length === 0 && !loading) return null
  return (
    <>
      <Box mx="auto" maxW="125rem">
        <ListSectionContainer>
          <Heading variant="md">Latest Rooms</Heading>
          {loading ? (
            <Flex
              justifyContent="center"
              opacity=".8"
              mx="auto"
              w="100%"
              maxW="40rem"
            >
              <Loading />
            </Flex>
          ) : (
            <RoomsList
              rooms={listings}
              allowFavoriting={user !== null}
              loading={loading}
              emptyTextValue={<>No rooms found</>}
            />
          )}
          {listings.length > 0 && (
            <ContinueExploring
              text="rooms"
              onClick={() => router.push("/ads")}
              show={true}
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
      mx="auto"
      display="flex"
      flexDir="column"
      gap="3rem"
      py={{ base: "3rem", md: "6rem" }}
      // px={{ base: "1.5rem", sm: "2rem", md: "6rem", lg: "7rem" }}
      ref={sectionRef}
    >
      {children}
    </Box>
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
          <RoomListingCard key={room._id} listing={room} variant="outlined" />
        ))}
        justifyContent="start"
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        alignItems="stretch"
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
      onClick={onClick}
      as="button"
      color="brand.main"
      fontSize={{ base: "1.6rem", md: "1.9rem" }}
      display="flex"
      justifyContent={{ base: "center", md: "start" }}
      alignItems={{ base: "center", md: "baseline" }}
      gap="1.6rem"
      p="0"
      h="unset"
      _hover={{
        md: {
          bg: "transparent",
          color: "black",
          textDecor: "underline",
        },
      }}
      _active={{ bg: "transparent" }}
    >
      Continue exploring {text}
    </Text>
  )
}
