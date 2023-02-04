/* CSS-in-JS 사용자용이다. Effect 인데, DOM 변형 전에 실행되는 버전이다.
    - 그래서 CSS-in-JS 사용안하면 아마 useEffectEvent 를 쓰게 될 것이다.

    client 에서만 실행되며, 내부에서 state 를 변경할 수 없고, 아직 DOM 변형 전이므로 ref 도 할당되지 않은 상태이다.
    
    사용은 걍 () => { // css 주입코드 } 콜백 제공하는 것 뿐이므로, 굳이 적지는 않겠다.
*/
