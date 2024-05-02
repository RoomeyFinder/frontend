import {
  Popover,
  PopoverTrigger,
  Flex,
  PopoverContent,
  Box,
  FlexProps,
} from "@chakra-ui/react"
import DownChevron from "../_assets/SVG/DownChevron"

export default function DropDownWithChevron({
  DropdownContent,
  matchWidth,
  DropdownTrigger,
  triggerContainerProps,
}: {
  DropdownContent: ({
    isOpen,
    onClose,
    forceUpdate,
  }: {
    isOpen: boolean
    onClose: () => void
    forceUpdate?: () => void
  }) => JSX.Element
  DropdownTrigger: ({
    isOpen,
    onClose,
    forceUpdate,
  }: {
    isOpen: boolean
    onClose: () => void
    forceUpdate?: () => void
  }) => JSX.Element
  triggerContainerProps?: FlexProps
  matchWidth?: boolean
}) {
  return (
    <Popover placement="bottom-start" matchWidth={matchWidth}>
      {({ isOpen, onClose, forceUpdate }) => (
        <>
          <PopoverTrigger>
            <Flex
              as="button"
              type="button"
              alignItems="center"
              gap="1rem"
              rounded=".8rem"
              border="1px"
              borderStyle="solid"
              borderColor="white.200"
              width="100%"
              color={isOpen ? "black" : "gray.main"}
              {...(triggerContainerProps || {})}
            >
              <DropdownTrigger
                isOpen={isOpen}
                onClose={onClose}
                forceUpdate={forceUpdate}
              />
              <Box
                transition="transform 250ms ease"
                transform={isOpen ? "rotateX(180deg)" : "rotate(0deg)"}
              >
                <DownChevron />
              </Box>
            </Flex>
          </PopoverTrigger>
          <PopoverContent w="full" border="none" bg="transparent">
            <DropdownContent
              isOpen={isOpen}
              onClose={onClose}
              forceUpdate={forceUpdate}
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
