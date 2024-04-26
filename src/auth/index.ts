import { env } from "@/utils/env"
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import { NextAuthOptions, getServerSession } from "next-auth"
import GitHubProvider, { GithubEmail } from "next-auth/providers/github"
import { Provider } from "next-auth/providers/index"
import { ServerSession } from "./types"

export const githubScope =
  env.GITHUB_REPOSITORY_PRIVATE === "true" ? "read:user user:email repo" : "read:user user:email public_repo"

const providers: Provider[] = [
  GitHubProvider({
    clientId: env.GITHUB_OAUTH_CLIENT_ID!,
    clientSecret: env.GITHUB_OAUTH_SECRET!,
    authorization: { params: { scope: githubScope } },
    httpOptions: {
      timeout: 100000,
    },
    userinfo: {
      url: "https://api.github.com/user",
      async request({ client, tokens }) {
        const profile = await client.userinfo(tokens.access_token!)

        if (!profile.email) {
          // If the user does not have a public email, get another via the GitHub API
          // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
          const res = await fetch("https://api.github.com/user/emails", {
            headers: { Authorization: `token ${tokens.access_token}` },
          })

          if (res.ok) {
            const emails: GithubEmail[] = await res.json()
            profile.email = (emails.find((e) => e.primary) ?? emails[0]).email
          }
        }

        return profile
      },
    },
  }),
]

const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      if (account && account.access_token) {
        // set access_token to the token payload
        token.accessToken = account.access_token
      }

      if (profile && (profile as any).login) {
        // set username to the token payload
        token.login = (profile as any).login
      }

      return token
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl
    },
    session: async ({ session, token, user }) => {
      // If we want to make the accessToken available in components, then we have to explicitly forward it here.
      return { ...session, token: token.accessToken, login: token.login }
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: env.NEXTAUTH_SECRET,
}

function auth( // <-- use this function to access the jwt from React components
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
): Promise<ServerSession> {
  return getServerSession(...args, authOptions)
}

export { auth, authOptions }
