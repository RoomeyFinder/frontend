import { Popover, PopoverTrigger, Flex, PopoverContent, Box, } from "@chakra-ui/react"
import DownChevron from "../_assets/DownChevron"


export default function DropDownWithChevron({ DropdownContent, DropdownTrigger }: {
  DropdownContent: ({ isOpen, onClose, forceUpdate }: { isOpen: boolean, onClose: () => void, forceUpdate?: () => void }) => JSX.Element
  DropdownTrigger: ({ isOpen, onClose, forceUpdate }: { isOpen: boolean, onClose: () => void, forceUpdate?: () => void }) => JSX.Element
}){
  return (
    <Popover placement='top-start'>
      {({ isOpen, onClose, forceUpdate }) => (
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
              width="100%"
              color={isOpen ? "black" : "gray.main"}
            >
              <DropdownTrigger isOpen={isOpen} onClose={onClose} forceUpdate={forceUpdate} />
              <Box transition="transform 250ms ease" transform={isOpen ? "rotateX(180deg)" : "rotate(0deg)"}>
                <DownChevron />
              </Box>
            </Flex>
          </PopoverTrigger>
          <PopoverContent border="none" bg="transparent" maxW="fit-content">
            <DropdownContent isOpen={isOpen} onClose={onClose} forceUpdate={forceUpdate} />
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}