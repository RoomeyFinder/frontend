import AC from "../_assets/AdFeaturesSVGs/AC"
import Balcony from "../_assets/AdFeaturesSVGs/Balcony"
import Bathtub from "../_assets/AdFeaturesSVGs/Bathtub"
import Bed from "../_assets/AdFeaturesSVGs/Bed"
import BedroomVanity from "../_assets/AdFeaturesSVGs/BedroomVanity"
import Closet from "../_assets/AdFeaturesSVGs/Closet"
import CookingGas from "../_assets/AdFeaturesSVGs/CookingGas"
import FederalLight from "../_assets/AdFeaturesSVGs/FederalLight"
import Furniture from "../_assets/AdFeaturesSVGs/Furniture"
import Gym from "../_assets/AdFeaturesSVGs/Gym"
import HeatedTiles from "../_assets/AdFeaturesSVGs/HeatedTiles"
import HouseUtilities from "../_assets/AdFeaturesSVGs/HouseUtilities"
import KitchenIsland from "../_assets/AdFeaturesSVGs/KitchenIsland"
import ParkingSpace from "../_assets/AdFeaturesSVGs/ParkingSpace"
import PetsAllowedIcon from "../_assets/AdFeaturesSVGs/PetsAllowed"
import Security from "../_assets/AdFeaturesSVGs/Security"
import Shower from "../_assets/AdFeaturesSVGs/Shower"
import SmokingAllowedIcon from "../_assets/AdFeaturesSVGs/SmokingAllowed"
import StorageSpace from "../_assets/AdFeaturesSVGs/StorageSpace"
import SwimmingPoolIcon from "../_assets/AdFeaturesSVGs/SwimmingPool"
import TV from "../_assets/AdFeaturesSVGs/TV"
import TarredRoad from "../_assets/AdFeaturesSVGs/TarredRoad"
import Washer from "../_assets/AdFeaturesSVGs/Washer"
import WaterHeater from "../_assets/AdFeaturesSVGs/WaterHeater"
import Wifi from "../_assets/AdFeaturesSVGs/Wifi"
import { TbFridge, TbMicrowave } from "react-icons/tb"
import { IoRestaurant, IoTrash } from "react-icons/io5"
import {
  MdBathroom,
  MdOutlineBathroom,
  MdOutlineEmojiTransportation,
  MdOutlineSecurity,
  MdOutlineShoppingCart,
  MdWaterDrop,
} from "react-icons/md"
import { PiBathtub, PiOven, PiSecurityCameraFill } from "react-icons/pi"
import { GiGasStove, GiGate } from "react-icons/gi"
import { RiSecurePaymentFill } from "react-icons/ri"
import Dishwasher from "../_assets/AdFeaturesSVGs/Dishwasher"

