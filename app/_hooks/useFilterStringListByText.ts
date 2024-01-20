import { useCallback, useMemo, useState } from "react"


export default function useFilterListByText(list: (string | { [x:string]: string | number })[]){
  const [text, setText] = useState("")
  const filteredList = useMemo(() => {
    if (text.length === 0) return list
    return list.filter(opt => {
      return JSON.stringify(Object.values(opt).join("")).toLowerCase().includes(text.trim().toLowerCase())
    })
  }, [text, list])
  const updateText = useCallback((newText: string) => {
    setText(newText)
  }, [])
  return {
    text, 
    updateText,
    filteredList
  }
}