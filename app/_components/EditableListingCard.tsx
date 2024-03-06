import {
  Box,
  ButtonProps,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  LinkProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Show,
  Text,
  TextProps,
  VStack,
} from "@chakra-ui/react"
import { FeatureTag } from "../my-ads/_components/FeaturesInput"
import EyeIcon from "../_assets/SVG/EyeIcon"
import ThreeDotIcon from "../_assets/SVG/ThreeDotIcon"
import StandAloneIcon from "./StandaloneIcon"
import { NEXT_BODY_SUFFIX } from "next/dist/lib/constants"

export default function EditableListingCard() {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="white.400"
      rounded="1.2rem"
      w="100%"
      px={{ base: "1rem", md: "2rem" }}
      py="1rem"
    >
      <Flex alignItems="center" gap="1rem">
        <Image
          w={{ base: "5rem", md: "7rem" }}
          h={{ base: "5rem", md: "7rem" }}
          rounded="1.2rem"
          src="https://source.unsplash.com/random/200x200?sig=4"
        />
        <Box>
          <Heading
            fontSize="1.6rem"
            fontWeight="400"
            lineHeight="1.6rem"
            mb="1rem"
            noOfLines={1}
          >
            Looking for a God fearing roommate to share my self contain with.
          </Heading>
          <Flex gap={{ base: ".6rem", md: "1rem" }} alignItems="center">
            <Text fontSize="1.4rem" fontWeight="600" color="gray.main">
              <Show below="md">
                <Text
                  as="span"
                  fontSize="1.4rem"
                  fontWeight="600"
                  color="gray.main"
                >
                  5&nbsp;
                </Text>
              </Show>
              Features
            </Text>
            <ListingFeatures />
            <Flex as={Text} alignItems="center" fontSize="1.4rem" gap=".8rem">
              <EyeIcon />0
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <ListingActions />
    </Flex>
  )
}

function ListingActions() {
  return (
    <>
      <Show below="md">
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <IconButton
              color="gray.main"
              _hover={{ color: "brand.main", bg: "transparent" }}
              p="1rem"
              bg="transparent"
              aria-label="toggle options"
              h="unset"
              w="unset"
            >
              <ThreeDotIcon />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent
            bg="white"
            boxShadow="0px 0px 20px 1px #00000012"
            border="0"
            w="max-content"
            p="1rem"
            rounded="1.2rem"
          >
            <PopoverBody>
              <VStack spacing="1.5rem" alignItems="start">
                <TextButton>Deactivate</TextButton>
                <TextButton>Edit</TextButton>
                <TextButton color="red.main">Delete</TextButton>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Show>
      <Show above="md">
        <HStack spacing="1.5rem" alignItems="start">
          <TextButton>Deactivate</TextButton>
          <TextButton>Edit</TextButton>
          <TextButton color="red.main">Delete</TextButton>
        </HStack>
      </Show>
    </>
  )
}

function TextButton({
  children,
  ...rest
}: TextProps & LinkProps & ButtonProps) {
  return (
    <Text fontSize="1.6rem" fontWeight="600" lineHeight="1.6rem" {...rest}>
      {children}
    </Text>
  )
}

function ListingFeatures() {
  return (
    <Show above="md">
      <HStack gap="1.2rem">
        <FeatureTag
          item={{ category: "", value: "Air conditioner" }}
          editable={false}
          bg="#D9D9D9"
          padding="1rem 2rem"
          rounded=".5rem"
        />
        <FeatureTag
          item={{ category: "", value: "Air conditioner" }}
          editable={false}
          bg="#D9D9D9"
          padding="1rem 2rem"
          rounded=".5rem"
        />
        <FeatureTag
          item={{ category: "", value: "Air conditioner" }}
          editable={false}
          bg="#D9D9D9"
          padding="1rem 2rem"
          rounded=".5rem"
        />
      </HStack>
    </Show>
  )
}
