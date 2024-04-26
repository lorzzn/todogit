"use client"

import { Button } from "@chakra-ui/react"
import { signIn, useSession } from "next-auth/react"

const App = () => {
  const session = useSession()

  return (
    <div>
      <h1>Hello World</h1>
      <div>{session.status}</div>
      <div>{session.data?.user?.name}</div>
      <Button onClick={() => signIn()}>github signin</Button>
    </div>
  )
}

export default App
