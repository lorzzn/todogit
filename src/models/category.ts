import { defaults } from "lodash"
import tinycolor from "tinycolor2"

type Base = {
  id?: number
  label?: string
  description?: string
  created_at?: Date
  updated_at?: Date
  is_remote?: boolean
}

export type CategoryConfig = Base & {
  color?: string
}

export class Category {
  static namePrefix = "@category:"
  data: Required<Base> & {
    color: tinycolor.Instance
  } = {
    id: 0,
    label: "",
    description: "",
    created_at: new Date(0),
    updated_at: new Date(0),
    color: tinycolor(),
    is_remote: false,
  }

  constructor(data: CategoryConfig = {}) {
    defaults(this.data, {
      ...data,
      color: tinycolor(data.color),
    })
  }

  get labelName() {
    return Category.namePrefix + this.data.label
  }
}
