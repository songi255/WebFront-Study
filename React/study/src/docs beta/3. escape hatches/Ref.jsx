// 재렌더링을 유발하지 않는 state 라고 생각하면 쉽다. (마치 instant field 와 같다.)
// 다른 차이점은 rendering logic 외부에서도 변경가능(state 는 불변) 하고,
// current 값을 rendering 하고 있다면, 동시에 변경해서는 안된다.(state 는 snapshot 덕에 언제든 읽을 수 있다.)

const ref = useRef("초기값");
// ref 는 current 속성에 값이 담긴 채로 반환된다.

// 예를들어, 스톱워치제작에서, 기본적으로 state 로 시간을 관리하지만 stop 을 눌렀을 때, 시작시간을 저장하는 곳을 ref 로 사용할 수 있다.

// 대표적인 용례는 어떨까?
//   - 외부 system dom 조작
//      - 이때, dom 을 파괴하거나 변경해서는 안된다.
//      - 비파괴적인 browser API (focus, scroll 등) 만 사용하기를 권장한다.
//   - 재렌더링 필요없는 state (스톱워치의 interval 같은)

// ref 할당은 언제 일어날까? rendering 중에는 변하면 안되기 때문에 null 이다.
// commit 될 때, 모든 변경사항이 적용된다. 그래서 ref 에 DOM 할당도 이 때 실행된다.

///////////////////// ref 로 DOM 제어하기 //////////////////////////////
import { useRef } from "react";

// 버튼을 누르면 해당 위치로 scroll 되는 예시이다.
export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    // DOM 의 ref 를 얻었다면, scrollIntiView() 나 focus() 같은, Browser 함수를 사용할 수 있다.
    firstCatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>Tom</button>
        <button onClick={handleScrollToSecondCat}>Maru</button>
        <button onClick={handleScrollToThirdCat}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          <li>
            {/* 아래와 같이, 요소의 ref 속성에 useRef 변수를 연결하면, 해당 DOM 의 참조가 담긴다. */}
            <img
              src="https://placekitten.com/g/200/200"
              alt="Tom"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/300/200"
              alt="Maru"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/250/200"
              alt="Jellylorum"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

// 만약, ref 얻어야 할 게 동적으로 늘어난다면 어떡할까? useRef 는 최상위에서 선언해야 하므로 동적으로 사용할 수는 없다.
export function CatFriends2() {
  const itemsRef = useRef(null);

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  // 이런경우, useRef 는 Collection 으로, ref 에는 function 을 전달하는 방법으로 해결할 수 있다.
  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>Tom</button>
        <button onClick={() => scrollToId(5)}>Maru</button>
        <button onClick={() => scrollToId(9)}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            // ref 에 함수를 넘겨줬다. 넘겨받는 node 는 DOM 의 참조이다. 이를 ref callback 이라고 한다.
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            >
              <img src={cat.imageUrl} alt={"Cat #" + cat.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: "https://placekitten.com/250/200?image=" + i,
  });
}

// 다른 요소의 ref 에 접근
/*
아래처럼 props 에 담겨있는 ref 가 넘어갈까? 안된다! forwardRef() 로 직접 명시적으로 넘겨야한다.
function MyInput(props) {
  return <input {...props} />;
}
*/
const MyInput = forwardRef((props, ref) => {
  // forwardRef 로 넘겨주는 모습.
  return <input {...props} ref={ref} />;
});

export function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      {/* ref 를 MyInput 에 할당했는데, 주석처리된 MyInput 에서 props 로 전달하고 있다.
        사용자정의 Component 에 ref 를 전달했기때문에, ref 할당처리는 Component 에 달렸다. 기본적으로는 아무것도 할당하지 않는다.

        작동하려면 Component 내부에서 forwardRef() 로 할당해줘야 한다. */}
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
// 이렇게 하위요소 (입력, 버튼 등..) 가 ref 를 넘겨주는 것은 흔한 일이다.

// Imperative Handle 로 ref 제어기능 제한
const MyInput2 = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  // 노출될 ref 에 대해서, 특정 제어 외에는 허용하고 싶지 않을 경우 (css 조작 등 하지 말기 바란다면)
  useImperativeHandle(ref, () => ({
    // focus() 기능만 허용하도록 만든다.
    focus() {
      realInputRef.current.focus();
    },
  }));
  // 지금 이 Comonenet 내부에서는 realInputRef 가 진짜 ref 이지만,
  // useImperativeHandle() 로 인해, 실제 전달되는 값은 handle 이라는 객체가 전달된다.
  return <input {...props} ref={realInputRef} />;
});

// flush sync
setTodos([...todos, newTodo]);
listRef.current.lastChild.scrollIntoView();
// 위 순서로 코드가 진행되면, ref 할당 순서대로 따라가 볼때, ref 는 set 하기 이전의 snapshot 을 참조하는 꼴이 되어 버린다.
// 이는 state update queue 가 존재하기 때문이다. 그래서 이런 비동기 상태 말고 동기적으로, 바로 setState 를 실행하려면 flushSync 를 사용한다.
flushSync(() => {
  // setState 를 즉시 실행하도록 강제한다.
  setTodos([...todos, newTodo]);
  // 이렇게 하면 state 가 먼저 update 되어, ref 할당도 진행된다.
});
listRef.current.lastChild.scrollIntoView();
