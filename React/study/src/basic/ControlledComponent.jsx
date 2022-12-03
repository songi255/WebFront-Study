import React from "react";

// input, textarea, select 같은 폼 엘리먼트는 일반적으로 자신의 state를 관리하고 업데이트한다. (현재 입력된 value 같은거..)
// react에서는 state에 setState로 업데이트하도록 value props를 이용하여 바인딩할 수 있다.

// 이때 제어컴포넌트(controlled components) 기술이 표준이다. react 에 의해 값이 제어되는 form element(입력개체) 를 의미한다.

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
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          {/* value가 react state의 값에의해서만 변경되고(기존이벤트 무시), 단지 state value 를 할당하는 것 만으로 react state 에 bind 되어 랜더링된다. */}
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
// 이렇게 value를 사용하는 순간 controlled component가 되기 때문에, 의도하지 않는 한 사용자가 변경할 수 없다(막힌다).
// 혹시 수정이 된다면 null이나 undefeined가 실수로 들어간 경우이다..
// 대안적으로 비제어컴포넌트가 있고, Formik을 사용하면 유효성검사, 방문필드 추적, 폼 제출처리 같은 완벽한 해결책을 가질 수 있다.