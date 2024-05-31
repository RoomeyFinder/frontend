"use client"
import { Flex, Grid, GridItem, Spinner } from "@chakra-ui/react"
import { Suspense } from "react"
import { useAppSelector } from "../../_redux"
import ProfileInfoSection from "./_components/ProfileInfoSection"
import ProfilePremiumInfoSection from "./_components/ProfileAccountSection"
import ProfileSettings from "./_components/ProfileSettings"

export default function Profile() {
  return (
    <Suspense
      fallback={
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" thickness=".4rem" />
        </Flex>
      }
    >
      <Renderer />
    </Suspense>
  )
}

function Renderer() {
  const { user } = useAppSelector((store) => store.auth)

  return (
    <Grid
      overflow="auto"
      templateRows={{ sm: "repeat(2, 1fr)" }}
      templateColumns={{ sm: "repeat(4, 1fr)" }}
      gap={{ base: 6, md: 12 }}
      w="98%"
      mx="auto"
      bg="#3a86ff0d"
      h="calc(100dvh - 8.5rem)"
      rounded="1.2rem"
      px={{ base: "1rem", md: "2.4rem" }}
      py={{ base: "1rem", md: "2.4rem" }}
      pos="relative"
    >
      <GridItem
        pos="relative"
        zIndex={1}
        rowSpan={2}
        colSpan={2}
        bg="white"
        rounded="2.5rem"
        shadow="sm"
      >
        <ProfileInfoSection user={user} />
      </GridItem>
      <GridItem
        colSpan={2}
        bg="white"
        rounded="2.5rem"
        shadow="sm"
        py="3rem"
        px={{ base: "1.2rem" }}
        pos="relative"
        zIndex={1}
      >
        <ProfilePremiumInfoSection user={user} />
      </GridItem>
      <GridItem
        colSpan={2}
        bg="white"
        rounded="2.5rem"
        shadow="sm"
        py="3rem"
        px={{ base: "1.2rem" }}
        pos="relative"
        zIndex={1}
      >
        <ProfileSettings user={user} />
      </GridItem>
    </Grid>
  )
}
