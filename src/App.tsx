import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TasksPropsType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { title } from "process";
import { AddItemForm } from "./components/AddItemForm";

export type FilterValueType = "all" | "active" | "completed";

export type TodolistProps = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [key: string]: TasksPropsType[];
};

function App() {
  console.log("App is called");

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<TodolistProps[]>([
    {
      id: todolistId1,
      title: "What to learn?",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "What to buy?",
      filter: "all",
    },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML",
        isDone: true,
      },
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: false,
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "Milk",
        isDone: true,
      },
      {
        id: v1(),
        title: "Bread",
        isDone: true,
      },
      {
        id: v1(),
        title: "Juce",
        isDone: false,
      },
    ],
  });

  let [filter, setFilter] = useState<FilterValueType>("all");

  const removeTask = (todolistId: string, taskId: string) => {
    let tasksInTodolist = tasks[todolistId];
    let newTasks = tasksInTodolist.filter((t) => t.id !== taskId);

    tasks[todolistId] = newTasks;

    setTasks({ ...tasks });
  };

  const addTask = (todolistId: string, title: string) => {
    let tasksInTodolist = tasks[todolistId];

    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };

    let newTasks = [newTask, ...tasksInTodolist];

    tasks[todolistId] = newTasks;

    setTasks({ ...tasks });
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    let tasksInTodolist = tasks[todolistId];

    let task = tasksInTodolist.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks({ ...tasks });
  };

  const editTaskTitle = (todolistId: string, taskId: string, title: string) => {
    let tasksInTodolist = tasks[todolistId];

    let task = tasksInTodolist.find((t) => t.id === taskId);

    if (task) {
      task.title = title;
    }

    setTasks({ ...tasks });
  };

  const changeTodolistFilter = (
    todolistId: string,
    filter: FilterValueType
  ) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);

    if (todolist) {
      todolist.filter = filter;
    }
    setTodolists([...todolists]);
  };

  const removeTodolist = (todolistId: string) => {
    let newTodolists = todolists.filter((tl) => tl.id !== todolistId);

    setTodolists(newTodolists);
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const addTodolist = (title: string) => {
    let newTodolist: TodolistProps = {
      id: v1(),
      title: title,
      filter: "all",
    };

    setTodolists([newTodolist, ...todolists]);

    setTasks({
      [newTodolist.id]: [],
      ...tasks,
    });
  };

  const editTodolistTitle = (todolistId: string, title: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);

    if (todolist) {
      todolist.title = title;
    }

    setTodolists([...todolists]);
  };

  return (
    <div className="App">
      <AddItemForm callBack={(title: string) => addTodolist(title)} />

      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((t) => t.isDone === false);
        }

        if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((t) => t.isDone === true);
        }

        return (
          <Todolist
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
}

export default App;
