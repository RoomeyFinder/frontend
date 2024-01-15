"use client"
import { Box, Flex, InputProps, Show, Text } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import SearchIcon from "../_assets/SearchIcon"
import { ReactNode, useMemo, useState } from "react"
import PersonIcon from "../_assets/PersonIcon"
import HouseIcon from "../_assets/HouseIcon"
import DropDownWithChevron from "./DropDownWithChevron"

export default function SearchBar() {
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
    <Box maxW={{ base: "15%", md: "25%" }} flexBasis="100%">
      <DropDownWithChevron
        DropdownTrigger={() =>
          (<Show above="md">
            <Text height={{ base: "auto", md: "3rem" }} display="flex" alignItems="center" as="span" fontSize="1.6rem" textTransform="capitalize" textAlign="right">{selectedValue.length ? <>{selectedValue}</> : <>Find</>}</Text>
          </Show>)}
        DropdownContent={({ onClose }) => (
          <Flex
            bg="white.main"
            width="fit-content"
            padding="1rem 2.4rem"
            borderRadius=".8rem" maxW="12.5rem"
            boxShadow="0px 0px 0.5px 0px rgba(0, 0, 0, 0.11)"
            flexDir="column" justifyContent="center"
            alignItems="start" gap=".91rem">
            {options.map(([lookingFor, icon]) => (
              <LookingForOption 
                key={lookingFor} 
                onClick={() => {
                  handleSelect(lookingFor as "rooms" | "roomies")
                  onClose()
                }}
                lookingFor={lookingFor} 
                icon={icon}/>
            ))}
          </Flex>
        )}
      />
    </Box>
  )
}

function LookingForOption({ lookingFor, icon, onClick }: {
  lookingFor: string
  icon: ReactNode
  onClick: () => void
}){
  return (
    <Flex color="gray.100" _hover={{ color: "black" }} as="button"
      onClick={onClick}
      type="button" alignItems="center" gap=".5rem" key={lookingFor}>
      <Box as="span">{icon}</Box>
      <Box
        as="span" lineHeight="1" fontSize="1.6rem"
        fontWeight="600" textTransform="capitalize">
        {lookingFor} </Box>
    </Flex>
  )
}