import { Flex, Show, Text } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import DownChevron from "../_assets/DownChevron";
import SearchIcon from "../_assets/SearchIcon";

export default function SearchBar(){

  return (
    <Flex 
      as="form" 
      alignItems="center"
      justifyContent="space-between"
      gap={{ base: "1rem", md: "2rem"}}
      w="100%" 
      _focusWithin={{ border: "1px solid", borderColor: "brand.50" }} 
      border="1px"
      borderStyle="solid"
      borderColor="white.200"
      borderRadius="1rem"
      p=".5rem">
      <Flex 
        as="button" type="button" 
        alignItems="center"
        justifyContent="center" 
        gap="1rem" 
        rounded=".8rem" 
        p={{ base: "1rem", md: "0"}}
        border="1px"
        borderStyle="solid"
        borderColor="white.200"
        flexBasis="100%"
        maxW={{ base: "15%", md: "25%" }}
        height={{ base: "auto", md: "3rem" }}
        >
        <Show above="md"><Text as="span" fontSize="1.6rem" color="gray.main" textAlign="right">Find</Text></Show>
        <DownChevron />
      </Flex>
      <Input 
        border="none" 
        flexGrow="1"
        maxWidth={{ base: "50%", md: "65%"}}
        outline="none" 
        _focus={{ boxShadow: "none", border: "0" }} 
        placeholder="Type a location"
        fontSize={{ base: "1.2rem", md: "1.6rem"}}
        color="gray.100"
        _placeholder={{ color: "gray.100", fontSize: { base: "1.2rem", md: "1.6rem"} }}
      />
      <Flex 
        aria-label="search" 
        as="button"
        justifyContent="center" 
        alignItems="center" 
        background="white.200"
        maxW={{ base: "auto", md: "11.6%" }}
        h="3rem"
        p=".5rem"
        rounded=".8rem">
        <SearchIcon/>
      </Flex>
    </Flex>
  )
}