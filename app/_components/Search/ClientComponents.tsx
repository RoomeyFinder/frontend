"use client"
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Input,
  Show,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react"
import {
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import ListingsGridLayout from "../ListingsGridLayout"
import RoomListingCard from "../RoomListingCard"
import { RoomListingCardSkeleton } from "../Skeletons/ListingCardSkeleton"
import { fetchListings } from "../../_redux/thunks/search.thunk"
import {
  NumberOfBedroomsFilter,
  RentDurationFilter,
  RentFilter,
} from "./SearchBar"
import NoResultsDisplay from "../NoResultsDisplay"
import { pluralizeText } from "../../_utils"
import FunnelIcon from "../../_assets/SVG/Funnel"
import BackButton from "../BackButton"
import useDebounce from "@/app/_hooks/useDebounce"
import { useRouter, useSearchParams } from "next/navigation"
import { startLoading, stopLoading } from "@/app/_redux/slices/search.slice"
import { AppLoader } from "../PageLoader"

export default function SearchPageContent({
  mainLocation,
  initialResults,
}: {
  initialResults: Listing[]
  mainLocation: string
}) {
  const { hasFetchedInitialListings } = useAppSelector((store) => store.search)
  const { user, loading: loadingUser } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!loadingUser)
      !hasFetchedInitialListings && dispatch(fetchListings(Boolean(user)))
  }, [dispatch, hasFetchedInitialListings, user, loadingUser])
  return (
    <ListingsSection
      initialResults={initialResults}
      initialLocation={mainLocation}
    />
  )
}

function ListingsSection({
  initialResults,
  initialLocation,
}: {
  initialResults: Listing[]
  initialLocation: string
}) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showFilters, setShowFilters] = useState(false)
  const { loading: loadingSearch } = useAppSelector((store) => store.search)

  const { user } = useAppSelector((store) => store.auth)
  const [searchText, setSearchText] = useState("")
  const searchParams = useSearchParams()

  const [rentAmount, setRentAmount] = useState<{
    min?: number
    max?: number
  } | null>(
    searchParams.get("minRent") || searchParams.get("maxRent")
      ? {
          min: +(searchParams.get("minRent") || ""),
          max: +(searchParams.get("maxRent") || ""),
        }
      : null
  )
  const [rentDuration, setRentDuration] = useState<
    Listing["rentDuration"] | ""
  >((searchParams.get("rentDuration") as "") || "")
  const [bedrooms, setBedrooms] = useState<"studio" | number | "">(
    isNaN(+(searchParams.get("bedrooms") || ""))
      ? (searchParams.get("bedrooms") as "studio" | "")
      : (+(searchParams.get("bedrooms") || "") as number)
  )
  const clearFilters = useCallback(() => {
    router.push(`/${searchText || initialLocation}`)
    setRentAmount(null)
    setBedrooms("")
    setRentDuration("")
  }, [searchText, initialLocation, router])

  const debouncedSearchText = useDebounce(searchText, 500)

  const searchQueryString = useMemo(() => {
    let query = ""
    if (debouncedSearchText) {
      query += `city=${debouncedSearchText || initialLocation}&`
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
  }, [rentAmount, rentDuration, bedrooms, debouncedSearchText, initialLocation])

  // const { fetchData } = useAxios()
  // const search = useCallback(
  //   async (queryString: string) => {
  //     console.log(loadingSearch, "isLoading")
  //     if (loadingSearch) return
  //     setLoadingSearch(true)
  //     const cacheInSessionStorage = sessionStorage.getItem(
  //       STORAGE_KEYS.RF_SEARCH_CACHE
  //     )
  //     let cache = {}
  //     if (cacheInSessionStorage) cache = JSON.parse(cacheInSessionStorage)
  //     if ((cache as any)[queryString]) {
  //       setLoadingSearch(false)
  //       return setResults([...((cache as any)[queryString] || [])] as any)
  //     }
  //     router.push(`/${searchText || initialLocation}?${queryString}`)
  //     // const res = await fetchData({
  //     //   url: `/listings/search?${searchQueryString}`,
  //     //   method: "get",
  //     // })
  //     console.log("searched")
  //     // if (res.statusCode === 200) {
  //     //   setCache((prev) => ({ ...prev, [searchQueryString]: res.results }) as any)
  //     //   setResults(res.results as any)
  //     // } else {
  //     //   setCache((prev) => ({ ...prev, [searchQueryString]: [] }) as any)
  //     //   setResults([])
  //     // }
  //     setLoadingSearch(false)
  //   },
  //   [loadingSearch, fetchData, router, initialLocation, searchText]
  // )

  // const debouncedSearchQueryString = useDebounce(searchQueryString, 500)
  useEffect(() => {
    console.log("djakskj;;a")
    dispatch(startLoading())
    router.push(`/${searchText || initialLocation}?${searchQueryString}`)
  }, [searchQueryString, dispatch, initialLocation, router, searchText])

  useEffect(() => {
    dispatch(stopLoading())
  })

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
                {loadingSearch ? <Spinner /> : initialResults.length}
                &nbsp;&nbsp;
                {pluralizeText("Listing", initialResults?.length, "s")}{" "}
                available
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
              <Input
                variant="filled"
                py="1rem"
                px="1rem"
                rounded=".5rem"
                placeholder="Find location"
                maxW={{ md: "50rem" }}
                defaultValue={decodeURIComponent(initialLocation)}
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <HStack alignItems="center" justify="space-between" mb="-1rem">
                <Heading variant="md" color="" fontWeight="500">
                  <>
                    {loadingSearch ? (
                      <Spinner size="lg" />
                    ) : (
                      initialResults.length
                    )}
                    {` ${pluralizeText("Listing", initialResults.length, "s")} found`}
                  </>
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
              <Suspense fallback={<AppLoader />}>
                <RoomsList
                  rooms={initialResults}
                  allowFavoriting={user !== null}
                  loading={loadingSearch}
                  emptyTextValue={
                    <>No rooms found. Try removing some filters</>
                  }
                />
              </Suspense>
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
