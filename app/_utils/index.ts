import { getGeocode, getZipCode, getLatLng } from "use-places-autocomplete"

export const rentDurationMapping: {
  annually: "year"
  monthly: "month"
  biannually: "6months"
  quarterly: "4months"
} = {
  annually: "year",
  monthly: "month",
  biannually: "6months",
  quarterly: "4months",
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

export const appendCommaIfLengthNotZero = (string: string) => {
  if (string.length === 0) return string
  return string + ","
}

export const pluralizeText = (text: string, count: number, suffix: string) => {
  if (count === 1) return text
  if (count === 0 || count > 1) return `${text}${suffix}`
}
export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}
