import { useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useState } from "react"

export default function useLoadMap(
  id: string,
  center: { lat: number; lng: number }
) {
  const { isLoaded } = useJsApiLoader({
    id,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string,
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])
  return { onLoad, onUnmount, isLoaded, map }
}
