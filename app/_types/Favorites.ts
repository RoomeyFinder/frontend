import { Listing } from "./Listings";
import User from "./User";


export default interface Favorite {
  _id: string,
  listing: User | Listing,
  type: FavoriteType
  createdAt: Date
  updatedAt: Date
}

export enum FavoriteType{
  USER = "user",
  LISTING = "listing"
}