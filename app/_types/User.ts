export default interface User {
  profileImage: {
    secure_url: string
    id: string
    _id: string
  }
  coverImage: {
    secure_url: string
    id: string
    _id: string
  }
  isProfileComplete: boolean
  firstName: string
  lastName: string
  dob: string
  lastSeen: string
  phoneNumber: string
  countryCode: string
  gender: "Male" | "Female"
  email: string
  isStudent: boolean
  school: string
  occupation: string
  stateOfOrigin: string
  countryOfOrigin: string
  currentAddress: string
  about: string
  countOfInterestsLeft: number
  photos: Photo[]
  _id: string
  isVisible: boolean
  isOnline?: boolean
  premiumPurchaseExpiry?: string
  lastDateOfInterestReset: string
  hasSetPreferences: boolean
  preferences?: {
    lifestyle: string[]
    targetLocation: {
      type: string
      coordinates: number[]
    }
    leaseDurations: ("annually" | "biannually" | "quarterly" | "monthly")[]
    targetCity: string
    targetState: string
    earliestMoveDate: string
    lookingFor: "room" | "roommate" | "both" | "none"
    preferredRoomiesGender: "male" | "female" | "both"
    minBudget: number
    maxBudget: number
    maxDistanceFromTargetLocationInMeters: number
  }
  settings: {
    isAgeVisibleOnProfile: boolean
    isOccupationVisibleOnProfile: boolean
    isStateOfOriginVisibleOnProfile: boolean
  }
}

export type Photo = {
  secure_url: string
  id: string
  _id: string
}
