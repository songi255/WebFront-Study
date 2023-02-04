/* React 외부 Store 를 subscribe 할 수 있다.
    매개변수는 일단 적지만, 아래 용례를 보고 참고하자.
        - subscribe
            - callback 을 인수로 받아, subscribe 시키는 함수. clean up 을 반환해야 한다.
            - subscriber 가 변경되면 re-rendering 되므로, 외부에 선언 등으로 방지해야 한다.
        - getSnapshot
            - 실제  data 를 반환. 구독에 의해서 값이 변경되면 re-rendering 한다.
            - return 값은 변경불가능해야한다. 
                - return {~~~} 같이, 매번 새 객체를 만들어버리면 무한 재렌더링이 일어난다.
                - 그냥 return store.todos 같이 불변객체를 리턴하자.
                - 결과가 변할 수 있는 (객체나 배열같이) 경우, 변했음을 알 수 있도록 external store 에서 제공할 것이다. 그때는 새 snapshot 을 반환해야 한다.
        - dependencies

    일반적으로, 직접호출하기보다 Custom Hook 내에서 호출한다. (useOnlineStatus 처럼)

    
*/

// 용례1. 외부 store 구독 (react 로 구성된 store 면 state 와 reducer 사용을 권장.)
import { useSyncExternalStore } from "react";
import { todosStore } from "./todoStore.js";

export function TodosApp() {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot
  );

  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

// 용례2. 브라우저 API 구독
export function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

// 용례3. 서버 렌더링 지원
// Server 환경에서는 external store 에 연결할 때 몇가지 문제가 생긴다.
//  - Browser API 가 없다.
//  - 외부 Data 사용 시, client 쪽과 data 형식이 같아야한다.
// 이를 해결하고 싶다면, getServerSnapshot 이라는 3번째 인수를 추가하면 된다
import { useSyncExternalStore } from "react";

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}

// getSnapshot 과 유사하지만, 다음 2상황에서만 실행된다.
//   - server 에서 HTML 생성 시 실행
//   - hydrate 중. 즉, react 가 server HTML 을 가져와서 대화형으로 만들 때 실행
function getServerSnapshot() {
  return true; // Always show "Online" for server-generated HTML
}

function subscribe(callback) {
  // ...
}

// 서버에서 받은 data 가 client 에 제대로 나오는 지 확인하자!
// 일반적인 전송방법은 <script> 안에 window.MY_STORE_DATA 에 저장해놓고 client 에서 읽는것 같은거다.
// 사용힐 external store 에 지침이 있을테니 따르도록 하자.
