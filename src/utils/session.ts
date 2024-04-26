import { ServerSession } from "@/auth/types"
import { SessionContextValue } from "next-auth/react"

export const getSessionAuth = (session: SessionContextValue): ServerSession => {
  const data = session.status === "authenticated" && session.data
  if (!data) {
    return null
  }
  return data as ServerSession
}
