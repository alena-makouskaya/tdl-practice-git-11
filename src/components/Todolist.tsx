// @flow
import * as React from "react";

import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";
import { TaskStatuses, TaskType } from "../api/todolists-api";
import { FilterValueType } from "../state/todolists-reducer";
import { fetchTaskTC } from "../state/tasks-reducer";
import { useEffect } from "react";
import { useAppDispatch } from "../app/store";

type TodolistPropsType = {
  id: string;
  title: string;
  filter: FilterValueType;
  tasks: TaskType[];

  removeTask: (todolistId: string, taskId: string) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    status: TaskStatuses
  ) => void;
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void;

  changeTodolistFilter: (todolistId: string, filter: FilterValueType) => void;
  removeTodolist: (todolistId: string) => void;
  editTodolistTitle: (todolistId: string, title: string) => void;
};

export const Todolist = React.memo((props: TodolistPropsType) => {
  console.log("Todolist is called");

  let dispatch = useAppDispatch();

  const {
    id,
    title,
    filter,
    tasks,
    removeTask,
    addTask,
    changeTodolistFilter,
    changeTaskStatus,
    removeTodolist,
    editTaskTitle,
    editTodolistTitle,
  } = props;



  useEffect(() => {
    const thunk = fetchTaskTC(id);
    dispatch(thunk);
  }, [])

  

  const addTaskHandler = React.useCallback(
    (title: string) => {
      addTask(id, title);
    },
    [addTask, id]
  );

  const changeTodolistFilterAll = React.useCallback(() => {
    changeTodolistFilter(id, "all");
  }, [changeTodolistFilter, id]);

  const changeTodolistFilterActive = React.useCallback(() => {
    changeTodolistFilter(id, "active");
  }, [changeTodolistFilter, id]);

  const changeTodolistFilterCompleted = React.useCallback(() => {
    changeTodolistFilter(id, "completed");
  }, [changeTodolistFilter, id]);

  const removeTodolistHandler = React.useCallback(() => {
    removeTodolist(id);
  }, [removeTodolist, id]);

  const editTodolistTitleHandler = React.useCallback(
    (title: string) => {
      editTodolistTitle(id, title);
    },
    [editTodolistTitle, id]
  );

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((t) => t.status === TaskStatuses.New);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div className="tdlCard" key={id}>
      <h3>
        <EditableSpan title={title} callBack={editTodolistTitleHandler} />-{" "}
        <button onClick={removeTodolistHandler}> x </button>
      </h3>

      <AddItemForm callBack={addTaskHandler} />

      <ul>
        {filteredTasks.map((t) => {
          return (
            <Task
              key={t.id}
              todolistId={id}
              task={t}
              removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              editTaskTitle={editTaskTitle}
            />
          );
        })}
      </ul>

      <div>
        <button
          className={filter === "all" ? "isActive" : ""}
          onClick={changeTodolistFilterAll}
        >
          All
        </button>
        <button
          className={filter === "active" ? "isActive" : ""}
          onClick={changeTodolistFilterActive}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "isActive" : ""}
          onClick={changeTodolistFilterCompleted}
        >
          Completed
        </button>
      </div>
    </div>
  );
});

