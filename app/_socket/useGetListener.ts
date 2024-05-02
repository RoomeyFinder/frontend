import { useEffect } from "react"
import { Socket } from "socket.io-client"

export default function useGetListener(socket: Socket | null) {
  return function useListener(event: string, callback: (...args: any) => void) {
    useEffect(() => {
      socket?.on(event, callback)
      return () => {
        socket?.off(event, callback)
      }
    }, [event, callback])
  }
}
