"use client"
import { Box, HStack, Heading, VStack } from "@chakra-ui/react"
import CustomRadioGroup from "@/app/_components/CustomRadio"
import NotificationItem from "../_components/Notifications/NotificationItem"
import { NotificationVariant } from "../_types/Notification"

export default function Page() {
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
              options={["Interests", "Messages", "Listings"]}
              onChange={() => {}}
              name={"Filters"}
              selectedValue={"Interests"}
              radioSize="small"
              containerProps={{ gap: "2rem", flexWrap: "wrap" }}
            />
          </HStack>
          <VStack alignItems="stretch" gap="1.5rem">
            <NotificationItem variant={NotificationVariant.RECEIVED_LISTING_INTEREST} size={"large"} />
            <NotificationItem variant={NotificationVariant.RECEIVED_LISTING_INTEREST} size={"large"} />
            <NotificationItem variant={NotificationVariant.RECEIVED_LISTING_INTEREST} size={"large"} />
          </VStack>
        </VStack>
      </Box>
    </>
  )
}
