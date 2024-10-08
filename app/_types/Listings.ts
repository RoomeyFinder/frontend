import User, { Photo } from "./User"

export interface Listing {
  _id: string
  rentDuration?: "annually" | "biannually" | "quarterly" | "monthly" | ""
  photos?: Array<Photo>
  lookingFor?: string
  isStudioApartment?: boolean
  numberOfBedrooms?: number | string
  location?: {
    type: "Point"
    coordinates: Array<number>
  }
  streetAddress?: string
  city?: string
  state?: string
  country?: string
  rentAmount?: number
  currentOccupancyCount?: number
  description?: string
  viewsCount?: string
  likesCount?: number
  features?: Array<string>
  isActivated?: boolean
  isDraft?: boolean
  owner?: User
  earliestMoveInDate: string
  slug: string
  title: string
}

export default interface Listings {
  active: Listing[]
  drafts: Listing[]
  deactivated: Listing[]
}
