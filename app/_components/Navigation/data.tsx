import EditIcon from "@/app/_assets/EditIcon"
import GrowthIcon from "@/app/_assets/GrowthIcon"
import HeartIcon from "@/app/_assets/HeartIcon"
import HeartShineIcon from "@/app/_assets/HeartShineIcon"
import MessageIcon from "@/app/_assets/MessageIcon"
import NotificationIcon from "@/app/_assets/NotificationIcon"

export const privateLinks = [
  {
    name: "My Ads",
    href: "/my-ads",
    icon: EditIcon,
    hideAbove: "",
    showBelow: "",
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: HeartIcon,
    hideAbove: "base",
    showBelow: "",
  },
  {
    name: "Interests",
    href: "/interest",
    icon: HeartShineIcon,
    hideAbove: "base",
    showBelow: "",
  },
  {
    name: "Chats",
    href: "/chats",
    icon: MessageIcon,
    hideAbove: "md",
    showBelow: "md"
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: NotificationIcon,
    hideAbove: "md",
    showBelow: "md"
  },
  {
    name: "Premium",
    href: "/premium",
    icon: GrowthIcon,
    hideAbove: "base",
    showBelow: "",
  },
]

export const supportLinks = [
  {
    name: "Help Center",
    href: "/help",
  },
  {
    name: "Legal",
    href: "/legal",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
]