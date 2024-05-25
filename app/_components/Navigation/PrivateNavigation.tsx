"use client"
import HamburgerIcon from "@/app/_assets/SVG/HamburgerIcon"
import {
  Avatar,
  Box,
  Text,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  HStack,
} from "@chakra-ui/react"
import MessageIcon from "@/app/_assets/SVG/MessageIcon"
import NotificationIcon from "@/app/_assets/SVG/NotificationIcon"
import { baseNavItemStyles } from "./SupportNavList"
import { privateLinks } from "../../_data/navLinks"
import { useRouter } from "next/navigation"
import StandAloneIcon from "../StandaloneIcon"
import NotificationsDropdown from "../Notifications/NotificationsDropdown"
import { UserContext } from "@/app/_providers/UserProvider"
import { useContext, useState } from "react"
import GrowthIcon from "@/app/_assets/SVG/GrowthIcon"
import { PremiumModalInfoOnly } from "../PremiumModal"
import { FooterLink } from "../AppFooter"
import UserSettingsIcon from "@/app/_assets/SVG/UserSettingsIcon"
import UserIconSmall from "@/app/_assets/SVG/UserIconSmall"
import { useAppSelector } from "@/app/_redux"

export default function PrivateNavigation() {
  const router = useRouter()
  return (
    <Flex alignItems="center" gap="4rem">
      <Show above="md">
        <Flex gap="4rem">
          <HStack gap="6rem" w="100%">
            <FooterLink href="/profile">My Profile</FooterLink>
            {privateLinks.map((link) => (
              <Show above={link.showBelow} key={link.name}>
                {!link.isIcon && (
                  <FooterLink href={link.href} key={link.name}>
                    {link.name}
                  </FooterLink>
                )}
              </Show>
            ))}
          </HStack>
          <Text as="button" onClick={() => router.push("/messenger")}>
            <StandAloneIcon>
              <MessageIcon />
            </StandAloneIcon>
          </Text>
          <Popover>
            <PopoverTrigger>
              <Text as="button">
                <StandAloneIcon>
                  <NotificationIcon />
                </StandAloneIcon>
              </Text>
            </PopoverTrigger>
            <PopoverContent boxShadow="none" border="0" w="max-content">
              <NotificationsDropdown />
            </PopoverContent>
          </Popover>
        </Flex>
      </Show>
      <MobileNavigation />
    </Flex>
  )
}

function MobileNavigation() {
  const { user } = useAppSelector((store) => store.auth)
  return (
    <>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              cursor="pointer"
              as={Button}
              p="0"
              bg={isOpen ? "white.main" : "transparent"}
              data-testid="profile-toggle"
              h="unset"
              _active={{ bg: "white.main" }}
              _hover={{ bg: "transparent" }}
            >
              <Flex
                as="span"
                boxShadow={
                  isOpen ? "" : "0px 0px 1.5px 0px rgba(0, 0, 0, 0.05)"
                }
                rounded="1rem"
                gap="2rem"
                py=".5rem"
                px="1rem"
                border="1px solid"
                borderColor="white.100"
                alignItems="center"
                color={isOpen ? "brand.main" : "black"}
              >
                <Icon as={HamburgerIcon} />
                <Avatar
                  name={user?.firstName || "Roomey"}
                  color="white"
                  background="brand.main"
                />
              </Flex>
            </MenuButton>
            <MenuList
              overflow="hidden"
              w="95dvw"
              maxW="30rem"
              rounded="1rem"
              boxShadow="md"
              border="none"
              padding="0"
              borderTop="1px solid"
              borderTopColor="white.200"
            >
              <MainPrivateNav />
            </MenuList>
          </>
        )}
      </Menu>
    </>
  )
}

function MainPrivateNav() {
  const router = useRouter()
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  return (
    <>
      <Flex flexDir="column" w="100%" data-testid="profile-nav">
        <Show below="md">
          <PrivateMenuItem onClick={() => router.push("/profile")}>
            <PrivateMenuIcon width="2rem" as={UserIconSmall} />
            <Text as="span">My Profile</Text>
          </PrivateMenuItem>
          <PrivateMenuDivider />
        </Show>
        {privateLinks.map((link, idx, arr) => (
          <Show key={link.name} below={link.showBelow}>
            <PrivateMenuItem onClick={() => router.push(link.href)}>
              <PrivateMenuIcon as={link.icon} />
              {link.name}
            </PrivateMenuItem>
            {idx < arr.length - 1 && <PrivateMenuDivider />}
          </Show>
        ))}
        <PrivateMenuItem onClick={() => router.push("/profile/account")}>
          <PrivateMenuIcon as={UserSettingsIcon} />
          <Text as="span">Account</Text>
        </PrivateMenuItem>
        <PrivateMenuDivider />
        <PrivateMenuItem
          closeOnSelect={true}
          onClick={() => setShowPremiumModal(true)}
        >
          <PrivateMenuIcon as={GrowthIcon} />
          Premium
        </PrivateMenuItem>
      </Flex>
      <InterestsAccessCount />
      <PremiumModalInfoOnly
        show={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </>
  )
}

// function SubPrivateNav({ toggleHideMore }: { toggleHideMore: () => void }) {
//   return (
//     <>
//       <Flex justifyContent="center" alignItems="center" p="2rem">
//         <MenuItem
//           autoFocus
//           w="fit-content"
//           closeOnSelect={false}
//           onClick={toggleHideMore}
//           _focus={{ bg: "brand.10", color: "brand.main" }}
//         >
//           <Icon as={LeftChevron} />
//         </MenuItem>
//         <Text
//           fontSize={{ base: "1.4rem", md: "1.6rem" }}
//           fontWeight="600"
//           as="span"
//           display="block"
//           flexGrow="1"
//           textAlign="center"
//           ml="auto"
//           mr="2rem"
//         >
//           Support
//         </Text>
//       </Flex>
//       <PrivateMenuDivider mb="2rem" />
//       <Box w="100%" maxW="28rem" mx="auto">
//         <SupportNav navItemComponent={MenuItem as typeof Box} />
//       </Box>
//     </>
//   )
// }

function InterestsAccessCount() {
  const { user } = useAppSelector((store) => store.auth)
  return (
    <Box p=".8rem">
      <Flex
        fontSize="1.4rem"
        fontWeight={700}
        color="brand.main"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        gap=".5rem"
        bg="brand.10"
        p="1.25rem"
        rounded="1rem"
      >
        <Text lineHeight="1" color="black">
          {user?.countOfInterestsLeft}
        </Text>
        <Text lineHeight="1">Interests Left</Text>
      </Flex>
    </Box>
  )
}

const PrivateMenuItem = chakra(MenuItem, {
  baseStyle: {
    ...baseNavItemStyles,
  },
})

const PrivateMenuDivider = chakra(MenuDivider, {
  baseStyle: {
    margin: "0",
    borderBottomColor: "white.200",
  },
})
const PrivateMenuIcon = chakra(StandAloneIcon, {
  baseStyle: {
    padding: "1.3rem",
    color: "gray.main",
    fontSize: { base: "1.4rem", md: "1.6rem" },
  },
})
