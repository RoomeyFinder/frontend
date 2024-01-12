import ChakraUIProvider from './_providers/chakra-ui'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RoomeyFinder',
  description: 'Helping Nigerian students find roommates who are schoolmates with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
          <ChakraUIProvider>
            {children}
          </ChakraUIProvider >
        </body>
    </html>
  )
}
