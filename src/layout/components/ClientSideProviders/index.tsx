"use client"

import Provider from "@/trpc/client/provider"
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"

const ClientSideProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <ChakraProvider>
        <SessionProvider>{children}</SessionProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default ClientSideProviders
