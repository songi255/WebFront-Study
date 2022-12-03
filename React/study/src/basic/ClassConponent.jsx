import React from "react";

// class Component 이다. 몇가지 추가기능이 있다.
class Clock extends React.Component { // React.Component 를 상송해서 만든다.
    constructor(props){ // 마찬가지로.. react element로 component 생성 시 속성들이 props 에 담겨온다.
      super(props);
      this.state = {date: new Date()}; // state의 초기화. 유일하게 constructor에서 state를 직접 대입한다.
    }
  
    componentDidMount(){ // 화면에 그려지는 것을 마운팅된다고 한다. 화면에 그려지면 실행되는 함수이다.
      this.timerId = setInterval(() => { // timerID 처럼, props나 state에 굳이 포함시키지 않는 내용은 이렇게 자유롭게 프로퍼티로 추가해도 된다.
        this.tick();
      }, 1000);
    }
  
    tick(){ // 사용자 정의함수
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

export default Clock;