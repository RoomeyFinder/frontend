import {
  Avatar,
  Box,
  Flex,
  Heading,
  Link,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react"
import MyAdsHeader from "../_components/PageHeader"
import CheckIcon from "../_assets/SVG/CheckIcon"
import TimesIcon, { TimesIconSmall } from "../_assets/SVG/TimesIcon"

export default function Page() {
  return (
    <Box pos="relative" minH="80dvh">
      <MyAdsHeader
        background="white"
        heading="Interests"
        pathname={"/interests"}
        filters={["received", "sent"]}
      />
      <VStack
        w="90%"
        maxW={{ lg: "80%" }}
        alignItems="center"
        gap="1rem"
        py="3rem"
        justifyContent="center"
        mx="auto"
      >
        <Interest />
        <Interest />
        <Interest />
        <Interest />
      </VStack>
    </Box>
  )
}

function Interest() {
  return (
    <Flex
      bg={{ base: "#d9d9d94f", md: "#D9D9D9" }}
      rounded="1.2rem"
      alignItems="center"
      gap={{ base: "1rem", md: "1.5rem" }}
      py="1rem"
      px="2rem"
      w="full"
    >
      <Avatar
        w={{ base: "4rem", md: "7rem" }}
        h={{ base: "4rem", md: "7rem" }}
        border="1px solid #3A86FF"
      />
      <Box>
        <Heading
          fontSize={{ base: "1.4rem", md: "1.9rem" }}
          lineHeight="1.2rem"
          mb="1rem"
        >
          Sarah Owen
        </Heading>
        <Link
          href={``}
          color="gray.main"
          fontWeight="600"
          fontSize={{ base: "1.2rem", md: "1.6rem" }}
          textDecor="underline"
        >
          View profile
        </Link>
      </Box>
      <Flex
        ml="auto"
        gap=".8rem"
        alignItems="center"
        fontSize={{ base: "1.2rem", md: "1.6rem" }}
        fontWeight="700"
      >
        <Text as="button" color="brand.main" aria-label="accept interest">
          <Show below="md">
            <CheckIcon />
          </Show>
          <Show above="md">Accept</Show>
        </Text>
        <Text as="button" color="gray.main" aria-label="decline interest">
          <Show below="md">
            <TimesIconSmall />
          </Show>
          <Show above="md">Decline</Show>
        </Text>
        <Show above="md">
          <Text fontSize={{ base: "1.3rem", md: "1.6rem" }} color="#A1A1A1">
            20s
          </Text>
        </Show>
      </Flex>
    </Flex>
  )
}
