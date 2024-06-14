"use client"
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  GridItem,
  Show,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import { ReactNode, useEffect, useState } from "react"
import Conversations from "./_Components/Conversations"
import { useAppDispatch, useAppSelector } from "../_redux"
import { fetchUserConversations } from "../_redux/thunks/conversations.thunk"
import { removeActiveConversation } from "../_redux/slices/conversations.slice"
import useListenForMessengerEvents from "../_socket/eventListeners/messenger"

export default function Layout({ children }: { children: ReactNode }) {
  useListenForMessengerEvents()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const { hasFetchedUserConversations, activeConversation } = useAppSelector(
    (store) => store.conversations
  )
  useEffect(() => {
    if (user) {
      !hasFetchedUserConversations && dispatch(fetchUserConversations())
    }
  }, [dispatch, hasFetchedUserConversations, user])
  return (
    <>
      <VStack
        w="full"
        alignItems="stretch"
        h="calc(100dvh - 8rem)"
        gap=".5rem"
        overflow="hidden"
        bg="white"
      >
        <Box w="full" pos="sticky" zIndex="200" top="0"></Box>
        <Show above="md">
          <SimpleGrid columns={12} h="100%" pos="sticky" alignItems="start">
            <GridItem
              h="100%"
              bg="#3a86ff12"
              colStart={1}
              colSpan={3}
              pos="sticky"
              top="0"
              overflow={!activeConversation ? "auto" : "hidden"}
            >
              <Conversations />
            </GridItem>
            <GridItem
              colStart={4}
              colSpan={9}
              h="calc(100dvh - 8.5rem)"
              overflow={activeConversation ? "auto" : "hidden"}
            >
              {children}
            </GridItem>
          </SimpleGrid>
        </Show>
        <Show below="md">
          <Box
            w="full"
            h="calc(100dvh - 8.5rem)"
            pos="sticky"
            top="9rem"
            overflow="auto"
          >
            <Drawer
              isOpen={activeConversation !== null}
              onClose={() => dispatch(removeActiveConversation())}
              placement="left"
              size="full"
            >
              <DrawerOverlay bg="#22222220" />
              <DrawerContent bg="white" pos="relative">
                <DrawerCloseButton
                  w="3rem"
                  h="3rem"
                  bg="brand.10"
                  color="brand.main"
                  size="xl"
                  pos="absolute"
                  rounded="full"
                  right="1.5rem"
                  top="1.5rem"
                  zIndex="200"
                  onClick={() => dispatch(removeActiveConversation())}
                />
                <Box h="full">{children}</Box>
              </DrawerContent>
            </Drawer>
            <Conversations />
          </Box>
        </Show>
      </VStack>
    </>
  )
}
