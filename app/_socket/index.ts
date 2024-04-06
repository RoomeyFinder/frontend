"use client"
import localforage from "localforage"
import { io } from "socket.io-client"

const URL = process.env.NEXT_PUBLIC_SOCKET_URL

const socket = io(URL as string, {
  autoConnect: false,
  auth: {},
})

export default socket
