import React from "react";

// 이벤트
////////////////////////////////////////////////// functional component 의 경우.....
function Form() {
    // html에서는 dom 기본동작을 방지하기 위해 false 호출로 막는 경우가 있다고 한다.
    <form onsubmit="console.log('You clicked submit.'); return false">
        <button type="submit">Submit</button>
    </form>
    // 이런식으로.. 그러나 react에서는 이런 방식으로 막지 못한다.

    function handleSubmit(e) { // 사용자 정의함수
      e.preventDefault(); // 명시적으로 preventDefault를 호출해주어야 한다.
      // e는 일반 이벤트가 아니고 합성이벤트이다. react가 w3c 명세에 따라 정의하기 때문에 브라우저 호환에 걱정할 필요가 없다. 고유 이벤트와 정확히 동일하게 동작하지는 않는다.
      console.log('You clicked submit.');
    }
  
    return (
      <form onSubmit={handleSubmit}> {/* 핸들러등록은 ""로 하지 않고 함수객체를 직접 준다. (함수객체등록이니 직접 적으려면 람다로 적어야 할 듯) */}
        <button type="submit">Submit</button>
      </form>
    );
}
  
/////////////////////////////////////////////////// class component 의 경우..
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

// 핸들러에 인자전달 -> 걍 함수호출하듯이 적으면 된다. 그게 어색하다면 bind 사용.

//화살표함수 사용 (얘는 호출할때마다 함수가 만들어질거같은데..)
// <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

// bind 사용 -> 이게 좀 더 직관적으로 보이네...
// <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

