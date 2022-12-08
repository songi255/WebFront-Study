// 1. production build 를 하라. chrome extension 에서 해당 page 가 development build(npm start) 인지 production build(npm run build) 인지 알려준다.
// webpack(걍 밑바닥부터 직접구성할 때), roll up, brunch 등 다양한 도구를 이용한 방법은 https://ko.reactjs.org/docs/optimizing-performance.html 에서 확인하자. (지금은 쓸 일 없다.)


// 긴 목록 (수백~수천줄) 랜더링은 windowing 기법 사용하라 (일부만 먼저 랜더링하고 나머지는 필요에 의해서 하라..)
// react-window와 react-virtualized는 널리 알려진 windowing 라이브러리이다. 목록, 그리드, 표 형식 데이터를 표시하기 위한 컴포넌트를 제공.
// 특정상황에 쓰고싶으면 직접 만들고..


// 성능저하가 눈에 띈다면 재조정을 피하라.
// prop이나 state가 변경되면, 새로 반환된 element와 이전에 렌더링된 element 비교해서 재랜더링을 결정한다.
function shouldComponentUpdate(nextProps, nextState) {
    // class Component 내에서 오버라이딩하는 것이다.
    return true;
}

// 대부분 React.PureComponent에서 상속 받아 얕은비교를 통해, 재작성없이 쓸 수 있다고 한다.
class CounterButton extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
    
    // 여길보면 SCU 를 재정의하지 않았다. PureComponent 상속만으로 모든 prop 에 대한 얕은 비교를 진행한다.

    render() {
      return (
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({count: state.count + 1}))}>
          Count: {this.state.count}
        </button>
      );
    }
}

// 얕은 비교는 배열등이 변해도 참조는 안변해서 무시될 수 있다. 이런 경우, state 나 props 를 변경하기 보다 아예 새 객체를 만들어주면 해결된다.
function updateColorMap(colormap) {
    // 배열의 경우에는 spread 문법 사용, Object는 아래 참고..
    return Object.assign({}, colormap, {right: 'blue'}); // 근데 이제 객체도 spread 되잖아? 걍 사용하면 될듯...
}

// 이렇게 불변성을 이용하면 비용이 좀 클텐데.. 이건 고려해봐야 할 것같다.
// 만약 깊게 중첩된 객체에 불변성을 적용하고 싶다면, Immer 혹은 immutability-helper 라이브러리를 사용해보자.

