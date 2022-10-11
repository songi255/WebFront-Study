import logo from './logo.svg';
import './App.css';
import React from 'react';

// JSX
//   - js를 확장해서 html이랑 섞은듯한 문법이다. 마치 코틀린 템플릿과 비슷.
//   - "react element"를 생성한다.
//   - react는 본질적으로 랜더링로직이 UI로직과 연결된다는 사실을 받아들인다.
//     - 그래서 인위적으로 분리하지 않고, component라는 유닛으로 느슨하게 연결하여 관심사를 분리한다.
//   - XSS에 안전하다.(진짜?) 삽입된 모든 값은 랜더링 전에 escape 처리 하므로 문자열로 변환된다.
//     - escape의 예로, < > & 같을걸 없애주는 것이다... react는 명시적으로 작성하지 않은 내용은 주입되지 않으므로 공격에 안전하다.
//   - Babel은 React.createElement()를 사용하여 react element로 바꾼다.
//     - 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행

const name = 'Josh Perez';
const my_color = "red";
const element = ( // ()가 필수는 아니지만, ; 자동삽입 방지를 위해 권장한다.
  <h1 color={my_color} // 태그 내에도 {}를 쓸 수 있다.
    className="myClass" // html보다는 js에 가깝다. 그래서 className 같이 CamelCase로 변형된 어트리뷰트를 사용하는 경우가 있다.
  >
    Hello, {name}
  </h1>
); // {} 안에는 expression이 올 수 있다.
// 이런 태그표현을 JSX라고 한다. react element를 생성하게 된다.

// Component를 정의해서 사용할 수 있다. 함수형과 class 형이 있다.
function App() {  // 일반적으로 App이 최상위 컴포넌트이다.
  return ( // react element를 반환하고 있다.
    <div className="App"> 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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

// class Component 이다. 몇가지 추가기능이 있다.
class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {date: new Date()}; // state의 초기화. 유일하게 constructor에서 state를 직접 대입한다.
  }

  componentDidMount(){ // 화면에 그려지는 것을 마운팅된다고 한다. 화면에 그려지면 실행되는 함수이다.
    this.timerId = setInterval(() => { // timerID 처럼, props나 state에 굳이 포함시키지 않는 내용은 이렇게 자유롭게 프로퍼티로 추가해도 된다.
      this.tick();
    }, 1000);
  }

  tick(){
    this.setState({ // state는 직접 수정하는게 아니고, 이렇게 setState로 바꿔줘야 한다.
      date: new Date()
    }); // 객체로 넣어주고 있네. 제공한 객체를 state에 병합한다.

    /* react는 성능을 위해 여러개의 setState 요청을 비동기적으로 업데이트 될 수 있기 때문에, 객체로 업데이트 하는 아래 코드는 순서가 생각대로 안될 수 있다.
    this.props와 this.state는 비동기적으로 업데이트될 수 있기 때문에, 다음 state를 계산할 때 해당 값에 의존하면 안된다.1
    this.setState({
      counter: this.state.counter + this.props.increment,
    });

    // 대신 아래처럼 함수로 업데이트시켜주면 인자들이 업데이트 된 상태로 들어와서 생각대로 잘 작동한다고 한다.
    this.setState((state, props) => ({
      counter: state.counter + props.increment
    }));
    */
  }
  
  componentWillUnmount(){ // 언마운트시 실행
    clearInterval(this.timerId);
  }

  render() { // render에서 React Element를 return 해야 한다.
    return (
      <div>
        <h1>hello!</h1>
        <h2>Hi to {this.props.date}</h2> {/* this.props로 접근해야 한다. */}
        <h2>H1 to {this.state.date}</h2> {/* state는 본인 외에는 접근할 수 없다. */}
      </div>
    );
  }
}

//root.render(<Clock />); 이런 방식으로 랜더링한다.

const propEx = <WelcomeFunc name="Sara"></WelcomeFunc> // 이게 props에 name 프로퍼티로 담긴다.
// 이게 의미하는 것은, 부모 컴포넌트에서 자식을 만들 때 props를 제어한다. -> 데이터는 위에서 아래로 흐름을 의미한다.


// 이벤트
function Form() {
  // html에서는 dom 기본동작을 방지하기 위해 false 호출로 막는 경우가 있다고 한다.
  /* <form onsubmit="console.log('You clicked submit.'); return false"> // 이런식으로.. 그러나 react에서는 이런 방식으로 막지 못한다.
      <button type="submit">Submit</button>
     </form>
  */
  
  function handleSubmit(e) {
    e.preventDefault(); // 명시적으로 preventDefault를 호출해주어야 한다.
    // e는 일반 이벤트가 아니고 합성이벤트이다. react가 w3c 명세에 따라 정의하기 때문에 브라우저 호환에 걱정할 필요가 없다. 고유 이벤트와 정확히 동일하게 동작하지는 않는다.
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}> {/* 핸들러등록은 ""로 하지 않고 함수객체를 직접 준다. */}
      <button type="submit">Submit</button>
    </form>
  );
}

