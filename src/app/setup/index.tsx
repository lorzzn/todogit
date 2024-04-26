"use client"

import { trpc } from "@/trpc/client"
import { Button, Card, CardBody, CardHeader, Code, Divider } from "@chakra-ui/react"
import { RiGithubFill } from "@remixicon/react"

type SetupProps = {
  repoPrivate: boolean
  repoName: string
}

const Setup = (props: SetupProps) => {
  const mutation = trpc.repo.create.useMutation()

  const onConfirm = async () => {
    await mutation.mutateAsync({
      repoName: props.repoName,
      private: props.repoPrivate,
    })
    window.location.href = "/"
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <Card>
        <CardHeader>
          <div className="text-xl">Setup your app in one step</div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center">
              <RiGithubFill size={"5rem"} />
              <Divider className="my-5" />
            </div>
            <div>
              <span>Create repository</span>
              <Code>{props.repoName}</Code>
              <ul className="list-disc text-small my-3 break-words ml-3">
                {props.repoPrivate && (
                  <li>
                    <span>The repository will be created as a</span>
                    <strong> private </strong>
                    <span>repository.</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex mt-10">
              <Button
                colorScheme="blue"
                className="flex-1"
                size="lg"
                onClick={onConfirm}
                isLoading={mutation.isPending}
              >
                Confirm
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Setup
