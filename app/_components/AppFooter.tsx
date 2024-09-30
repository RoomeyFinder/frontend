"use client"
import {
  Box,
  Divider,
  Flex,
  Link,
  LinkProps,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react"
import CopyrightIcon from "../_assets/SVG/CopyrightIcon"
import {
  footerLinks,
  footerSubLinks,
  socialMediaLinks,
} from "../_data/navLinks"
import ListItemMarker from "../_assets/SVG/ListItemMarker"
import StandAloneIcon from "./StandaloneIcon"
import { usePathname, useRouter } from "next/navigation"

export default function AppFooter() {
  const pathname = usePathname()

  if (
    pathname.startsWith("/ads") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/signup")
  )
    return null
  return <AppFooterContent />
}

export function AppFooterContent() {
  const pathname = usePathname()

  return (
    <Box
      as="footer"
      py="2.4rem"
      px="2.4rem"
      bg="#f4f4f480"
      display={pathname.toLowerCase().includes("messenger") ? "none" : "block"}
    >
      <Flex
        flexDir="column"
        gap="2.95rem"
        maxW={{ base: "90%", lg: "125rem" }}
        mx="auto"
      >
        <FooterLinks />
        <Divider zIndex={-10} />
        <Flex
          alignItems="center"
          gap="2.22rem"
          flexDir={{ base: "column", sm: "row" }}
        >
          <Flex as="small" gap=".978rem" alignItems="center">
            <CopyrightIcon />
            <Text as="span" color="#333" fontSize="1.6rem" lineHeight="218%">
              {new Date(Date.now()).getFullYear()} Roomeyfinder, Inc.
            </Text>
          </Flex>
          <FooterSubLinks />
          <Box ml={{ sm: "auto" }}>
            <SocialMediaLinks />
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
function FooterLinks() {
  return (
    <List
      display="flex"
      gap="2rem"
      alignItems="center"
      flexWrap="wrap"
      justifyContent={{ base: "center", sm: "start" }}
    >
      {footerLinks.map((link) => (
        <ListItem key={link.name}>
          <FooterLink href={link.href}>{link.name}</FooterLink>
        </ListItem>
      ))}
      <ListItem
        ml={{ base: "auto", sm: "auto" }}
        mr={{ base: "auto", sm: "0" }}
      >
        <Link
          href="mailto:support@roomeyfinder.com"
          fontSize="1.6rem"
          fontWeight="500"
          color="gray.main"
          whiteSpace="wrap"
        >
          support@roomeyfinder.com
        </Link>
      </ListItem>
    </List>
  )
}

function FooterSubLinks() {
  return (
    <List display="flex" gap="1.6rem">
      {footerSubLinks.map((link) => (
        <ListItem
          key={link.name}
          display="flex"
          alignItems="center"
          gap=".8rem"
        >
          <ListItemMarker />{" "}
          <FooterLink href={link.href}>{link.name}</FooterLink>
        </ListItem>
      ))}
    </List>
  )
}

export function FooterLink({ href, children, onClick, ...rest }: LinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      color="gray.main"
      fontSize={{ base: "1.4rem", md: "1.6rem" }}
      lineHeight="150%"
      cursor="pointer"
      transition="all 250ms ease"
      _hover={{
        textUnderlineOffset: "3px",
        textUnderline: "1px",
        textDecor: "underline",
        color: "black",
      }}
      {...rest}
      onClick={(e) => {
        typeof onClick === "function" && onClick(e)
        if (href) {
          e.preventDefault()
          router.push(href)
        }
      }}
    >
      {children}
    </Link>
  )
}

function SocialMediaLinks() {
  return (
    <List display="flex" alignItems="center" gap="1.5rem">
      {socialMediaLinks.map(({ href, Icon, name }) => (
        <ListItem key={name}>
          <Link as="a" cursor="pointer" target="_blank" href={href}>
            <StandAloneIcon>
              <Icon />
            </StandAloneIcon>{" "}
            <Text srOnly>{name}</Text>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}
