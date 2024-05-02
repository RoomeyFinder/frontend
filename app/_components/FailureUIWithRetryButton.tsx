import { Button, Text, VStack } from "@chakra-ui/react"
import NoWifi from "../_assets/SVG/NoWifi"
import Empty from "./Empty"
import { ReactNode } from "react"

export default function FailureUIWithRetryButton({
  handleRetry,
  text
}: {
  handleRetry: () => void
  text: ReactNode
}) {
  return (
    <Empty
      heading="Oops!"
      text={
        <VStack as="span" alignItems="start" justifyContent="start" gap="2rem">
          <Text as="span">{text}</Text>
          <Button variant="brand-secondary" minW="16rem" onClick={handleRetry}>
            retry
          </Button>
        </VStack>
      }
      icon={<NoWifi />}
    />
  )
}
