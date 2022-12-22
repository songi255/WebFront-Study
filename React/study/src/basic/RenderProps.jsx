// Component 간 Code 를 공유하기 위해 Props 를 사용하는 테크닉.
// 횡단관심사 분리에 사용하면 좋다.

// 자체적 랜더링 로직 구현대신, 이런식으로 element 반환함수를 props 로 받아 랜더링한다.
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>


// 횡단 관심사(Cross-Cutting Concerns)를 위한 render props 사용법

// 예를 들어, 아래와 같이 마우스 추적 기능이 있다.
class MouseTracker extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
          <h1>Move the mouse around!</h1>
          <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
        </div>
      );
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 다른 컴포넌트에서도 사용하려면 어떡할까?

// 고양이 그리는 컴포넌트
class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      return (
        <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      );
    }
}

// Mouse 추적하는 Component
class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

            {/*
            <Mouse>가 무엇을 렌더링하는지에 대해 명확히 코드로 표기하는 대신,
            `render` prop을 사용하여 무엇을 렌더링할지 동적으로 결정할 수 있습니다.
            */}
            {this.props.render(this.state)}
            {/*props 이름이 꼭 render 일 필요는 없다.*/}
        </div>
        );
    }
}

class MouseTracker extends React.Component {
    render() {
        return (
        <div>
            <h1>Move the mouse around!</h1>
            <Mouse render={mouse => (
            <Cat mouse={mouse} />
            )}/>
            {/* 위에서 볼 수 있듯이, mouse 에는 Mouse 의 this.state 가 들어가 있다는 걸 알 수 있다. */}
        </div>
        );
    }
}

// props 이름이 꼭 render 일 필요는 없다. 즉,
<Mouse children={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>;
// 이렇게 children 에 넣어주거나

<Mouse>
  {mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}
</Mouse>;
// 이렇게 걍 element 를 자식으로 때려박아도 된다.
// 다만 이 테크닉은 자주 사용되지 않기 때문에, API를 디자인할 때 children은 함수 타입을 가지도록 propTypes를 지정하는 것이 좋습니다.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 흥미로운 점은, 대부분의 HOC 에 이식이 가능한 pattern 이라는 것이다.

// 예를 들어, Mouse 보다 withMouse 라는 HOC 를 만드는 걸 선호한다면 아래와 같이 그대로 이식하면 된다.
function withMouse(Component) {
return class extends React.Component {
      render() {
        return (
          <Mouse render={mouse => (
            <Component {...this.props} mouse={mouse} />
          )}/>
        );
      }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 주의사항
// React.PureComponent에서 사용시 Pure 의 이점이 사라질 수 있다.(state 와 prop 만 랜더링에 영향 주는 경우 둘만 비교한다.)
// 얕은 prop 비교는 새로운 prop에 대해 항상 false를 반환하는데, render 마다 넘어온 porps 를 새로 생성하게 된다.

class Mouse extends React.PureComponent {
  // 위와 같은 구현체...
}

// 이 문제를 해결하기 위해서, 다음과 같이 instance method 를 사용해서 prop을 정의합니다.
class MouseTracker extends React.Component {
  // `this.renderTheCat`를 항상 생성하는 매서드를 정의합니다.
  // 이것은 render를 사용할 때 마다 *같은* 함수를 참조합니다.
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
// prop을 정적으로 정의할 수 없는 경우에는 React.Component를 상속받아야 합니다.