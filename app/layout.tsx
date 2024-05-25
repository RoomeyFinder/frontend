import ChakraUIProvider from "./_providers/chakra-ui"
import type { Metadata } from "next"
import "./globals.css"
import appendSharedMetaData from "./_metadata"
import GlobalLayout from "./_components/GlobalLayout"
import LocalForageProvider from "./_providers/localforage"
import AuthProvider from "./_providers/AuthContext"
import UserProvider from "./_providers/UserProvider"
import ListingsProvider from "./_providers/ListingsProvider"
import FavoritesProvider from "./_providers/FavoritesProvider"
import SearchProvider from "./_providers/SearchProvider"
import { Toaster } from "react-hot-toast"
import MessengerProvider from "./_providers/MessengerProvider"
import InterestsProvider from "./_providers/InterestsProvider"
import MessagesProvider from "./_providers/MessagesProvider"
import { GoogleOAuthProvider } from "@react-oauth/google"
import NotificationProvider from "./_providers/NotificationsProvider"
import { Suspense } from "react"
import CenteredSpinner from "./_components/CenteredSpinner"
import AuthModal from "./_components/Auth/AuthModal"
import FacebookProvider from "./_providers/FacebookProvider"
import AuthModalProvider from "./_providers/AuthModalProvider"

export const metadata: Metadata = appendSharedMetaData({})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <Suspense fallback={<CenteredSpinner />}>
          <ChakraUIProvider>
            <LocalForageProvider>
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
              >
                <AuthProvider>
                  <UserProvider>
                    <AuthModalProvider>
                      <SearchProvider>
                        <ListingsProvider>
                          <FavoritesProvider>
                            <InterestsProvider>
                              <MessengerProvider>
                                <MessagesProvider>
                                  <NotificationProvider>
                                    <GlobalLayout>
                                      {children}
                                      <AuthModal />
                                    </GlobalLayout>
                                  </NotificationProvider>
                                </MessagesProvider>
                              </MessengerProvider>
                            </InterestsProvider>
                          </FavoritesProvider>
                        </ListingsProvider>
                      </SearchProvider>
                    </AuthModalProvider>
                  </UserProvider>
                </AuthProvider>
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
