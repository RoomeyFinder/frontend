import ChakraUIProvider from "./_providers/chakra-ui"
import type { Metadata } from "next"
import "./globals.css"
import appendSharedMetaData from "./_metadata"
import GlobalLayout from "./_components/GlobalLayout"
import LocalForageProvider from "./_providers/localforage"
import AuthProvider from "./_providers/AuthContext"
import UserProvider from "./_providers/UserProvider"

export const metadata: Metadata = appendSharedMetaData({})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LocalForageProvider>
          <AuthProvider>
            <UserProvider>
              <ChakraUIProvider>
                <GlobalLayout>{children}</GlobalLayout>
              </ChakraUIProvider>
            </UserProvider>
          </AuthProvider>
        </LocalForageProvider>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=Function.prototype`}
        ></script>
      </body>
    </html>
  )
}
