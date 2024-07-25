"use client"
import {
  Box,
  Button,
  Heading,
  HStack,
  Show,
  Flex,
  VStack,
  Text,
  CloseButton,
  Spinner,
} from "@chakra-ui/react"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import ListingsGridLayout from "../_components/ListingsGridLayout"
import { RoomListingCardSkeleton } from "../_components/Skeletons/ListingCardSkeleton"
import { fetchUsers } from "../_redux/thunks/search.thunk"
import {
  GenderFilter,
  RentDurationFilter,
  RentFilter,
} from "../_components/Search/SearchBar"
import useAxios from "../_hooks/useAxios"
import NoResultsDisplay from "../_components/NoResultsDisplay"
import { pluralizeText } from "../_utils"
import User from "../_types/User"
import RoomeyListingCard from "../_components/RoomeyListingCard"
import FunnelIcon from "../_assets/SVG/Funnel"
import BackButton from "../_components/BackButton"

export default function Search() {
  const { hasFetchedInitialUsers } = useAppSelector((store) => store.search)
  const { user, loading: loadingUser } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!loadingUser)
      !hasFetchedInitialUsers && dispatch(fetchUsers(Boolean(user)))
  }, [dispatch, hasFetchedInitialUsers, user, loadingUser])
  return <ListingsSection />
}
function ListingsSection() {
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [cache, setCache] = useState({})
  const [results, setResults] = useState([])

  const { user } = useAppSelector((store) => store.auth)
  const { users, loading } = useAppSelector((store) => store.search)

  const [budget, setBudget] = useState<{
    min?: number
    max?: number
  } | null>(null)
  const [rentDuration, setRentDuration] = useState<
    Listing["rentDuration"] | ""
  >("")
  const [gender, setGender] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)
  const clearFilters = useCallback(() => {
    setBudget(null)
    setGender("")
    setRentDuration("")
  }, [])

  const searchQueryString = useMemo(() => {
    let query = ""
    if (budget) {
      query += `${budget.min ? `minRent=${budget.min}&` : ""}${budget.max ? `maxRent=${budget.max}&` : ""}`
    }
    if (rentDuration) {
      query += `rentDuration=${rentDuration}&`
    }
    if (gender) {
      query += `gender=${gender}`
    }
    return query
  }, [budget, rentDuration, gender])

  const { fetchData } = useAxios()
  const search = useCallback(async () => {
    if (loadingSearch) return
    setLoadingSearch(true)
    if ((cache as any)[searchQueryString]) {
      setLoadingSearch(false)
      return setResults([...((cache as any)[searchQueryString] || [])] as any)
    }
    const res = await fetchData({
      url: `/users/${user ? "auth" : ""}/search?${searchQueryString}`,
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
  }, [searchQueryString, cache, loadingSearch, fetchData, user])

  useEffect(() => {
    if (searchQueryString) search()
  }, [search, searchQueryString, cache])

  return (
    <>
      <Box maxW="129rem" mx="auto" px={{ md: "4rem" }}>
        <Flex
          h="calc(100dvh - 8rem)"
          overflow="hidden"
          pos={{ md: "relative" }}
          w={{ base: "88%", lg: "full" }}
          mx="auto"
        >
          <Box
            pos={{ base: "fixed", md: "sticky" }}
            top={{ base: "0", md: "unset" }}
            inset={{ base: 0, md: "unset" }}
            w={{ base: "100%", md: "30%", lg: "20%" }}
            bg="white"
            zIndex={{ base: "1000", md: "1" }}
            transform={{
              base: showFilters ? "translateX(0)" : "translateX(-100%)",
              md: "none",
            }}
          >
            <Flex
              display={{ base: "flex", md: "none" }}
              w="full"
              py="1.4rem"
              shadow="lg"
              pos="relative"
            >
              <Text
                fontSize="1.6rem"
                fontWeight="500"
                textAlign="center"
                mx="auto"
              >
                {loading ? (
                  <Spinner />
                ) : (
                  (searchQueryString ? results : users).length
                )}
                &nbsp;&nbsp;Roomies available
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
              py="4rem"
              mx="auto"
              alignItems="start"
              gap="2.1rem"
            >
              <Heading fontSize="2.4rem" fontWeight="500" mb="1.4rem">
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
                  budget
                    ? `${budget.min}${budget.max ? "-" : ""}${budget.max ? budget.max : ""}`
                    : ""
                }
                handleSelection={(value: string) => {
                  const minMax = value.split("-")
                  if (minMax.length > 1)
                    setBudget({ min: +minMax[0], max: +minMax[1] })
                  else setBudget({ min: +minMax[0] })
                }}
              />
              <GenderFilter
                value={gender}
                handleSelection={(value: string) => {
                  setGender(value)
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
            w={{ base: "95dvw", md: "70%", lg: "80%" }}
            py={{ base: "8rem", xl: "6rem" }}
            zIndex="90"
            pos="relative"
            mx="auto"
            overflow="auto"
          >
            <BackButton left={{ md: "20%", xl: "2%" }} />
            <HStack alignItems="center" justify="space-between" mb="2.5rem">
              <Heading variant="md" color="" fontWeight="500">
                &nbsp;
                {searchQueryString ? (
                  <>
                    {loading ? (
                      <Spinner size="lg" />
                    ) : (
                      (searchQueryString ? results : users).length
                    )}
                    {` ${pluralizeText("Roomie", results.length, "s")} found`}
                  </>
                ) : (
                  "Latest Roomies"
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
            <ListSectionContainer>
              <RoomiesList
                users={searchQueryString ? results : users}
                allowFavoriting={user !== null}
                loading={loading || loadingSearch}
                emptyTextValue={<>No users found. Try removing some filters</>}
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

function RoomiesList({
  users,
  allowFavoriting,
  loading,
  emptyTextValue,
}: {
  users: User[]
  allowFavoriting: boolean
  loading: boolean
  emptyTextValue: ReactNode
}) {
  if (loading)
    return (
      <ListingsGridLayout
        columns={{ base: 1, sm: 2, md: 3 }}
        list={new Array(12).fill(1).map((_, idx) => (
          <RoomListingCardSkeleton key={idx} />
        ))}
      />
    )
  if (users.length === 0 && !loading)
    return <NoResultsDisplay heading="Oops" body={emptyTextValue} />
  return (
    <>
      <ListingsGridLayout
        list={users.map((user) => (
          <RoomeyListingCard
            key={user._id}
            user={user}
            isLocked={!allowFavoriting}
            variant="outlined"
          />
        ))}
        justifyContent="start"
        columns={{ base: 1, sm: 2, md: 3 }}
        alignItems="stretch"
      ></ListingsGridLayout>
    </>
  )
}
