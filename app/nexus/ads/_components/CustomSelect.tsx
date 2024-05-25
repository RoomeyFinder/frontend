import DropDownWithChevron from "@/app/_components/DropDownWithChevron"
import { Show, Flex, Text, Box, BoxProps, Divider } from "@chakra-ui/react"
import { Fragment, ReactNode } from "react"

export default function CustomSelect({
  selectedValue,
  handleSelect,
  options,
  name,
  triggerStyles = {},
  showTriggerContentAlways = false,
  matchWidth = false,
  showOptionDividers = false,
  optionsContainerVariant,
  optionsStyle = {},
}: {
  selectedValue: any
  handleSelect: (value: any) => void
  options: { value: any; displayValue?: ReactNode; icon?: ReactNode }[]
  name: string
  triggerStyles?: BoxProps
  showTriggerContentAlways?: boolean
  matchWidth?: boolean
  optionsContainerVariant?: string
  showOptionDividers?: boolean
  optionsStyle?: BoxProps
}) {
  return (
    <>
      <DropDownWithChevron
        matchWidth={matchWidth}
        triggerContainerProps={triggerStyles}
        DropdownTrigger={() => (
          <Show above={showTriggerContentAlways ? "base" : "md"}>
            <Text
              height={{ base: "auto", md: "3rem" }}
              display="flex"
              alignItems="center"
              as="span"
              fontSize="1.6rem"
              textTransform="capitalize"
              textAlign="right"
            >
              {String(selectedValue).length ? (
                <>{selectedValue}</>
              ) : (
                <>{name}</>
              )}
            </Text>
          </Show>
        )}
        DropdownContent={({ onClose }) => (
          <Flex
            bg="white.main"
            minW="full"
            borderRadius=".8rem"
            boxShadow="0px 0px 0.5px 0px rgba(0, 0, 0, 0.11)"
            flexDir="column"
            justifyContent="center"
            alignItems="start"
            {...optionsContainerVariantStyles.default}
            {...(optionsContainerVariantStyles[
              optionsContainerVariant as keyof typeof optionsContainerVariantStyles
            ] || {})}
          >
            {options.map(({ value, displayValue, icon }, idx) => (
              <Fragment key={value}>
                <CustomOption
                  style={optionsStyle}
                  onClick={() => {
                    handleSelect(value)
                    onClose()
                  }}
                  option={displayValue || value}
                  icon={icon}
                />
                {idx < options.length - 1 && showOptionDividers && (
                  <Divider borderX=".5px solid" borderColor="#7070704D" />
                )}
              </Fragment>
            ))}
          </Flex>
        )}
      />
    </>
  )
}

const optionsContainerVariantStyles = {
  default: {
    rounded: ".8rem",
  },
  primary: {
    border: "1px solid",
    borderColor: "#7070704D",
    roundedBottom: "1rem",
    rounded: "1rem"
  },
}

export function CustomOption({
  onClick,
  icon,
  option,
  style,
  children
}: {
  option?: string
  icon?: ReactNode
  onClick: () => void
  style?: BoxProps
  children?: ReactNode
}) {
  return (
    <Flex
      color="gray.100"
      _hover={{ color: "black" }}
      as="button"
      onClick={onClick}
      type="button"
      alignItems="center"
      gap=".5rem"
      py=".91rem"
      px="2rem"
      w="full"
      {...style}
    >
      <Box as="span">{icon}</Box>
      <Box
        as="span"
        lineHeight="1"
        fontSize="1.6rem"
        fontWeight="600"
        textTransform="capitalize"
      >
        {option || children}
      </Box>
    </Flex>
  )
}
