import EditSVG from "@/app/_assets/SVG/Edit"
import ExternalLink from "@/app/_assets/SVG/ExternalLink"
import Island from "@/app/_assets/SVG/Island"
import User from "@/app/_types/User"
import defaultUserCoverImage from "@/app/_assets/images/default-user-cover.png"
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function ProfileInfoSection({ user }: { user: User | null }) {
  const router = useRouter()
  return (
    <VStack overflow="hidden" gap="3rem" pos="relative" h="full" pb="3rem">
      <Image
        w={{ base: "100%" }}
        h={{ base: "25rem" }}
        borderRadius="0"
        borderTopLeftRadius="2.5rem"
        borderTopRightRadius="2.5rem"
        borderBottomLeftRadius="0"
        borderBottomRightRadius="0"
        objectFit="cover"
        src={user?.coverImage?.secure_url || defaultUserCoverImage.src}
      />
      <Avatar
        w={{ base: "6rem", lg: "8rem" }}
        h={{ base: "6rem", lg: "8rem" }}
        pos="absolute"
        top={{ base: "21.5rem", lg: "20.5rem" }}
        left={{ base: "2rem", lg: "3rem" }}
        src={user?.profileImage?.secure_url}
        bg="gray.300"
        border="2px solid white"
      />
      <VStack
        w="full"
        gap="1.2rem"
        pt="1.5rem"
        px={{ base: "2rem", md: "2.8rem" }}
      >
        <Heading
          as="h1"
          textAlign="center"
          mb="2rem"
          display="flex"
          alignItems="center"
          gap="1.4rem"
          fontSize="2.8rem"
        >
          My Profile
          <Link as="button" onClick={() => router.push("/users/me")}>
            <ExternalLink />
          </Link>
        </Heading>
        <Flex fontSize="1.6rem" justifyContent="space-between" w="full">
          <Text fontWeight="600">Legal Name: </Text>
          <Text textTransform="capitalize">
            {user?.firstName} {user?.lastName}
          </Text>
        </Flex>
        <Flex fontSize="1.6rem" justifyContent="space-between" w="full">
          <Text fontWeight="600">Birthday: </Text>
          <Text textTransform="capitalize">
            {user?.dob ? new Date(user?.dob).toDateString() : ""}
          </Text>
        </Flex>
        <Flex fontSize="1.6rem" justifyContent="space-between" w="full">
          <Text fontWeight="600">Gender: </Text>
          <Text textTransform="capitalize">{user?.gender}</Text>
        </Flex>
        <Flex fontSize="1.6rem" justifyContent="space-between" w="full">
          <Text fontWeight="600">Email: </Text>
          <Text textTransform="capitalize">{user?.email}</Text>
        </Flex>
      </VStack>
      <>
        {user?.photos && user.photos.length > 0 && (
          <VStack alignItems="start" w="full" my="2rem" gap="1.4rem">
            <Heading
              as="h2"
              textAlign="left"
              display="flex"
              alignItems="center"
              gap="1.4rem"
              fontSize="2rem"
            >
              Additional photos
            </Heading>
            <AvatarGroup>
              {user?.photos?.map((photo) => (
                <Avatar
                  src={photo?.secure_url}
                  name={user?.firstName}
                  size="xl"
                  w="6rem"
                  h="6rem"
                  bg="brand.main"
                  color="white"
                />
              ))}
            </AvatarGroup>
          </VStack>
        )}
      </>
      <Button
        variant="brand-secondary"
        bg="brand.main"
        color="white"
        _hover={{ filter: "brightness(115%)" }}
        display="flex"
        gap="1.6rem"
        alignItems="center"
        fontWeight="600"
        onClick={() => router.push("/nexus/me/edit")}
      >
        Edit Profile <EditSVG />
      </Button>
      <Box
        display={{ base: "none", sm: "block" }}
        zIndex="-1"
        w="full"
        pos="absolute"
        bottom="-18rem"
        opacity=".3"
      >
        <Island />
      </Box>
    </VStack>
  )
}
