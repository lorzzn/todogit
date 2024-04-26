import classNames from "classnames"
import { twMerge } from "tailwind-merge"
export { css } from "@emotion/css"

export const twclx = (...args: classNames.ArgumentArray) => {
  return twMerge(classNames(args))
}
