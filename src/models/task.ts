import { randomString } from "@/utils/stringFuncs"
import { Endpoints } from "@octokit/types"
import { compact, defaults } from "lodash"
import { Category } from "./category"

type Base = {
  id?: number
  nodeId?: string
  content?: string
  is_completed?: boolean
  is_archived?: boolean
  created_at?: Date
}

export type TaskConfig = Base & {
  categoryLabel?: string
}

export class Task {
  data: Required<Base> & {
    category: Category
  } = {
    id: 0,
    nodeId: "",
    content: "",
    created_at: new Date(0),
    is_archived: false,
    is_completed: false,
    category: new Category({
      is_remote: false,
    }),
  }

  constructor(data: TaskConfig = {}) {
    defaults(this.data, {
      ...data,
      category: new Category({
        is_remote: false,
        label: data.categoryLabel,
      }),
    })
  }

  toIssueObject(): Endpoints["POST /repos/{owner}/{repo}/issues"]["request"]["data"] {
    return {
      title: randomString(8, "Todogit | "),
      labels: compact(["todogit", this.data.category.labelName]),
      body: this.data.content,
    }
  }
}
