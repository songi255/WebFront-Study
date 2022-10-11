/*
브라우저 렌더링 과정
    1. 리소스 요청 및 응답
    2. DOM, CSSOM 생성
        - 바이트 -> 문자 -> 토큰 -> 노드 -> DOM
        - DOM 해석 중 link 로 CSS를 불러와야하면, 파싱 일시중지 후 리소스 요청
        - CSS가 도착하면 파싱하여 CSSOM 생성 후 DOM 파싱 재개
        - JS를 불러와야하면 파싱을 위해 제어권이 JS 엔진으로 넘어간다. 즉, 렌더링엔진과 JS엔진이 따로있다.
    3. JS 파싱, AST(Abstract Syntax Tree) 생성. DOM, CSSOM 조정
        - AST를 기반으로 인터프리터가 실행할 수 있는 중간코드(바이트코드)를 생성한다.
            1. tokenizing : lexing이라고 부르기도 하지만, tokenizing과 미묘한 차이가 있다.
            2. parsing : syntactic analysis하여 AST생성.
            - AST를 이용하면 TypeScript, Babel, Prettier 같은 transpiler를 구현할 수도 있다. (인터프리터나 컴파일러만이 사용하는것이 아니다.)
                - https://astexplorer.net에 다양한 오픈소스 JS파서를 이용하여 AST를 생성해볼 수 있다.
            - 참고로, V8엔진의 경우 자주사용되는 코드는 TurboFan이라는 컴파일러에 의해 optimized machine code로 컴파일되어 성능 최적화한다.
                - 코드 사용 빈도가 적어지면 다시 deoptimizing 하기도 한다.
        - DOM + CSSOM 하여 render tree 생성.
            - render tree는 렌더링을 위한 트리이다.
            - 즉, display: none 등등.. 화면에 표시되지 않는 노드들은 포함되지 않는다.
    4. 렌더트리 기반 페인팅
    - 이렇게, HTML파싱은 위에서 아래로 동기적으로 진행된다. 그래서 script 태그의 위치는 매우 중요하다.
        - 웬만하면 body태그 제일 아래에 쓰자.
            - 아직 생성안된 DOM 접근에러 발생가능
            - 렌더링이 일단 먼저되기 때문에 페이지 로딩시간 단축
        - 다만 이 JS 파싱에 의한 DOM 생성 중단을 해결하기 위해 HTML5부터 태그가 추가되었다.
            - async
                - HTML파싱과 JS의 로드가 비동기적으로 동시진행된다.
                - JS 파싱과 실행은 JS 로드가 완료된 직후 진행되며, 이때 HTML파싱이 중단된다.
                - 여러개의 script에 async 적용하면 뭐가 먼저 실행될 지 모른다. 로드된 순서대로 실행되므로..
            - defer
                - async 처럼, 로드가 비동기적으로 동시진행된다.
                - 다만 JS 파싱과 실행은 HTML 파싱이 끝난 직후 실행된다.
                    - (HTML 파싱이 끝나면 DOMContentLoaded 이벤트가 발생한다.)!!!!!!!!!!!!!
            - <script async src="~~"></script> 같이 단항으로 사용한다.
            - 위 두 태그는 src를 통해 외부 js를 로드하는 경우에만 사용할 수 있다.
            - 즉, src가 없는 인라인 script 태그에는 사용할 수 없다.



위 렌더링 과정은 반복실행될 수 있다.

    1. JS에 의한 DOM 변경
    2. 브라우저 창 resizing에 의한 viewport 크기 변경
    3. HTML 요소의 레이아웃 변경 발생시키는 스타일의 변경 (w, h, m, p 등등..)
    성능에 악영향을 주므로 가급적 리렌더링을 줄여야 한다.
    - reflow : 레이아웃의 재 계산
        - 레이아웃이 바뀌지 않으면 실행하지 않으므로, repaint만 실행되기도 한다.
    - repaint : 렌더트리 기반 다시 페인트

개발자도구의 Network 탭을 보면 응답 리소스를 볼 수 있다.
    - 외부리소스 로드 태그를 만나면 파싱을 일시중지하고 리소스 요청부터 한다.


HTTP 1.1 (1999)
    - connection 당 하나의 요청과 응답만 처리
        - 즉, 리소스들을 다운받으려면 개별적으로 요청, 응답해야 함. (개수에 비례하여 응답시간 증가)

HTTP 2.0 (2015)
    - connection 당 다중 요청, 응답 가능
        - 1.1 대비 50%정도 빠르다고 알려져있음















*/