import useToggleProfileStatus from "@/app/_hooks/useToggleProfileStatus"
import { VStack, FormControl, FormLabel, Switch, Text } from "@chakra-ui/react"

export default function ProfileVisibilityOverview() {
  const { user, toggleProfileStatus, isFetching } = useToggleProfileStatus()

  if (!user) return null
  return (
    <VStack alignItems="start" gap="1.8rem">
      <Text
        textAlign="left"
        fontSize={{ base: "1.2rem", md: "1.6rem", lg: "2rem" }}
        lineHeight="100%"
      >
        Would you like to showcase yourself on
        <Text as="b" fontWeight="600">
          {" "}
          Roomeyfinder.com{" "}
        </Text>{" "}
        & find a roomey?
      </Text>
      <FormControl display="flex" alignItems="center" gap=".5rem">
        <FormLabel
          htmlFor="showcase-profile"
          mb="0"
          fontSize={{ base: "1rem", md: "1.2rem" }}
          lineHeight="120%"
          fontWeight="400"
        >
          Deactivate
        </FormLabel>
        <Switch
          size="lg"
          id="showcase-profile"
          checked={user.isVisible}
          isChecked={user.isVisible}
          isDisabled={isFetching}
          onChange={(e) => toggleProfileStatus(e.target.checked)}
        />
        <FormLabel
          htmlFor="showcase-profile"
          mb="0"
          fontSize={{ base: "1rem", md: "1.2rem" }}
          lineHeight="120%"
          fontWeight="400"
        >
          Activate
        </FormLabel>
      </FormControl>
    </VStack>
  )
}
