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

export function obfuscateEmail(email?: string) {
  if (!email) return
  const [localPart, domainPart] = email.split("@")
  const obfuscatedLocalPart = localPart.slice(0, 2) + "•••••"
  const [domainName, topLevelDomain] = domainPart.split(".")
  const obfuscatedDomainName = domainName.charAt(0) + "•••••"
  const obfuscatedEmail = `${obfuscatedLocalPart}@${obfuscatedDomainName}.${topLevelDomain}`

  return obfuscatedEmail
}

export function isUnderage(dob: string) {
  const birthDate = new Date(dob)
  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid date format")
  }
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  const dayDifference = today.getDate() - birthDate.getDate()
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--
  }
  return age < 16
}

export function formatNumberToTwoDigits(num: number) {
  return num.toString().padStart(2, "0")
}