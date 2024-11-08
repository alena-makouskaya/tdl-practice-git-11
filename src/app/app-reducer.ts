import { error } from "console";

export enum ResultCode {
  Success = 0,
  Error = 1,
  CaptchaError = 10,
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type InitialState = typeof initialState

const initialState = {
  status: "loading" as RequestStatus,
  error: null as string | null,
};

export const appReducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
  switch (action.type) {
    case "SET_STATUS": {
      return { ...state, status: action.payload.status };
    }

    case "SET_ERROR": {
      return { ...state, error: action.payload.error };
    }

    default:
      return state;
  }
};

// actions
export const setAppStatusAC = (status: RequestStatus) =>
  ({ type: "SET_STATUS", payload: { status } } as const);

export const setAppErrorAC = (error: string | null) =>
  ({ type: "SET_ERROR", payload: { error } } as const);

// type

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;

type ActionsType = SetAppStatusActionType | SetAppErrorActionType;
