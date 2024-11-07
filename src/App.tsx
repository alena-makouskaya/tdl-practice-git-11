import React, { useCallback, useEffect, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist } from "./components/Todolist";

import { AddItemForm } from "./components/AddItemForm";
import {
  addTodolistAC,
  addTodolistTC,
  changeTodolistFilterAC,
  editTodolistTitleAC,
  editTodolistTitleTC,
  fetchTodolistsTC,
  FilterValueType,
  removeTodolistAC,
  removeTodolistTC,
  setTodolistsAC,
  TodolistDomainType,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  AddTaskAC,
  addTaskTC,
  RemoveTaskAC,
  removeTaskTC,
  tasksReducer,
  updateTaskTC,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "./app/store";
import { TaskStatuses, TaskType, todolistAPI } from "./api/todolists-api";

export type TasksStateType = {
  [key: string]: TaskType[];
};

const App = React.memo(() => {
  console.log("App is called");

  let dispatch = useAppDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  useEffect(() => {
    const thunk = fetchTodolistsTC();
    dispatch(thunk);
  }, []);

  const removeTask = React.useCallback((todolistId: string, taskId: string) => {
    const thunk = removeTaskTC(todolistId, taskId);
    dispatch(thunk);
  }, []);

  const addTask = React.useCallback((todolistId: string, title: string) => {
    const thunk = addTaskTC(todolistId, title);
    dispatch(thunk);
  }, []);

  const changeTaskStatus = React.useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      const thunk = updateTaskTC(todolistId, taskId,  {status});
      dispatch(thunk);
    },
    []
  );

  const editTaskTitle = React.useCallback(
    (todolistId: string, taskId: string, title: string) => {
      const thunk = updateTaskTC(todolistId, taskId,  {title});
      dispatch(thunk);
    },
    []
  );

  const changeTodolistFilter = React.useCallback(
    (todolistId: string, filter: FilterValueType) => {
      let action = changeTodolistFilterAC(todolistId, filter);
      dispatch(action);
    },
    []
  );

  const removeTodolist = React.useCallback((todolistId: string) => {
    const thunk = removeTodolistTC(todolistId);
    dispatch(thunk);
  }, []);

  const addTodolist = React.useCallback((title: string) => {
    const thunk = addTodolistTC(title);
    dispatch(thunk);
  }, []);

  const editTodolistTitle = React.useCallback(
    (todolistId: string, title: string) => {
      const thunk = editTodolistTitleTC(todolistId, title);
      dispatch(thunk);
    },
    []
  );

  return (
    <div className="App">
      <AddItemForm callBack={addTodolist} />

      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

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
});

export default App;
