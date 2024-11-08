// @flow
import * as React from "react";
import { TaskStatuses, TaskType } from "../../../../api/todolists-api";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
type TaskPropsType = {
  todolistId: string;
  task: TaskType;

  removeTask: (todolistId: string, taskId: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    status: TaskStatuses
  ) => void;
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void;
};

export const Task = React.memo((props: TaskPropsType) => {
  console.log("Task is called");

  const { todolistId, task, removeTask, changeTaskStatus, editTaskTitle } =
    props;

  const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.checked
    changeTaskStatus(todolistId, task.id, value ? TaskStatuses.Completed : TaskStatuses.New);
  };

  const editTaskTitleHandler = React.useCallback((title: string) => {
    editTaskTitle(todolistId, task.id, title);
  }, [editTaskTitle, todolistId, task.id]);

  const removeTaskHandler = () => {
    removeTask(todolistId, task.id);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.status === TaskStatuses.Completed ? true : false}
        onChange={changeTaskStatusHandler}
      />
      <EditableSpan title={task.title} callBack={editTaskTitleHandler} />
      <button onClick={removeTaskHandler}> x </button>
    </li>
  );
});
