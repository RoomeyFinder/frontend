import { FavoriteType } from "./Favorites"
import { Listing } from "./Listings"
import User from "./User"


export default interface Interest {
  _id: string,
  doc: User | Listing,
  sender: User,
  accepted: boolean,
  declined: boolean,
  type: FavoriteType,
  seen: boolean
  createdAt: string,
  updatedAt: string,
  seenAt: string
  docOwner: string
}