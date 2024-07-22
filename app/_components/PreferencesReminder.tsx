"use client"
import { Box, Text, Link, CloseButton, Fade } from "@chakra-ui/react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import {
  hidePreferencesReminder,
  showPreferencesReminder,
} from "../_redux/slices/ui.slice"
import { usePathname, useRouter } from "next/navigation"

export default function PreferencesReminder() {
  const router = useRouter()
  const { user } = useAppSelector((store) => store.auth)
  const { showPreferencesReminder: showReminder, hasClosedPreferenceReminder } =
    useAppSelector((store) => store.ui)
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (
      user &&
      user.hasSetPreferences !== true &&
      (pathname === "/nexus" || pathname === "/nexus/me") &&
      !hasClosedPreferenceReminder
    ) {
      timeoutId = setTimeout(() => {
        dispatch(showPreferencesReminder())
      }, 5000)
    }
    if (showReminder && pathname !== "/nexus" && pathname !== "/nexus/me")
      dispatch(hidePreferencesReminder(false))
    return () => {
      clearTimeout(timeoutId)
    }
  }, [user, pathname, dispatch, hasClosedPreferenceReminder, showReminder])

  return (
    <Fade in={!showReminder} unmountOnExit>
      <Box
        left="50%"
        bottom="4rem"
        bg="white"
        shadow="xl"
        pos="fixed"
        px="2rem"
        py="1.5rem"
        maxW={{ base: "90dvw", sm: "35rem" }}
        rounded="1.2rem"
        zIndex="1000"
      >
        <CloseButton
          _focus={{
            boxShadow: "none",
          }}
          ml="auto"
          size="xl"
          onClick={() => dispatch(hidePreferencesReminder(true))}
        />
        <Box fontSize="1.6rem">
          <Text lineHeight="1.8">
            <Link
              textDecor="underline"
              textUnderlineOffset=".3rem"
              color="brand.main"
              _hover={{ color: "brand.main", filter: "brightness(120%)" }}
              fontWeight="500"
              href="/nexus/me/preferences"
              onClick={(e) => {
                e.preventDefault()
                router.push("/nexus/me/preferences")
              }}
            >
              Update your preferences
            </Link>
            {"  "}
            to see more personalized ads and recommendations.
          </Text>
        </Box>
      </Box>
    </Fade>
  )
}
