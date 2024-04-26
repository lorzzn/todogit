import { env } from "@/utils/env"
import { redirect } from "next/navigation"
import Setup from "."

const SteupPage = () => {
  const repoName = env.GITHUB_REPOSITORY_NAME
  const repoPrivate = env.GITHUB_REPOSITORY_PRIVATE === "true"
  if (!repoName) {
    redirect("/")
  }

  return <Setup repoName={repoName} repoPrivate={repoPrivate} />
}

export default SteupPage
