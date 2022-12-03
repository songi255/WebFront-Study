import React from "react";

//list로 요소 생성하기
function NumberList(props) {
    const numbers = props.numbers; // numbers 라는 list 를 받았다.
    
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>{/* key 는 문자열이다. 누락하면 경고뜬다. */}
        {number}
      </li>
    ); // list의 모든 원소를 걍 li 로 치환했다. 즉, li react element 들이 담긴 list 이다.

    // 정 쓸 key가 없을때 최후의 수단으로 index를 쓴다.(명시하지 않으면 기본적으로 index로 key 만든다.)
    // key는 컴포넌트로 전달되지는 않는다. 즉, li 는 props.key를 읽을 수 없다. 만약 읽을 필요가 있다면, 다른 이름의 prop으로 명시적으로 전달하도록 한다.

    return ( // 아래처럼, 주변에서 쓸 때만 의미가 있다. 대부분 map 함수 안에서 넣어주는일이 많다고 한다.
      <ul>{listItems}</ul>
    );

    // 이렇게 바로 사용할 수도 있다.
    <ul>
        {numbers.map((number) =>
            <ListItem key={number.toString()} value={number} />
        )}
    </ul>
    // li 를 안쓰고 ListItem 을 쓴 이유는 몰?루.
}