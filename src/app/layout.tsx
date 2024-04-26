import Layout from "@/layout"
import theme from "@/theme"
import { ColorModeScript } from "@chakra-ui/react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Todogit",
  description: "todo list with git",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
