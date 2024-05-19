import { Box, Button, Input } from "@chakra-ui/react"

export default function EmailCheckForm() {
  return (
    <>
      <Box as="form" display="flex" flexDir="column" gap="1.6rem">
        <Input variant="filled" placeholder="Email" />
        <Button
          variant="brand"
          cursor="pointer"
          py="1.3rem"
          fontSize="1.6rem"
          fontWeight="600"
        >
          Continue
        </Button>
      </Box>
    </>
  )
}
