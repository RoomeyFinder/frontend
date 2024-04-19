import { Listing } from "./Listings"
import User from "./User"


export default interface Favorite {
  _id: string,
  doc: User | Listing,
  type: FavoriteType
  createdAt: Date
  updatedAt: Date
}

export enum FavoriteType{
  USER = "User",
  LISTING = "Listing"
}