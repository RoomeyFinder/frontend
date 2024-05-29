import EditSVG from "@/app/_assets/SVG/Edit"
import Settings from "@/app/_assets/SVG/Settings"
import User from "@/app/_types/User"
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"

export default function ProfileSettings({ user }: { user: User | null }) {
  return (
    <VStack overflow="hidden" w="full" gap="3rem" pos="relative" h="full">
      <VStack
        w="full"
        gap="1.2rem"
        pt="1.5rem"
        px={{ base: "2rem", md: "2.8rem" }}
        alignItems="start"
      >
        <Heading
          as="h4"
          textAlign="start"
          display="flex"
          alignItems="start"
          gap="1.4rem"
          fontSize="2rem"
        >
          Settings
        </Heading>
        <Text fontSize="1.4rem" color="gray.main"     fontWeight="500">
          Manage your account preferences
        </Text>
        <VStack
     
          alignItems="start"
          fontSize="1.4rem"
          w="full"
          color="gray.main"
        >
          <Link>Manage subscriptions</Link>
          <Link>Profile settings</Link>
          <Link>Deactivate account</Link>
        </VStack>
      </VStack>
      <Box
        display={{ base: "none", sm: "block" }}
        w="50%"
        pos="absolute"
        top="70%"
        right="0"
        transform="translateY(-50%)"
        opacity=".3"
      >
        <Settings />
      </Box>
    </VStack>
  )
}
