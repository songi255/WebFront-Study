// ref 는 말단 component 의 ref 를 상위에 전달하는 기능
// 재사용가능 컴포넌트 라이브러리 같은 특정부분에서 유용할 수 있다.

// 일반적으로는 아래 component 의 내부 button 에 대한 ref 를 얻을 필요가 없다. (결합도 감소)
// 하지만 FancyButton 같은 말단 노드들은 필요할 때가 있다. (focus, select, animation 관리용)

// forwardRef() 로 ref 를 받아 button 에 전달한다. (이걸로 정의해야지만 ref 가 넘겨진다.)
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
));
// React.forwardRef() 는 rendering function 을 받는데, 이 함수 이름이 DevTools 에 뜬다.
// 그래서 arrow function 말고, 직접 function 을 정의한 다음, .displayName 속성을 지정해주면 DevTools 에서 원하는 이름으로 표시할 수 있다.

// ref 는 외부에서 가져와서 사용할 수 있다.

// createRef() 로 ref 객체를 생성한 후, 이 객체를 ref 값으로 넘겨준다. 그리고 이 객체를 참조하면 됨.
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

// ref.current 가 button DOM 을 가리킨다.
const button = ref.current;

// 주의사항 : forwareRef 를 사용한다면, 일관적으로 사용해야한다. 작동방식자체가 다르기때문에, ref 로 참조되는게 뭔지 등등.. 상당히 큰 변경사항이다.


////////////////////////////////////// 고차원 컴포넌트에서의 활용

// 예를 들어 이렇게 로그를 찍고, 그대로 랜더링하는 HOC 가 있다. 하지만 ref는 prop이 아니라서 전달되지 않는다.
function logProps(WrappedComponent) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  
    return LogProps;
}
//export default logProps(FancyButton); 이렇게 고차컴포넌트로 감싸 사용한다면, button 이 아닌, logProps 의 ref. 즉, 가장 바깥 컨테이너를 가져오게 된다는 뜻이다.

// 해결책은 아래와 같다.
function logProps(Component) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
        // 1차적으로 props 를 분해한다.
        const {forwardedRef, ...rest} = this.props;
  
        // 사용자 정의 prop "forwardedRef"를 ref로 할당합니다.
        return <Component ref={forwardedRef} {...rest} />;
      }
    }
  
    // 단순히 처음 받은 ref를 prop 에 forwardedRef 라는 사용자정의 prop 로 넘겨주는 것이다.
    return React.forwardRef((props, ref) => {
      return <LogProps {...props} forwardedRef={ref} />;
    });
}
