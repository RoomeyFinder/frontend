import { Photo } from "./User"

export interface Listing {
  _id?: string
  rentDuration: "annually" | "biannually" | "quarterly" | "monthly" | ""
  photos: Array<Photo>
  lookingFor: string
  owner?: string
  isStudioApartment: boolean
  numberOfBedrooms: number | string
  location?: {
    type: "Point"
    coordinates: Array<number>
  }
  apartmentType?: "Studio" | "Bedroom" | ""
  streetAddress: string
  city: string
  state: string
  country: string
  rentAmount: number
  currentOccupancyCount: number
  description: string
  viewsCount?: string
  likesCount?: number
  features: Array<{ value: string; category: string }>
  isActive: boolean
  isDraft: boolean
}

export default interface Listings {
  active: Listing[]
  drafts: Listing[]
  deactivated: Listing[]
}
