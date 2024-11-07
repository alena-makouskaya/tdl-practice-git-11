// import { TasksStateType } from "../AppWithRedux";
// import { AddTaskAC, ChangeTaskStatusAC, EditTaskTitleAC, RemoveTaskAC, tasksReducer } from "./tasks-reducer";
// import { addTodolistAC } from "./todolists-reducer";

// test.skip("task shoud be removed", () => {
//   let initialState: TasksStateType = {
//     todolistId1: [
//       {
//         id: "1",
//         title: "HTML",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "CSS",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "JS",
//         isDone: false,
//       },
//     ],
//     todolistId2: [
//       {
//         id: "1",
//         title: "Milk",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "Bread",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "Juce",
//         isDone: false,
//       },
//     ],
//   };

//   let action = RemoveTaskAC("todolistId1", "1");

//   let endState = tasksReducer(initialState, action);

//   expect(endState["todolistId1"].length).toBe(2);
//   expect(endState["todolistId1"][0].title).toBe("CSS");

//   expect(endState["todolistId2"].length).toBe(3);
// });

// test.skip("new task shoud be added", () => {
//   let initialState: TasksStateType = {
//     todolistId1: [
//       {
//         id: "1",
//         title: "HTML",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "CSS",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "JS",
//         isDone: false,
//       },
//     ],
//     todolistId2: [
//       {
//         id: "1",
//         title: "Milk",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "Bread",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "Juce",
//         isDone: false,
//       },
//     ],
//   };

//   let newTaskTitle = "New Task Title"

//   let action = AddTaskAC("todolistId1", newTaskTitle);

//   let endState = tasksReducer(initialState, action);

//   expect(endState["todolistId1"].length).toBe(4);
//   expect(endState["todolistId1"][0].title).toBe("New Task Title");

// });

// test.skip("task title shoud be edited", () => {
//   let initialState: TasksStateType = {
//     todolistId1: [
//       {
//         id: "1",
//         title: "HTML",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "CSS",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "JS",
//         isDone: false,
//       },
//     ],
//     todolistId2: [
//       {
//         id: "1",
//         title: "Milk",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "Bread",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "Juce",
//         isDone: false,
//       },
//     ],
//   };

//   let newTaskTitle = "New Task Title"

//   let action = EditTaskTitleAC("todolistId1", "1", newTaskTitle);

//   let endState = tasksReducer(initialState, action);

//   expect(endState["todolistId1"].length).toBe(3);
//   expect(endState["todolistId1"][0].title).toBe("New Task Title");

// });

// test.skip("task status shoud be changed", () => {
//   let initialState: TasksStateType = {
//     todolistId1: [
//       {
//         id: "1",
//         title: "HTML",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "CSS",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "JS",
//         isDone: false,
//       },
//     ],
//     todolistId2: [
//       {
//         id: "1",
//         title: "Milk",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "Bread",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "Juce",
//         isDone: false,
//       },
//     ],
//   };

//   let action = ChangeTaskStatusAC("todolistId1", "1", false);

//   let endState = tasksReducer(initialState, action);

//   expect(endState["todolistId1"].length).toBe(3);
//   expect(endState["todolistId1"][0].isDone).toBe(false);

// });

// test.skip("new proprty with new array should be added when new todolist is added", () => {
//   let initialState: TasksStateType = {
//     todolistId1: [
//       {
//         id: "1",
//         title: "HTML",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "CSS",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "JS",
//         isDone: false,
//       },
//     ],
//     todolistId2: [
//       {
//         id: "1",
//         title: "Milk",
//         isDone: true,
//       },
//       {
//         id: "2",
//         title: "Bread",
//         isDone: true,
//       },
//       {
//         id: "3",
//         title: "Juce",
//         isDone: false,
//       },
//     ],
//   };

//   let action = addTodolistAC("Todolist title");

//   let endState = tasksReducer(initialState, action);

//   const keys = Object.keys(endState);
//   const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
//   if(!newKey){
//     throw new Error ("New key should be added")
//   }

//   expect(keys.length).toBe(3)
//   expect(endState[newKey]).toEqual([]);

// });

