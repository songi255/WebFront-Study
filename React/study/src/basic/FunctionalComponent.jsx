// 컴포넌트 jsx 파일은 크게 3가지 영역으로 볼 수 있다.
// 함수형 component 에 대해 먼저 살펴보자.

////////////////////////////////// import 부분 //////////////////////////////////////
import React from "react";
import logo from "./logo.svg";

////////////////////////////////// Component 정의 부분 ////////////////////////////////

// Component를 정의해서 사용할 수 있다. 함수형과 class 형이 있다.
function App() {  // 일반적으로 App이 최상위 컴포넌트이다.
    return ( // react element를 반환하고 있다.
      <div className="App"> 
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
        </header>
      </div>
    );
  }
  
// 함수형 component 이다.
function WelcomeFunc(props) { // props는 이 Component를 생성할 때, 속성으로 넣어주는 값들이 모두 포함되서 들어온다.
return (
    <h1>Hello, {props.name}</h1> 
); // props는 read only이다. 직접 수정하면 안된다.
}

// 이런식으로 props 는 직접 주는 게 아니고, 속성들이 안에 담겨온다.
const propEx = <WelcomeFunc name="Sara"></WelcomeFunc> // 이게 props에 name 프로퍼티로 담긴다.
// 이게 의미하는 것은, 부모 컴포넌트에서 자식을 만들 때 props를 제어한다. -> 데이터는 위에서 아래로 흐름을 의미한다.

////////////////////////////////// export default 부분 ///////////////////////////////
// 필수이다.
export default WelcomeFunc;


// 아마도 Hook 때문에 class 형 보다는 Functional Component 를 더 많이 사용할 것이다.