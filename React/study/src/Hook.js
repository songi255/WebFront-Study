// hook 에 관련된 내용 정리
// 점진적 도입 가능하다. 

/* 도입배경
    - 컴포넌트사이의 상태로직을 재사용하기가 어렵다. (wrapper hell)
    - 컴포넌트들이 복잡해진다
    - class 의 this 등 너무 혼란스럽다.
   그래서 뭔데?
    - react 생명주기에서 state 를 관리하게 해주는 것.
   결국 이거 쓸거면 function 으로 쓰는게 맞는 듯. class 말고...
*/



import React, {useContext, useEffect, useState} from "react";

function Example(){
    const [count, setCount] = useState(0); // hook 으로 state 를 추가했다. 재랜더링되도 유지된다.
    // counter 예제이니 초기값을 0으로 줬는데(초기랜더링에 딱 1번 사용됨), class의 state 와 다르게 꼭 객체가 아니어도 된다.
    // class 의 .setState 와는 이전 state 와 새 state 를 합치지 않는다는 차이점이 있다.
    const [age, setAge] = useState(42); // 여러개 선언도 가능. destructuring 한다.
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

    // 데이터를 가져오거나 구독, DOM 조작 등을 side Effect 하고 한다. 아래는 componentDidMount/Update/WillUnmount 같은 목적으로 제공되는 것이다.
    useEffect(() => { // DOM 조작 후 시행될 함수이다(매 랜더링마다). props 와 state 에 접근할 수 있다.
        document.title = `You clicked ${count} times`;
        
        return () => { // effect 를 해제할 필요가 있을 경우 해제함수를 반환하면 된다. (optional)
            // do something. 재랜더링 말고도 component 가 unmount될 때도 실행된다.
        }
    });

    useEffect(() => { // useState 처럼 여러개를 사용할 수 있다.

    })

    // 지켜야 할 것은 2가지가 있는데,
    //   1. 최상위에서만 호출할 것 (반복문같은데서 호출금지)
    //   2. react 함수 컴포넌트 내에서만 호출할 것


    // 보편적이진 않지만 유용할 수 있는 내장 Hook들
    const locale = useContext(LocalContext); // 컴포넌트 중첩 없이 react context 를 구독할 수 있게 해준다.

    const [todoss, dispatch] = useReducer(todoReducer); // 복잡한 컴포넌트들의 state를 reducer 로 관리할 수 있게 해준다.


    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

// custom Hook
// 가끔 상태관련 logic 을 재사용하고 싶은 경우가 있다.. higher order components 와 render props 가 바로 그것이다. 대신 custom Hook 을 써보자.
function useFriendStatus(friendID){ // custom Hook
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status){
        setIsOnline(status.isOnline);
    }
    
    // custom Hook 은 기능이라기보다는 convention에 가깝다. 이름이 use 로 시작하고 안에서 다른 Hook을 호출한다면 custom Hook 이라고 부를 수 있다.
    // use 라는 이름은 linter 에도 도움이 된다.
    useEffect(() => { // 다른 Hook 을 사용했다.
        //~~~
        return () => {
            // ~~~
        }
    })
    return isOnline;
}

// custom Hook 사용
function FriendStatus(props){
    const isOnline = useFriendStatus(props.friend.id);

    if(isOnline === null){
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props){
    const isOnline = useFriendStatus(props.friend.id);

    return (
        <li style={{color: isOnline ? 'green' : 'black'}}>
            {props.friend.name}
        </li>
    );
}
// 각 컴포넌트의 state 는 완전히 독립적이다. 그래서 심지어 한 component 안에서 같은 custom Hook 을 2번 쓸수도 있다.
// 폼 핸들링, 애니메이션, 선언적 구독(declarative subscriptions), 타이머 등 많은 경우 사용하면 좋다.
