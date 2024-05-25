import { ReactNode } from "react"

class DropDownOption{
  value: any = ""
  displayValue: string = ""
  icon: ReactNode = ""
  constructor(value: any, displayValue: string, icon?: ReactNode){
    this.value = value
    this.displayValue = displayValue
    this.icon = icon
  }
}
export const rentDurationOptions = [
  new DropDownOption("annually", "annually"),
  new DropDownOption("biannually", "biannually"),
  new DropDownOption("quarterly", "quarterly"),
  new DropDownOption("monthly", "monthly"),
]
export const numberOfBedroomsOptions = [
  new DropDownOption(1, "1"),
  new DropDownOption(2, "2"),
  new DropDownOption(3, "3"),
  new DropDownOption(4, "4+"),
]
export const apartmentTypeOptions = [
  new DropDownOption("Studio", "Studio"),
  new DropDownOption("Bedroom", "Bedroom")
]
export const numberOfOccupantsOptions = [
  new DropDownOption(1, "Alone"),
  new DropDownOption(2, "2"),
  new DropDownOption(3, "3"),
  new DropDownOption(4, "4+"),
]
