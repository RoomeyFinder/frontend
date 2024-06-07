"use client"
import { ReactNode, useEffect } from "react"
import AppHeader from "./AppHeader"
import { Box, Flex } from "@chakra-ui/react"
import AppFooter from "./AppFooter"
import useListenForMessengerEvents from "../_socket/eventListeners/messenger"
import { usePathname } from "next/navigation"
import NexusLayout from "./NexusLayout/NexusLayout"
import PreferencesReminder from "./PreferencesReminder"
import { useAppDispatch, useAppSelector } from "../_redux"
import { useRouter } from "next/navigation"
import { fetchListings } from "../_redux/thunks/search.thunk"

export default function GlobalLayout({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const router = useRouter()
  const { user, token, loading } = useAppSelector((store) => store.auth)
  useListenForMessengerEvents()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) {
      if ((!user || !token) && pathname.startsWith("/nexus")) router.push("/")
    }
  }, [user, token, pathname, router])
  const { hasFetchedInitialListings } = useAppSelector((store) => store.search)
  const dispatch = useAppDispatch()
  useEffect(() => {
    !hasFetchedInitialListings && dispatch(fetchListings())
  }, [dispatch, hasFetchedInitialListings])

  if (pathname.includes("nexus"))
    return (
      <NexusLayout>
        <PreferencesReminder />
        {children}
      </NexusLayout>
    )
  return (
    <Box maxW={{ "2xl": "144rem" }} mx="auto" h="full" overflow="auto">
      <AppHeader />
      <Flex
        justifyContent="center"
        alignItems="center"
        minH={{ base: "80dvh" }}
      >
        <Box flexGrow="1">{children}</Box>
      </Flex>
      <AppFooter />
    </Box>
  )
}
