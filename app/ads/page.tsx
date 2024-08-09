"use client"
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Show,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import ListingsGridLayout from "../_components/ListingsGridLayout"
import RoomListingCard from "../_components/RoomListingCard"
import { RoomListingCardSkeleton } from "../_components/Skeletons/ListingCardSkeleton"
import { fetchListings } from "../_redux/thunks/search.thunk"
import SearchBar, {
  NumberOfBedroomsFilter,
  RentDurationFilter,
  RentFilter,
} from "../_components/Search/SearchBar"
import useAxios from "../_hooks/useAxios"
import NoResultsDisplay from "../_components/NoResultsDisplay"
import { pluralizeText } from "../_utils"
import FunnelIcon from "../_assets/SVG/Funnel"
import BackButton from "../_components/BackButton"

export default function Search() {
  const { hasFetchedInitialListings } = useAppSelector((store) => store.search)
  const { user, loading: loadingUser } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!loadingUser)
      !hasFetchedInitialListings && dispatch(fetchListings(Boolean(user)))
  }, [dispatch, hasFetchedInitialListings, user, loadingUser])
  return <ListingsSection />
}
function ListingsSection() {
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [cache, setCache] = useState({})
  const [results, setResults] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const { user } = useAppSelector((store) => store.auth)
  const { listings, loading } = useAppSelector((store) => store.search)

  const [searchCoordinates, setSearchCoordinates] = useState<null | {
    lat: number
    lng: number
  }>(null)

  const [rentAmount, setRentAmount] = useState<{
    min?: number
    max?: number
  } | null>(null)
  const [rentDuration, setRentDuration] = useState<
    Listing["rentDuration"] | ""
  >("")
  const [bedrooms, setBedrooms] = useState<"studio" | number | "">("")
  const clearFilters = useCallback(() => {
    setRentAmount(null)
    setBedrooms("")
    setRentDuration("")
  }, [])
  const searchQueryString = useMemo(() => {
    let query = ""
    if (searchCoordinates) {
      query += `lat=${searchCoordinates.lat}&lng=${searchCoordinates.lng}&`
    }
    if (rentAmount) {
      query += `${rentAmount.min ? `minRent=${rentAmount.min}&` : ""}${rentAmount.max ? `maxRent=${rentAmount.max}&` : ""}`
    }
    if (rentDuration) {
      query += `rentDuration=${rentDuration}&`
    }
    if (bedrooms) {
      query += `bedrooms=${bedrooms}`
    }
    return query
  }, [rentAmount, rentDuration, bedrooms, searchCoordinates])
  const { fetchData } = useAxios()
  const search = useCallback(async () => {
    if (loadingSearch) return
    setLoadingSearch(true)
    if ((cache as any)[searchQueryString]) {
      setLoadingSearch(false)
      return setResults([...((cache as any)[searchQueryString] || [])] as any)
    }
    const res = await fetchData({
      url: `/listings/search?${searchQueryString}`,
      method: "get",
    })
    if (res.statusCode === 200) {
      setCache((prev) => ({ ...prev, [searchQueryString]: res.results }) as any)
      setResults(res.results as any)
    } else {
      setCache((prev) => ({ ...prev, [searchQueryString]: [] }) as any)
      setResults([])
    }
    setLoadingSearch(false)
  }, [searchQueryString, cache, loadingSearch, fetchData])
  useEffect(() => {
    if (searchQueryString) search()
  }, [search, searchQueryString, cache])

  return (
    <>
      <Box maxW="129rem" mx="auto" px={{ md: "4rem" }}>
        <Flex
          // h="calc(100dvh - 4rem)"
          overflow="hidden"
          pos={{ md: "relative" }}
          w={{ base: "95%", lg: "full" }}
          mx="auto"
        >
          <Box
            pos={{ base: "fixed", md: "sticky" }}
            inset={{ base: 0, md: "unset" }}
            w={{ base: "100%", md: "30%", lg: "20%" }}
            bg="white"
            zIndex={{ base: "1000", md: "1" }}
            top="8rem"
            transform={{
              base: showFilters ? "translateX(0)" : "translateX(-100%)",
              md: "none",
            }}
            h="calc(100dvh - 4rem)"
            overflow="auto"
          >
            <Flex
              display={{ base: "flex", md: "none" }}
              pos={{ base: "sticky", md: "sticky" }}
              w="full"
              bg="white"
              zIndex="10"
              py="1.4rem"
              shadow="lg"
              top="-.3rem"
            >
              <Text
                fontSize="1.6rem"
                fontWeight="500"
                textAlign="center"
                mx="auto"
                as="div"
              >
                {loading ? (
                  <Spinner />
                ) : (
                  (searchQueryString ? results : listings).length
                )}
                &nbsp;&nbsp;Listings available
              </Text>
              <CloseButton
                ml="auto"
                pos="absolute"
                right="2rem"
                top="50%"
                transform="translateY(-50%)"
                size="xl"
                onClick={() => setShowFilters(false)}
              />
            </Flex>
            <VStack
              maxW="125rem"
              px={{ base: "1.5rem", lg: "0rem" }}
              py="2rem"
              pb="8rem"
              mx="auto"
              alignItems="start"
              gap="1rem"
            >
              <Heading fontSize="2.4rem" fontWeight="500" mb=".4rem">
                Filters
              </Heading>
              <RentDurationFilter
                heading={"Preferred rent duration"}
                value={rentDuration as string}
                handleSelection={(value: string) =>
                  setRentDuration(value as any)
                }
              />
              <RentFilter
                heading="Budget"
                value={
                  rentAmount
                    ? `${rentAmount.min}${rentAmount.max ? "-" : ""}${rentAmount.max ? rentAmount.max : ""}`
                    : ""
                }
                handleSelection={(value: string) => {
                  const minMax = value.split("-")
                  if (minMax.length > 1)
                    setRentAmount({ min: +minMax[0], max: +minMax[1] })
                  else setRentAmount({ min: +minMax[0] })
                }}
              />
              <NumberOfBedroomsFilter
                value={bedrooms as string}
                handleSelection={(value: string) => {
                  setBedrooms(value as any)
                }}
              />
              <Flex alignItems="center" gap="1.6rem">
                <Show below="md">
                  <Button
                    variant="brand"
                    as="button"
                    mr="auto"
                    p="2rem"
                    size="xl"
                    fontSize="1.6rem"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </Show>{" "}
                <Button
                  border="none"
                  rounded=".375rem"
                  _hover={{ bg: "none" }}
                  p="1rem"
                  fontSize="1.6rem"
                  textDecor="underline"
                  bg="transparent"
                  color="#000"
                  fontWeight="500"
                  onClick={() => {
                    clearFilters()
                  }}
                >
                  Clear all filters
                </Button>
              </Flex>
            </VStack>
          </Box>
          <Box
            w={{ base: "full", md: "70%", lg: "80%" }}
            py={{ base: "8rem", xl: "2rem" }}
            zIndex="90"
            pos="relative"
            mx="auto"
            overflow="auto"
          >
            <ListSectionContainer>
              <BackButton left={{ md: "23%", xl: "2%" }} />
              <SearchBar
                handleCoordinatesChange={(coordinates) =>
                  setSearchCoordinates(coordinates)
                }
              />
              <HStack alignItems="center" justify="space-between" mb="-1rem">
                <Heading variant="md" color="" fontWeight="500">
                  {searchQueryString ? (
                    <>
                      {loading ? (
                        <Spinner size="lg" />
                      ) : (
                        (searchQueryString ? results : listings).length
                      )}
                      {` ${pluralizeText("Room", results.length, "s")} found`}
                    </>
                  ) : (
                    "Latest Rooms"
                  )}
                </Heading>
                <Show below="md">
                  <Button
                    aria-label="show filters"
                    bg="transparent"
                    border="1px solid"
                    borderColor="gray.main"
                    rounded="lg"
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                    h="unset"
                    p=".5rem 2rem"
                    onClick={() => setShowFilters((prev) => !prev)}
                  >
                    Filters <FunnelIcon />
                  </Button>
                </Show>
              </HStack>
              <RoomsList
                rooms={searchQueryString ? results : listings}
                allowFavoriting={user !== null}
                loading={loading || loadingSearch}
                emptyTextValue={<>No rooms found. Try removing some filters</>}
              />
            </ListSectionContainer>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

function ListSectionContainer({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Box w="full" display="flex" flexDir="column" gap="3rem">
      {children}
    </Box>
  )
}

function RoomsList({
  rooms,
  // allowFavoriting,
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
        columns={{ base: 1, sm: 2, lg: 3 }}
        list={new Array(12).fill(1).map((_, idx) => (
          <RoomListingCardSkeleton key={idx} hasBorder />
        ))}
      />
    )
  if (rooms.length === 0 && !loading)
    return <NoResultsDisplay heading="Oops" body={emptyTextValue} />
  return (
    <>
      <ListingsGridLayout
        list={rooms.map((room) => (
          <RoomListingCard
            showFavoriteButton
            key={room._id}
            listing={room}
            variant="outlined"
          />
        ))}
        justifyContent="start"
        columns={{ base: 1, sm: 2, lg: 3 }}
        alignItems="stretch"
      ></ListingsGridLayout>
    </>
  )
}
