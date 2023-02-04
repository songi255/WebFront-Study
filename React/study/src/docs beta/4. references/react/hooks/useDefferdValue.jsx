/* UI 재렌더링을 일부 연기할 수 있다.
    대부분 Suspense 와 같이 쓰는 기능이다.
    원리는 Background 에서 value 와 deffered value 로 둘 다 렌더링한다. 처음에는 이전값인 deffered value 로 랜더링 된 값을 보여주다가, 렌더링 완료되면 교체한다.
        - 재요청이 들어오면 리렌더링은 언제든 취소되고 다시시작한다.
        - Background 랜더링은 useEffect 를 실행하지 않는다.

    속도 최적화에도 사용가능하다!
        - 예를들어, 글자 입력마다 목록을 필터링하는 등의 예시에서,
        - 필터링속도보다 글자 입력이 더 빠른 경우가 많을 것인데, 이럴 떄 UI 업데이트를 block 하지 않아 쾌적해진다.
    
    디바운싱과 스로틀링 대신 더 React 친화적, 기기친화적으로 사용할 수 있는 것이다.
        - 다만, 네트워크 요청횟수 등은 디바운싱 / 스로틀링이 더 나을 것이다... 또한 상황에 따라 장단이 있으므로, 여러 고려를 해보자.
*/

import { useState, useDeferredValue } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // ...
}
