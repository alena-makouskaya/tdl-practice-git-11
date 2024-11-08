import { v1 } from "uuid";
import { todolistAPI, TodolistType } from "../api/todolists-api";
import { Dispatch } from "redux";
import {
  RequestStatus,
  ResultCode,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "../app/app-reducer";
import { handleServerNetworkError } from "../common/utils/handleServerNetworkError";
import { handleServerAppError } from "../common/utils/handleServerAppError";

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
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];
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
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    }

    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? { ...tl, entityStatus: action.payload.entityStatus }
          : tl
      );
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

export const changeTodolistEntityStatusAC = (payload: {
  todolistId: string;
  entityStatus: RequestStatus;
}) => ({ type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const);

// thunks
export const fetchTodolistsTC =
  () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .getTodolists()
      .then((res) => {
        const action = setTodolistsAC(res.data);
        dispatch(setAppStatusAC("succeeded"));
        dispatch(action);
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const removeTodolistTC =
  (todolistId: string) =>
  (
    dispatch: Dispatch<
      ActionsType | SetAppStatusActionType | SetAppErrorActionType
    >
  ) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(
      changeTodolistEntityStatusAC({ todolistId, entityStatus: "loading" })
    );
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(removeTodolistAC(todolistId));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        dispatch(
          changeTodolistEntityStatusAC({ todolistId, entityStatus: "failed" })
        );
        handleServerNetworkError(error, dispatch);
      });
  };

export const addTodolistTC =
  (title: string) =>
  (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(addTodolistAC(res.data.data.item));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const editTodolistTitleTC =
  (todolistId: string, title: string) =>
  (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          let action = editTodolistTitleAC(todolistId, title);
          dispatch(setAppStatusAC("succeeded"));
          dispatch(action);
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
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
export type ChangeTodolistEntityStatusActionType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | EditTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusActionType;

export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
  entityStatus: RequestStatus;
};
