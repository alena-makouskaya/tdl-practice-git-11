import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux";
import { todolistsReducer } from "../state/todolists-reducer";
import { tasksReducer } from "../state/tasks-reducer";
import { thunk, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type AppDispatchType = ThunkDispatch<
  AppRootState,
  unknown,
  UnknownAction
>;
export const useAppDispatch = useDispatch<AppDispatchType>;

// @ts-ignore
window.store = store