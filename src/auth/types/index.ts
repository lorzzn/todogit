import { Session } from "next-auth"

export type ServerSession = (Session & { token: string; login: string }) | null
