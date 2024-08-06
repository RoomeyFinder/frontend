"use client"
import { ReactNode, useEffect } from "react"
import AppHeader from "./AppHeader"
import { Box, Fade, Flex } from "@chakra-ui/react"
import AppFooter from "./AppFooter"
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
import PageLoader from "./PageLoader"
import STORAGE_KEYS from "../STORAGE_KEYS"
import localforage from "localforage"

export default function GlobalLayout({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const {
    user,
    loading: loadingUser,
    shouldLogout,
  } = useAppSelector((store) => store.auth)

  useEffect(() => {
    localStorage.setItem("prevPath", pathname)
  }, [pathname])
  useEffect(() => {
    if (!user) dispatch(checkAuthStatus())
  }, [dispatch, user])

  useEffect(() => {
    if (
      shouldLogout &&
      user &&
      (pathname.startsWith("/nexus") ||
        pathname.startsWith("/ads") ||
        pathname.startsWith("/users"))
    ) {
      router.push("/")
      dispatch(logout())
    }
  }, [shouldLogout, dispatch, pathname, router, user])

  useEffect(() => {
    const hasForcedLogout = localStorage.getItem("hasForcedLogout")
    if (hasForcedLogout === null && user) {
      localforage.clear(() => {
        dispatch(logout())
        localStorage.removeItem(STORAGE_KEYS.RF_TOKEN)
        localStorage.setItem("hasForcedLogout", "true")
        router.push("/")
      })
    }
    if (!user && !loadingUser) localStorage.setItem("hasForcedLogout", "true")
  }, [dispatch, user, loadingUser, router])

  const { hasFetchedInitialListings } = useAppSelector((store) => store.search)
  useEffect(() => {
    if (!loadingUser)
      !hasFetchedInitialListings && dispatch(fetchListings(Boolean(user)))
  }, [dispatch, hasFetchedInitialListings, user, loadingUser])
  const { hasFetchedUserFavorites, loading: loadingUserFavorites } =
    useAppSelector((store) => store.favorites)
  const { hasFetchedUserInterests, loading: loadingUserInterests } =
    useAppSelector((store) => store.interests)
  const { hasFetchedUserListings, loading: loadingUserListings } =
    useAppSelector((store) => store.listings)
  const { hasFetchedNotifications, loading: loadingUserNotifications } =
    useAppSelector((store) => store.notifications)

  useEffect(() => {
    if (user) {
      !hasFetchedUserFavorites &&
        loadingUserFavorites === false &&
        dispatch(fetchUserFavorites())
      !hasFetchedUserInterests &&
        loadingUserInterests === false &&
        dispatch(fetchUsersInterests())
      !hasFetchedUserListings &&
        loadingUserListings === false &&
        dispatch(fetchUserListings())
      !hasFetchedNotifications &&
        loadingUserNotifications === false &&
        dispatch(fetchUserNotifications())
    }
  }, [
    dispatch,
    hasFetchedUserFavorites,
    hasFetchedUserInterests,
    hasFetchedUserListings,
    hasFetchedNotifications,
    loadingUserFavorites,
    loadingUserInterests,
    loadingUserListings,
    loadingUserNotifications,
    user,
  ])
  useProtectRoutes()

  if (loadingUser)
    return (
      <Fade in>
        <PageLoader />
      </Fade>
    )
  if (pathname.includes("nexus"))
    return (
      <>
        <NexusLayout>
          <PreferencesReminder />
          {children}
        </NexusLayout>
      </>
    )
  return (
    <>
      <Box
        maxW={{ "2xl": "144rem" }}
        mx="auto"
        h="full"
        overflow="auto"
        overscrollBehavior={"none"}
        pt="8rem"
        bg="#f4f4f408"
      >
        <AppHeader />
        <Box flexGrow="1" bg="white">
          {children}
        </Box>
        <AppFooter />
      </Box>
    </>
  )
}
