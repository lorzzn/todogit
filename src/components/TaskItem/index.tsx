import { Task } from "@/models/task"
import { twclx } from "@/utils/twclx"
import { Checkbox, Divider } from "@chakra-ui/react"
import { RiCloseFill } from "@remixicon/react"

type TaskItemProp = {
  task: Task
  onChange: (task: Task) => void
  onDelete: (task: Task) => void
}

const TaskItem = ({ task, onChange, onDelete }: TaskItemProp) => {
  const onCheckChange = () => {
    task.update({ is_completed: !task.data.is_completed })
    onChange(task)
  }

  return (
    <>
      <div className="flex-1 flex items-center py-3 ">
        <Checkbox
          checked={task.data.is_completed}
          defaultChecked={task.data.is_completed}
          className={twclx(["flex-1 break-all", { "italic line-through": task.data.is_completed }])}
          onChange={onCheckChange}
        >
          {task.data.content}
        </Checkbox>
        <RiCloseFill className="cursor-pointer hover:opacity-80 ml-6" size={"1.4rem"} onClick={() => onDelete(task)} />
      </div>
      <Divider />
    </>
  )
}

export default TaskItem
