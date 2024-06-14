import { useEffect } from "react"
import { Socket } from "socket.io-client"

export default function useGetListener(socket: Promise<Socket> | null) {
  return function useListener(event: string, callback: (...args: any) => void) {
    useEffect(() => {
      socket?.then((socket) => socket.on(event, callback))
      return () => {
        socket?.then((socket) => socket.off(event, callback))
      }
    }, [event, callback])
  }
}
