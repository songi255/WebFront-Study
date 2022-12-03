import React from "react";

// 합성, 상속
function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children} {/* 어떤 컴포넌트에서, 어떤 자식이 들어올 지 모르는 경우(사이드바처럼) 이렇게 children을 사용할 수 있다. */}
      </div>
    );
}

function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
        <h1 className="Dialog-title"> {/* 이후 이렇게 자식을 동적으로 담을 수 있다. */}
            Welcome
        </h1>
        <p className="Dialog-message">
            Thank you for visiting our spacecraft!
        </p>
        </FancyBorder>
    );
}

// 흔하지 않지만, 종종 구멍만 뚫어놓아야 하는 경우가 있다. 그럴때는 아래처럼 본인이 직접 지정해서 쓰면 된다.
function SplitPane(props) {
    return (
        <div className="SplitPane">
        <div className="SplitPane-left">
            {props.left}
        </div>
        <div className="SplitPane-right">
            {props.right}
        </div>
        </div>
    );
}

function App() {
    return (
        <SplitPane // 속성에다가 react element를 직접 떄려박은 모습이다 ㄷㄷㄷ
        left={
            <Contacts /> 
        }
        right={
            <Chat />
        } />
    );
}
// 위의 합성기능을 이용하면, 하나의 공통 Component를 포함시키는 여러 특수 Component를 사용해서 상속처럼 사용할 수 있다.
// 아직까지 component를 직접적으로 extends 해야 할 사례는 찾지 못했다고 한다. props를 이용한 합성으로 전부 처리가능하다.


// state 끌어올리기
// 예를들어, Calculator 아래에 <섭씨입력기><화씨입력기> 두개의 컴포넌트를 넣었다. 상호간 변환이 가능하게 하려면 어떻게 할까?
//  -> Calculator에 temperture를 state로 저장한다. props로 건네준다. 근데 props는 자식에서 제어할 수 없다. 이때 onTemperatureChange 메서드까지 건네주는 것이다.
// setState가 호출되면 리랜더링되기에, 이를 이용하는 것이다.
// https://github.com/facebook/react/tree/main/packages/react-devtools 를 이용해서 디버깅을 수행하자.
