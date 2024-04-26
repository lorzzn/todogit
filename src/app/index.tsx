"use client"

import TaskItem from "@/components/TaskItem"
import { Task } from "@/models/task"
import { trpc } from "@/trpc/client"
import { Button, Card, CardBody, Input, List, Progress } from "@chakra-ui/react"
import { useState } from "react"
import { When } from "react-if"

const App = () => {
  const [inputValue, setInputValue] = useState("")

  const list = trpc.task.list.useInfiniteQuery(
    {
      limit: 30,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    },
  )
  const createMutation = trpc.task.create.useMutation()
  const updateMutation = trpc.task.update.useMutation()
  const deleteMutation = trpc.task.delete.useMutation()

  // status
  const items = list.data?.pages.flatMap((page) => page.items) || []
  const isEmpty = !list.isFetching && list.isFetched && items.length === 0
  const isLoading = list.isFetching

  const onInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const content = e.currentTarget.value
      setInputValue("")
      await createMutation.mutateAsync({
        content,
      })
      list.refetch()
    }
  }

  const onUpdate = async (task: Task) => {
    await updateMutation.mutateAsync({
      content: task.data.content,
      is_archived: task.data.is_archived,
      is_completed: task.data.is_completed,
      number: task.data.number,
    })
    list.refetch()
  }

  const onDelete = async (task: Task) => {
    await deleteMutation.mutateAsync({
      issueNodeId: task.data.nodeId,
    })
    list.refetch()
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-center text-2xl font-semibold py-6">Todogit</div>

      <Card className="flex-1 relative">
        <When condition={isLoading}>
          <Progress size="xs" isIndeterminate className="!absolute top-0 left-0 right-0" />
        </When>
        <CardBody>
          <Input
            value={inputValue}
            placeholder="Press enter to create task..."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onInputKeyDown}
          />
          <List>
            {items.map((item) => (
              <TaskItem key={item.id} task={Task.fromIssueObject(item)} onChange={onUpdate} onDelete={onDelete} />
            ))}
          </List>

          <When condition={list.hasNextPage}>
            <div className="flex items-center justify-center pt-6">
              <Button size={"sm"} variant={"link"} isLoading={isLoading} onClick={() => list.fetchNextPage()}>
                Load more
              </Button>
            </div>
          </When>
        </CardBody>
      </Card>
    </div>
  )
}

export default App
