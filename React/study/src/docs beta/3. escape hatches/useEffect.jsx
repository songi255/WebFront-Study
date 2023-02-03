/* react rendering 이 끝난 후 실행된다.
    Effect 는 부수효과가 발생하며, 일반적으로 React 외부의 시스템과 연동하는데 사용된다.
        - 브라우저 API
        - 타사 widget
        - networking 등
    다시 말하지만, "외부 시스템과 연동" 에만 써야한다.
        - rendering 될 data 를 filtering 하거나, Event 처리 등에 사용하면 안된다!
        - useEffect 내에 setState 가 들어가면 대부분 틀렸다.
            - 이런경우에는 맞음. connect.on('message', (res) => {setMessage(msgs => [...msgs, res])});
                - 메시지 받을 때 마다 state 를 update 해야하지만, Effect 가 재실행될 필요는 없다. 
                - 종속성에서 state 를 빼기 위해서 setState 에 callback 을 준 모습이다.
                - 물론, 도입 될 가능성이 있는 useEffectEvent() 를 사용해도 된다.
    
    작성 절차
        1. Effect 선언
        2. 종속성 지정 - when?
            - 먼저 Effect 를 작성하면 Linter 가 종속성을 제안할 것이다.
            - 모두 추가한 후, 종속성이 마음에 들지 않으면 주변코드들을 수정하여 뺴나가도록 하자.
        3. cleanup

    Effect 에서 data fetching 시 단점
        - 보여줘야 할 데이터가 나중에 생성된다.
        - 네트워크 폭포가 생성된다
            - 상위 구성요소 렌더링 -> 종속 data fetch -> 하위 구성요소 렌더링 -> 종속 data fetch......
            - 보다시피 병렬적이지 않다.
        - Effect 에서 fetching 한다는 것은 일반적으로 caching 이나 preload 를 사용하지 않는다는 뜻이다. (느려지고, mount 마다 새로 받아야 함)
        - 코드 반복
    
    위 단점들은 React 에만 국한되는 것이 아니다. 그렇다면 어떻게 해결할까?
        - Framework 를 사용하는 경우, 내장 data feching 매커니즘을 사용하자. (react18 에도 있다고 한다?)
        - 그렇지 않다면 client 측 cache 를 사용하거나 구축하자.
            - React Query, useSWR, react Router 6.4+ 등등...
            - 내부적으로 Effect 가 쓰일 수는 있지만, 위 단점 보완을 위한 logic 들이 추가되어있음

    
*/

// 종속성 예시
// 종속성 미지정
useEffect(() => {
  // 모든 렌더링 마다 실행
});

// 종속성 지정
useEffect(() => {
  const connection = createConnection();
  connection.connect();

  // cleanup 함수 return (unmount 시 실행됨)
  return () => {
    // api 호출, 구독, 애니메이션 trigger 등.. strict mode 에서 전부 2번실행으로 버그를 잡아주므로, cleanup 함수를 통해 원복해야 한다.
    connection.disConnect();
    // 만약 data fetching 의 경우, cleanup 에서는 fetching 을 중단하거나, fetching 된 data 를 무시하도록 작성해야 한다.
    //  - 이를 위해 ignore 변수 등으로 코드를 작성해야 되는데 이게 싫다면 중복요청 제거하고 caching 해버리는 library 를 사용하자.
    //    - 쾌적한 개발 뿐만 아니라, 페이지 이동 등에도 캐싱으로 인해 속도까지 빨라진다!
    //    - visit log 남기기 등은 걍 그대로 놔두자. 큰 의미없다.
  };
}, []); // 딱 처음 마운트될 때만 실행됨

// 종속성 list 제공
useEffect(() => {
  // 모든 원소가 Object.is 로 변함이 없다면 실행되지 않음.
  // 만약 useEffect 내에서 if 등에 사용해야하는 변수의 경우, linter 에 의해서 종속성에 추가해야 함.
  //   - 단, ref 같이 변하지 않음이 보장되는 경우들은 추가하지 않아도 됨.
  //   - const uri = '~~~'; 처럼 절대 변하지 않는 경우들.... 하지만 uri = true ? '~~~' : '~~~' 같은건 변하므로, 연관있다면 종속성이 추가되어야 한다.
}, [a, b]);

//////////////////////////// Effect 를 사용해야 하는 것이 아닌 경우 /////////////////////////////////
// App 초기화의 경우
if (typeof window !== "undefined") {
  // 이런 코드들은 App Component 외부 위치 같은 최상위 위치에서 수행되어야 한다.
  checkAuthToken();
  loadDataFromLocalStorage();
}
// 그러나, 이런 전역코드를 넣으면 예기치 못한 속도저하 등이 발생할 수 있다.
// 대안은? App component 같은, 최상위 component 내에서 Effect 를 실행하자.
// 단, App.js 에 전역변수로 didInit 변수 등을 두어 Effect 에서는 이를 활용해서 전역적으로 관리하도록 하자.

// 제품 구매의 경우
// 만약 Effect 에서 buy POST 요청을 보내도록 했다면 어떻게 될까? 뒤로가기를 누르면 2번 구매가 된다.
// 애초에 구매는 rendering 에 의한 것이 아니고 Event 이므로, Effect 를 사용하면 안되는 상황인 것이다.

// 고비용계산(목록 filtering 등) 의 캐싱 -> state + Effect 가 아닌,  useMemo 를 써야한다!
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("");

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter]
  );
}

// 외부저장소 구독의 경우
// 예를들어, browser 로그인 상태 등... 외부 API 상태와 Sync 하는 경우, Effect 대신 useSyncExternalStore 이 존재한다. 이걸 쓰자.
// 오류도 덜 발생하고, useSyncExternalStore 를 이용한 custom Hook (const isOnline = useOnlineStatus() 같이) 을 정의하는 것이 일반적이다.

// data fetching 의 경우 -> framework 의 자체 solution 을 사용하자. 그렇지 않다면 차라리 아래와 같은 custom hook을 정의하자.
const results = useData(`/api/search?${params}`);

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}

///////////////////// 그 외 tips /////////////////////////
// useEffect() 는 관심사에따라 여러번 호출로 분리해도 좋다.
//  - 동일한 종속성을 사용해도, 논리가 다르다면 분리하는게 깔끔하다. (예: 방문기록 과 chattingroom 연결)

// Effect vs Event
// Effect 는 반응적이다. 즉, state 변경에 즉각반응해야 하는 경우이다.
// theme 에 따라 채팅연결알림 color 를 다르게 하려고 한다. Effect 안에 넣고 싶지만, theme 값을 읽어와야 한다.
// theme 는 state 이므로, 반응형이고, 이를 Effect 에서 읽어야 하므로, 종속성으로 추가해야 한다. -> 결과적으로 테마를 바꾸면 채팅도 재연결된다.. 이는 좋지 않다.

////////////////// useEffectEvent() 는 실험중이고, 현재 사용할 수는 없다!!! /////////////
// useEffectEvent() 를 사용하자! Component 최상위에서 사용하면 된다.
const onConnected = useEffectEvent(() => {
  showNotification("Connected!", theme);
});

// 이제 Effect 안에서 필요할 때 onConnected(); 처럼 호출하면 된다... theme 는 종속성으로 추가하지 않아도 된다.
// 만약 사용한다면 주의할 점
//   - useEffect 내에서만 사용할 것
//   - 다른 Component 나 Hooks 에 전달하지 말 것.
