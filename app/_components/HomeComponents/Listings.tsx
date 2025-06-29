import { Listing } from "@/app/_types/Listings"
import axios from "axios"
import { ContinueExploring, ListSectionContainer } from "./ListingsClient"
import { Heading } from "@chakra-ui/react"
import ListingsGridLayout from "../ListingsGridLayout"
import RoomListingCard from "../RoomListingCard"

async function fetchListings(): Promise<{
  listings: Listing[]
  message: string
  statusCode: number
}> {
  try {
    const response = await axios.get(`/listings?limit=4`, {
      baseURL: process.env.SERVER_URL,
    })
    return response.data
  } catch (err) {
    const error = err as { message: string }
    return {
      listings: [],
      statusCode: 500,
      message: error?.message || "Something went wrong!",
    }
  }
}

export default async function ListingsWrapper() {
  const { listings, statusCode, message } = await fetchListings()

  if (statusCode !== 200) return <>{message}</>
  return (
    <ListSectionContainer>
      <Heading variant="md">Latest Rooms</Heading>
      <ListingsGridLayout
        list={listings.map((room) => (
          <RoomListingCard key={room._id} listing={room} variant="outlined" />
        ))}
        justifyContent="start"
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        alignItems="stretch"
      ></ListingsGridLayout>
      {listings.length > 0 && (
        <ContinueExploring text="rooms" show={true} redirectPath="/ads" />
      )}
    </ListSectionContainer>
  )
}
