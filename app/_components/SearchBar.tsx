"use client"
import { Box, Flex, InputProps } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import SearchIcon from "../_assets/SVG/SearchIcon"
import { useCallback, useContext } from "react"
import PersonIcon from "../_assets/SVG/PersonIcon"
import HouseIcon from "../_assets/SVG/HouseIcon"
import CustomSelect from "../nexus/ads/_components/CustomSelect"
import { usePathname, useRouter } from "next/navigation"
import { SearchContext } from "../_providers/SearchProvider"

export default function SearchBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { focus, search, setSearch, setFocus } = useContext(SearchContext)
  const goToHomePage = useCallback(() => {
    if (pathname !== "/") router.push("/")
  }, [router, pathname])
  return (
    <Flex
      onSubmit={(e) => {
        e.preventDefault()
        goToHomePage()
      }}
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
      p=".5rem"
    >
      <Box maxW={{ base: "15%", md: "25%" }} flexBasis="100%">
        <CustomSelect
          name="Find"
          options={lookingForOptions}
          selectedValue={focus}
          handleSelect={(value) => {
            setFocus(value)
            goToHomePage()
          }}
          triggerStyles={{
            justifyContent: "center",
            p: { base: "1rem", md: "0" },
          }}
        />
      </Box>
      <StyledSearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Flex as="span" ml="auto" maxW={{ base: "auto", md: "11.6%" }}>
        <SearchIconButton />
      </Flex>
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
      px="0"
      py="0"
      borderRadius="0"
      _focus={{ boxShadow: "none", border: "0" }}
      placeholder="Type a location"
      fontSize={{ base: "1.2rem", md: "1.6rem" }}
      color="black"
      _placeholder={{
        color: "gray.100",
        fontSize: { base: "1.2rem", md: "1.6rem" },
      }}
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
        color: "white.main",
      }}
    >
      <SearchIcon />
    </Flex>
  )
}

const lookingForOptions = [
  {
    icon: <HouseIcon />,
    value: "rooms",
    displayValue: "rooms",
  },
  {
    value: "roomies",
    displayValue: "roomies",
    icon: <PersonIcon />,
  },
]
