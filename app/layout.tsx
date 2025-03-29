import ChakraUIProvider from "./_providers/chakra-ui"
import type { Metadata } from "next"
import "./globals.css"
import appendSharedMetaData from "./_metadata"
import GlobalLayout from "./_components/GlobalLayout"
import LocalForageProvider from "./_providers/localforage"
import { Toaster } from "react-hot-toast"
import { GoogleOAuthProvider } from "@react-oauth/google"
// import { Suspense } from "react"
import AuthModal from "./_components/Auth/AuthModal"
import FacebookProvider from "./_providers/FacebookProvider"
import AuthModalProvider from "./_providers/AuthModalProvider"
import ReduxProvider from "./_providers/ReduxProvider"
import LayoutClientProvider from "./_providers/LayoutClientProvider"
import Script from "next/script"
// import PageLoader from "./_components/PageLoader"

export const metadata: Metadata = appendSharedMetaData({})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="test-html"
      //  style={{ height: "100%" }}
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5GFR3B86PQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5GFR3B86PQ');
          `}
      </Script>
      <body
      // style={{ height: "100%", overflow: "hidden" }}
      >
        {/* <Suspense fallback={<PageLoader />}> */}
        <ChakraUIProvider>
          <LocalForageProvider>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
            >
              <ReduxProvider>
                <>
                  <AuthModalProvider>
                    <GlobalLayout>
                      <LayoutClientProvider>{children}</LayoutClientProvider>
                      <AuthModal />
                    </GlobalLayout>
                  </AuthModalProvider>
                </>
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
        {/* </Suspense> */}
      </body>
    </html>
  )
}
