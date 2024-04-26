export function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function getQueryParams() {
  if (typeof window === "undefined") {
    throw new Error("window is not defined, please run this function in the browser")
  }
  return new URLSearchParams(window.location.search)
}

export function updateQueryString(key: string, value: string | number) {
  const searchParams = getQueryParams()

  if (searchParams.has(key)) {
    searchParams.set(key, value + "")
  } else {
    searchParams.append(key, value + "")
  }

  const newUrl = window.location.pathname + "?" + searchParams.toString()

  window.history.pushState({ path: newUrl }, "", newUrl)
}

export function getQueryStringValue(key: string) {
  const searchParams = getQueryParams()

  return searchParams.get(key)
}

export function removeQueryStringValue(key: string) {
  const searchParams = getQueryParams()

  searchParams.delete(key)

  const newUrl = window.location.pathname + "?" + searchParams.toString()

  window.history.pushState({ path: newUrl }, "", newUrl)
}

export const buildQuery = (query: any) => {
  let queryString = ""
  for (const key in query) {
    const value = encodeURIComponent(query[key])
    if (value) {
      queryString += `${key}=${value}&`
    }
  }
  return queryString.slice(0, -1)
}

export const buildGhapiQuery = (query: any) => {
  let queryString = ""
  for (const key in query) {
    const value = encodeURIComponent(query[key])
    if (query[key]) {
      queryString += `${key}:${value}+`
    }
  }
  return queryString.slice(0, -1)
}
