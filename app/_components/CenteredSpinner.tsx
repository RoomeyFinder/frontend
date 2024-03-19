import { Flex, Spinner } from "@chakra-ui/react";

export default function CenteredSpinner() {
  return (
    <Flex justifyContent="center" alignItems="center" minH="40dvh">
      <Spinner size="xl" color="brand.main" />
    </Flex>
  )
}
