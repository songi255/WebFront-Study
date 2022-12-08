// DOM rendering 을 JSX 내부가 아니고, 아무곳이나에 rendering 하는 기능
// 전형적인 용례는 다음과 같다.
//   1. 부모 컴포넌트에 overflow: hidden이나 z-index가 있는 경우
//   2. 시각적으로 자식을 “튀어나오도록” 보여야 하는 경우(dialog, hover card, tooltips)

function render() {
    // `domNode` 안에 자식을 렌더링합니다.
    return ReactDOM.createPortal(this.props.children, domNode);
  }


// 랜더링 즉, DOM 에서의 위치만 다르다 뿐이지 React Tree 내에서의 위치는 동일하기 때문에 이벤트나 Context 등의 동작은 동일하다.
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>; // 예로 modal 을 위한 이런 구조 가 있다고 하자

// 두 root는 DOM에서 형제 관계.
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

// Modal Component
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Modal 이 Mount 되기 이전에 먼저 rendering 이 일어나는 듯하다.
    // 지금보면 먼저 div 를 만들어놓고, 자식은 그 아래에 추가하며, 이 div 를 최종적으로 Modal 이 mount 되는 시점에 DOM 에 붙이므로,
    // DOM 에 편입되지 않은 상태로 autoFocus 등을 사용한다면 작동하지 않을것이다. 이렇게 div에 rendering 함과 동시에 즉시 DOM 에 연결해야 한다면
    // Modal에 state를 추가하고 Modal이 DOM 트리에 삽입되어 있을 때만 자식을 렌더링하면 된다...
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

// Modal과 Button을 포함하는 Component
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 이것은 Child에 있는 버튼이 클릭 되었을 때 발생하고 Parent의 state를 갱신합니다.
    // 비록 버튼이 DOM 상에서 직계 자식이 아니라고 하더라도 말입니다.
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }
  render() {
    return (
      // div로 버블링된 Event 를 capture 하기 위해서 onClick을 정의했다.   
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
  // Modal 창 안에 Child Button 이 있는 것에 주목하면 된다. Portal 에 의해서 DOM 을 보면 onClick 이 정의된 div 아래에는 button이 없게 되지만, 
  // React Tree 내부에서는 엄연히 div 안에 Button(Child) 가 있으므로, 이벤트를 받을 수 있다.
}

// Button Component
function Child() {
  // 이 버튼에서의 클릭 이벤트는 부모로 버블링됩니다.
  // 왜냐하면 'onClick' 속성이 정의되지 않았기 때문입니다.
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

const root = ReactDOM.createRoot(appRoot);
root.render(<Parent />);


////////////////////////////////////// 주의사항
// keyboard focus 관리가 매우 중요하다.
// 모달 다이얼로그(modal dialogs)의 경우 WAI-ARIA Modal Authoring Practices에 따라 모든 모달 다이얼로그(modal dialogs)와 상호작용할 수 있는지 확인하라 ?

