import React from "react" // React 는 JSX 를 사용하기 위해 꼭 import 되어야 한다.

// React.createElement 에 대한 문법적 설탕이다. 예컨데..
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
// 는 아래와 같이 compile 된다.
React.createElement(
    MyButton,
    {color: 'blue', shadowSize: 2},
    'Click Me'
);


// .연산자로 속성사용가능
const MyComponents = {
    DatePicker: function DatePicker(props) {
      return <div>Imagine a {props.color} datepicker here.</div>;
    }
}
function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}


// 사용자 정의태그는 대문자로 시작하게 하자.
// 소문자로 시작하는 div, span 등의 태그는 내부 컴포넌트로 인식해서 createElement('div') 같이 문자열로 전달된다.
// 대문자로 시작하는 태그는 그냥 참조가 전달되기 때문에, 소문자로 정의하면 생각대로 동작하지 않는다.(html 태그로 인식한다.)


// type 을 표현식으로 넣을 수는 없다. 대신, 대문자로 시작하는 변수에 할당한 뒤 사용할 수는 있다.
function Story(props) {
    // 올바른 사용법입니다! 대문자로 시작하는 변수는 JSX 타입으로 사용할 수 있습니다.
    const SpecificStory = components[props.storyType];
    // return <components[props.storyType] />; // 불가능!!
    return <SpecificStory story={props.story} />; // 가능!
}


// 문자열 리터럴을 넘겨줄 떄, html escape 되지 않는다. 즉.. 아래 두개는 동일하다.
<MyComponent message="&lt;3" />;
<MyComponent message={'<3'} />;
// 보통 신경안써도 되지만, 완전성을 위해 언급한다.


// props의 기본값은 true 이다. 아래 두개는 같다. 하지만 이렇게 쓰지 말자.
<MyTextBox autocomplete />;
<MyTextBox autocomplete={true} />;
// 왜냐? ES6의 {foo} 는 {foo: true} 가 아니라 {foo: foo} 를 의미하기 때문이다. 단지 html 동작방식과 일치하기 위해 남겨둔 기능이다.


// props 펼치기
const Button = props => {
    const { kind, ...other } = props;
    const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
    return <button className={className} {...other} />;
}; // 많이 봤지?
// 다만, 불필요하거나 유효하지 않는 속성들까지 넘기는 일이 생기므로, 꼭 필요할 떄만 사용하는 것을 권장한다.



// 문자열 리터럴 -> props.children 에 들어간다!
<MyComponent>Hello world!</MyComponent>;

// 공백은 trim 되고, 개행은 무시되며, 문자열 사이의 개행은 공백 1개로 치환된다. 아래는 모두 같다.
<div>Hello World</div>;

<div>
  Hello World
</div>;

<div>
  Hello
  World
</div>;

<div>

  Hello World
</div>;


// element 로 이루어진 배열을 반환할 수도 있다! 굳이 fragment 로 감싸지 않아도 된다.
class Items extends React.Component{
    render() {
        // 리스트 아이템들을 추가적인 엘리먼트로 둘러쌀 필요 없습니다!
        return [
          // key 지정을 잊지 마세요 :)
          <li key="A">First item</li>,
          <li key="B">Second item</li>,
          <li key="C">Third item</li>,
        ];
    };
}


// 표현식은 대부분 생략하겠다.
// 표현식은 다른 타입 자식과 같이 쓸 수 있는데, 종종 문자열 템플릿을 대신해서 종종 유용하다.
function Hello(props) {
    return <div>Hello {props.addressee}!</div>;
}


// 자식은 어떤값이든 가능하다. 즉 렌더링불가능한 함수를 넘겨주는것도 가능은 하다. 일반적인 props 와 같기 때문이다.(props.children)
function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
      items.push(props.children(i));
    }
    return <div>{items}</div>;
}
  
function ListOfTenThings() {
    return (
        <Repeat numTimes={10}>
        {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    );
}
// 다만 일반적이지는 않으니 알고만 있자.


// boolean, null, undefined 는 유효하긴 하나 랜더링되지 않는다. 즉, 조건부랜더링에서 유용하다.
<div>
  {showHeader && <Header />}
  <Content />
</div>;
// 이렇게 단축평가로 조건부랜더링을 할 수 있다. (다시봐도 단축평가는 묘하다..)

<div>Hi {false}</div>; // 심지어 여기서 false 도 랜더링되지 않는다!!
<div>My JavaScript variable is {String(false)}.</div>; // 랜더링하려면 이렇게 String 으로 바꿔야 한다.

// 다만, 0 같은 falsy 값은 렌더링 되므로 주의해야 한다.
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>;
// 이런건 0 이 평가되어버리므로 0 으로 렌더링된다....



