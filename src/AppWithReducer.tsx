import React, { useCallback, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TasksPropsType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { title } from "process";
import { AddItemForm } from "./components/AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  editTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  EditTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";

export type FilterValueType = "all" | "active" | "completed";

export type TodolistProps = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [key: string]: TasksPropsType[];
};

function AppWithReducer() {
  console.log("App is called");

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    {
      id: todolistId1,
      title: "What to learn?",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "What to buy?",
      filter: "all",
    },
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML",
        isDone: true,
      },
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: false,
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "Milk",
        isDone: true,
      },
      {
        id: v1(),
        title: "Bread",
        isDone: true,
      },
      {
        id: v1(),
        title: "Juce",
        isDone: false,
      },
    ],
  });

  let [filter, setFilter] = useState<FilterValueType>("all");

  const removeTask = (todolistId: string, taskId: string) => {
    let action = RemoveTaskAC(todolistId, taskId);
    dispatchToTasks(action);
  };

  const addTask = (todolistId: string, title: string) => {
    let action = AddTaskAC(todolistId, title);
    dispatchToTasks(action);
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    let action = ChangeTaskStatusAC(todolistId, taskId, isDone);
    dispatchToTasks(action);
  };

  const editTaskTitle = (todolistId: string, taskId: string, title: string) => {
    let action = EditTaskTitleAC(todolistId, taskId, title);
    dispatchToTasks(action);
  };

  const changeTodolistFilter = (
    todolistId: string,
    filter: FilterValueType
  ) => {
    let action = changeTodolistFilterAC(todolistId, filter);
    dispatchToTodolists(action);
  };

  const removeTodolist = (todolistId: string) => {
    let action = removeTodolistAC(todolistId)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  };

  const addTodolist = (title: string) => {
    let action = addTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action)
  };

  const editTodolistTitle = (todolistId: string, title: string) => {
    let action = editTodolistTitleAC(todolistId, title);
    dispatchToTodolists(action);
  };

  return (
    <div className="App">
      <AddItemForm callBack={(title: string) => addTodolist(title)} />

      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((t) => t.isDone === false);
        }

        if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={filteredTasks}
            removeTask={removeTask}
            addTask={addTask}
            editTaskTitle={editTaskTitle}
            changeTaskStatus={changeTaskStatus}
            changeTodolistFilter={changeTodolistFilter}
            removeTodolist={removeTodolist}
            editTodolistTitle={editTodolistTitle}
          />
        );
      })}
    </div>
  );
}

export default AppWithReducer;
