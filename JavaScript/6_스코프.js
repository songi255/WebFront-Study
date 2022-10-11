// scope = name space
// outer = 상위스코프, inner = 하위 스코프.
// scope chain : 식별자등의 검색은 하위 -> 상위로 올라가면서 검색
// identifier resolution : 동일한 이름의 식별자가 있을 때 어떤 놈을 참조할것인지 결정하는 것

// lexical env : 주변코드가 어떤지? 어디에서 실행되는지? (실행 컨텍스트)
// 전역 lexical env는 스크립트 로드되면 곧바로 생성. 함수 렉시컬 환경은 함수 호출시 곧바로 생성.
// lexical env는 static scope (정적 스코프)이다. 아래 예제를 보자.
function foo(){
    bar();
}

function bar(){console.log("앙기모띠")}

foo();
// 호출이 될까? 동적스코프였다면 가능하다. 왜냐하면 foo정의, bar 정의 후, 뒤에서 foo가 호출될 때 bar를 스코프에서 찾아서 실행시킬테니까.
// 하지만 JS비롯한 대부분은 lexical(static)이다. 무슨말이냐면, foo정의 가 되는 그 시점에 bar의 정의를 scope chain 에서 찾는다.
// bar는 호이스팅이 일어났으니 foo의 상위 스코프에 정의되어있다. 그래서 동작한다.
// 이렇듯 함수는 정의될 때 결정된 상위 스코프를 기억한다.
// 정리하면 호이스팅을 제외하고는 C, Java랑 똑같다.

// dynamic scope 동적스코프 : 함수 정의위치가 중요
// lexical scope 렉시컬 스코프 : 함수실행위치가 중요

// 함수 내 지역변수 : "호출시점"에 동일한 방식으로 호이스팅 됨. 

// 전역객체 : 특수객체. 가장먼저 생성됨. window(js), global(node.js)
// 긴 생명주기로 인해 정말많은 폐혜가 존재하는데, 스코프상에서 종점에 존재하기 때문에 검색속도가 제일 느리다는 점도 있다.

// 전역변수 사용억제 방법
// 1. 즉시실행함수로 감싸기
// 2. 전역에 nameSpace객체 생성하여 그 프로퍼티로써 사용하기 (계층적 구성도 가능) -> 하지만 결국 전역에 할당되므로 그다지 유용하지는 않다.
// 3. 모듈패턴
var counter = (function(){
    var num = 0;
    return {increase(){return ++num;}, decrease(){return --num}};
})();   // 클로저 기능을 사용.
// ES6 모듈 : 파일단위 스코프 적용한다. but 이것보다는 webpack 등 사용하자.
// <script type="module" src="lib.mjs"> -> js말고 mjs로 명시해주자.
