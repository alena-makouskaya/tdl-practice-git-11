import { addTodolistAC, AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import { title } from "process";

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  isDone: boolean;
};

export type EditTaskTitleActionType = {
  type: "EDIT-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | EditTaskTitleActionType
  | ChangeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  ;

  let initialState: TasksStateType = {

  }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      let tasksInTodolist = state[action.todolistId];

      let newtasks = tasksInTodolist.filter((t) => t.id !== action.taskId);

      state[action.todolistId] = newtasks;

      return { ...state };
    }

    case "ADD-TASK": {
      let tasksInTodolist = state[action.todolistId];

      let newTasks = [
        {
          id: v1(),
          title: action.title,
          isDone: false,
        },
        ...tasksInTodolist,
      ];

      state[action.todolistId] = newTasks;

      return { ...state };
    }

    case "EDIT-TASK-TITLE": {
      let tasksInTodolist = state[action.todolistId];

      let task = tasksInTodolist.find((t) => t.id === action.taskId);

      if (task) {
        task.title = action.title;
      }

      return { ...state };
    }

    case "CHANGE-TASK-STATUS": {
      let tasksInTodolist = state[action.todolistId];

      let task = tasksInTodolist.find((t) => t.id === action.taskId);

      if (task) {
        task.isDone = action.isDone;
      }

      return { ...state };
    }

    case "ADD-TODOLIST": {
      let stateCopy = { ...state };

      stateCopy[action.todolistId] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST":{
      const stateCopy = {...state}
      delete stateCopy[action.todolistId]
      return stateCopy

    }

    default:
      return state
  }
};



export const RemoveTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    todolistId,
    taskId,
  };
};

export const AddTaskAC = (
  todolistId: string,
  title: string
): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    todolistId,
    title,
  };
};

export const EditTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
): EditTaskTitleActionType => {
  return {
    type: "EDIT-TASK-TITLE",
    todolistId,
    taskId,
    title,
  };
};

export const ChangeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    todolistId,
    taskId,
    isDone,
  };
};
