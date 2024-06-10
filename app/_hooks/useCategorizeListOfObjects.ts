import { useMemo } from "react"



export default function useCategorizeListOfObjects({ list, keyToCategorizeBy }: {
  list: Record<string | number | symbol, unknown>[]
  keyToCategorizeBy: string
}) {
  const categorizedList = useMemo(() => {
    return list.reduce((acc, current) => {
      const currentCategory = current[keyToCategorizeBy] as keyof typeof acc
      const currentCategorizedList = acc[currentCategory]
      if (Array.isArray(currentCategorizedList)) {
        acc[currentCategory] = [...currentCategorizedList, current]
      } else {
        acc[currentCategory] = [current]
      }
      return acc
    }, {})
  }, [keyToCategorizeBy, list])

  return categorizedList as { [x: string]: any[]}
}