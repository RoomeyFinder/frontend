"use client"
import { ReactNode, useEffect } from "react"
import AppHeader from "./AppHeader"
import { Box, Flex } from "@chakra-ui/react"
import AppFooter from "./AppFooter"
// import useListenForMessengerEvents from "../_socket/eventListeners/messenger"
import { usePathname } from "next/navigation"
import NexusLayout from "./NexusLayout/NexusLayout"
import PreferencesReminder from "./PreferencesReminder"
import { useAppDispatch, useAppSelector } from "../_redux"
import { useRouter } from "next/navigation"
import { fetchListings } from "../_redux/thunks/search.thunk"
import { checkAuthStatus } from "../_redux/thunks/auth.thunk"
import { logout } from "../_redux/slices/auth.slice"
import { fetchUsersInterests } from "../_redux/thunks/interests.thunk"
import { fetchUserFavorites } from "../_redux/thunks/favorites.thunk"
import { fetchUserListings } from "../_redux/thunks/listings.thunk"
import { fetchUserNotifications } from "../_redux/thunks/notifications.thunk"
import useProtectRoutes from "../_hooks/useProtectRoutes"

export default function GlobalLayout({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const router = useRouter()
  // useListenForMessengerEvents()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkAuthStatus()).then((res) => {
      if (
        (res.payload as any)?.statusCode !== 200 &&
        pathname.startsWith("/nexus")
      ) {
        router.push("/")
        dispatch(logout())
      }
    })
  }, [dispatch, router, pathname])

  const { hasFetchedInitialListings } = useAppSelector((store) => store.search)
  const { user, loading: loadingUser } = useAppSelector((store) => store.auth)
  useEffect(() => {
    if (!loadingUser)
      !hasFetchedInitialListings && dispatch(fetchListings(Boolean(user)))
  }, [dispatch, hasFetchedInitialListings, user, loadingUser])
  const { hasFetchedUserFavorites } = useAppSelector((store) => store.favorites)
  const { hasFetchedUserInterests } = useAppSelector((store) => store.interests)
  const { hasFetchedUserListings } = useAppSelector((store) => store.listings)
  const { hasFetchedNotifications } = useAppSelector(
    (store) => store.notifications
  )

  useEffect(() => {
    if (user) {
      !hasFetchedUserFavorites && dispatch(fetchUserFavorites())
      !hasFetchedUserInterests && dispatch(fetchUsersInterests())
      !hasFetchedUserListings && dispatch(fetchUserListings())
      !hasFetchedNotifications && dispatch(fetchUserNotifications())
    }
  }, [
    dispatch,
    hasFetchedUserFavorites,
    hasFetchedUserInterests,
    hasFetchedUserListings,
    hasFetchedNotifications,
    user,
  ])
  useProtectRoutes()

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
