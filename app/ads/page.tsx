"use client"
import { Box, Heading } from "@chakra-ui/react"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import ListingsGridLayout from "../_components/ListingsGridLayout"
import RoomListingCard from "../_components/RoomListingCard"
import { RoomListingCardSkeleton } from "../_components/Skeletons/ListingCardSkeleton"
import { fetchListings } from "../_redux/thunks/search.thunk"
import SearchBar from "../_components/Search/SearchBar"
import useAxios from "../_hooks/useAxios"
import NoResultsDisplay from "../_components/NoResultsDisplay"
import { pluralizeText } from "../_utils"
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
  const [searchBarPositionAndZIndex, setSearchBarPositionAndZIndex] = useState({
    top: "8rem",
    zIndex: 1000,
  })
  const { user } = useAppSelector((store) => store.auth)
  const { listings, loading } = useAppSelector((store) => store.search)

  useEffect(() => {
    document.body.firstElementChild?.addEventListener("scroll", (e) => {
      if (e.target) {
        const container = e.target as any
        if (container.scrollTop > 80) {
          setSearchBarPositionAndZIndex({ top: "0", zIndex: 1000 })
        } else {
          setSearchBarPositionAndZIndex({ top: "8rem", zIndex: 100 })
        }
      }
    })
    return () => {
      document.body.firstElementChild?.removeEventListener("scroll", () => {})
    }
  }, [])
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
      <Box maxW="125rem" mx="auto" pt={{ base: "13rem", md: "4rem" }}>
        <BackButton left="5%" />
        <Box
          pos="fixed"
          left="50%"
          transform="translateX(-50%)"
          w="100%"
          style={searchBarPositionAndZIndex}
          bg="white"
        >
          <Box
            maxW="125rem"
            px={{ base: "1.5rem", lg: "0rem" }}
            shadow={{ base: "lg", md: "none" }}
            py="1.8rem"
            mx="auto"
          >
            <SearchBar
              handleCoordinatesChange={(coordinates) =>
                setSearchCoordinates(coordinates)
              }
              handleBedroomChange={(e) => {
                setBedrooms(
                  !isNaN(+e.target.value)
                    ? +e.target.value
                    : (e.target.value as any)
                )
              }}
              handleRentChange={(e) => {
                const minMax = e.target.value.split("-")
                if (minMax.length > 1)
                  setRentAmount({ min: +minMax[0], max: +minMax[1] })
                else setRentAmount({ min: +minMax[0] })
              }}
              handleRentDurationChange={(e) =>
                setRentDuration(e.target.value as any)
              }
            />
          </Box>
        </Box>
        <ListSectionContainer>
          <Heading variant="md" color="" fontWeight="500">
            {searchQueryString
              ? `${results.length} ${pluralizeText("listing", results.length, "s")} found`
              : "Latest Rooms"}
          </Heading>

          <RoomsList
            rooms={searchQueryString ? results : listings}
            allowFavoriting={user !== null}
            loading={loading || loadingSearch}
            emptyTextValue={<>No rooms found. Try removing some filters</>}
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
    >
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
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
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
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        alignItems="stretch"
      ></ListingsGridLayout>
    </>
  )
}
