"use client"
import {
  Box,
  AlertDialogCloseButton,
  Text,
  Link,
  CloseButton,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../_redux"
import { hidePreferencesReminder } from "../_redux/slices/ui.slice"

export default function PreferencesReminder() {
  const { showPreferencesReminder } = useAppSelector((store) => store.ui)
  const dispatch = useAppDispatch()
  if (!showPreferencesReminder) return null
  return (
    <>
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
      >
        <CloseButton
          _focus={{
            boxShadow: "none",
          }}
          ml="auto"
          size="xl"
          onClick={() => dispatch(hidePreferencesReminder())}
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
    </>
  )
}
