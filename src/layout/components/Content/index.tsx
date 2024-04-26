import { twclx } from "@/utils/twclx"
import { PropsWithChildren } from "react"

const Content = ({ children }: PropsWithChildren) => {
  return <main className={twclx(["flex-1 w-full flex flex-col items-center py-6"])}>{children}</main>
}

export default Content
