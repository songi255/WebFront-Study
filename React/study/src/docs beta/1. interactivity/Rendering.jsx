/* 랜더링과정
    - trigger - render - commit 순으로 이루어진다.
    
    랜더링은 마치 snapshot 처럼 작동한다.
        - 먼저 state 들이 변하는 logic 을 모두 계산한다. (이때, 이전 랜더링된 상태의 snapshot 을 기준으로 계산된다.)
        - 모든 state 들이 업데이트된 후...
        - 새로운 rendering snapshot 을 만들어 return 한다.
            - 이걸 browser 가 받아서 그린다.
    즉, 한 rendering 내에서 setState() 를 연속으로 호출해도, 이전 랜더링 snapshot 은 살아있고, 이걸 참조해서 계산하기 때문에, update 는 한번만 된다.
        - 예를 들어, onClick 안에서 setState(value + 1); 을 3번 연속 호출했다고 하자.
        - value 값은 이전 랜더링 snapshot 에서 가져온 후, 새로 만들어질 rendering snapshot 에 적용된다.
            - 즉, 3번의 호출에서 value 값은 모두 동일하다.(현재 랜더링 snapshot 의 값이다.) 
            - set 에 의해 setting 되는 value 는 "현재 랜더링 snapshot" 이 아니고, "다음 rendering snapshot" 에 적용되고 있는 것이다.

        - 다른예시는, setState(value + 5); alert(value); 이렇게 적는 것이다. value 가 0 이었다면, 0 이 출력되게 되는 것이다! (저 context 안에서는 과거의 값이 value 니깐.)

        - 또한, 그렇기때문에 state 의 변경들은 1번의 rendering 당 1번만 일어나게 된다.
            -> 여러번의 재 rendering 이 방지된다!


    setState() 함수들은 대기열에 들어갔다가, 모든 코드가 끝난 후 일괄적으로 처리된다.
        - 만약, setState() 를 현재값을 기반으로 여러번 호출하고싶다면 어떡할까?
            -> 인자로 함수를 준다! setState(n => n + 1) 같이 업데이트할 수 있다.
                - rendering 중에 실행될 함수이므로, "순수함수"로 주어야한다!!!
                - 변수는 머리글자로 쓰는게 일반적이다. setFirstName(fn => fn~~) 처럼.
            - setState(5); setState(n => n + 1); 하면 어떻게 될까? 5 적용 후 6 으로 바뀐다!
*/

// 3초 뒤 수정되는 버튼 예시이다. 이런식의 set 도 사용가능하다.

import { useState } from "react";

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending((p) => p - 1);
    setCompleted((c) => c + 1);
  }

  return (
    <>
      <h3>Pending: {pending}</h3>
      <h3>Completed: {completed}</h3>
      <button onClick={handleClick}>Buy</button>
    </>
  );
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