export const icons = {
  "Air conditioner": <AC />,
  "Heated tiles": <HeatedTiles />,
  "Bath tub": <Bathtub />,
  Shower: <Shower />,
  "Bedroom vanity": <BedroomVanity />,
  Closet: <Closet />,
  "Comfortable bed": <Bed />,
  Washer: <Washer />,
  "Water heater": <WaterHeater />,
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
    value: "Furnished",
    category: "General",
    description: "The apartment comes with essential furniture.",
    icon: Furniture,
  },
  {
    value: "Utilities Included",
    category: "General",
    description:
      "The rent includes utilities such as water, electricity, and gas.",
    icon: HouseUtilities,
  },
  {
    value: "Pets Allowed",
    category: "General",
    description: "Pets are allowed in the apartment.",
    icon: PetsAllowedIcon,
  },
  {
    value: "Smoking Allowed",
    category: "General",
    description: "Smoking is permitted inside the apartment.",
    icon: SmokingAllowedIcon,
  },
  {
    value: "Wi-Fi",
    category: "Amenities",
    description: "High-speed internet is available.",
    icon: Wifi,
  },
  {
    value: "Air Conditioning",
    category: "Amenities",
    description: "The apartment is equipped with air conditioning.",
    icon: AC,
  },
  {
    value: "Heating",
    category: "Amenities",
    description: "The apartment has a heating system.",
    icon: WaterHeater,
  },
  {
    value: "Laundry In-Unit",
    category: "Amenities",
    description: "The apartment has a washer and dryer inside.",
    icon: Washer,
  },
  {
    value: "Gym",
    category: "Amenities",
    description: "There is a gym available for residents.",
    icon: Gym,
  },
  {
    value: "Swimming Pool",
    category: "Amenities",
    description: "The building has a swimming pool.",
    icon: SwimmingPoolIcon,
  },
  {
    value: "Federal light",
    category: "Amenities",
    icon: FederalLight,
  },
  {
    value: "Constant water",
    category: "Amenities",
    icon: MdWaterDrop,
  },
  {
    value: "Parking",
    category: "Amenities",
    description: "Parking space is available for residents.",
    icon: ParkingSpace,
  },
  {
    value: "Dishwasher",
    category: "Kitchen",
    description: "The kitchen includes a dishwasher.",
    icon: Dishwasher,
  },
  {
    value: "Microwave",
    category: "Kitchen",
    description: "The kitchen includes a microwave.",
    icon: TbMicrowave,
  },
  {
    value: "Refrigerator",
    category: "Kitchen",
    description: "The kitchen includes a refrigerator.",
    icon: TbFridge,
  },
  {
    value: "Oven",
    category: "Kitchen",
    description: "The kitchen includes an oven.",
    icon: PiOven,
  },
  {
    value: "Stove",
    category: "Kitchen",
    description: "The kitchen includes a stove.",
    icon: GiGasStove,
  },
  {
    value: "Garbage Disposal",
    category: "Kitchen",
    description: "The kitchen includes a garbage disposal.",
    icon: IoTrash,
  },
  {
    value: "Private Bathroom",
    category: "Bathroom",
    description: "The apartment has a private bathroom.",
    icon: MdOutlineBathroom,
  },
  {
    value: "Shared Bathroom",
    category: "Bathroom",
    description: "The bathroom is shared with other roommates.",
    icon: MdBathroom,
  },
  {
    value: "Bathtub",
    category: "Bathroom",
    description: "The bathroom includes a bathtub.",
    icon: PiBathtub,
  },
  {
    value: "Shower",
    category: "Bathroom",
    description: "The bathroom includes a shower.",
    icon: Shower,
  },
  {
    value: "Security System",
    category: "Security",
    description: "The apartment is equipped with a security system.",
    icon: MdOutlineSecurity,
  },
  {
    value: "Gated Community",
    category: "Security",
    description: "The apartment is in a gated community.",
    icon: GiGate,
  },
  {
    value: "Surveillance Cameras",
    category: "Security",
    description: "The building has surveillance cameras.",
    icon: PiSecurityCameraFill,
  },
  {
    value: "Secure Entry",
    category: "Security",
    description: "The building has a secure entry system.",
    icon: RiSecurePaymentFill,
  },
  {
    value: "Near Public Transit",
    category: "Location",
    description: "The apartment is close to public transportation.",
    icon: MdOutlineEmojiTransportation,
  },
  {
    value: "Close to Shops",
    category: "Location",
    description: "The apartment is near shopping centers.",
    icon: MdOutlineShoppingCart,
  },
  {
    value: "Near Restaurants",
    category: "Location",
    description: "The apartment is close to restaurants.",
    icon: IoRestaurant,
  },
  {
    value: "Quiet Neighborhood",
    category: "Location",
    description: "The apartment is located in a quiet neighborhood.",
    icon: "QuietNeighborhoodIcon",
  },
  { value: "Tarred road", category: "Location", icon: TarredRoad },
]

// [
//   {
//     value: "Air conditioner",
//     category: "Heating and cooling",
//     icon: AC,
//   },
//   {
//     value: "Heated tiles",
//     category: "Heating and cooling",
//     icon: HeatedTiles,
//   },
//   {
//     value: "Bath tub",
//     category: "Bathroom",
//     icon: Bathtub,
//   },
//   {
//     value: "Water heater",
//     category: "Bathroom",
//     icon: WaterHeater,
//   },
//   {
//     value: "Shower",
//     category: "Bathroom",
//     icon: Shower,
//   },
//   {
//     value: "Bedroom vanity",
//     category: "Bedroom and laundry",
//     icon: BedroomVanity,
//   },
//   {
//     value: "Closet",
//     category: "Bedroom and laundry",
//     icon: Closet,
//   },
//   {
//     value: "Comfortable bed",
//     category: "Bedroom and laundry",
//     icon: Bed,
//   },
//   {
//     value: "Washer",
//     category: "Bedroom and laundry",
//     icon: Washer,
//   },
// {
//   value: "Federal light",
//   category: "Utilities",
//   icon: FederalLight,
// },
//   {
//     value: "Wifi",
//     category: "Utilities",
//     icon: Wifi,
//   },
//   {
//     value: "Television",
//     category: "Utilities",
//     icon: TV,
//   },
//   {
//     value: "Cooking gas",
//     category: "Utilities",
//     icon: CookingGas,
//   },
//   {
//     value: "Parking space",
//     category: "Other",
//     icon: ParkingSpace,
//   },
//   {
//     value: "Tarred road",
//     category: "Other",
//     icon: TarredRoad,
//   },
//   {
//     value: "Security",
//     category: "Other",
//     icon: Security,
//   },
//   {
//     value: "Balcony",
//     category: "Other",
//     icon: Balcony,
//   },
//   {
//     value: "Storage space",
//     category: "Other",
//     icon: StorageSpace,
//   },
//   {
//     value: "Kitchen island",
//     category: "Other",
//     icon: KitchenIsland,
//   },
// ]
