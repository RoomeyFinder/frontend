import Settings from "@/app/_assets/SVG/Settings"
import User from "@/app/_types/User"
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function ProfileSettings({
  // user,
  handleProfileSettingsClick,
  handleDeleteAccountClick,
}: {
  user: User | null
  handleProfileSettingsClick: () => void
  handleDeleteAccountClick: () => void
}) {
  const router = useRouter()
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
        <Text fontSize="1.4rem" color="gray.main" fontWeight="500">
          Manage your account
        </Text>
        <VStack alignItems="start" fontSize="1.4rem" w="full" color="gray.main">
          <Link
            href="/nexus/me/preferences"
            textDecor="underline"
            _hover={{ color: "brand.main" }}
            onClick={(e) => {
              e.preventDefault()
              router.push("/nexus/me/preferences")
            }}
          >
            Update your preferences
          </Link>
          <Link
            as="button"
            onClick={(e) => {
              e.preventDefault()
              handleProfileSettingsClick()
            }}
            textDecor="underline"
            _hover={{ color: "brand.main" }}
          >
            Profile settings
          </Link>
          <Link
            as="button"
            onClick={(e) => {
              e.preventDefault()
              handleDeleteAccountClick()
            }}
            textDecor="underline"
            _hover={{ color: "brand.main" }}
          >
            Delete account
          </Link>
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
