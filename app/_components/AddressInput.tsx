import DropDown from "@/app/_components/DropDown"
import { Button, Input, Text } from "@chakra-ui/react"
import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef } from "react"
import usePlacesAutocomplete from "use-places-autocomplete"
import CustomDropDownList from "./CustomDropDownList"


export default function AddressInput({ handleSelection, value, errorProps, inputVariant, reset }: {
  handleSelection: (selection: google.maps.places.AutocompletePrediction) => void
  value: string
  errorProps: { [x: string]: string }
  inputVariant?: string
  reset: () => void
}) {
  const {
    ready,
    value: searchValue,
    suggestions: { status, data },
    clearSuggestions,
    setValue,
  } = usePlacesAutocomplete({
    callbackName: "Function.prototype",
    requestOptions: {
      types: ["address"],
      componentRestrictions: { country: "ng" }
    },
    debounce: 300,
  })
  const hasStartedSearch = useMemo(() => ready && status.toLowerCase() === "ok" || status.toLowerCase() === "zero_results", [ready, status])

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setValue(e.target.value)
    if (searchValue.length > 0) {
      clearSuggestions()
      reset()
    }
  }, [setValue, searchValue.length, clearSuggestions, reset])

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setValue(value, false)
  }, [value, setValue])

  return (
    <DropDown
      returnFocusOnClose={false} closeOnBlur={false} closeOnEsc={false} initialFocusRef={inputRef}
      trigger={<Input
        ref={inputRef}
        variant={inputVariant || "filled"}
        type="text"
        autoComplete="off"
        placeholder="Address *"
        name="address"
        {...errorProps}
        value={searchValue}
        onChange={handleChange} />}>
      {({ onClose }) => (
        hasStartedSearch ?
          <CustomDropDownList
            list={data as never}
            ItemComponent={({ option, ...rest }: { option: google.maps.places.AutocompletePrediction }) => (
              (<Button {...rest} justifyContent="start" onClick={() => {
                handleSelection(option)
                onClose()
              }}>
                <Text textAlign="left" textOverflow="ellipsis" w="95%" overflow="hidden">{option.description}</Text>
              </Button>)
            )} /> : null
      )}
    </DropDown>
  )
}