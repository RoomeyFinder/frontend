
import BoltIcon from "@/assets/BoltIcon"
import HamburgerIcon from "@/assets/HamburgerIcon"
import LeftChevron from "@/assets/LeftChevron"
import QuestionMarkCircled from "@/assets/QuestionMarkCircled"
import { Avatar, Box, Text, Button, Flex, Icon, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Show, chakra, useDisclosure } from "@chakra-ui/react"
import MessageIcon from "@/assets/MessageIcon"
import NotificationIcon from "@/assets/NotificationIcon"
import SupportNav, { baseNavItemStyles } from "./SupportNavList"
import { privateLinks } from "../../_data/navLinks"
import { useRouter } from "next/navigation"
import StandAloneIcon from "../StandaloneIcon"



export default function PrivateNavigation() {
  return (
    <Flex alignItems="center" gap="2rem">
      <Show above="md">
        <Flex gap="2rem">
          <Link href="/chat"><StandAloneIcon><MessageIcon /></StandAloneIcon></Link>
          <Link href="/notifications"><StandAloneIcon><NotificationIcon /></StandAloneIcon></Link>
        </Flex>
      </Show>
      <PrivateNavigationDropDown />
    </Flex>
  )
}

function PrivateNavigationDropDown() {
  const { isOpen: showSupportNav, onToggle: onToggleShowSupportNav } = useDisclosure()
  return (
    <>
      <Menu>
        {({ isOpen, }) => (
          <>
            <MenuButton onClick={() => console.log("clicker")} cursor="pointer" as={Button} p="0"
              bg={isOpen ? "white.main" : "transparent"} data-testid="profile-toggle"
              h="unset" _active={{ bg: "white.main" }} _hover={{ bg: "transparent" }}>
              <Flex
                as="span"
                boxShadow={isOpen ? "" : "0px 0px 1.5px 0px rgba(0, 0, 0, 0.05)"}
                rounded="1rem"
                gap="2rem"
                py=".5rem"
                px="1rem"
                border="1px solid"
                borderColor="white.100"
                alignItems="center" color={isOpen ? "brand.main" : "black"} >
                <Show above="md">
                  <Icon as={HamburgerIcon} />
                </Show>
                <Avatar name="Brandon" background="brand.main" />
              </Flex>
            </MenuButton>
            <MenuList
              overflow="hidden" w="95dvw" maxW="30rem" rounded="1rem" boxShadow="md" border="none" padding="0" borderTop="1px solid" borderTopColor="white.200" >
              {showSupportNav ?
                <SubPrivateNav toggleHideMore={onToggleShowSupportNav}/>
                :
                <MainPrivateNav toggleShowMore={onToggleShowSupportNav} />}
            </MenuList>
          </>
        )}
      </Menu>
    </>
  )
}

function MainPrivateNav({ toggleShowMore }: {
  toggleShowMore: () => void
}) {
  const router = useRouter()
  return (
    <>
      <Flex flexDir="column" w="100%" data-testid="profile-nav">
        <PrivateMenuItem>
          <Flex as={Link} _hover={{ textDecoration: "none" }} href="/profile" w="100%" alignItems="center" justifyContent="space-between">
            <Text as="span">Profile</Text>
            <Flex as="span" alignItems="center" gap=".4rem">
              <Text fontSize={{ base: "1rem", md: "1.4rem" }}>status:</Text>
              <Text rounded=".3rem" lineHeight={1} px=".5rem" color="white.main" bg="brand.main" fontSize={{ base: "1rem", md: "1.4rem" }}>Incomplete</Text>
            </Flex>
          </Flex>
        </PrivateMenuItem>
        <PrivateMenuDivider />
        {
          privateLinks.map((link, idx, arr) => (
            <Show key={link.name} below={link.showBelow}>
              <PrivateMenuItem onClick={() => router.push(link.href)}>
                <PrivateMenuIcon as={link.icon} />
                {link.name}
              </PrivateMenuItem>
              {idx < arr.length - 1 && <PrivateMenuDivider />}
            </Show>
          ))
        }
        <PrivateMenuItem closeOnSelect={false} onClick={toggleShowMore}>
          <PrivateMenuIcon as={QuestionMarkCircled} />
          More
        </PrivateMenuItem>
      </Flex>
      <InterestsAccessCount/>
    </>
  )
}

function SubPrivateNav({ toggleHideMore }: {
  toggleHideMore: () => void
}){
  return (
    <>
      <Flex justifyContent="center" alignItems="center" p="2rem">
        <MenuItem autoFocus w="fit-content" closeOnSelect={false} onClick={toggleHideMore} _focus={{ bg: "brand.10", color: "brand.main" }} >
          <Icon as={LeftChevron} />
        </MenuItem>
        <Text fontSize={{ base: "1.4rem", md: "1.6rem" }} fontWeight="600" as="span" display="block" flexGrow="1" textAlign="center" ml="auto" mr="2rem">Support</Text>
      </Flex>
      <PrivateMenuDivider mb="2rem"/>
      <Box w="100%" maxW="28rem" mx="auto"><SupportNav navItemComponent={MenuItem as typeof Box} /></Box>
    </>
  )
}

export function ProfileThrustAd() {
  return (
    <Flex flexDir="column" gap=".949rem" bg="brand.10" p="1rem" rounded="1rem">
      <Flex _hover={{ textDecorationColor: "brand.main", textDecor: "underline" }} as={MenuItem} gap="10px" w="fit-content" p="0" bg="transparent">
        <Icon as={BoltIcon} /><Text fontSize="1.4rem" color="brand.main"> Profile Thrust</Text>
      </Flex>
      <Text fontSize="1.2rem" color="black">Push your profile to the top and get people to see you first</Text>
    </Flex>
  )
}

function InterestsAccessCount(){
  return(
    <Box bg="white.400" p="2rem">
      <Flex fontSize="1.4rem" fontWeight={700} color="brand.main" flexDir="column" justifyContent="center" alignItems="center" gap="1rem" bg="brand.10" p="1rem" rounded="1rem">
        <Text lineHeight="1">Interest Access</Text>
        <Text lineHeight="1" color="black">20 Listings</Text>
      </Flex>
    </Box>
  )
}

const PrivateMenuItem = chakra(MenuItem, {
  baseStyle: {
    ...baseNavItemStyles
  },
})

const PrivateMenuDivider = chakra(MenuDivider, {
  baseStyle: {
    margin: "0",
    borderBottomColor: "white.200"
  },
})
const PrivateMenuIcon = chakra(StandAloneIcon, {
  baseStyle: {
    padding: "1.3rem",
    color: "gray.main",
    fontSize: { base: "1.4rem", md: "1.6rem" }
  },
})

