import EditIcon from "@/app/_assets/EditIcon"
import FacebookIcon from "@/app/_assets/FacebookIcon"
import GrowthIcon from "@/app/_assets/GrowthIcon"
import HeartIcon from "@/app/_assets/HeartIcon"
import HeartShineIcon from "@/app/_assets/HeartShineIcon"
import InstagramIcon from "@/app/_assets/InstagramIcon"
import MessageIcon from "@/app/_assets/MessageIcon"
import NotificationIcon from "@/app/_assets/NotificationIcon"
import XIcon from "@/app/_assets/XIcon"

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

export const footerLinks = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "About",
    href: "/about"
  },
  {
    name: "Contact",
    href: "/contact"
  },
  {
    name: "Legal",
    href: "/legal"
  },
  {
    name: "Help Center",
    href: "/help"
  },
  {
    name: "Testimonials",
    href: "/testimonials"
  },
]

export const footerSubLinks = [
  {
    name: "Privacy Policy",
    href: "/privacy-policy"
  },
  {
    name: "Blog",
    href: "/blog"
  },
]

export const socialMediaLinks = [
  {
    name: "facebook",
    href: "https://web.facebook.com/roomeyfinder",
    Icon: FacebookIcon,
  },
  {
    name: "X (formerly twitter)",
    href: "https://twitter.com/roomeyfinder",
    Icon: XIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/roomeyfinder",
    Icon: InstagramIcon,
  },
]