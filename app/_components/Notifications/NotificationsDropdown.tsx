import { Box, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import NotificationItem from "./NotificationItem"
import { useRouter } from "next/navigation"
import { NotificationVariant } from "@/app/_types/Notification"
import NotificationIcon from "@/app/_assets/SVG/NotificationIcon"

export default function NotificationsDropdown() {
  const router = useRouter()
  return (
    <>
      <VStack
        boxShadow="0px 0px 10px 0px #ABABAB40"
        border="1px solid #EEEEEE"
        w="90dvw"
        maxW="22.4rem"
        borderRadius="1.2rem"
        bg="#F9F9F9"
        alignItems="stretch"
        gap="1rem"
        maxH="28.5rem"
        overflow="auto"
        pos="relative"
        pt=".8rem"
      >
        <NoNewNotificationsView />
        {/*  <NotificationItem variant={NotificationVariant.ACCEPTED_INTEREST} />
        <NotificationItem variant={NotificationVariant.LISTING_VIEW} />
        <NotificationItem variant={NotificationVariant.PROFILE_VIEW} />
        <NotificationItem
          variant={NotificationVariant.RECEIVED_LISTING_INTEREST}
        />
        <NotificationItem
          variant={NotificationVariant.RECEIVED_PROFILE_INTEREST}
        />
        <NotificationItem variant={NotificationVariant.MESSAGE} />
         <HStack
          px=".8rem"
          py="1rem"
          borderTop="1px solid"
          borderTopColor="#D9D9D9"
          bg="#F1F1F1"
          justifyContent="space-between"
          pos="sticky"
          bottom="0"
        >
          <Text
            fontSize="1.4rem"
            lineHeight="1.2rem"
            fontWeight="700"
            color="gray.main"
            as="button"
            onClick={() => router.push("/notifications")}
          >
            View All
          </Text>
          <Text
            fontSize="1.4rem"
            lineHeight="1.2rem"
            fontWeight="700"
            color="gray.100"
            as="button"
          >
            Clear All
          </Text>
        </HStack> */}
      </VStack>
    </>
  )
}

function NoNewNotificationsView() {
  return (
    <>
      <VStack gap="1rem" justifyContent="center" minH="10rem">
        <Box color="brand.50">
          <NotificationIcon />
        </Box>
        <Heading
          fontSize="1.6rem"
          fontWeight="600"
          lineHeight="normal"
          color="gray.100"
        >
          No new notifications
        </Heading>
      </VStack>
    </>
  )
}
