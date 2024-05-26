"use client"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Slide,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react"
import { Suspense, useEffect, useMemo } from "react"
import MyAdsHeader from "../../_components/PageHeader"
import EditableListingCard from "../../_components/EditableListingCard"
import CenteredSpinner from "../../_components/CenteredSpinner"
import FailureUIWithRetryButton from "../../_components/FailureUIWithRetryButton"
import Empty from "../../_components/Empty"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { fetchUserListings } from "@/app/_redux/thunks/listings.thunk"
import { Listing } from "@/app/_types/Listings"

export default function MyAds() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUserListings())
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

  return (
    <Box pos="relative" minH="120dvh" py="4rem">
      <Heading
        px={{ base: "2rem", md: "5rem" }}
        fontSize={{base: "2.6rem", sm:"3.6rem"}}
        fontWeight="500"
        mb="2.5rem"
      >
        My Ads
      </Heading>
      <Tabs isFitted variant="line" colorScheme="blackAlpha" size="lg">
        <TabList fontSize="1.4rem">
          <Tab px="0" fontSize={{ base: "1.4rem", md: "1.6rem" }} fontWeight="600">
            Active ({activeListings.length})
          </Tab>
          <Tab px="0" fontSize={{ base: "1.4rem", md: "1.6rem" }} fontWeight="600">
            Drafts ({draftListings.length})
          </Tab>
          <Tab px="0" fontSize={{ base: "1.4rem", md: "1.6rem" }} fontWeight="600">
            Deactivated ({deactivatedListings.length})
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <ListingsDisplay listings={activeListings} />
          </TabPanel>
          <TabPanel px="0">
            <ListingsDisplay listings={draftListings} />
          </TabPanel>
          <TabPanel px="0">
            <ListingsDisplay listings={deactivatedListings} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {hasError && !loading && (
        <FailureUIWithRetryButton
          text={errorMessage}
          handleRetry={() => dispatch(fetchUserListings())}
        />
      )}
      {/* {listingsToDisplay.length === 0 && !loading && (
        <Empty
          heading={`You do not have any ${currentDisplay} ${currentDisplay !== "drafts" ? "ads" : ""}`}
          text={"Ads you create will appear here."}
        />
      )} */}

      {loading && <CenteredSpinner />}
    </Box>
  )
}

function ListingsDisplay({ listings }: { listings: Listing[] }) {
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
