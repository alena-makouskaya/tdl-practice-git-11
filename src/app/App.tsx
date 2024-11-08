import React, { useCallback, useEffect, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist } from "../features/TodolistList/Todolist/Todolist";

import { AddItemForm } from "../components/AddItemForm/AddItemForm";
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
} from "../state/todolists-reducer";
import {
  AddTaskAC,
  addTaskTC,
  RemoveTaskAC,
  removeTaskTC,
  tasksReducer,
  TasksStateType,
  updateTaskTC,
} from "../state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "./store";
import { TaskStatuses, TaskType, todolistAPI } from "../api/todolists-api";
import { TodolistList } from "../features/TodolistList/TodolistList";



const App = React.memo(() => {
  console.log("App is called");

  return (
    <div className="App">
      <TodolistList />

    </div>
  );
});

export default App;
