import { Text, TextProps } from "@chakra-ui/react"

export default function DisclaimerText(otherProps: TextProps) {
  return (
    <Text {...otherProps} fontSize="1rem" color="gray.100" textAlign="center">
      RoomeyFinder.com connects users but does not verify listings or users.
      Please meet safely, verify details, and exercise caution. We are not
      liable for disputes or damages
    </Text>
  )
}
