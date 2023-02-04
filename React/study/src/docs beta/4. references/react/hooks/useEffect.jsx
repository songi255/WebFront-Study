/* Client 에서만 실행된다. Server 에서는 실행되지 않는다.
    이 성질을 이용해서, Effect 에서 didMount 라는 state 를 true 로 set 하도록 하면, client와 server 의 내용을 분리할 수 있다.
        - 예를들어, localStorage 에서 값을 읽어야 하는 경우, server 에서는 그럴 수 없다.
        - 연결속도가 느리다면 초기에 엄청 느려지므로, 웬만하면 사용하지 말자. 

*/
