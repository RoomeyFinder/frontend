import { memo } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import useLoadMap from "@/app/_hooks/useLoadMap"


function ListingMap({
  lat = 4.907,
  lng = 6.9162,
  label
}: {
  lat?: number
  lng?: number
  label?: string
}) {
  const { isLoaded, onLoad, onUnmount } = useLoadMap("g-map-single-listing", {
    lat,
    lng,
  })

  if(!lat || !lng) return null

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%", filter: "brightness(0.9)" }}
      center={{ lat, lng }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons
    >
      <Marker clickable label={ label} position={{ lat, lng }} />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(ListingMap)
