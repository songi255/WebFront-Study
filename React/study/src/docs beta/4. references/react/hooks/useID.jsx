/* 문자열 ID 를 생성한다. JS 의 symbol 과 비슷한 느낌인듯..
    - 전역변수에 비해 나은점은, server rendering 에서 hydrate 사용 시, 그 순서를 보장하기 힘들 기 때문이다.
        - hydrate 가 deprecated 됬다던데, 좀 더 알아봐야할 듯하다.
*/

import { useId } from "react";

function PasswordField() {
  const passwordHintId = useId();
  return (
    <>
      <label>
        Password:
        {/* aria-describedby 는 id 속성을 기반으로 작동한다. 즉, 중복되면 안되는데, 이럴때 useId() 를 사용할 수 있다. */}
        <input type="password" aria-describedby={passwordHintId} />
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}

export default function App() {
  return (
    <>
      <h2>Choose password</h2>
      <PasswordField />
      <h2>Confirm password</h2>
      <PasswordField />
    </>
  );
}

// 공유접두사 지정 가능하다.
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./styles.css";

// 아래와 같이 단일페이지에서 여러개의 독립적인 react app 을 랜더링 하는 경우가 있을 수 있다.
// 이 경우 접두사 지정 시 useID() 생성의 중복을 막을 수 있다.
const root1 = createRoot(document.getElementById("root1"), {
  identifierPrefix: "my-first-app-",
});
root1.render(<App />);

const root2 = createRoot(document.getElementById("root2"), {
  identifierPrefix: "my-second-app-",
});
root2.render(<App />);
