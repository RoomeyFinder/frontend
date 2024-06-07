import ChakraUIProvider from "./_providers/chakra-ui"
import type { Metadata } from "next"
import "./globals.css"
import appendSharedMetaData from "./_metadata"
import GlobalLayout from "./_components/GlobalLayout"
import LocalForageProvider from "./_providers/localforage"
import { Toaster } from "react-hot-toast"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Suspense } from "react"
import CenteredSpinner from "./_components/CenteredSpinner"
import AuthModal from "./_components/Auth/AuthModal"
import FacebookProvider from "./_providers/FacebookProvider"
import AuthModalProvider from "./_providers/AuthModalProvider"
import ReduxProvider from "./_providers/ReduxProvider"
import LayoutDispatchProvider from "./_providers/LayoutClientProvider"
import { Box } from "@chakra-ui/react"

export const metadata: Metadata = appendSharedMetaData({})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%", overflow: "hidden" }}>
        <Suspense fallback={<CenteredSpinner />}>
          <ChakraUIProvider>
            <LocalForageProvider>
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
              >
                <ReduxProvider>
                  <LayoutDispatchProvider>
                    <AuthModalProvider>
                      <GlobalLayout>
                        {children}
                        <AuthModal />
                      </GlobalLayout>
                    </AuthModalProvider>
                  </LayoutDispatchProvider>
                </ReduxProvider>
              </GoogleOAuthProvider>
            </LocalForageProvider>
            <script
              defer
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=Function.prototype`}
            ></script>
            <FacebookProvider />
            <Toaster containerStyle={{ fontSize: "1.6rem" }} />
          </ChakraUIProvider>
        </Suspense>
      </body>
    </html>
  )
}
