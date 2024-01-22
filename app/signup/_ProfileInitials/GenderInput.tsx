import DropDownInput from "@/app/_components/DropDown"
import useFilterStringListByText from "@/app/_hooks/useFilterStringListByText"
import { Input } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import CustomDropDownList from "../_SharedComponents/_CustomDropDownList"


export default
function GenderInput({ handleChange, value }: {
    handleChange: (selection: string) => void
    value: string
  }) {
  const { text, updateText, filteredList } = useFilterStringListByText(["male", "female"])
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    updateText(value)
  }, [value, updateText])

  return (
    <DropDownInput returnFocusOnClose={false} closeOnBlur={false} closeOnEsc={false} initialFocusRef={inputRef}
      trigger={
        <Input 
          ref={inputRef} 
          variant="filled" 
          placeholder="Gender *"
          value={text} name="gender"
          autoComplete="off"
          textTransform="capitalize" 
          onChange={(e) => {
            if (value.length > 0) handleChange("")
            updateText(e.target.value)
          }} /> }
    >
      {
        ({ onClose }: { onClose: () => void }) => (
          <CustomDropDownList 
            list={filteredList as never[]} 
            handleItemClick={(option: string) => {
              handleChange(option)
              updateText(option)
              onClose()
            }} />
        )
      }
    </DropDownInput>
  )
}