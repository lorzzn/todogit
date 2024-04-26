import { auth } from "@/auth"
import { createCallerFactory, router } from ".."
import { repo } from "./repo"
import { task } from "./task"

export const appRouter = router({
  repo,
  task,
})

export type AppRouter = typeof appRouter

const createCaller = createCallerFactory(appRouter)
export const caller = createCaller(async () => {
  return {
    session: await auth(),
  }
})
