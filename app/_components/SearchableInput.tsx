import DropDownInput from "@/app/_components/DropDown"
import useFilterStringListByText from "@/app/_hooks/useFilterStringListByText"
import { BoxProps, Input, InputProps } from "@chakra-ui/react"
import { useRef, useEffect } from "react"
import CustomDropDownList from "./CustomDropDownList"

export default function SearchableInput({
  inputPlaceholder,
  options,
  handleChange,
  value,
  errorProps = {},
  inputVariant,
  inputName,
}: {
  value: string
  options: string[]
  handleChange: (value: string) => void
  errorProps?: BoxProps | InputProps
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
      options={filteredList}
      returnFocusOnClose={false}
      closeOnBlur={true}
      closeOnEsc={true}
      initialFocusRef={inputRef}
      trigger={
        <Input
          ref={inputRef}
          autoComplete="off"
          variant={inputVariant || "filled"}
          placeholder={inputPlaceholder}
          value={text}
          name={inputName}
          {...errorProps}
          onChange={(e) => {
            handleChange(e.target.value)
            updateText(e.target.value)
          }}
        />
      }
    >
      {({ onClose }: { onClose: () => void }) => (
        <CustomDropDownList
          list={filteredList as never[]}
          handleItemClick={(option: string) => {
            handleChange(option)
            updateText(option)
            onClose()
          }}
        />
      )}
    </DropDownInput>
  )
}
