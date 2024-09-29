import axios from "axios"

export default async function findListings(
  city: string,
  searchParams: { [x: string]: string }
) {
  let query = ""
  if (city) query = `city=${city}&`
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
  console.log(searchParams, query.length, "ssr")
  try {
    const res = await axios.get(`/api/v1/listings/search?${query}`, {
      baseURL: process.env.SERVER_URL,
    })
    if (res?.data?.statusCode === 200) {
      console.log(res.data.results?.length)
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
