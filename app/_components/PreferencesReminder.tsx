"use client"
import { Box, Text, Link, CloseButton, Fade } from "@chakra-ui/react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import {
  hidePreferencesReminder,
  showPreferencesReminder,
} from "../_redux/slices/ui.slice"
import { usePathname } from "next/navigation"

export default function PreferencesReminder() {
  const { user } = useAppSelector((store) => store.auth)
  const { showPreferencesReminder: showReminder, hasClosedPreferenceReminder } =
    useAppSelector((store) => store.ui)
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  useEffect(() => {
    let timeoutId
    if (
      !user?.hasSetPreferences &&
      pathname === "/nexus" &&
      !hasClosedPreferenceReminder
    ) {
      timeoutId = setTimeout(() => {
        dispatch(showPreferencesReminder())
      }, 1000)
    }
    if (showReminder && pathname !== "/nexus")
      dispatch(hidePreferencesReminder(false))
  }, [user, pathname, dispatch, hasClosedPreferenceReminder])

  return (
    <Fade in={showReminder} unmountOnExit>
      <Box
        left="full"
        right="5%"
        top="10rem"
        bg="white"
        shadow="xl"
        pos="fixed"
        px="2rem"
        py="1.5rem"
        maxW="35rem"
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
              _hover={{ color: "brand.main" }}
              fontWeight="500"
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