/* 빌트인객체 분류
    1. standard built-in objects / native objects / global objects  - 표준 빌트인 객체
      - ECMAScript 사양에 정의 된 객체. 환경과 관계없이 언제나 사용가능
    2. host object 호스트 객체
      - ECMAScript 사양에는 정의되있지 않음
      - 실행환경에서 추가로 제공하는 객체
      - 브라우저 - DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web Worker 등
      - Node.js - 
    3. user-defined objects 사용자 정의 객체
*/

// Math, Reflect, JSON을 제외한 모든 빌트인객체는 생성자함수이다.
// 달리말하면, 위 3가지는 정적 메서드만 제공한다.

// wrapper 객체
// 원시값은 객체가 아니다. 객체처럼 접근하면 임시 객체를 생성하는데, 이를 래퍼객체라고 한다. (Symbol 포함)
var str = 'abc'; // 원시객체이다.
str.name = "안녕";
// 1. .으로 객체처럼 접근했으므로 wrapper 생성한다.
// 2. 생성된 wrapper의 [[stringData]] 에 'abc'를 할당한다.
// 3. 생성된 wrapper 객체의 name 프로퍼티를 할당한다.
// 4. 연산이 끝났으므로 다시 원시값으로 되돌린다.
// 즉, 원시값에 객체처럼 접근하면 래핑 -> 연산 -> 언래핑 을 수행한다.
console.log(str.name); // undefined. 왜? str.name 할때마다 새로운 wrapper 객체가 생성되니까! name이 저장된 wrapper 객체는 이미 가비지가 되었고 이건 새로운 객체이다. 그래서 name 이 없다!
//null.name // null, undefined는 원시값이지만 래퍼가 없다. 따라서 이렇게 접근시 에러가 발생한다.

/* 전역객체
    - 브라우저 - window, self, this, frames (모두 동일객체를 가리킴)
    - Node.js - global, this.
    - confirm.log(globalThis); // globalThis는 실행환경에 상관없이 전역객체를 가리킨다. (ES11)

    - 프로퍼티
      - 표준빌트인객체, 호스트객체, var 전역변수, 함수 를 프로퍼티로 가진다.
      - let과 const 변수는 제외된다. 보이지 않는 개념적 블록인 전역렉시컬환경의 선언적레코드 내부에 있다.

    - 특징
      - 의도적생성 불가능
      - 프로퍼티 참조시 객체식별자(window 같은) 생략가능.
      - 모든 스크립트에서 유일 (공유)
*/

// 빌트인 전역 프로퍼티
Infinity; // Number타입. 3/0 같은 연산 시에도 반환된다.
NaN; // Number 타입. Number.NaN === NaN
undefined;
null; // etc...

// 빌트인 전역 함수
eval("console.log('앙기모띠')"); // eval은 "" 내의 코드를 실행한다. 여러 문장 실행 시 맨 마지막 실행결과를 반환한다.
const o = eval("({a:1})"); // 객체, 함수 리터럴은 반드시 ()로 감싸야 한다.

eval("var x = 5;");
console.log(x); // 애초에 그 위치에 있었던 코드처럼 나온다! 하지만 strict mode에서는 eval 만의 스코프를 생성하므로 외부에 반영되지 ㅇ낳는다.\
eval("let y = 5;"); // let, const의 경우 암묵적으로 strict mode로 적용된다.
// but, eval로 사용자입력 컨텐츠 실행(untrusted data)는 보안에 취약하다.
// 최적화도 실시되지 않아 속도가 느리므로 사용금지이다!!

isFinite(10); // 정상적인 유한수인가?
isFinite(Infinity); // false
isFinite(null); // 0으로 파싱가능한 값은 true가 나와버린다. "" 라던가..

isNaN(new Date()); // 이건 또 false 나온다. 숫자로 취급되나봄.
isNaN(new Date().toString()) // 이건 또 true이다...

parseFloat("32 years"); // 32. 공백으로 separated 됬다면 첫 segment만 반환한다.
parseFloat("year 32"); // NaN. 첫 문자열만 검사하기 때문에..

parseInt("10.1234"); // 10
parseFloat(10.3) // 10. 이렇게 문자열이 아닌경우 -> 문자열로 변환 -> 해석 을 해버린다.
parseFloat(10, 2) // 두번째 인수로 진법을 적용할 수 있다.
// 그럼 반대로 숫자 -> 진법문자열은?
console.log(Number(15).toString(2)); // 1111. Number.prototype.toString 이용!!
parseInt('0xf'); // 16진수로 잘 해석한다. 하지만 0x나 0b는 더이상 해석불가(ES6) -> 0 이후가 무시되어 0으로 해석된다.


/* URI (Uniform Resource Identifier)
    - 인터넷에 있는 자원을 나타내는 유일한 주소
    - https://www.mydomain.com:80/docs/search?category=javascript&lang=ko#intro
      - schemes : https://
      - Host(Domain) : www.mydomain.com
      - Port : :80
      - Path : /docs/search
      - Query String : ?category=javascript&lang=ko
      - Fragment : #intro
    - 하위개념(URI의 두 형태)
      - URL (Uniform Resource Locator) -> query string 전까지를 의미
        - 정확하게 말하자면 어떤 리소스가 있는 "주소" 를 의미한다.
      - URN (Uniform Resource Name) -> http://를 제외한 모든 것
        - 역시 정확하게 말하자면 "주소" 에 관계없이 해당 자료를 가리킬 수 있는 "이름" 을 말한다.
*/

/* encoding
    - URI의 문자들을 이스케이프 처리 하는 것
      - 이스케이프 처리
        - 어떤 환경에서든 읽을 수 있게 ASCII로 변환하는 것
        - 알파벳, 숫자, -_.!~*'()는 처리에서 제외
        - %, ?, # 처럼 의미가 있는 문자 처리
        - URL에 올 수 없는 문자 (한글, 공백) 처리
        - 혹은 <, > 같은 시스템에 의해 해석될 수 있는 문자 처리
*/

// encodeURI / decodeURI
var uri = "https://www.mydomain.com:80/docs/search?name=이웅모&lang=ko#intro";
var enc = encodeURI(uri);
console.log(enc); // https://www.mydomain.com:80/docs/search?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&lang=ko#intro
var dec = decodeURI(enc);
console.log(dec); // https://www.mydomain.com:80/docs/search?name=이웅모&lang=ko#intro

// encodeURIComponent / decodeURIComponent
// 차이점은, URN같이, 쿼리스트링의 일부분같이, 그런 부분이라고 간주하기 때문에, 쿼리스트링 구분자 + a 까지 인코딩해버린다.
var enc = encodeURIComponent(uri); 
console.log(enc); // https%3A%2F%2Fwww.mydomain.com%3A80%2Fdocs%2Fsearch%3Fname%3D%EC%9D%B4%EC%9B%85%EB%AA%A8%26lang%3Dko%23intro
var dec = decodeURIComponent(enc);
console.log(dec); // https://www.mydomain.com:80/docs/search?name=이웅모&lang=ko#intro

