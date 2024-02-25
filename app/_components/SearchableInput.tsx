import DropDownInput from "@/app/_components/DropDown"
import useFilterStringListByText from "@/app/_hooks/useFilterStringListByText"
import { Input } from "@chakra-ui/react"
import { useRef, useEffect } from "react"
import CustomDropDownList from "./CustomDropDownList"


export default function SearchableInput({ inputPlaceholder, options, handleChange, value, errorProps, inputVariant, inputName }: {
  value: string
  options: string[], handleChange: (value: string) => void,
  errorProps: { [x: string]: string }
  inputVariant?: string
  inputName: string
  inputPlaceholder: string
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
        <Input
          ref={inputRef}
          autoComplete="off"
          variant={inputVariant || "filled"}
          placeholder={inputPlaceholder}
          value={text} name={inputName}
          {...errorProps}
          onChange={(e) => {
            if (value.length > 0) handleChange("")
            updateText(e.target.value)
          }} />}>
      {({ onClose }: { onClose: () => void }) => (
        <CustomDropDownList list={filteredList as never[]} handleItemClick={(option: string) => {
          handleChange(option)
          updateText(option)
          onClose()
        }} />
      )}
    </DropDownInput>
  )
}