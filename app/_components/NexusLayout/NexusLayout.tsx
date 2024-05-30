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
import { ReactNode, useState } from "react"
import NexusHeading from "./NexusHeading"
import NexusSidebar from "./NexusSideBar"

export default function NexusLayout({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
      <VStack
        w="full"
        alignItems="stretch"
        gap=".5rem"
        height="100dvh"
        overflow="hidden"
        bg="white"
      >
        <Box w="full" pos="sticky">
          <NexusHeading handleToggleMenu={() => setOpenMenu((prev) => !prev)} />
        </Box>
        <Show above="md">
          <SimpleGrid
            columns={12}
            h="calc(100dvh - 8.5rem)"
            pos="relative"
            alignItems="start"
          >
            <GridItem h="100%" colStart={1} colSpan={3} pos="sticky" top="0">
              <NexusSidebar />
            </GridItem>
            <GridItem
              colStart={4}
              colSpan={12}
              h="calc(100dvh - 8.5rem)"
              overflow="auto"
            >
              {children}
            </GridItem>
          </SimpleGrid>
        </Show>
        <Show below="md">
          <Box w="full" h="calc(100dvh - 8.5rem)" overflow="auto">
            <Drawer
              isOpen={openMenu}
              onClose={() => setOpenMenu(false)}
              placement="left"
              size="md"
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
                />
                <NexusSidebar closeSidebar={() => setOpenMenu(false)} />
              </DrawerContent>
            </Drawer>
            <Box>{children}</Box>
          </Box>
        </Show>
      </VStack>
    </>
  )
}
