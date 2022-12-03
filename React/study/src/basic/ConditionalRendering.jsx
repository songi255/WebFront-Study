import React from "react";

// 조건부 렌더링
// 결론은 if, 단축평가, 삼항연산자 등등.. 써서 {comp} 같이 써서 return 을 둘로 나눌수도 있다. 여기서는 element를 이용해보자.
// 로그인, 로그아웃 버튼이 있다.
function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
}
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
        Logout
        </button>
    );
}

// 아래 컴포넌트에서 조건부로 랜더링
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) { // if 를 사용하는 것은 똑같다. if도 좋은 방법이다.
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        } // 이게 의미하는 바는, 당연히 삼항연산자도 사용할 수 있다는 것이다.

        if (!isLoggedIn) return null; // 이런식으로, 아예 랜더링하고싶지 않다면 null을 반환하면 된다.
        // 랜더링만 안되는것이지, 컴포넌트 자체의 생명주기에는 영향을 주지 않는다. 즉, componentDidUpdate같은게 호출된다.
        return (
        <div>
            <Greeting isLoggedIn={isLoggedIn} />
            {isLoggedIn  && // JSX의 기능. &&로 단축평가처럼 랜더링여부를 결정할 수 있다. 다만, false일 경우, falsy값, 즉 0 이 랜더링될 수도 있다. 주의.
            <h2>
                You have logined unread messages.
            </h2>
            }
            {button}
        </div>
        );
    }
}

export default LoginControl;