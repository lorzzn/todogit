import { getProviders } from "next-auth/react"
import Signin from "."

const SigninPage = async () => {
  const providers = await getProviders()

  return <Signin providers={providers} />
}

export default SigninPage
