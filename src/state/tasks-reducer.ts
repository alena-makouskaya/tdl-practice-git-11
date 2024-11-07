import {
  addTodolistAC,
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { title } from "process";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootState } from "../app/store";



export type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type SetTasksActionType = {
  type: "SET-TASKS";
  todolistId: string;
  tasks: TaskType[];
};

export type UpdateTaskActionType = {
  type: "UPDATE-TASK";
  todolistId: string;
  taskId: string;
  model: UpdateDomainTaskModelType;
};

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType

  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType
  | UpdateTaskActionType;

let initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    }

    case "ADD-TASK": {
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };
    }

    case "ADD-TODOLIST": {
      let stateCopy = { ...state };

      stateCopy[action.todolist.id] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }

    case "SET-TODOLISTS": {
      let stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });

      return stateCopy;
    }

    case "SET-TASKS": {
      return {
        ...state,
        [action.todolistId]: [...action.tasks],
      };

      // const copyState = { ...state };
      // copyState[action.todolistId] = action.tasks;

      // return copyState;
    }

    default:
      return state;
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

export const AddTaskAC = (task: TaskType): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    task,
  };
};


export const SetTasksAC = (
  todolistId: string,
  tasks: TaskType[]
): SetTasksActionType => {
  return {
    type: "SET-TASKS",
    todolistId,
    tasks,
  };
};

export const UpdateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
): UpdateTaskActionType => {
  return {
    type: "UPDATE-TASK",
    todolistId,
    taskId,
    model,
  };
};

// thunks

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.getTasks(todolistId).then((res) => {
    const action = SetTasksAC(todolistId, res.data.items);
    dispatch(action);
  });
};

export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.delteTask(todolistId, taskId).then((res) => {
      const action = RemoveTaskAC(todolistId, taskId);
      dispatch(action);
    });
  };

export const addTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title).then((res) => {
      const action = AddTaskAC(res.data.data.item);
      dispatch(action);
    });
  };

export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ) =>
  (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState();

    const task = state.tasks[todolistId].find((task) => task.id === taskId);

    if (!task) {
      throw new Error("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    };

    todolistAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
      let action = UpdateTaskAC(todolistId, taskId, apiModel);
      dispatch(action);
    });
  };

// types

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};
