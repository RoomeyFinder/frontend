import {
  Box,
  Flex,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react"
import NotificationItem from "./NotificationItem"
import NotificationIcon from "@/app/_assets/SVG/NotificationIcon"
import { NotificationsContext } from "@/app/_providers/NotificationsProvider"
import { useContext, useMemo } from "react"
import { useRouter } from "next/navigation"

export default function NotificationsDropdown() {
  const router = useRouter()
  const { notifications, loading } = useContext(NotificationsContext)
  const unseenNotifications = useMemo(
    () => notifications.filter((it) => it.seen === false).slice(0, 4),
    [notifications]
  )
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
        {loading && (
          <Flex minH="10rem" justifyContent="center" alignItems="center">
            <Spinner color="brand.main" />
          </Flex>
        )}
        {!loading &&
          (unseenNotifications.length === 0 ? (
            <NoNewNotificationsView />
          ) : (
            <>
              {unseenNotifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  variant={notification.title}
                  size={"small"}
                  notification={notification}
                  shouldRedirectToNotificationsPage
                />
              ))}
              <HStack
                px="1.2rem"
                py="1rem"
                borderTop="1px solid"
                borderTopColor="#D9D9D9"
                bg="#F1F1F1"
                justifyContent="start"
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
              </HStack>
            </>
          ))}
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
