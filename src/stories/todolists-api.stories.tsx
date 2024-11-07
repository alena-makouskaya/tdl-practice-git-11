import { ChangeEvent, useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("");

  const createTodolist = () => {
    todolistAPI.createTodolist(title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        placeholder="Enter todolist title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
      />

      <button onClick={createTodolist}>Add todolist</button>

      {JSON.stringify(state)}
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        placeholder="Enter todolistId"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <button onClick={deleteTodolist}>Delete todolist</button>

      {JSON.stringify(state)}
    </div>
  );
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const updateTodolist = () => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        placeholder="Enter todolistId"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <input
        type="text"
        value={title}
        placeholder="Enter todolist title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
      />

      <button onClick={updateTodolist}>Update todolist</button>

      {JSON.stringify(state)}
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const getTasks = () => {
    todolistAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        placeholder="Enter todolistId"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <button onClick={getTasks}>Get tasks</button>

      {JSON.stringify(state)}
    </div>
  );
};

// 4b5cb896-18cf-4b4a-9b6d-a8ae9dbc22e5

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const createTask = () => {
    todolistAPI.createTask(todolistId, title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        placeholder="Enter todolistId"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <input
        type="text"
        value={title}
        placeholder="Enter todolist title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
      />

      <button onClick={createTask}>Create task</button>

      {JSON.stringify(state)}
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const delteTask = () => {
    todolistAPI.delteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        placeholder="Enter todolistId"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodolistId(e.currentTarget.value)
        }
      />

      <input
        type="text"
        value={taskId}
        placeholder="Enter taskId"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskId(e.currentTarget.value)
        }
      />

      <button onClick={delteTask}>Delete task</button>

      {JSON.stringify(state)}
    </div>
  );
};

// 4b5cb896-18cf-4b4a-9b6d-a8ae9dbc22e5

//  e28923e7-e631-4685-b861-ccf0f64f5979

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);



  
    const updateTask = () => {
      todolistAPI.updateTask(todolistId, taskId, {
        title: title,
        description: description,
        status: status,
        priority: priority,
        startDate: "",
        deadline: ""

      }).then((res) => {
        setState(res.data);
      });
    };
  
    return (
      <div>
        <input
          type="text"
          value={todolistId}
          placeholder="Enter todolistId"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodolistId(e.currentTarget.value)
          }
        />
  
        <input
          type="text"
          value={taskId}
          placeholder="Enter taskId"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTaskId(e.currentTarget.value)
          }
        />
  
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
        />
  
        <input
          type="text"
          value={description}
          placeholder="Enter description"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.currentTarget.value)
          }
        />
  
        <input
          type="number"
          value={status}
          placeholder="Enter status"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStatus(+e.currentTarget.value)
          }
        />
  
        <input
          type="number"
          value={priority}
          placeholder="Enter priority"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPriority(+e.currentTarget.value)
          }
        />
  
        <button onClick={updateTask}>Update task</button>
  
        {JSON.stringify(state)}
      </div>
    );
  };

// 4b5cb896-18cf-4b4a-9b6d-a8ae9dbc22e5

 // 77dda39f-577e-40fa-8958-35b9be3255c8