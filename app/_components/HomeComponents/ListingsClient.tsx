"use client"
import { useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import { Box, Text } from "@chakra-ui/react"
import { ReactNode, LegacyRef, useContext } from "react"
import ListingsGridLayout from "../ListingsGridLayout"
import { redirect } from "next/navigation"
import RoomListingCard from "../RoomListingCard"
import { AuthModalContext } from "../../_providers/AuthModalProvider"

export function ListSectionContainer({
  children,
  sectionRef,
}: {
  children: ReactNode | ReactNode[]
  sectionRef?: LegacyRef<HTMLDivElement>
}) {
  return (
    <Box
      w={{ base: "95dvw", md: "full" }}
      mx="auto"
      display="flex"
      flexDir="column"
      gap="3rem"
      py={{ base: "3rem", md: "6rem" }}
      ref={sectionRef}
    >
      {children}
    </Box>
  )
}

export function RoomsList({ rooms }: { rooms: Listing[] }) {
  return (
    <>
      <ListingsGridLayout
        list={rooms.map((room) => (
          <RoomListingCard key={room._id} listing={room} variant="outlined" />
        ))}
        justifyContent="start"
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        alignItems="stretch"
      ></ListingsGridLayout>
    </>
  )
}

export function ContinueExploring({
  text,
  show,
  redirectPath,
}: {
  text: ReactNode
  show: boolean
  redirectPath: string
}) {
  const { user, loading } = useAppSelector((store) => store.auth)
  const { open: showAuthModal } = useContext(AuthModalContext)

  if (!show) return null
  return (
    <Text
      as="a"
      href={redirectPath}
      onClick={(e) => {
        e.preventDefault()
        if (loading === false && user === null)
          return showAuthModal({
            title: "Sign in to view more ads",
            nextUrl: redirectPath,
          })
        else {
          redirect(redirectPath)
        }
      }}
      color="brand.main"
      fontSize={{ base: "1.6rem", md: "1.9rem" }}
      display="flex"
      justifyContent={{ base: "center", md: "start" }}
      alignItems={{ base: "center", md: "baseline" }}
      gap="1.6rem"
      p="0"
      h="unset"
      _hover={{
        md: {
          bg: "transparent",
          color: "black",
          textDecor: "underline",
        },
      }}
      _active={{ bg: "transparent" }}
    >
      Continue exploring {text}
    </Text>
  )
}
