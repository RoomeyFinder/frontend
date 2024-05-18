import { Collapse } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function Stage({
  currentStage,
  stage,
  children,
  unmountOnExit,
}: {
  children: ReactNode | ReactNode[]
  stage: string | number
  currentStage: string | number
  unmountOnExit?: boolean
}) {
  return (
    <Collapse
      transition={{
        enter: { duration: 0.25, ease: "easeInOut" },
        exit: { delay: 0, duration: 0.25 },
      }}
      in={currentStage === stage}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </Collapse>
  )
}
