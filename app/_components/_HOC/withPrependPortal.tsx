import { ReactNode, ReactPortal, useEffect, useState } from "react"
import { createPortal } from "react-dom"

export const withPrependPortal = (
  component: ReactNode,
  container: Element
): ReactPortal => {
  const [portalContainer] = useState(() =>
    document.createElement("div")
  )

  useEffect(() => {
    container.prepend(portalContainer)
    return () => {
      container.removeChild(portalContainer)
    }
  }, [container, portalContainer])

  return createPortal(component, portalContainer)
}
