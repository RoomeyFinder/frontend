import DropDown from "@/app/_components/DropDown"
import { Button, Input, Text } from "@chakra-ui/react"
import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef } from "react"
import usePlacesAutocomplete from "use-places-autocomplete"
import CustomDropDownList from "../_SharedComponents/_CustomDropDownList"


export default function AddressInput({ updateFormData, formValue, errorProps }: {
  updateFormData: (fieldName: string, value: string) => void
  formValue: string 
  errorProps: {[x:string]: string }
}) {
  const {
    ready,
    value,
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
    if(formValue.length > 0){
      clearSuggestions()
      updateFormData("address", "")
      updateFormData("placeId", "")
    }
  }, [setValue, formValue.length, clearSuggestions, updateFormData])

  const handleSelect = useCallback((option: google.maps.places.AutocompletePrediction) => {
    const { structured_formatting, place_id } = option
    updateFormData("address", structured_formatting.main_text)
    updateFormData("placeId", place_id)
  }, [updateFormData])

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setValue(formValue, false)
  }, [formValue, setValue])

  return (
    <DropDown 
      returnFocusOnClose={false} closeOnBlur={false} closeOnEsc={false} initialFocusRef={inputRef}
      trigger={<Input
        ref={inputRef}
        variant="filled"
        type="text"
        autoComplete="off"
        placeholder="Address *"
        name="address"
        {...errorProps}
        value={value}
        onChange={handleChange} />}>
      {({ onClose }) => (
        hasStartedSearch ? 
          <CustomDropDownList
            list={data as never}
            ItemComponent={({ option, ...rest }: { option: google.maps.places.AutocompletePrediction }) => (
              (<Button {...rest} justifyContent="start" onClick={() => {
                handleSelect(option)
                onClose()
              }}>
                <Text textAlign="left" textOverflow="ellipsis" w="95%" overflow="hidden">{option.description}</Text>
              </Button>)
            )} /> : null
      )}
    </DropDown>
  )
}