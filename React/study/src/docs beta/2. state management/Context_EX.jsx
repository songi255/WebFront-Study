import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

// 이렇게 Context 만 reducer 로 추가하는 HOC 를 만들어 사용할 수 있다.
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// context 사용을 쉽게 하기 위한 function 을 정의했다. 실 사용은 어떻게 될까?
// context 가 필요하다면, 그저 import {useTask} 한 후, const task = useTask(); 하면 끝이다 ㄷㄷ
// 앞에 use 가 붙었다. 맞다. custom hooks 다.
export function useTasks() {
  return useContext(TasksContext);
}

// 마찬가지로 const dispatch = useTaskDispatch(); 로 겁나쉽게 사용할 수 있다.
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
