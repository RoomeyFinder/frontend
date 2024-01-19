import { useState, useMemo, useCallback } from "react"



export default function useManageStageFlow({
  maxStage, minStage, start
}: {
  maxStage: number
  minStage: number,
  start?: number
}) {
  const [currentStage, setCurrentStage] = useState(typeof start !== "undefined" ? start : minStage)
  const progressInPercentage = useMemo(() => {
    return (currentStage / maxStage) * 100
  }, [currentStage, maxStage])

  const goToNextStage = useCallback(() => {
    console.log("gt")
    setCurrentStage(prev => prev >= maxStage ? maxStage : prev + 1)
  }, [maxStage])

  const goToPrevStage = useCallback(() => {
    setCurrentStage(prev => prev <= minStage ? minStage : prev - 1)
  }, [minStage])

  return {
    currentStage,
    goToNextStage,
    goToPrevStage,
    progressInPercentage,
  }
}