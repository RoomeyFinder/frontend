import DownChevron from "@/app/_assets/DownChevron"
import DropDownInput from "@/app/_components/DropDown"
import { generateYearsListBetweenYears, getCountOfDaysInMonthBasedOnYear } from "@/app/_utils/date"
import { Box, Flex, Input, InputGroup, InputRightAddon, Select } from "@chakra-ui/react"
import moment from "moment"
import { useRef, useMemo, useState, ChangeEventHandler, useCallback } from "react"
import { FOURTEEN_YEARS_IN_MILLISECONDS } from "../_ContextProvider"


export default
function DobInput({ value, handleChange, errorProps }: {
    value: string,
    handleChange: (newValue: string) => void
    errorProps: {[x:string]: string }
  }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const today = useMemo(() => (new Date(Date.now() - FOURTEEN_YEARS_IN_MILLISECONDS)), [])
  const yearsOptions = useMemo(() =>
    generateYearsListBetweenYears(new Date(Date.now()).getFullYear() - 100, today.getFullYear() + 1).reverse(), [today])
  const monthOptions = useMemo(() => moment.monthsShort(), [])
  const [dob, setDob] = useState({
    year: "", month: "", date: ""
  })
  const dateOptions = useMemo(() => {
    const numberOfDays = getCountOfDaysInMonthBasedOnYear(monthOptions.indexOf(dob.month), Number(dob.year))
    return (new Array(numberOfDays)).fill("").map((_, idx) => idx + 1)
  }, [dob.month, dob.year, monthOptions])

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const updatedDate = new Date(value.length > 0 ? value : today.toISOString())
    switch (e.target.name) {
    case "year":
      updatedDate.setFullYear(Number(e.target.value))
      break
    case "month":
      updatedDate.setMonth(monthOptions.indexOf(e.target.value))
      break
    case "date":
      updatedDate.setDate(Number(e.target.value))
      break
    default:
      break
    }
    setDob({ date: `${updatedDate.getDate()}`, month: monthOptions[updatedDate.getMonth()], year: `${updatedDate.getFullYear()}` })
    handleChange(updatedDate.toISOString())
  }, [value, handleChange, today, monthOptions])
  return (
    <DropDownInput
      initialFocusRef={inputRef}
      trigger={
        <InputGroup
          _focusWithin={{ borderColor: "brand.main" }}
          variant="filled"
          border="1px"
          borderColor="gray.100"
          borderRadius="1.2rem"
          borderStyle="solid"
          overflow="hidden" {...errorProps}>
          <Input
            ref={inputRef}
            readOnly
            value={value.split("T")[0]}
            border="0px"
            placeholder="Date of Birth *"
            type="text" name="dob" />
          <InputRightAddon border="0px" color="gray.100"><DownChevron /></InputRightAddon>
        </InputGroup>
      }>
      {() => (
        <Box py=".5rem" px="1rem" dropShadow="lg">
          <Flex gap="3rem">
            <Select size="lg" fontSize="1.6rem" placeholder="Year" name="year" value={dob.year} onChange={handleSelect}>
              {yearsOptions.map(opt => (<option key={opt}>{opt}</option>))}
            </Select>
            <Select size="lg" fontSize="1.6rem" placeholder="Month" name="month" value={dob.month} onChange={handleSelect}>
              {monthOptions.map(opt => (<option key={opt}>{opt}</option>))}
            </Select>
            <Select size="lg" fontSize="1.6rem" placeholder="Date" name="date" value={dob.date} onChange={handleSelect}>
              {dateOptions.map((date) => (<option key={date}>{date}</option>))}
            </Select>
          </Flex>
        </Box>
      )}
    </DropDownInput>
  )
}