// 이벤트 리스너
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this); // class의 메서드는 this바인딩 되있지않나?? 내가 잘못알고있나..
  }

  handleClick() { 
    this.setState(prevState => ({

      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

/* 핸들러에 인자전달
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button> 화살표함수 사용 (얘는 호출할때마다 함수가 만들어질거같은데..)
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button> bind 사용
*/

// 조건부 렌더링
// if 를 써서 return 을 둘로 나눌수도 있다. 여기서는 element를 이용해보자.
// 로그인, 로그아웃 버튼이 있다.
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

// 아래 컴포넌트에서 조건부로 랜더링
class LoginControl extends React
.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) { // if 를 사용하는 것은 똑같다. if도 좋은 방법이다.
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    } // 이게 의미하는 바는, 당연히 삼항연산자도 사용할 수 있다는 것이다.

    if (!isLoggedIn) return null; // 이런식으로, 아예 랜더링하고싶지 않다면 null을 반환하면 된다.
    // 랜더링만 안되는것이지, 컴포넌트 자체의 생명주기에는 영향을 주지 않는다. 즉, componentDidUpdate같은게 호출된다.
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {isLoggedIn  && // JSX의 기능. &&로 단축평가처럼 랜더링여부를 결정할 수 있다. 다만, false일 경우, falsy값, 즉 0 이 랜더링될 수도 있다. 주의.
          <h2>
            You have logined unread messages.
          </h2>
        }
        {button}
      </div>
    );
  }
}

//list로 요소 생성하기
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}> {/* 엘리먼트 리스트 만들 때, 문자열 attribute인 key를 누락하면 경고가 뜬다. 정 쓸 key가 없을때 최후의 수단으로 index를 쓴다.(명시하지 않으면 기본적으로 index로 key 만든다.) */}
      {/* key는 컴포넌트로 전달되지는 않는다. 즉, li 는 props.key를 읽을 수 없다. 만약 읽을 필요가 있다면, 다른 이름의 prop으로 명시적으로 전달하도록 한다. */}
      {number}
    </li> /* 그냥 이렇게 리스트째로 때려넣으면 된다. */
  );
  return ( // 아래처럼, 주변에서 쓸 때만 의미가 있다. 대부분 map 함수 안에서 넣어주는일이 많다고 한다.
    <ul>{listItems}</ul>
    /* 물론 알겠지만, 이렇게 바로 사용할 수도 있다.
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
    */
  );
}

// 폼
// html 폼 엘리먼트는 자체가 내부상태를 가지기 때문에 동작이 살짝 다르다.
// 아래 form은 동일한 동작을 원한다면 그대로 사용하면 되지만, js호출을 원하는 등등.. 그런경우가 더 많다. 이때 제어컴포넌트(controlled components) 기술이 표준이다.
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
// input, textarea, select 같은 폼 엘리먼트는 일반적으로 자신의 state를 관리하고 업데이트한다.
// react에서는 state에 setState로 업데이트하도록 value props를 이용하여 바인딩할 수 있다.

//form
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}); // 이렇게 setState로 바인딩한다.
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} /> {/* change될 때 마다 react의 state에 값을 저장하도록 바인딩했따. */}
          {/* value가 react state의 값에의해서만 변경되는 것을 볼 수 있다. */}
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
// 즉, react의 state를 single source of truth(신뢰가능한 단일출처)로 만들어, 기존 html tag의 state와 react의 state를 결합했다.
// 이런식으로, react에 의해 값이 제어되는 입력 폼 엘리먼트를 controlled component (제어 컴포넌트)라고 한다.

// select의 경우, value를 최상단에서 설정할 수 있다. 이 경우, selected 의 역할을 한다. (value="coconut" 같이 쓰면 된다.)
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
//여튼.. textArea든, input이든 select든 전부 react에서는 value라는 prop을 사용해서 state를 제어하면 된다는 것이다.
// 이렇게 value를 사용하는 순간 controlled component가 되기 때문에, 의도하지 않는 한 사용자가 변경할 수 없다(막힌다).
// 혹시 수정이 된다면 null이나 undefeined가 실수로 들어간 경우이다..
// 대안적으로 비제어컴포넌트가 있고, Formik을 사용하면 유효성검사, 방문필드 추적, 폼 제출처리 같은 완벽한 해결책을 가질 수 있다.



//state 끌어올리기
// 예를들어, Calculator 아래에 <섭씨입력기><화씨입력기> 두개의 컴포넌트를 넣었다. 상호간 변환이 가능하게 하려면 어떻게 할까?
// Calculator에 temperture를 state로 저장한다. props로 건네준다. 근데 props는 자식에서 제어할 수 없다. 이때 onTemperatureChange 메서드까지 건네주는 것이다.
// setState가 호출되면 리랜더링되기에, 이를 이용하는 것이다.
// https://github.com/facebook/react/tree/main/packages/react-devtools 를 이용해서 디버깅을 수행하자.


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


//Fragment
function ListItem({ item }) {
  return ( //자식을 묶기만 하는 용도로 사용할 떄 임시적으로 쓰는 태그. <>로 줄여쓸 수도 있다.
    //<Fragment></Fragment>. 유일하게 key만 줄 수 있다. 근데 key를 어디쓸까...
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}

// label
<label htmlFor="namedInput">Name:</label> // react는 이렇게 for대신, htmlFor를 사용한다.



export default App;
