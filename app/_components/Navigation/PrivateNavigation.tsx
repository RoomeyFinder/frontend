"use client"
import {
  Box,
  Text,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
  chakra,
  Badge,
  Link,
} from "@chakra-ui/react"
import MessageIcon from "@/app/_assets/SVG/MessageIcon"
import NotificationIcon from "@/app/_assets/SVG/NotificationIcon"
import { baseNavItemStyles } from "./SupportNavList"
import { useRouter } from "next/navigation"
import StandAloneIcon from "../StandaloneIcon"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import LogoutIcon from "@/app/_assets/SVG/Logout"
import UserIcon from "@/app/_assets/SVG/UserIcon"
import { logout } from "@/app/_redux/slices/auth.slice"
import DownChevron from "@/app/_assets/SVG/DownChevron"
import useGetUnseenNotificationsCount from "@/app/_hooks/useGetUnseenNotificationsCount"
import useGetUnreadMessagesCount from "@/app/_hooks/useGetUnreadMessagesCount"

export default function PrivateNavigation() {
  const router = useRouter()
  const unseenNotificationsCount = useGetUnseenNotificationsCount()
  const unreadMsgsCount = useGetUnreadMessagesCount()
  return (
    <Flex alignItems="center" gap="4rem">
      <Button
        variant="brand-secondary"
        fontWeight="600"
        display={{ base: "none", sm: "block" }}
        onClick={() => router.push("/nexus/ads/new")}
      >
        Create ad
      </Button>
      <Show above="md">
        <Flex gap="4rem">
          <StandAloneIcon
            pos="relative"
            cursor="pointer"
            onClick={() => router.push("/nexus/notifications")}
          >
            <NotificationIcon />
            {unseenNotificationsCount ? (
              <Badge
                top="-.6rem"
                bg="red.main"
                color="white"
                pos="absolute"
                right="-.2rem"
                w="1.7rem"
                h="1.7rem"
                rounded="full"
                fontSize=".9rem"
                fontWeight="700"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {unseenNotificationsCount}
              </Badge>
            ) : null}
          </StandAloneIcon>
          <StandAloneIcon
            pos="relative"
            cursor="pointer"
            onClick={() => router.push("/messenger")}
          >
            <MessageIcon />
            {unreadMsgsCount ? (
              <Badge
                top="-.6rem"
                bg="red.main"
                color="white"
                pos="absolute"
                right="-.2rem"
                w="1.7rem"
                h="1.7rem"
                rounded="full"
                fontSize=".9rem"
                fontWeight="700"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {unreadMsgsCount}
              </Badge>
            ) : null}
          </StandAloneIcon>
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
                fontSize="1.6rem"
                rounded="1rem"
                gap="1.6rem"
                alignItems="center"
                color={isOpen ? "brand.main" : "black"}
              >
                <Text as="span">
                  Hello{" "}
                  <Text as="span" textTransform="capitalize">
                    {user?.firstName}
                  </Text>
                </Text>
                <DownChevron />
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
  const dispatch = useAppDispatch()

  return (
    <>
      <Flex flexDir="column" w="100%" data-testid="profile-nav" shadow="xl">
        <PrivateMenuItem
          as={Link}
          href="/nexus"
          onClick={(e) => {
            e.preventDefault()
            router.push("/nexus")
          }}
        >
          <PrivateMenuIcon width="2rem" as={UserIcon} />
          <Text as="span">Dashboard</Text>
        </PrivateMenuItem>
        <PrivateMenuDivider />
        <PrivateMenuItem onClick={() => dispatch(logout())}>
          <PrivateMenuIcon as={LogoutIcon} />
          <Text as="span">Logout</Text>
        </PrivateMenuItem>
        <PrivateMenuDivider />
        {/* <PrivateMenuItem
          closeOnSelect={true}
          onClick={() => setShowPremiumModal(true)}
        >
          <PrivateMenuIcon as={GrowthIcon} />
          Premium
        </PrivateMenuItem> */}
      </Flex>
      {/* <InterestsAccessCount /> */}
      {/*  <PremiumModalInfoOnly
        show={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      /> */}
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

export function InterestsAccessCount() {
  return (
    <Box p=".8rem" w="full">
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
        w="full"
      >
        {/* <Text lineHeight="1" color="#222222">
          {user?.countOfInterestsLeft}
        </Text>
        <Text lineHeight="1">Interests Left</Text> */}
      </Flex>
    </Box>
  )
}

const PrivateMenuItem = chakra(MenuItem, {
  baseStyle: {
    ...baseNavItemStyles,
    _focus: {
      bg: "transparent",
    },
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
