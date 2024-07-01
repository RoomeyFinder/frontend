import Padlock from "@/app/_assets/SVG/Padlock"
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react"

export default function ProfileAccountInfoSection({
  handleChangeEmailClick,
  handleChangePasswordClick,
}: {
  handleChangePasswordClick: () => void
  handleChangeEmailClick: () => void
}) {
  return (
    <VStack overflow="hidden" gap="3rem" pos="relative" h="full">
      <VStack
        w="full"
        gap="1.2rem"
        pt="1.5rem"
        px={{ base: "2rem", md: "2.8rem" }}
        alignItems="start"
      >
        <Heading
          as="h3"
          textAlign="start"
          display="flex"
          alignItems="start"
          gap="1.4rem"
          fontSize="2rem"
        >
          Password & Account
        </Heading>
        <Text fontSize="1.4rem" color="gray.main" fontWeight="500">
          Update your password and secure your account
        </Text>
        <VStack alignItems="start" fontSize="1.4rem" w="full" color="gray.main">
          <Link
            as="button"
            onClick={() => {
              handleChangePasswordClick()
            }}
            textDecor="underline"
            _hover={{ color: "brand.main" }}
          >
            Change password
          </Link>
          <Link
            as="button"
            onClick={() => {
              handleChangeEmailClick()
            }}
            textDecor="underline"
            _hover={{ color: "brand.main" }}
          >
            Change email address
          </Link>
        </VStack>
      </VStack>
      <Box
        w="50%"
        pos="absolute"
        display={{ base: "none", sm: "block" }}
        top={{ base: "50%", sm: "70%" }}
        right={{ base: "-5%", sm: "0%" }}
        transform={{
          base: "scale(.5) translateY(-50%)",
          sm: "translateY(-50%)",
        }}
        opacity=".3"
        zIndex="-1"
      >
        <Padlock />
      </Box>
    </VStack>
  )
}
