import localforage from "localforage"
import { getGeocode, getZipCode, getLatLng } from "use-places-autocomplete"
import STORAGE_KEYS from "../STORAGE_KEYS"

export const rentDurationMapping: {
  annually: "a year"
  monthly: "a month"
  biannually: "6 months"
  quarterly: "4 months"
} = {
  annually: "a year",
  monthly: "a month",
  biannually: "6 months",
  quarterly: "4 months",
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
export function isStrongPassword(password: string): boolean {
  if (password.length < 8) return false
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
}

export async function getTokenFromStorage() {
  let token = await localforage.getItem(STORAGE_KEYS.RF_TOKEN)
  console.log(token, "before")
  if (!token) token = localStorage.getItem(STORAGE_KEYS.RF_TOKEN)
  console.log(token, "after")
  return token
}

export function capitalizeFirstLetter(string: string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1)
}

export function mergeArrays(
  arr1: any[],
  arr2: any[],
  uniqueIdentifier: string
) {
  const combinedArray = arr1.concat(arr2)
  const uniqueIds: any = {}
  const mergedArray = combinedArray.filter((doc) => {
    const id = doc[uniqueIdentifier]
    if (!uniqueIds[id]) {
      uniqueIds[id] = true
      return true
    }
    return false
  })

  return mergedArray
}
