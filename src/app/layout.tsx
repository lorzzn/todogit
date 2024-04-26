import Layout from "@/layout"
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
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
