import User from "./User"

export default interface Conversation {
  _id: string
  creator: User
  otherUser: User
  createdAt: string
  updatedAt: string
  latestMessage: Message
  unreadMsgsCount: number
}

export interface Message {
  _id: string
  sender: string
  recipient: string
  createdAt: string
  updatedAt: string
  conversationId: string
  text: string,
  seen: boolean
  delivered: boolean
  isPending?: boolean
}
