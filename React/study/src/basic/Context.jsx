import React from "react";
// context. vue의 vuex와 비슷한 느낌이다. props를 중앙관리한다.
// 물론 context보다 composition을 이용하면 더 깔끔한 경우가 많다.(제어의 역전) 전부 상황따라 판단하라.
// 그래서 언제 사용하나? 모든 컴포넌트들에게 방송할 때. 즉, 데이터캐시, 테마, 로케일 등등... 에 사용하면 좋다.

const MyContext = React.createContext(defaultValue); // Context 객체 생성
const MyChildContext = React.createContext(defaultValue);
// defaultValue는 적절한 provider를 찾지 못했을 때 사용되는 값이다.(컴포넌트 테스트 시 유용하다.) (provider에서 undefined를 보낸다고 defaultValue를 읽지는 않는다.)

// 아래 용례를 보면 알겠지만, Context.Provider 태그 사이에 Context 가 적용 될 코드들이 들어간다. 정말 context 를 잘 표현한 것 같다.

// context를 구독하는 component는 렌더링 시에 가장 가까이 있는 Provider로부터 값을 읽는다.
<MyContext.Provider value={"어떤 값"}>
  {/*Provider 하위의 객체들은 value가 업데이트될 때마다 업데이트된다. shouldComponentUpdate가 적용되지 않아서, 부모가 update를 건너뛰어도 업데이트된다. */}
  {/* 값 변경여부는 Object.is와 같은 방식으로 동작한다.  */}
  
  {/* Provider 밑에 Provider를 넣을수도 있다. 이때 value가 중복되면 셰도잉된다. */}
  <MyChildContext.Provider>
    <></>
  </MyChildContext.Provider>
  
  {/* Consumer. context의 변화를 구독한다. */}
  <MyContext.Consumer> 
    {value => {} /* context 값을 이용한 렌더링 */}
    {/* 이처럼, 자식은 무조건 함수여야 하고, value를 이용해서 랜더링값(React element)을 반환하면 된다. */}
  </MyContext.Consumer>

</MyContext.Provider>;

//////////////////////////////////////////// 다시 정리.
// 1. Context 를 생성하고,
// 2. 해당 Context의 Provider를 지정, Provider 태그 사이에 작성
// 3. Provider 하위에 Consumer 지정하여 사용. 당연히 한 Context당 여러개 지정할 수 있다.
// 여러 Provider 가 있다면, Consumer도 각각 있다. 이유는 랜더링을 효율적으로 하기 위해서이다.






/////////////////////////////////////////////////////// inversion of control (제어의 역전) -> context 쓰기 전에 고려해보자.
// 만약, props 를 사용하는 수준이 너무 아래부분이라면, 그부분은 상위에서 직접 넘겨주면 된다.
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  // 실사용하는 Avatar 에 직접 넘겨줌으로써 props를 계속 넘겨주지 않아도 된다.

  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
// 하지만, 수가 늘어날수록 난해해질 것이다. 즉, 항상 옳은 것이 아니다.






//////////////////////////////////////////////////////// 주의사항
<MyContext.Provider value={{something: 'something'}}> {/* 이렇게 객체로 value를 넣어주었다. 어떤 문제가 발생할까? */}
  {/* value가 바뀔 때 마다 매번 새로운 객체가 생성되므로, 불필요한 업데이트가 발생할 수 있다. */}
  
  {/* something 값은 바뀌지 않았는데, Provider가 재랜더링되었다는 이유만으로, value 객체는 새롭게 만들어져, 참조가 바뀌어 변경으로 인식하고 재랜더링한다는 뜻. */} 
  
  {/* 해결법은, 해당 value객체를 부모의 state로 끌어올리는 것이다. 즉, value={this.state.value} 같이 사용되어야 한다. */}
  <Toolbar />
</MyContext.Provider>;






//////////////////////////////////////////////////// Class 컴포넌트에서 context 사용하기
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* MyContext의 값을 이용한 코드 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context; // contextType에 부착했고, this.context로 읽어올 수 있다. 가장 가까운 해당 Context의 Provider에서 value를 가져온다.
    //render를 포함한 모든 컴포넌트생명주기에서 사용할 수 있다.
  }
}
MyClass.contextType = MyContext; // 내가 만든 커스텀 class에 원하는 Context를 부착했다. 이렇게 contextType 프로퍼티를 사용해서 부착한다.
// 이 API는 하나의 context만 구독할 수 있다.

// context에 displayname을 줄 수 있다. react 개발자도구에서 해당이름으로 표시된다.
MyContext.displayName = 'MyDisplayName'; 

