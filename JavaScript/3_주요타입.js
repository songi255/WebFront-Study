/*
    데이터 타입 : 따로 없다.
    Number : 64bit 부동소수점
        - Infinity, -Infinity, NaN(Not a Number)
    string : ``, "", '' 다 가능. 일반적으로 ``(백틱)사용
        - 배열이 아닌 객체로 표현. 상수임.
        - 템플릿 리터럴(백틱사용) : `he is ${expression} years old` -> 변수 삽입가능
        - 멀티라인 : \n 필요없이 그냥 치면 된다.
        - /v 수직탭, /uXXXX 유니코드
    undefined : 초기화 되지 않은 것을 의미하므로 이것을 임의로 할당하지 말것.(하고싶으면 null 사용)
    null
    boolean
    Symbol : 변경불가능 원시타입. 다른값과 중복되지 않는다.
        - var key = Symbol('key')같이 Symbol함수 사용
        - 값은 외부에 노출되지 않음
    위 6가지 원시타입을 제외한 나머지 -> 모두 Object 타입임.(Function, Array도 Object임.)
    원시타입은 읽기전용의 불변값이다. -> 엄밀히 말해 재할당을 통해 교체하는 것이지 값을 바꾸는 것은 아님. 즉, 메모리 주소값이 바뀐다.
*/

// String
var str = "Hello World!";
console.log(str[1]); // 유사배열객체이므로 인덱스접근가능.
// 읽기전용 원시값이기때문에 변경할 수 없다. 재할당은 얼마든지 가능하다.

// 변환
// 표준 빌트인 생성자
var str = String(NaN);
var x = 1;
// Object.prototype.toString()
str = x.toString(); // str = 1.toString()은 안되네.
// 묵시적 변환
str = 15+"";



// Number
// 변환
Number();
parseInt("14"); parseFloat("15.5"); // 전역객체 window의 메서드
+"1"; //묵시적 변환

// Boolean
// 변환
!!"Hello"; // ""제외한 모든 문자열 = true
// boolean으로 변환되는 Object들을 Truthy/Falsy로 구분한다. NaN, null, undefined, 0, ''이 falsy이다.

// Object
// 원시타입을 제외한 모든것(함수, 배열)은 객체
// 원시타입은 변경불가능. 그 외 객체는 변경가능임.


