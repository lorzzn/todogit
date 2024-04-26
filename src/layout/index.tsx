import { twclx } from "@/utils/twclx"
import { PropsWithChildren } from "react"
import ClientSideProviders from "./components/ClientSideProviders"
import Content from "./components/Content"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ClientSideProviders>
      <div className={twclx(["min-h-screen flex flex-col w-full"])}>
        <Content>{children}</Content>
      </div>
    </ClientSideProviders>
  )
}

export default Layout
