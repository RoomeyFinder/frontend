
export async function getAddressComponents({
  street,
  city,
  region,
}: {
  street: string
  city: string
  region: string
}) {
  const address = `${street}, ${city}, ${region}`
  const encodedAddress = encodeURIComponent(address)
  const link = `https://maps.google.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&address=${encodedAddress}&sensor=false`
  try {
    let response = await fetch(link)
    if (!response.ok)
      throw new Error("Err: No access to Google service: " + address)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
