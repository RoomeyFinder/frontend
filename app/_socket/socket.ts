"use client"
import socketIO from "socket.io-client"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"

export const socket = socketIO(
  `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations` as string,
  {
    auth: {
      token: globalThis?.localStorage?.getItem(STORAGE_KEYS.RF_TOKEN),
    },
  }
)