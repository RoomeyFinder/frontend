import {
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react"

export default function BasicInfoSection() {
  return (
    <VStack
      w="full"
      alignItems="start"
      pb="3rem"
      pt="1rem"
      gap={{ base: "1rem", sm: "2rem" }}
    >
      <HStack
        w="full"
        gap={{ base: "1rem", sm: "2rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <FormLabel w={{ base: "full", sm: "calc(100% - 20% - 2rem)" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Rent amount / roomey
          </Text>
          <Input
            name="rentAmount"
            placeholder="123,456"
            type="number"
            variant="filled"
          />
        </FormLabel>
        <FormLabel w={{ base: "full", sm: "20%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Rent duration
          </Text>
          <Input
            name="rentAmount"
            placeholder="Annually"
            type="number"
            variant="filled"
            as={Select}
          >
            <option></option>
          </Input>
        </FormLabel>
      </HStack>
      <HStack
        w="full"
        gap={{ base: "1rem", sm: "2rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <FormLabel w={{ base: "full" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Type of apartment
          </Text>
          <Input
            name="rentAmount"
            placeholder="123,456"
            type="number"
            variant="filled"
          />
        </FormLabel>
      </HStack>
      <HStack w="full" gap={{ base: "1rem", sm: "2rem" }}>
        <FormLabel w={{ base: "full", sm: "49%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Number of rooms
          </Text>
          <Input
            name="rentAmount"
            placeholder="Annually"
            type="number"
            variant="filled"
            as={Select}
          >
            <option></option>
          </Input>
        </FormLabel>
        <FormLabel w={{ base: "full", sm: "49%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Number of occupants
          </Text>
          <Input
            name="rentAmount"
            placeholder="Annually"
            type="number"
            variant="filled"
            as={Select}
          >
            <option></option>
          </Input>
        </FormLabel>
      </HStack>
      <HStack
        w="full"
        gap={{ base: "1rem", sm: "2rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <FormLabel w={{ base: "full", sm: "32.2%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Street address
          </Text>
          <Input
            name="rentAmount"
            placeholder="123,456"
            type="number"
            variant="filled"
          />
        </FormLabel>
        <FormLabel w={{ base: "full", sm: "32.2%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            City
          </Text>
          <Input
            name="rentAmount"
            placeholder="Annually"
            type="number"
            variant="filled"
            as={Select}
          >
            <option></option>
          </Input>
        </FormLabel>
        <FormLabel w={{ base: "full", sm: "32.2%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            State
          </Text>
          <Input
            name="rentAmount"
            placeholder="Annually"
            type="number"
            variant="filled"
            as={Select}
          >
            <option></option>
          </Input>
        </FormLabel>
      </HStack>
    </VStack>
  )
}
