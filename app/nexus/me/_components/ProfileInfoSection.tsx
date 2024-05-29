import EditSVG from "@/app/_assets/SVG/Edit"
import ExternalLink from "@/app/_assets/SVG/ExternalLink"
import Island from "@/app/_assets/SVG/Island"
import User from "@/app/_types/User"
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
} from "@chakra-ui/react"

export default function ProfileInfoSection({ user }: { user: User | null }) {
  return (
    <VStack overflow="hidden" gap="3rem" pos="relative" h="full" pb="3rem" >
      <Avatar
        w={{ base: "100%" }}
        h={{ base: "25rem" }}
        roundedTop="2.5rem"
        roundedBottom="0"
        src={user?.profileImage?.secure_url}
      />
      <Avatar
        w={{ base: "6rem", lg: "8rem" }}
        h={{ base: "6rem", lg: "8rem" }}
        pos="absolute"
        top={{ base: "21.5rem", lg: "20.5rem" }}
        left={{ base: "2rem", lg: "3rem" }}
        src={user?.profileImage?.secure_url}
        bg="gray.300"
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
          <Link href="/">
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
        display="flex"
        gap="1.6rem"
        alignItems="center"
        fontWeight="600"
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
