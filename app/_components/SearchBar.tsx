"use client"
import { Box, Button, Flex, InputProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, RadioGroup, Show, Text } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import DownChevron from "../_assets/DownChevron";
import SearchIcon from "../_assets/SearchIcon";
import { useMemo, useState } from "react";
import PersonIcon from "../_assets/PersonIcon";
import HouseIcon from "../_assets/HouseIcon";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("")
  const [lookingFor, setLookingFor] = useState<"rooms" | "roomies" | "">("")

  return (
    <Flex
      as="form"
      alignItems="center"
      justifyContent=""
      gap={{ base: ".5rem", md: "2rem" }}
      w="100%"
      _focusWithin={{ border: "1px solid", borderColor: "brand.50" }}
      border="1px"
      borderStyle="solid"
      borderColor="white.200"
      borderRadius="1rem"
      p=".5rem">
      <SearchOptionsDropDown selectedValue={lookingFor} handleSelect={(value) => { setLookingFor(value) }} />
      <StyledSearchInput />
      <Flex as="span" ml="auto"
        maxW={{ base: "auto", md: "11.6%" }}><SearchIconButton /></Flex>
    </Flex>
  )
}

function StyledSearchInput({ value, onChange, ...rest }: InputProps) {
  return (
    <Input
      border="none"
      flexGrow="1"
      maxWidth={{ base: "50%", md: "65%" }}
      outline="none"
      _focus={{ boxShadow: "none", border: "0" }}
      placeholder="Type a location"
      fontSize={{ base: "1.2rem", md: "1.6rem" }}
      color="black"
      _placeholder={{ color: "gray.100", fontSize: { base: "1.2rem", md: "1.6rem" } }}
      value={value}
      onChange={onChange}
      {...rest}
    />
  )
}

function SearchIconButton() {
  return (
    <Flex
      aria-label="search"
      as="button"
      type="submit"
      justifyContent="center"
      alignItems="center"
      background="white.200"
      h="3rem"
      p=".5rem"
      rounded=".8rem"
      color="#707070"
      transition="all 500ms ease"
      _hover={{
        bg: "brand.main",
        color: "white.main"
      }}>
      <SearchIcon />
    </Flex>
  )
}

const lookingForOptions = {
  rooms: <HouseIcon />,
  roomies: <PersonIcon />
}

function SearchOptionsDropDown({
  selectedValue, handleSelect
}: {
  selectedValue: "rooms" | "roomies" | "",
  handleSelect: (value: "rooms" | "roomies") => void
}) {
  const options = useMemo(() => Object.entries(lookingForOptions), [])
  return (
    <Popover placement='top-start'>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Flex
              as="button" type="button"
              alignItems="center"
              justifyContent="center"
              gap="1rem"
              rounded=".8rem"
              p={{ base: "1rem", md: "0" }}
              border="1px"
              borderStyle="solid"
              borderColor="white.200"
              flexBasis="100%"
              maxW={{ base: "15%", md: "25%" }}
              height={{ base: "auto", md: "3rem" }}
              color={isOpen ? "black" : "gray.main"}
            >
              <Show above="md">
                <Text as="span" fontSize="1.6rem" textTransform="capitalize" textAlign="right">{selectedValue.length ? <>{selectedValue}</> : <>Find</>}</Text>
              </Show>
              <Box transition="transform 250ms ease" transform={isOpen ? "rotateX(180deg)" : "rotate(0deg)"}>
                <DownChevron />
              </Box>
            </Flex>
          </PopoverTrigger>
          <PopoverContent border="none" borderRadius=".8rem" maxW="12.5rem">
            <PopoverBody
              bg="white.main"
              padding="1rem 2.4rem"
              boxShadow="0px 0px 0.5px 0px rgba(0, 0, 0, 0.11)"
              flexDir="column" justifyContent="center"
              alignItems="start" gap=".91rem" as={Flex}>
              {
                options.map(([lookingFor, icon]) => (
                  <Flex _hover={{ color: "black" }} as="button" 
                  onClick={() => {
                    handleSelect(lookingFor as "rooms" | "roomies")
                    onClose()
                  }}
                    type="button" alignItems="center" gap=".5rem" key={lookingFor}>
                    <Box as="span">{icon}</Box>
                    <Box
                      as="span" lineHeight="1" color="gray.100" fontSize="1.6rem"
                      fontWeight="600" textTransform="capitalize">
                      {lookingFor} </Box>
                  </Flex>
                ))
              }
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}