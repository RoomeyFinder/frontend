import { useCallback, useContext, useEffect, useMemo } from "react"
import { AuthContext } from "../_providers/AuthContext"
import { Socket, SocketOptions, io } from "socket.io-client"
import { UserContext } from "../_providers/UserProvider"

const URL = process.env.NEXT_PUBLIC_SOCKET_URL

export default function useGetSocket(nsp = "/", options?: SocketOptions) {
  const { token, loading } = useContext(AuthContext)
  const { logout } = useContext(UserContext)
  const socket: Socket<any & { emitOnlyWhenConnected: () => void }, any> =
    useMemo(
      () =>
        io(`${URL}${nsp}`, {
          ...options,
          auth: {
            token,
          },
          reconnectionAttempts: 0,
        }),
      [token, nsp, options]
    )
    
  const emitOnlyWhenConnected = useCallback(
    (event: any, ...args: any) => {
      if (socket.connected) socket.emit(event, ...args)
    },
    [socket]
  )
  useEffect(() => {
    // if (!socket.connected) socket.connect()
    socket.on("connect_error", () => {
      if (socket.active === false && !loading) logout()
    })
    socket.on("connect_error", console.log)
    return () => {
      socket.off("connect_error", console.log)
    }
  }, [socket, loading, logout])

  return { socket, emitOnlyWhenConnected }
}
