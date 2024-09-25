import notFound from "../_assets/images/not-found.svg"
import { Button, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"

export default function NotFound() {
  return (
    <VStack px="1.6rem" gap=".8rem" py="12rem">
      <Image src={notFound} alt="" />
      <Text fontSize="2.2rem" fontWeight="600" mt="-42px">
        OOPS!
      </Text>
      <Text fontSize="1.6rem" maxW="40ch" mx="auto">
        We couldn&apos;t find that page
      </Text>
      <Button
        as="a"
        variant="brand"
        fontSize="1.8rem"
        fontWeight="600"
        href="https://blog.roomeyfinder.com"
      >
        Visit Our Blog
      </Button>
    </VStack>
  )
}
