import { randomString } from "@/utils/stringFuncs"
import { Endpoints } from "@octokit/types"
import { dump, load } from "js-yaml"
import { assign, compact, toString } from "lodash"

type Base = {
  id?: number
  number?: number
  nodeId?: string
  content?: string
  is_completed?: boolean
  is_archived?: boolean
  created_at?: Date
  updated_at?: Date
}

export type TaskConfig = Base & {
  categoryLabel?: string
}

export class Task {
  data: Required<Base> = {
    id: 0,
    number: 0,
    nodeId: "",
    content: "",
    created_at: new Date(0),
    updated_at: new Date(0),
    is_archived: false,
    is_completed: false,
  }

  constructor(data: TaskConfig = {}) {
    assign(this.data, data)
  }

  static fromIssueObject(issue: Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"][0]): Task {
    const data = load(toString(issue.body)) as
      | {
          content: string
          is_completed: boolean
          is_archived: boolean
        }
      | undefined

    return new Task({
      id: issue.id,
      number: issue.number,
      nodeId: issue.node_id,
      content: toString(data?.content),
      created_at: new Date(issue.created_at),
      updated_at: new Date(issue.updated_at),
      is_completed: Boolean(data?.is_completed),
      is_archived: Boolean(data?.is_archived),
    })
  }

  update(data: TaskConfig) {
    assign(this.data, data)
    return this
  }

  toIssueObject(): Endpoints["POST /repos/{owner}/{repo}/issues"]["request"]["data"] {
    return {
      title: randomString(8, "Todogit | "),
      labels: compact(["todogit"]),
      body: dump({
        content: this.data.content,
        is_completed: this.data.is_completed,
        is_archived: this.data.is_archived,
      }),
    }
  }
}
