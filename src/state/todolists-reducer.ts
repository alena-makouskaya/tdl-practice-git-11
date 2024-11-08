import { v1 } from "uuid";
import { todolistAPI, TodolistType } from "../api/todolists-api";
import { Dispatch } from "redux";

let initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: ActionsType
): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistId);
    }

    case "ADD-TODOLIST": {
      return [{ ...action.todolist, filter: "all" }, ...state];
    }

    case "EDIT-TODOLIST-TITLE": {
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, title: action.title } : tl
      );
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, filter: action.filter } : tl
      );
    }

    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }));
    }

    default:
      return state;
  }
};

// actions
export const removeTodolistAC = (todolistId: string) =>
  ({ type: "REMOVE-TODOLIST", todolistId } as const);

export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: "ADD-TODOLIST", todolist } as const);

export const editTodolistTitleAC = (todolistId: string, title: string) =>
  ({ type: "EDIT-TODOLIST-TITLE", todolistId, title } as const);

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValueType
) => ({ type: "CHANGE-TODOLIST-FILTER", todolistId, filter } as const);

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: "SET-TODOLISTS", todolists } as const);

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.getTodolists().then((res) => {
    const action = setTodolistsAC(res.data);
    dispatch(action);
  });
};

export const removeTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
    });
  };

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.createTodolist(title).then((res) => {
    let todolist = res.data.data.item;
    let action = addTodolistAC(todolist);
    dispatch(action);
  });
};

export const editTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      let action = editTodolistTitleAC(todolistId, title);
      dispatch(action);
    });
  };

// types
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;
export type EditTodolistTitleActionType = ReturnType<
  typeof editTodolistTitleAC
>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | EditTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValueType };
