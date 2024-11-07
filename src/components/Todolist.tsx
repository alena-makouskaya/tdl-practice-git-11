// @flow
import * as React from "react";
import { KeyboardEvent } from "react";
import { FilterValueType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";
export type TasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  id: string;
  title: string;
  filter: FilterValueType;
  tasks: TasksPropsType[];

  removeTask: (todolistId: string, taskId: string) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void;

  changeTodolistFilter: (todolistId: string, filter: FilterValueType) => void;
  removeTodolist: (todolistId: string) => void;
  editTodolistTitle: (todolistId: string, title: string) => void;
};

export const Todolist = React.memo((props: TodolistPropsType) => {
  console.log("Todolist is called");
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


  const addTaskHandler = React.useCallback((title: string) => {
    addTask(id, title);
  }, [addTask, id]);

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

  const editTodolistTitleHandler = React.useCallback((title: string) => {
    editTodolistTitle(id, title);
  }, [editTodolistTitle, id]);

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((t) => t.isDone === false);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.isDone === true);
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
