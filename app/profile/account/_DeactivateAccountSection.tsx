import { Box, Heading, Text } from "@chakra-ui/react"

export default function DeactivateAccountSection(){
  return (
    <Box>
      <Heading
        size="md"
        variant="700"
        as="h2"
        mb="3rem"
      >
        Account
      </Heading>
      <Text as="button" fontSize="1.9rem" fontWeight="400" lineHeight="3.2rem">Deactivate account</Text>
    </Box>
  )
}