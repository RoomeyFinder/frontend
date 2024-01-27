/* eslint-disable @typescript-eslint/no-explicit-any */

import localforage from "localforage"
import { useCallback, useEffect, useState } from "react"



export default function useGetFromStorage(key: string) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [isSessionStorage, setIsSessionStorage] = useState(false)

  const updateData = useCallback(async (update: any) => {
    if (isSessionStorage) {
      sessionStorage.setItem(key, JSON.stringify(update))
      return true
    } else {
      try {
        const value = await localforage.setItem(key, update)
        setData(value)
      } catch (err) {
        return false
      }
    }
  }, [isSessionStorage, key])

  const deleteData = useCallback(async () => {
    if(isSessionStorage){
      sessionStorage.removeItem(key)
      return true
    }else{
      await localforage.removeItem(key)
      return true
    }
  }, [isSessionStorage, key])

  useEffect(() => {
    const dataInSessionStorage = sessionStorage.getItem(key)
    if (dataInSessionStorage === null) {
      setIsSessionStorage(false)
      localforage.getItem(key).then(val => {
        setData(val)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    } else {
      setData(JSON.parse(dataInSessionStorage))
      setLoading(false)
    }
  }, [key])
  return { data, updateData, deleteData, loading }
}