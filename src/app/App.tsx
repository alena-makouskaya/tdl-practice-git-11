import React, { useCallback, useEffect, useReducer, useState } from "react";

import "./App.css";

import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "./store";
import { TodolistList } from "../features/TodolistList/TodolistList";
import { LinearProgress } from "../components/LinearProgress/LinearProgress";
import { RequestStatus } from "./app-reducer";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";

const App = React.memo(() => {
  console.log("App is called");

  const status = useSelector<AppRootState, RequestStatus>(
    (state) => state.app.status
  );

  return (
    <div className="App">
      {status === "loading" && <LinearProgress />}
      <ErrorSnackbar /> 

      <TodolistList />
    </div>
  );
});

export default App;
