import SearchPageContent from "../_components/Search/ClientComponents"
import findListings from "./findListings"

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
