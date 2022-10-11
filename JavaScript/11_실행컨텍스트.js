/* 소스코드 타입
    ECMAScript는 소스코드를 4가지 타입으로 구분한다.
    1. global code 전역코드
        - 전역에 존재하는 코드 의미
        - 함수, 클래스 내부코드는 포함되지 않음
        - 최상위 스코프인 전역 스코프 생성. 전역객체와 연결하여 참조를 연결한다.
    2. function code 함수 코드
        - 함수 내부 코드
        - 함수 내부의 중첩함수, 클래스는 포함되지 않음
        - 지역변수, 매개변수, arguments 객체를 관리해야 함.
        - 생성한 local scope를 global scope의 일원으로 연결
    3. eval code 
        - eval()에 의한 코드
        - strict 모드에서만 생성
    4. module code 모듈코드
        - 모듈내부의 코드
        - 함수, 클래스 등의 내부코드는 미포함
    위 4가지 소스코드는 실행컨텍스트를 생성하는데, 분류하는 이유는 생성과정과 관리내용이 다르기 때문이다.



*/

/* 소스코드의 실행 (필요하면 369쪽 그림 참고)
   기본적으로, 런타임 이전에 실행 컨텍스트를 생성하고, 선언문들을 모두 등록한 뒤(평가)에 런타임이 시작(실행)되는 건 알 것이다. 구체적으로 어떻게 동작할까?
    1. 전역코드 평가
        - global execution context -> running execution stack 에 push된다.
            - global lexical environment
                - global EnvironmentRecord
                    - Object Environment Record (객체 환경레코드 생성)
                        - 기존 전역객체의 동작을 의미한다.
                        - bindingObject -> window (전역객체 그 자체를 의미하는게 아니고, 환경레코드 내에서 bindingObject 슬롯으로 window를 가리킨다.)
                            - 이 슬롯을 통해 var 전역변수나 전역함수가 프로퍼티로 바인딩되고, 이 슬롯을 통해 검색하므로, 객체이름 없이 사용할 수 있다.
                    - Declarative Environment Record (선언적 환경레코드 생성)
                        - var밖에 없어 모든 전역변수가 전역객체의 프로퍼티가되던 ES6이전까지는 혼자서 수행했으나, let, const를 관리하기 위해 두 컴포넌트가 협력한다.
            - this binding : [[GlobalThisValue]] -> window
            - OuterLexicalEnvironmentReference -> null
    2. 전역코드 실행
    3. 함수코드 평가
        - 전역코드가 실행중에, 함수를 만나면 실행에 앞서 다시 평가를 하고 컨텍스트를 생성한다!!
    4. 함수코드 실행
    이렇게 식별자를 관리하고, 상태변화를 관리하며, 스코프체인을 생성하고, 함수호출에 의한 코드 실행순서 변경까지... 모든 것을 관리하는 것이 실행컨텍스트이다.
    
    execution context (실행컨텍스트) 는 lexical Env 와 execution context stack 으로 구성된다.
        
        1. 식별자와 스코프는 "lexical Environment (렉시컬 환경)" 으로 관리한다
            - 식별자와, 바인딩값, 상위스코프 참조를 기록하는 자료구조.
            - 실행컨텍스트를 구성하는 컴포넌트이다.(lexical scope의 실체이다.)
            - Execution context는 lexical Env 컴포넌트 와 Variable Env 컴포넌트로 구성된다.
                - 생성 초기에 둘은 동일한 lexical Env를 참조하지만, 몇가지 상황(클로저인듯?) 을 만나면 Variable Env를 위한 새로운 Lexical Env를 생성하여, 내용이 달라질 수도 있다.
                - Execution context -> {lex, var} 이고(내부에서 참조하고 있다는 말) lex와 var이 동일한 lex 컴포넌트를 가리키고 있다. 즉, lex가 lex, var의 컴포넌트 실체로써 작동한다는 말
            - 그럼 이제, lexical Environment는 무엇으로 구성되어있는지 알아보자!!
                - EnvironmentRecord 환경레코드 -> 식별자-값 바인딩 저장소이다. 소스코드타입에 따라 관리내용에 차이가 있다.(함수면 arguments도 추가로 관리하고.. 머 그런거 말하는 듯)
                - OuterLexicalEnvironmentReference -> 딱봐도 먼지 알겠제? 단방향 linkedList이다.
        
        2. 코드 실행순서는 "실행 컨텍스트 스택" 으로 관리한다.
            - [ 전역실행컨텍스트 - 함수1 실행컨텍스트 - 함수2 실행컨텍스트.... ] 이런식으로 쌓여서..
            - 최상위에 존재하는, 현재 실행중인 컨텍스트를 running execution context (실행중인 실행컨텍스트) 라고 한다.

    정리하면, execution context stack 안에 execution context가 쌓이고, 각각은 자신의 lexical Environment를 참조하고 있다.

    이제 함수 foo를 호출하는 경우를 생각해보자. foo는 global lexical Env 내에 존재한다.
    1. execution context가 생성되어 stack에 push된다
    2. lexical Environment를 생성하여 참조한다.
    3. Function Environment Record를 생성한다. (이점이 전역코드와 다르다. 전역코드는 Object record를 만들어 관리했자나)
        - arguments, 매개변수 등등... 추가적으로 다른 정보들을 가지고 있다. (전역코드의 Object Record에서는 bindingObject가 있었다.)
    4. lexical Environment에 추가 바인딩한다.
        - OuterLexicalEnvironmentReference에 상위인 전역 렉시컬 환경을 바인딩한다. [[Environment]]에 바인딩한다. -> lexical scope 구현 매커니즘이 된다.
            - 호출위치가 아니고, 정의위치에 따라  상위스코프를 결정한다.(C, Java랑 똑같지. 호출위치에서 결정하면, 함수 호출전에 외부에서 x를 정의하면 함수가 거기에 영향을 받아야 한다.)
        - this 바인딩한다. [[ThisValue]]에 바인딩된다.

*/

// 용어 : identifier resolution : 식별자 결정 -> 동일이름의 여러 식별자가 있을 수 있고, 그중 무엇을 참조하면 되는지 결정하는 것.

/* block level scope
    let, const는 그냥 빈 블록 {} 안에서도 스코프를 갖는다고 했다. 이는 모든 블록 (빈블록, if, try, while, for 등등)이 실행될 때 마다 독자적으로 lexical Env를 만든다는 뜻이다.
    실행시, execution context는 만들지 않는다. 다만 BLOCK lexical Environment를 따로 만들고, running execution context(현재 실행중인 실행컨텍스트) 의 참조를 일시적으로 여기로 연결한다.
    당연히 이 Block lexical Env는 기존 execution context의 lexical Env를 Outer..Reference로써 참조한다. 수행이 끝나면 다시 참조를 되돌린다.

    for문에 let을 사용하면? -> loop 돌 때 마다 새로운 lexical Env를 생성하는것이다!! ㅋㅋ let은 재할당할 수 없으니까!!


*/
