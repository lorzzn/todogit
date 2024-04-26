"use client"

import Logo from "@/components/Logo"
import { Button, Card, CardBody, CardHeader } from "@chakra-ui/react"
import { RiGithubFill } from "@remixicon/react"
import { BuiltInProviderType } from "next-auth/providers/index"
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react"
import { Case, Switch, When } from "react-if"

type SigninProps = {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null
}

const Signin = ({ providers }: SigninProps) => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold mr-2">Sign in to</h1>
            <Logo />
          </div>
        </CardHeader>
        <CardBody>
          {providers &&
            Object.values(providers).map((provider) => (
              <Button key={provider.id} onClick={() => signIn(provider.id)}>
                <When condition={["github"].includes(provider.id)}>
                  <div className="mr-2">
                    <Switch>
                      <Case condition={provider.id === "github"}>
                        <RiGithubFill />
                      </Case>
                    </Switch>
                  </div>
                </When>
                <div>Continue with {provider.name}</div>
              </Button>
            ))}
        </CardBody>
      </Card>
    </div>
  )
}

export default Signin
