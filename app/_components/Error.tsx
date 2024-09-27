import { Text, VStack } from "@chakra-ui/react"
import notFound from "../_assets/images/error.svg"
import Image from "next/image"

export default function ErrorFile() {
  return (
    <VStack px="1.6rem" gap=".8rem" py="12rem" textAlign="center">
      <Image src={notFound} alt="" />
      <Text fontSize="2.2rem" fontWeight="600" mt="-20px">
        OOPS!
      </Text>
      <Text fontSize="1.6rem" maxW="40ch" mx="auto">
        An unknown error occurred. Please refresh the page.
      </Text>
    </VStack>
  )
}
