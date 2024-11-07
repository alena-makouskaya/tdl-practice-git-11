// import { v1 } from "uuid";
// import { FilterValueType, TodolistProps } from "../AppWithRedux";
// import { addTodolistAC, changeTodolistFilterAC, editTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer";

// test.skip("todolist should be removed", () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();

//   let initialState: TodolistProps[] = [
//     {
//       id: todolistId1,
//       title: "What to learn?",
//       filter: "all",
//     },
//     {
//       id: todolistId2,
//       title: "What to buy?",
//       filter: "all",
//     },
//   ];

//   let action = removeTodolistAC(todolistId1);

//   let endState = todolistsReducer(initialState, action);

//   expect(endState.length).toBe(1);
//   expect(endState[0].title).toBe("What to buy?");
// });

// test.skip("todolist should be added", () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();

//   let initialState: TodolistProps[] = [
//     {
//       id: todolistId1,
//       title: "What to learn?",
//       filter: "all",
//     },
//     {
//       id: todolistId2,
//       title: "What to buy?",
//       filter: "all",
//     },
//   ];

//   let newTitle = "New Todolis Title";

//   let action = addTodolistAC("New Todolis Title");

//   let endState = todolistsReducer(initialState, action);

//   expect(endState.length).toBe(3);
//   expect(endState[0].title).toBe("New Todolis Title");
// });

// test.skip("todolist title should be edited", () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();

//   let initialState: TodolistProps[] = [
//     {
//       id: todolistId1,
//       title: "What to learn?",
//       filter: "all",
//     },
//     {
//       id: todolistId2,
//       title: "What to buy?",
//       filter: "all",
//     },
//   ];

//   let newTitle = "New Todolis Title";

//   let action = editTodolistTitleAC(todolistId1, newTitle);

//   let endState = todolistsReducer(initialState, action);

//   expect(endState.length).toBe(2);
//   expect(endState[0].title).toBe("New Todolis Title");
// });

// test.skip("todolist filter should be changed", () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();

//   let initialState: TodolistProps[] = [
//     {
//       id: todolistId1,
//       title: "What to learn?",
//       filter: "all",
//     },
//     {
//       id: todolistId2,
//       title: "What to buy?",
//       filter: "all",
//     },
//   ];

//   let filter: FilterValueType = "active";

//   let action = changeTodolistFilterAC(todolistId1, filter);

//   let endState = todolistsReducer(initialState, action);

//   expect(endState.length).toBe(2);
//   expect(endState[0].filter).toBe("active");
// });
