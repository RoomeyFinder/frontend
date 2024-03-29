"use client"
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
import { TimesIconSmall } from "../_assets/SVG/TimesIcon"
import { InterestsContext } from "../_providers/InterestsProvider"
import { useContext, useMemo } from "react"
import { UserContext } from "../_providers/UserProvider"
import { useSearchParams } from "next/navigation"

export default function Page() {
  const { interests } = useContext(InterestsContext)
  const { user } = useContext(UserContext)
  const searchParams = useSearchParams()
  const currentDisplay = useMemo(
    () => (searchParams.get("filter") || "sent") as "sent" | "received",
    [searchParams]
  )
  const sentInterests = useMemo(() => {
    return (interests || []).filter(
      (interest) => interest.sender?._id === user?._id
    )
  }, [interests, user])

  const receivedInterests = useMemo(() => {
    return (interests || []).filter(
      (interest) => interest.sender?._id !== user?._id
    )
  }, [interests, user])

  return (
    <Box pos="relative" minH="80dvh">
      <MyAdsHeader
        background="white"
        heading={`${currentDisplay} Interests`}
        pathname={"/interests"}
        filters={[
          {
            displayText: `received(${receivedInterests.length})`,
            filterText: "received",
          },
          { displayText: `sent(${sentInterests.length})`, filterText: "sent" },
        ]}
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
        {(currentDisplay.startsWith("sent")
          ? sentInterests
          : receivedInterests
        ).map((interest) => (
          <Interest />
        ))}
        <Interest isSent={currentDisplay === "sent"} />
        <Interest isSent={currentDisplay === "sent"} />
        <Interest isSent={currentDisplay === "sent"} />
        <Interest isSent={currentDisplay === "sent"} />
        <Interest isSent={currentDisplay === "sent"} />
        <Interest isSent={currentDisplay === "sent"} />
      </VStack>
    </Box>
  )
}

function Interest({ isSent }: { isSent?: boolean }) {
  return (
    <Flex
      bg="#d9d9d94f"
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
      <Flex flexDir="column" gap={{ base: ".5rem", md: "1rem" }}>
        <Heading
          fontSize={{ base: "1.4rem", md: "1.9rem" }}
          lineHeight="1.2rem"
        >
          Sarah Owen
        </Heading>
        <Box>
          <Link
            href={``}
            color="gray.main"
            fontWeight="600"
            fontSize={{ base: "1.2rem", md: "1.6rem" }}
            textDecor="underline"
          >
            View profile
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Text
            as="span"
            display={{ md: "none" }}
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
            color="#A1A1A1"
          >
            20s
          </Text>
        </Box>
      </Flex>
      <Flex
        ml="auto"
        gap=".8rem"
        alignItems="center"
        fontSize={{ base: "1.2rem", md: "1.6rem" }}
        fontWeight="700"
      >
        {isSent ? (
          <>
            <Text as="button" color="gray.main" aria-label="unsend interest">
              Unsend
            </Text>
          </>
        ) : (
          <>
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
          </>
        )}
        <Show above="md">
          <Text fontSize={{ base: "1.3rem", md: "1.6rem" }} color="#A1A1A1">
            20s
          </Text>
        </Show>
      </Flex>
    </Flex>
  )
}
