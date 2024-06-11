"use client"
import { Box, HStack, Heading, VStack } from "@chakra-ui/react"
import CustomRadioGroup from "@/app/_components/CustomRadio"
// import NotificationItem from "../../_components/Notifications/NotificationItem"
import {
  //  useContext, useMemo,
  useState,
} from "react"
// import { NotificationsContext } from "../../_providers/NotificationsProvider"
// import { NotificationVariant } from "../../_types/Notification"

export default function Page() {
  // const { notifications } = useContext(NotificationsContext)
  const [currentFilter, setCurrentFilter] = useState<
    "interest" | "listing" | "message" | "all"
  >("all")
  // const filteredNotifications = useMemo(() => {
  //   switch (currentFilter) {
  //   case "interest":
  //     return notifications.filter(
  //       (notif) =>
  //         notif.title === NotificationVariant.LISTING_INTEREST ||
  //           notif.title === NotificationVariant.PROFILE_INTEREST ||
  //           notif.title === NotificationVariant.ACCEPTED_INTEREST
  //     )
  //   case "message":
  //     return notifications.filter(
  //       (notif) => notif.title === NotificationVariant.MESSAGE
  //     )
  //   case "listing":
  //     return notifications.filter(
  //       (notif) =>
  //         notif.title === NotificationVariant.LISTING_INTEREST ||
  //           notif.title === NotificationVariant.LISTING_VIEW
  //     )
  //   default: return notifications
  //   }
  // }, [currentFilter, notifications])
  return (
    <>
      <Box
        py={{ base: "4rem", md: "6rem" }}
        px={{ base: "4%", md: "10.5%" }}
        minH="80dvh"
      >
        <Heading variant="md" textTransform="capitalize" mb="3rem">
          Notifications
        </Heading>
        <VStack alignItems="stretch" gap="3.2rem">
          <HStack gap="2rem">
            <Heading as="h6" fontSize="1.6rem" fontWeight="700">
              Filters
            </Heading>
            <CustomRadioGroup
              options={["all", "interest", "message", "listing"]}
              onChange={(val) => setCurrentFilter(val as typeof currentFilter)}
              name={"Filters"}
              selectedValue={currentFilter}
              radioSize="small"
              containerProps={{
                gap: "2rem",
                flexWrap: "wrap",
                textTransform: "capitalize",
              }}
            />
          </HStack>
          <VStack alignItems="stretch" gap="1.5rem">
            {/* {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                variant={notification.title}
                size={"large"}
                notification={notification}
              />
            ))} */}
          </VStack>
        </VStack>
      </Box>
    </>
  )
}
