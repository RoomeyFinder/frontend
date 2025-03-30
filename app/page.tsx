import { Suspense } from "react"
import ListingsSection, {
  FeaturesSection,
  Hero,
} from "./_components/HomepageComponents"
import appendSharedMetaData from "./_metadata"
import SkeletalLoading from "./_components/Skeletons/SkeletalLoader"
import { Listing } from "./_types/Listings"
import axios from "axios"

export const dynamic = "force-dynamic"

export async function generateMetadata() {
  return appendSharedMetaData({})
}

async function fetchListings<T>(): Promise<T> {
  try {
    const response = await axios.get<
      T,
      { data: T & { statusCode: number; status: "success" } }
    >(`/api/v1/listings`, {
      baseURL: process.env.SERVER_URL,
    })
    return response.data
  } catch (err) {
    return { listings: [], statusCode: 400, message: "err.message" } as T
  }
}

export default async function Home() {
  const { listings, statusCode, message } = await fetchListings<{
    listings: Listing[]
    message: string
    statusCode: number
  }>()

  return (
    <>
      <Hero />
      <FeaturesSection />
      <Suspense fallback={<SkeletalLoading variant="rooms" />}>
        {statusCode === 200 ? (
          <ListingsSection listings={listings} />
        ) : (
          <>{message}</>
        )}
      </Suspense>
    </>
  )
}
