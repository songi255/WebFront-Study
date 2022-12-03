// JSX
//   - js를 확장해서 html이랑 섞은듯한 문법이다. 마치 코틀린 템플릿과 비슷.
//   - "react element"를 생성한다.
//   - react는 본질적으로 랜더링로직이 UI로직과 연결된다는 사실을 받아들인다.
//     - 그래서 인위적으로 분리하지 않고, component라는 유닛으로 느슨하게 연결하여 관심사를 분리한다.
//   - XSS에 안전하다.(진짜?) 삽입된 모든 값은 랜더링 전에 escape 처리 하므로 문자열로 변환된다.
//     - escape의 예로, < > & 같을걸 없애주는 것이다... react는 명시적으로 작성하지 않은 내용은 주입되지 않으므로 공격에 안전하다.
//   - Babel은 React.createElement()를 사용하여 react element로 바꾼다.
//     - 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행

import React from "react"; // jsx 파일로 component를 분리해낼 수 있다. js 와 문법이 약간 달라 jsx 일 뿐, js 처럼 쓰면 된다.

const name = 'Josh Perez';
const my_color = "red";

// 아래 react element 를 생성해보자.
const element = ( // ()가 필수는 아니지만, ; 자동삽입 방지를 위해 권장한다.
  <h1 color={my_color} // 태그 내에도 {}를 쓸 수 있다.
    className="myClass" // html보다는 js에 가깝다. 그래서 className 같이 CamelCase로 변형된 어트리뷰트를 사용하는 경우가 있다.
  >
    Hello, {name}
  </h1>
); // {} 안에는 expression이 올 수 있다.
// 이런 태그표현을 JSX라고 한다. react element를 생성하게 된다.