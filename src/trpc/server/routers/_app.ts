import { auth } from "@/auth"
import { createCallerFactory, router } from ".."
import { repo } from "./repo"

export const appRouter = router({
  repo,
})

export type AppRouter = typeof appRouter

const createCaller = createCallerFactory(appRouter)
export const caller = createCaller(async () => {
  return {
    session: await auth(),
  }
})
