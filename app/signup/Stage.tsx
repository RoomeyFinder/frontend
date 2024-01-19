import { ReactNode } from "react"


export default function Stage({ currentStage, stage, children }: {
  children: ReactNode | ReactNode[]
  stage: string | number
  currentStage: string | number
}) {
  if (currentStage !== stage) return null
  return (
    <>
      {children}
    </>
  )
}