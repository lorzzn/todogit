import { twclx } from "@/utils/twclx"
import { PropsWithChildren } from "react"

const Content = ({ children }: PropsWithChildren) => {
  return (
    <main className={twclx(["flex-1 w-full flex flex-col items-center py-6"])}>
      <div
        className={twclx([
          "flex-1 flex flex-col w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 transition-[width]",
        ])}
      >
        {children}
      </div>
    </main>
  )
}

export default Content
