"use client"
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import ListingsGridLayout from "../_components/ListingsGridLayout"
import { RoomListingCardSkeleton } from "../_components/Skeletons/ListingCardSkeleton"
import { fetchUsers } from "../_redux/thunks/search.thunk"
import {
  GenderFilter,
  LookingForFilter,
  RentDurationFilter,
  RentFilter,
} from "../_components/Search/SearchBar"
import useAxios from "../_hooks/useAxios"
import NoResultsDisplay from "../_components/NoResultsDisplay"
import { pluralizeText } from "../_utils"
import User from "../_types/User"
import RoomeyListingCard from "../_components/RoomeyListingCard"

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
  const [searchBarPositionAndZIndex, setSearchBarPositionAndZIndex] = useState({
    top: "8rem",
    zIndex: 100,
  })
  const { user } = useAppSelector((store) => store.auth)
  const { users, loading } = useAppSelector((store) => store.search)

  useEffect(() => {
    document.body.firstElementChild?.addEventListener("scroll", (e) => {
      if (e.target) {
        const container = e.target as any
        if (container.scrollTop > 80) {
          setSearchBarPositionAndZIndex({ top: "0rem", zIndex: 1000 })
        } else {
          setSearchBarPositionAndZIndex({ top: "8rem", zIndex: 100 })
        }
      }
    })
    return () => {
      document.body.firstElementChild?.removeEventListener("scroll", () => {})
    }
  }, [])

  const [budget, setBudget] = useState<{
    min?: number
    max?: number
  } | null>(null)
  const [rentDuration, setRentDuration] = useState<
    Listing["rentDuration"] | ""
  >("")
  const [gender, setGender] = useState<string>("")
  const [lookingFor, setLookingFor] = useState<string>("")

  const searchQueryString = useMemo(() => {
    let query = ""
    if (lookingFor) {
      query += `lookingFor=${lookingFor}&`
    }
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
  }, [budget, rentDuration, gender, lookingFor])

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
      <Box maxW="125rem" mx="auto" pt={{ base: "13rem", md: "4rem" }}>
        <Box
          pos="fixed"
          left="50%"
          transform="translateX(-50%)"
          w="100%"
          style={searchBarPositionAndZIndex}
          bg="white"
          zIndex="100"
        >
          <Box
            maxW="125rem"
            px={{ base: "1.5rem", lg: "0rem" }}
            shadow={{ base: "lg", md: "none" }}
            py="1.8rem"
            mx="auto"
          >
            <Heading variant="md" color="" fontWeight="500" mb="2.5rem">
              {searchQueryString
                ? `${results.length} ${pluralizeText("Roomie", results.length, "s")} found`
                : "Latest Roomies"}
            </Heading>{" "}
            <Text
              flexShrink="0"
              fontSize="1.6rem"
              fontWeight="600"
              mb=".8rem"
              as="h2"
            >
              Filter by:
            </Text>
            <SimpleGrid
              columns={{ base: 2, sm: 3, md: 5 }}
              gap="1rem"
              alignItems="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
            >
              <RentDurationFilter
                placeholder="Preferred lease duration"
                handleSelection={(e: ChangeEvent<HTMLSelectElement>) =>
                  setRentDuration(e.target.value as any)
                }
              />
              <RentFilter
                placeholder="Budget"
                handleSelection={(e: ChangeEvent<HTMLSelectElement>) => {
                  const minMax = e.target.value.split("-")
                  if (minMax.length > 1)
                    setBudget({ min: +minMax[0], max: +minMax[1] })
                  else setBudget({ min: +minMax[0] })
                }}
              />
              <GenderFilter
                placeholder="Preferred gender"
                handleSelection={(e: ChangeEvent<HTMLSelectElement>) => {
                  setGender(e.target.value)
                }}
              />
              <LookingForFilter
                placeholder="Looking for"
                handleSelection={(e: ChangeEvent<HTMLSelectElement>) => {
                  setLookingFor(e.target.value)
                }}
              />
            </SimpleGrid>
          </Box>
        </Box>
        <ListSectionContainer>
          <RoomiesList
            users={searchQueryString ? results : users}
            allowFavoriting={user !== null}
            loading={loading || loadingSearch}
            emptyTextValue={<>No users found. Try removing some filters</>}
          />
        </ListSectionContainer>
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
    <Box
      w={{ base: "95dvw", md: "full" }}
      maxW={{ base: "94%", xl: "123rem" }}
      mx="auto"
      display="flex"
      flexDir="column"
      gap="3rem"
      py={{ base: "3rem", md: "6rem" }}
      mt="7.4rem"
      pos="relative"
      zIndex="90"
    >
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
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
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
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        alignItems="stretch"
      ></ListingsGridLayout>
    </>
  )
}
