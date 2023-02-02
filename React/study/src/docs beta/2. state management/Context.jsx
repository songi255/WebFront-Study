/*  Context, 용례가 어떻게 될까?
    - theme 설정
    - login 한 계정 별 content 표시
    - routing
        - 대부분의 routing solution 들이 내부적으로 context 사용함. (link 활성화여부 인식..)
    - state 관리( + reducer 와 함께)
        - 멀리 떨어진 Component 들에서 일괄적으로 관리가능

    사용 전 고려사항
        - 12개의 props 를 전달하는건 복잡한 component 에서는 의외로 흔한 일이다.
        - 계속 넘겨주기보다, <Layout><Posts posts={posts} /></Layout> 같이 children 을 잘 사용한다면 생각보다 필요없을수도 있다.

*/

// 도입 예시

// 1. Context 생성
import { createContext } from "react"; // createContext() import
export const LevelContext = createContext(1); // 기본값을 줄 수 있다.
// 대부분 별도 파일 (levelContext.js) 에 생성한다. (그외 모든 component 도 다 분할가능하다.)

// 2. Context 사용
export function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
  // 이 예제는, Section 이 Provider 이고 중첩되기 때문에, level 을 넘겨주는 대신 Section 에서도 useContext() 로 값을 받을 수 있다.
  // 그런 다음, Provide 할때 Context 로 읽은값 + 1 을 provide 하면 된다.
}

// props 로 level 을 넘겨받아, Context 영역을 생성하는 모습
export function Section({ level, children }) {
  return (
    <section className="section">
      {/* props 로 지정한 level 을 context 로 뿌리고 있다. */}
      <LevelContext.Provider value={level}>{children}</LevelContext.Provider>
    </section>
  );
}

import { useContext } from "react"; // useContext() import
// level 을 props 로 넘겨받지 않는다.
export function Heading({ children }) {
  // 대신 import 한 Context 를 useContext() 로 등록한다.
  const level = useContext(LevelContext);

  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error("Unknown level: " + level);
  }
}

///////////////////////// Context + Reducer 사용하기 ///////////////////////////////////////
// 1. context 만들기
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
// state용, dispatch 용을 각각 만드네.
// tasksContext.js 같은 파일에 두개를 걍 같이 넣고 export 한다.

// 2. state, dispatch 를 context 에 넣기
export default function TaskApp() {
  // 최상위 App 에서 일단 reducer 를 정의한다.
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  // 그리고 recucer 에서 얻은 state와 dispatch 를 각각의 Context에 Provide 로 넘긴다. (여기서 연동되는 것)
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// reducer
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

// AddTask.js
export function AddTask() {
  const [text, setText] = useState("");
  // 변경 (dispatch) 해야하는 곳에서는 dispatch 를 담은 context 참조.
  const dispatch = useContext(TasksDispatchContext);
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          dispatch({
            type: "added",
            id: nextId++,
            text: text,
          });
        }}
      >
        Add
      </button>
    </>
  );
}

let nextId = 3;

// TaskList.js
export function TaskList() {
  // state 가 필요한 곳에서는 state 용 context 를 참조
  const tasks = useContext(TasksContext);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  // 여기서도 변경이 일어나므로, dispatch context 에서 dispatch 를 얻은 모습이다.
  const dispatch = useContext(TasksDispatchContext);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}
      <button
        onClick={() => {
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}

// 근데 여기서 뭔가 감이 온다. reduce + context 관련 로직을 전부 한 파일로 묶으면 어떻게 될까? Context_EX 를 참고하라!
