import axios from "axios"
import SearchPageContent from "../_components/Search/ClientComponents"

async function findListings(
  city: string,
  searchParams: { [x: string]: string }
) {
  let query = `city=${city}&`
  if (searchParams.minRent) {
    query += `minRent=${searchParams.minRent}&`
  }
  if (searchParams.maxRent) {
    query += `maxRent=${searchParams.maxRent}&`
  }
  if (searchParams.rentDuration) {
    query += `rentDuration=${searchParams.rentDuration}&`
  }
  if (searchParams.bedrooms) {
    query += `bedrooms=${searchParams.bedrooms}`
  }
  console.log(searchParams, query, "ssr")
  try {
    const res = await axios.get(`/api/v1/listings/search?${query}`, {
      baseURL: process.env.SERVER_URL,
    })
    console.log(res.data.results?.length)
    if (res?.data?.statusCode === 200) {
      return {
        query: query,
        results: await res.data.results,
      }
    }
  } catch (err) {
    console.log(err, "ere")
    return {
      query: query,
      results: [],
    }
  }
  return {
    query: query,
    results: [],
  }
}

export default async function SearcPageByState({
  params,
  searchParams,
}: {
  params: { [x: string]: string }
  searchParams: { [x: string]: string }
}) {
  const { city } = params
  const { results } = await findListings(city, searchParams)
  return (
    <>
      <SearchPageContent mainLocation={city} initialResults={results} />
    </>
  )
}
