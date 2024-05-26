"use client"
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios"
import localforage from "localforage"
import STORAGE_KEYS from "../STORAGE_KEYS"
import { getTokenFromStorage } from "."

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export type RequestBody = AxiosRequestConfig<unknown> | undefined

export default async function axiosFetcher({
  url,
  method,
  body,
  headers,
  baseURL,
}: {
  url: string
  method: "get" | "post" | "put" | "delete"
  headers?: AxiosHeaders
  baseURL?: string
  body?: any
}) {
  try {
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${await getTokenFromStorage()}`
    console.log(axios.defaults.headers.common["Authorization"], await getTokenFromStorage())
    const response = await axios[method](url, body, {
      ...headers,
      baseURL: baseURL || process.env.NEXT_PUBLIC_SERVER_URL,
    })
    return await response.data
  } catch (err: any) {
    console.log(err)
    if (err.message === "Network Error") {
      return {
        message: err.message,
        statusCode: 503,
      }
    }
    return err.response.data
  }
}
