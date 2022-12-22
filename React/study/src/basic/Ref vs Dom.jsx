// 일반적으로는 props 를 이용해서 자식을 재랜더링한다.
// 하지만 가끔 직접 수정해야 하는 경우가 있다. 대상은 react 컴포넌트일수도, DOM 일 수도 있다.

// Ref를 사용해야 할 때 예시
//  - focus, text 선택, media 재생관리
//  - animation 직접 실행시킬 때
//  - 서드 파티 DOM 라이브러리를 React와 같이 사용할 때.
// 남용하지 말 것! 만약 "어떤 일이 일어나게 할 때" 사용한다면, 상태를 소유할 계층이 대부분 더 높은 계층일 것임.


// 선언적으로 해결될 수 있는 문제에서는 ref 사용을 지양하세요.
//  - Dialog 컴포넌트에서 open()과 close() 메서드를 두는 대신, isOpen이라는 prop을 넘겨주세요.



// current 는 마운트 될 때 DOM 과 연결, 언마운트 될 때 null 이 된다.
// componentDidMount 또는 componentDidUpdate 생명주기 메서드가 호출되기 전에 업데이트 된다.


// 함수형 컴포넌트는 인스턴스가 없어서, forwardRef (높은 확률로 useImperativeHandle와 함께) 를 사용해야 한다.


// callback ref
// ref 설정, 해제를 세세하게 다룰 수 있다.
class CustomTextInput extends React.Component {
    constructor(props) {
      super(props);
  
      this.textInput = null;
  
      // React.createRef() 대신 커스텀 callback 을 사용해서 DOM이나 element를 저장하고 있다.
      this.setTextInputRef = element => {
        this.textInput = element;
      };
      // componentDidMount 또는 componentDidUpdate가 호출되기 전에 호출된다.
      // 언마운트시에는 ref 가 null 인 채로 호출된다.


      this.focusTextInput = () => {
        // DOM API를 사용하여 text 타입의 input 엘리먼트를 포커스합니다.
        if (this.textInput) this.textInput.focus();
      };
    }
  
    componentDidMount() {
      // 마운트 되었을 때 자동으로 text 타입의 input 엘리먼트를 포커스합니다.
      this.focusTextInput();
    }
  
    render() {
      // text 타입의 input 엘리먼트의 참조를 인스턴스의 프로퍼티
      // (예를 들어`this.textInput`)에 저장하기 위해 `ref` 콜백을 사용합니다.
      return (
        <div>
          <input
            type="text"
            ref={this.setTextInputRef}
          />
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
        </div>
      );
    }
  }


  
// 문자열 ref : 레거시로, 없어진다. 다만 간략하게 말하자면 'textInput' 처럼 주고 this.refs.textInput 처럼 접근하는 것이다.



// 콜백 ref에 관한 주의사항
// ref 콜백이 인라인 함수로 선언되있다면 ref 콜백은 업데이트 과정 중에 처음에는 null로, 그 다음에는 DOM 엘리먼트로, 총 두 번 호출됩니다.
// 매 렌더링마다 ref 콜백의 새 인스턴스가 생성되므로, React가 이전에 사용된 ref를 제거하고 새 ref를 설정해야 하기 때문에 일어납니다.
// ref 콜백을 클래스에 바인딩된 메서드로 선언함으로써 해결할 수 있습니다.
// 하지만 많은 경우 이러한 현상은 문제가 되지 않는다는 점을 기억하세요.