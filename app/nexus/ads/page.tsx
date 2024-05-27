"use client"
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Suspense, useEffect, useMemo } from "react"
import EditableListingCard from "../../_components/EditableListingCard"
import CenteredSpinner from "../../_components/CenteredSpinner"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { fetchUserListings } from "@/app/_redux/thunks/listings.thunk"
import { Listing } from "@/app/_types/Listings"
import { withPrependPortal } from "@/app/_components/_HOC/withPrependPortal"
import AppNotification from "@/app/_components/AppNotification"
import { resetError } from "@/app/_redux/slices/listings.slice"
import NoResults from "@/app/_assets/SVG/NoResults"
import { useRouter } from "next/navigation"

export default function MyAds() {
  const { hasFetchedUserListings } = useAppSelector((store) => store.listings)
  const dispatch = useAppDispatch()
  useEffect(() => {
    !hasFetchedUserListings && dispatch(fetchUserListings())
  }, [dispatch])
  return (
    <Suspense
      fallback={
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" thickness=".4rem" />
        </Flex>
      }
    >
      <Renderer />
    </Suspense>
  )
}

function Renderer() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { listings, loading, errorMessage, hasError } = useAppSelector(
    (store) => store.listings
  )
  const activeListings = useMemo(
    () => listings.filter((it) => it.isActivated === true),
    [listings]
  )
  const draftListings = useMemo(
    () => listings.filter((it) => it.isDraft === true),
    [listings]
  )
  const deactivatedListings = useMemo(
    () =>
      listings.filter((it) => it.isActivated === false && it.isDraft === false),
    [listings]
  )

  useEffect(() => {
    const resetErrorTimeout = setTimeout(() => {
      hasError && dispatch(resetError())
    }, 8000)

    return () => {
      clearTimeout(resetErrorTimeout)
    }
  }, [dispatch, hasError])

  return (
    <Box pos="relative" py="4rem">
      {withPrependPortal(
        <AppNotification
          onClose={() => {
            dispatch(resetError())
          }}
        >
          {hasError && errorMessage}
        </AppNotification>,
        document.body
      )}
      <Flex
        mb={{ base: "2.5rem", md: "4rem" }}
        w="full"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: "2rem", md: "5rem" }}
      >
        <Heading fontSize={{ base: "2.6rem", sm: "3.6rem" }} fontWeight="500">
          My Ads
        </Heading>
        <Button
          variant="brand"
          fontWeight="600"
          py="1.2rem"
          onClick={() => router.push("/nexus/ads/new")}
        >
          Create ad
        </Button>
      </Flex>
      <Tabs isFitted variant="line" colorScheme="blackAlpha" size="lg">
        <TabList fontSize="1.4rem">
          <Tab
            px="0"
            fontSize={{ base: "1.4rem", md: "1.6rem" }}
            fontWeight="600"
          >
            Active ({activeListings.length})
          </Tab>
          <Tab
            px="0"
            fontSize={{ base: "1.4rem", md: "1.6rem" }}
            fontWeight="600"
          >
            Drafts ({draftListings.length})
          </Tab>
          <Tab
            px="0"
            fontSize={{ base: "1.4rem", md: "1.6rem" }}
            fontWeight="600"
          >
            Deactivated ({deactivatedListings.length})
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <ListingsDisplay
              listings={activeListings}
              currentDisplay="active"
              loading={loading}
            />
          </TabPanel>
          <TabPanel px="0">
            <ListingsDisplay
              listings={draftListings}
              currentDisplay="drafts"
              loading={loading}
            />
          </TabPanel>
          <TabPanel px="0">
            <ListingsDisplay
              listings={deactivatedListings}
              currentDisplay="deactivated"
              loading={loading}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {loading && <CenteredSpinner />}
    </Box>
  )
}

function ListingsDisplay({
  listings,
  currentDisplay,
  loading,
}: {
  listings: Listing[]
  currentDisplay: string
  loading: boolean
}) {
  if (listings.length === 0 && !loading)
    return (
      <>
        <VStack
          gap="1rem"
          minH="50dvh"
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <NoResults />
          <Flex
            alignItems="center"
            flexDir="column"
            gap="1rem"
            lineHeight="normal"
            color="black"
            textAlign="center"
          >
            <Text
              as="h2"
              fontSize={{ base: "2rem", md: "2.8rem" }}
              fontWeight="500"
            >
              {`You do not have any `}
              <b>{currentDisplay}</b>
              {`${currentDisplay !== "drafts" ? "ads" : ""}`}
            </Text>
            <Text
              fontSize={{ base: "1.4rem", md: "1.8rem" }}
              _firstLetter={{ textTransform: "uppercase" }}
            >
              {currentDisplay} {`${currentDisplay !== "drafts" ? "ads" : ""}`}
              you create will appear here.
            </Text>
          </Flex>
        </VStack>
      </>
    )
  return (
    <SimpleGrid
      alignItems="stretch"
      w="100%"
      px={{ base: "2rem", md: "5rem" }}
      py="4rem"
      justifyContent="center"
      gap="1.8rem"
      columns={{ base: 1, sm: 2 }}
    >
      {listings.map((listing) => (
        <GridItem key={listing._id}>
          <EditableListingCard listing={listing} />
        </GridItem>
      ))}
    </SimpleGrid>
  )
}
