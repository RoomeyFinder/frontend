import AC from "../_assets/AdFeaturesSVGs/AC"
import Balcony from "../_assets/AdFeaturesSVGs/Balcony"
import Bathtub from "../_assets/AdFeaturesSVGs/Bathtub"
import Bed from "../_assets/AdFeaturesSVGs/Bed"
import BedroomVanity from "../_assets/AdFeaturesSVGs/BedroomVanity"
import Closet from "../_assets/AdFeaturesSVGs/Closet"
import CookingGas from "../_assets/AdFeaturesSVGs/CookingGas"
import FederalLight from "../_assets/AdFeaturesSVGs/FederalLight"
import HeatedTiles from "../_assets/AdFeaturesSVGs/HeatedTiles"
import KitchenIsland from "../_assets/AdFeaturesSVGs/KitchenIsland"
import ParkingSpace from "../_assets/AdFeaturesSVGs/ParkingSpace"
import Security from "../_assets/AdFeaturesSVGs/Security"
import Shower from "../_assets/AdFeaturesSVGs/Shower"
import StorageSpace from "../_assets/AdFeaturesSVGs/StorageSpace"
import TV from "../_assets/AdFeaturesSVGs/TV"
import TarredRoad from "../_assets/AdFeaturesSVGs/TarredRoad"
import Washer from "../_assets/AdFeaturesSVGs/Washer"
import WaterHeater from "../_assets/AdFeaturesSVGs/WaterHeater"
import Wifi from "../_assets/AdFeaturesSVGs/Wifi"

export const icons = {
  "Air conditioner": <AC />,
  "Heated tiles": <HeatedTiles />,
  "Bath tub": <Bathtub />,
  Shower: <Shower />,
  "Bedroom vanity": <BedroomVanity />,
  Closet: <Closet />,
  "Comfortable bed": <Bed />,
  Washer: <Washer />,
  "Water heater": <WaterHeater/>,
  "Federal light": <FederalLight />,
  Wifi: <Wifi />,
  Television: <TV />,
  "Cooking gas": <CookingGas />,
  "Parking space": <ParkingSpace />,
  "Tarred road": <TarredRoad />,
  Security: <Security />,
  Balcony: <Balcony />,
  "Storage space": <StorageSpace />,
  "Kitchen island": <KitchenIsland />,
}

export const adFeatures = [
  {
    value: "Air conditioner",
    category: "Heating and cooling",
    icon: AC,
  },
  {
    value: "Heated tiles",
    category: "Heating and cooling",
    icon: HeatedTiles,
  },
  {
    value: "Bath tub",
    category: "Bathroom",
    icon: Bathtub,
  },
  {
    value: "Water heater",
    category: "Bathroom",
    icon: WaterHeater,
  },
  {
    value: "Shower",
    category: "Bathroom",
    icon: Shower,
  },
  {
    value: "Bedroom vanity",
    category: "Bedroom and laundry",
    icon: BedroomVanity,
  },
  {
    value: "Closet",
    category: "Bedroom and laundry",
    icon: Closet,
  },
  {
    value: "Comfortable bed",
    category: "Bedroom and laundry",
    icon: Bed,
  },
  {
    value: "Washer",
    category: "Bedroom and laundry",
    icon: Washer,
  },
  {
    value: "Federal light",
    category: "Utilities",
    icon: FederalLight,
  },
  {
    value: "Wifi",
    category: "Utilities",
    icon: Wifi,
  },
  {
    value: "Television",
    category: "Utilities",
    icon: TV,
  },
  {
    value: "Cooking gas",
    category: "Utilities",
    icon: CookingGas,
  },
  {
    value: "Parking space",
    category: "Other",
    icon: ParkingSpace,
  },
  {
    value: "Tarred road",
    category: "Other",
    icon: TarredRoad,
  },
  {
    value: "Security",
    category: "Other",
    icon: Security,
  },
  {
    value: "Balcony",
    category: "Other",
    icon: Balcony,
  },
  {
    value: "Storage space",
    category: "Other",
    icon: StorageSpace,
  },
  {
    value: "Kitchen island",
    category: "Other",
    icon: KitchenIsland,
  },
]
