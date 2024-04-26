import Layout from "@/layout"
import { LayoutContextProvider } from "@/layout/context"
import { getPathname } from "@/middleware"
import theme from "@/theme"
import { caller } from "@/trpc/server/routers/_app"
import { ColorModeScript } from "@chakra-ui/react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import "./globals.css"

export const metadata: Metadata = {
  title: "Todogit",
  description: "todo list with git",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = getPathname()
  let repo
  if (pathname !== "/setup") {
    repo = await caller.repo.get()
    if (!repo) {
      return redirect("/setup")
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <LayoutContextProvider repo={repo}>
          <Layout>{children}</Layout>
        </LayoutContextProvider>
      </body>
    </html>
  )
}
