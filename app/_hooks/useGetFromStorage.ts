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
        localforage.ready(() => {
          localforage.setItem(key, update).then(val => {
            setData(val)
          })
        })
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
      localforage.ready(() => {
        localforage.removeItem(key).then(() => {
          console.log("done")
        })
      })
      return true
    }
  }, [isSessionStorage, key])

  useEffect(() => {
    const dataInSessionStorage = sessionStorage.getItem(key)
    if (dataInSessionStorage === null) {
      setIsSessionStorage(false)
      localforage.ready(() => 
        localforage.getItem(key).then(val => {
          setData(val)
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          setLoading(false)
        }))
    } else {
      setData(JSON.parse(dataInSessionStorage))
      setLoading(false)
    }
  }, [key])
  return { data, updateData, deleteData, loading }
}