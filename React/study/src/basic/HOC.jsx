// Component Wrapping 하는 순수함수. React의 고유기능이라기 보다는, 자주 보이는 패턴이다.
// Redux의 connect와 Relay의 createFragmentContainer 같은 데서 흔하게 볼 수 있다.


/////////////////////// Cross-Cutting-Concerns (횡단관심사) 에 사용
// 예전에는 mixin 을 권장했지만, 많은 문제가 발생하여 HOC로 바뀌었다.

// 동일 Data Source 에서 댓글, 블로그 글을 받는 경우, HOC의 예시.
function withSubscription(WrappedComponent, selectData) {
  // 감쌀 component 와 두번째 인자(callback)를 받았다. 인자는 자유롭게 설정하면 된다.
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... 구독을 담당하고...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    // 순수함수여야하기 때문에, 인자로 받은 Component 의 prototype 을 변경한다던가 하면 안된다. 그저 조합만 할 뿐.
    render() {
        // 모듈화 하기 위해 data props 를 넘겨준 것은 굉장히 fancy 하다..
        return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

// Component 정의 자체를 wrapping 해서 하고있다. export 역시 wrapping 된 애로 한다.
const CommentListWithSubscription = withSubscription(CommentList, (DataSource) => DataSource.getComments());
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id));


///////////////////////////////////////////////// Convention

// props 넘겨주기
class PassProps extends React.Component{
  render() {
    // HOC 에서 사용할 props 는 따로 분리
    const { extraProp, ...passThroughProps } = props;
  
    // 추가할 props가 있다면 추가. 일반적으로 Status값 또는 Instance method 를 추가하게 됨.
    const injectedProp = someStateOrInstanceMethod;
  
    // wrapped component에 props를 전달합니다.
    return (
      <WrappedComponent
        injectedProp={injectedProp}
        {...passThroughProps}
      />
    );
  }
}



// compose() 사용해서 composability 끌어올리기 
// HOC 들은 여러 방식으로 작성할 수 있다.
const NavbarWithRouter = withRouter(Navbar); // 단일 props 사용하거나..
const CommentWithRelay = Relay.createContainer(Comment, config); // 추가 옵션을 부여하거나..
// React Redux의 `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList); // 이건 훨씬 일반적인 형태이다.
// 이 일반적인 형태 (컴포넌트 -> 컴포넌트 인 함수연결형태) 는 쉽게 조합할 수 있는데, compose()로 할 수 있다.

let EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent)); // 이렇게 한번에 넣어주는 대신...
// compose(f, g, h)는 (...args) => f(g(h(...args)))와 같습니다.
const enhance = compose(
  // 둘 다 단일 매개변수의 HOC입니다.
  withRouter,
  connect(commentSelector)
); // 이렇게 compose 를 통한 조합함수를 만들어서 사용할 수 있다.

EnhancedComponent = enhance(WrappedComponent)
// compose 유틸리티 기능(효용 함수)는 lodash (as lodash.flowRight), Redux, and Ramda를 포함한 많은 서드 파티 라이브러리에서 제공하고 있다. -> 써봐야 알듯.


// Display Name 작성 -> HOC의 결과임을 DevTools 를 통해 알 수 있게 한다.
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}
// 걍 내부적으로 display name 을 정의해서 묶어준다는 뜻.

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


//////////////////////////////////// 주의사항
// 1. render() 안에서 HOC 조합을 하지 마라. (함수 호출 하지마라.)
//   HOC는 함수를 반환하기 때문에, 매 렌더링마다 새로운 Component 가 생겨버린다. 그래서 하위도 새롭게 렌더링되며, 성능이슈는 물론 state 등이 다 날라간다.

// 2. 정적 메서드는 복사되지 않는다 (당연하지. props 만 받아서 재생성하니까.) 고로 따로 복사해주자.
import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent); // react 에서 복사함수를 제공한다.
  return Enhance;
}
// 혹은 export 를 추가해서 정적메서드도 따로 내보내면 된다

// 3. ref 는 전달되지 않는다. key 처럼 따로 특별히 취급하기 떄문. forwardRef 를 사용하면 되고, Ref.jsx 를 참고하자.