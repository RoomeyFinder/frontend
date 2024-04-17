import { Message } from "./Conversation"
import Interest from "./Interest"
import { Listing } from "./Listings"
import User from "./User"

export enum NotificationVariant {
  LISTING_INTEREST = "listing-interest",
  PROFILE_INTEREST = "profile-interest",
  MESSAGE = "message",
  LISTING_VIEW = "listing-view",
  ACCEPTED_INTEREST = "accepted-interest",
  PROFILE_VIEW = "profile-view",
}

export default interface Notification {
  _id: string
  seen: boolean
  title: NotificationVariant
  body: string
  from: User
  data: User | Listing | Message | Interest | null
  type: ["User", "Listing", "Message", "Interest"]
  priority: ["high", "normal", "medium"]
  ttl: number
  target: string
}
