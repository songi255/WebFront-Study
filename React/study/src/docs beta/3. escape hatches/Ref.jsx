// 재렌더링을 유발하지 않는 state 라고 생각하면 쉽다. (마치 instant field 와 같다.)
// 다른 차이점은 rendering logic 외부에서도 변경가능(state 는 불변) 하고,
// current 값을 rendering 하고 있다면, 동시에 변경해서는 안된다.(state 는 snapshot 덕에 언제든 읽을 수 있다.)

const ref = useRef("초기값");
// ref 는 current 속성에 값이 담긴 채로 반환된다.

// 예를들어, 스톱워치제작에서, 기본적으로 state 로 시간을 관리하지만 stop 을 눌렀을 때, 시작시간을 저장하는 곳을 ref 로 사용할 수 있다.

// 대표적인 용례는 어떨까?
//   - 외부 system dom 조작
//   - 재렌더링 필요없는 state (스톱워치의 interval 같은)

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

// 다른 구성요소의 DOM 노드에 엑세스 부터 보면 됨~~~
