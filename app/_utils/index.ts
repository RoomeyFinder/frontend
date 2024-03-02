import { getGeocode, getZipCode, getLatLng } from "use-places-autocomplete"



export const rentDurationMapping: {
  yearly: "yr"
  monthly: "mo"
  biannually: "6 mo"
  quarterly: "4 mo"
} = {
  yearly: "yr",
  monthly: "mo",
  biannually: "6 mo",
  quarterly: "4 mo",
}

export const FOURTEEN_YEARS_IN_MILLISECONDS = 4.418e11

export const fetchLatLng = async (placeId: string) => {
  const results = await getGeocode({ placeId })
  return await getLatLng(results[0])
}

export const fetchZipCode = async (placeId: string) => {
  const results = await getGeocode({ placeId })
  return getZipCode(results[0], false)
}