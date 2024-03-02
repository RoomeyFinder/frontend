import { useEffect } from "react"



export default function useWarnBeforeExit(shouldWarn: boolean, onExit: () => void ){
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!shouldWarn) return
      e.preventDefault()
      onExit()
      // return (e.returnValue = warningMessage)
    }
    window.addEventListener("beforeunload", handleWindowClose)
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose)
    }
  }, [shouldWarn, onExit])
}