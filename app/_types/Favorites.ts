import { Listing } from "./Listings";
import User from "./User";


export default interface Favorite {
  _id: string,
  listing: User | Listing,
  type: "user" | "listing"
  createdAt: Date
  updatedAt: Date
}