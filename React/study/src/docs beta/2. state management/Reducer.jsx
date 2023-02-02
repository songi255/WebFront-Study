/* useState 가 복잡할 경우, 논리통합할 수 있는 기능이다.

    예를 들어, todos 앱에서, todoList 를 state 로 관리할 것이다.
        - add, delete, modify 등의 작업이있고, 각각 handler 에서 setState 로 각자의 logic 을 구현할 것이다.
    
    reducer 를 사용하면, 그렇게 하는 대신 handler 에서는 그저 dispatch({type: 'add', id: nextId++, text: text}) 처럼, dispatch 로 변경한다.
        - 전달되는 객체를 "action" 이라고 한다.
        - logic 의 처리는 reducer 에서 한번에 수행한다!

    reducer 장점 vs useState
        - action의 console.log 가능해서, debug 가 편하다.
        - reducer 는 순수함수로 분리되기 때문에, test 가 편하다.
        - 당연히, 가독성.

    reducer 도입절차
        1. useState 로직을 전부 dispatch 로 바꾼다.
        2. reducer 를 작성한다.
            - (state(여기선 tasks), action) 꼴로 받아서, switch 로 처리 후 다음 state 를 return 하면 된다.
        3. component 에 reducer 적용

        참고로 reducer 는 다른 파일에 분리하기도 한다. 그렇게 해서 관심사를 분리할 수 있다.

    * 참고 : 왜 이름이 reducer 일까? -> Array.reduce() 와 Idea 가 똑같기 떄문이다.
        - state 에 action 들을 reduce 해서 계속해서 state 를 갱신하기 때문이다.

*/

import { useReducer } from "react";
import AddTask from "./AddTask.js.js.js";
import TaskList from "./TaskList.js.js.js";

export default function TaskApp() {
  // useReducer로 state 대체. dispatch 가 들어온 것이 눈에 보인다.
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // 매개변수 순서에 주의! (감속기, 초기상태) 를 받아서 (상태, dispatch) 를 return 한다!

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

// reducer 예시. state 와 action 객체를 받고있다.
function tasksReducer(tasks, action) {
  // 관례적으로 switch 문 + break 대신 return 을 사용한다.
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
      // 오류 던지기. 좋은 방법인 것 같다.
      throw Error("Unknown action: " + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

//////////////////////// Immer 도입!!! ///////////////////////
// reducer 자체가 복잡한 state 관리를 위해 나왔기 때문에, Immer 를 사용하면 매우 편하다!!
import { useImmerReducer } from "use-immer";

// useReducer 대신 useImmerReducer 를 사용한다.
function ImmerComponent() {
  const [tasks, dispatch] = useImmerReducer(taskReducerForImmer, initialTasks);
}

// 추가로 state 받을때 draft 로 명시해주면 이해가 더 편하다. 그 외 다른점은 없다.
function taskReducerForImmer(draft, action) {
  switch (action.type) {
    case "added": {
      // ....
      return null;
    }
  }
}
