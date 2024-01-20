import DropDownInput from "@/app/_components/DropDown"
import useFilterStringListByText from "@/app/_hooks/useFilterStringListByText"
import { Input } from "@chakra-ui/react"
import { useRef, useEffect } from "react"
import CustomDropDownList from "../_CustomDropDownList"


export default function OccupationInput({ options, handleChange, isStudent, value }: {
    value: string
    options: string[], handleChange: (value: string) => void, isStudent: boolean,
  }) {
  const { text, updateText, filteredList } = useFilterStringListByText(options)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    updateText(value)
  }, [value, updateText])

  return (
    <DropDownInput
      returnFocusOnClose={false} closeOnBlur={false} closeOnEsc={false} initialFocusRef={inputRef}
      trigger={
        <Input ref={inputRef} variant="filled" placeholder={isStudent ? "University" : "Occupation"} value={text} name="gender" onChange={(e) => {
          if (value.length > 0) handleChange("")
          updateText(e.target.value)
        }} />}>
      {({ onClose }: { onClose: () => void }) => (
        <CustomDropDownList list={filteredList as string[]} handleItemClick={(option: string) => {
          handleChange(option)
          updateText(option)
          onClose()
        }}/>
      )}
    </DropDownInput>
  )
}