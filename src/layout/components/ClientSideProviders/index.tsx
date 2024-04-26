"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"

const ClientSideProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <SessionProvider>{children}</SessionProvider>
    </ChakraProvider>
  )
}

export default ClientSideProviders
