import { Task } from "@/models/task"
import { getAppRepoPath, ghapi, validateGhapiResponse } from "@/utils/ghapi"
import { buildQuery } from "@/utils/url"
import { Endpoints } from "@octokit/types"
import { z } from "zod"
import { procedure, router } from ".."

export const task = router({
  get: procedure.input(z.object({ number: z.number() })).query(async ({ input, ctx }) => {
    const session = ctx.session
    const response = await ghapi(`/repos/${getAppRepoPath(session)}/issues/${input.number}`, session?.token)
    await validateGhapiResponse(response)

    const data =
      (await response.json()) as Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}"]["response"]["data"]
    return data
  }),
  list: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(30).default(30),
        cursor: z.number().min(1).default(1).nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const session = ctx.session
      input.limit -= 1

      const page = input.cursor ?? 1
      // get one more item per page, so we can check if there is a next page.
      const per_page = input.limit + 1

      const query = buildQuery({
        state: "open",
        labels: ["todogit"].join(","),
        sort: "created",
        direction: "asc",
        page,
        per_page,
      } as Endpoints["GET /repos/{owner}/{repo}/issues"]["parameters"])

      const response = await ghapi(`/repos/${getAppRepoPath(session)}/issues?${query}`, session?.token)
      await validateGhapiResponse(response)
      const items = (await response.json()) as Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"]

      const nextCursor = items.length > input.limit ? page + 1 : null

      return {
        items,
        nextCursor,
      }
    }),
  create: procedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const session = ctx.session
      const task = new Task(input)
      const body = task.toIssueObject()
      const response = await ghapi(`/repos/${getAppRepoPath(session)}/issues`, session?.token, {
        method: "POST",
        body: JSON.stringify(body),
      })

      await validateGhapiResponse(response)
      const data = (await response.json()) as Endpoints["POST /repos/{owner}/{repo}/issues"]["response"]["data"]
      return data
    }),
  update: procedure
    .input(
      z.object({
        number: z.number(),
        content: z.string(),
        is_archived: z.boolean(),
        is_completed: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const session = ctx.session
      const task = new Task(input)
      const body = task.toIssueObject()
      const response = await ghapi(`/repos/${getAppRepoPath(session)}/issues/${input.number}`, session?.token, {
        method: "PATCH",
        body: JSON.stringify(body),
      })

      await validateGhapiResponse(response)
      const data =
        (await response.json()) as Endpoints["PATCH /repos/{owner}/{repo}/issues/{issue_number}"]["response"]["data"]
      return {
        id: data.id,
        url: data.html_url,
      }
    }),
  delete: procedure
    .input(
      z.object({
        issueNodeId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const session = ctx.session
      const query = `
mutation {
  deleteIssue(input: {issueId: "${input.issueNodeId}"}) {
    clientMutationId
  }
}
`
      const response = await ghapi("/graphql", session?.token, {
        method: "POST",
        body: JSON.stringify({
          query,
        }),
      })

      if (response.ok) {
        return true
      } else {
        await validateGhapiResponse(response)
        const data = await response.json()

        return data
      }
    }),
})
