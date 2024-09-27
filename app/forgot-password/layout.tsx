import { ReactNode, Suspense } from "react"
import PageLoader from "../_components/PageLoader"

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}
