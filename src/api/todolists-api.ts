import axios from "axios";

export const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
  },
};

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`);
  },

  createTodolist(title: string) {
    return instance.post<ResponceType<{ item: TodolistType }>>(`todo-lists`, {
      title,
    });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<ResponceType>(`todo-lists/${todolistId}`);
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponceType>(`todo-lists/${todolistId}`, { title });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTodolistsType>(`todo-lists/${todolistId}/tasks`);
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponceType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },

  delteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponceType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponceType>(
      `todo-lists/${todolistId}/tasks/${taskId}`, model
    );
  },
};

// types

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type ResponceType<D = {}> = {
  data: D;
  resultCode: number;
  messages: Array<string>;
};

export type GetTodolistsType = {
  items: Array<TaskType>;
  totalCount: number;
  error: string;
};

export type TaskType = {
  todolistId: string;
  id: string;
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  order: number;
  addedDate: string;
};

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
  }
  
  export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hight = 2,
    Urgently = 3,
    Later = 4,
  }
  

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
