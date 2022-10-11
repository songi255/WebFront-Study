// Number

const numObj = new Number(); // 아무것도 전달하지 않으면 0이 저장된 wrapper 객체를 반환한다.
// [[NumberData]] 에 값이 저장되는데, 크롬에서 실행하면 [[PrimativeValue]] 라고 뜬다. ES5에서 부르던 방식이다.
const numObj2 = new Number("asef"); // 숫자가 아닌 값을 전달하면 강제 변환한다. 변환조차 하지 못하면 NaN을 할당한다.
Number('10.53'); // new 없이 호출하면 wrapper가 아닌 숫자를 반환한다. 이를 이용해서 명시적 타입변환 가능하다.

Number.EPSILON; //그 엡실론 맞다. 1과 1바로 다음 숫자간 차이와 같다. 약 2.22 * 10^-16 이다.
// 그래서 어디에 쓰나? IEEE 754 방식으로 인한 부동소수점 오차를 해결하기 위해 사용한다.
Math.abs( (0.1 + 0.2) - 0.3 ) < Number.EPSILON; // 이렇게.. 감각적이다.

Number.MAX_VALUE < Number.POSITIVE_INFINITY; // true;
Number.MIN_VALUE > Number.NEGATIVE_INFINITY;
Number.MAX_SAFE_INTEGER; // 안전하게 표현할 수 있는 가장 큰 정수값. 9007199254740991
Number.MIN_SAFE_INTEGER;
Number.NaN == window.NaN; // true

// ES6 도입
// Number의 메서드 특징은, 인수를 암묵적 숫자변환 하지 않는다는 것이다. 즉, "123"같이 문자열로 넘겨줄 수 없다.
Number.isFinite(Infinity); // false. Inf여부만 판단한다.
Number.isFinite(NaN); // false
isFinite("32"); // true. 이건 빌트인 전역함수인데, Number.isFinite와는 다르다. 전달된 인수를 숫자로 암묵적 변환하기 떄문이다.
Number.isFinite("32"); // false. 인수를 암묵적변환하지 않는다. 다른타입은 무조건 false이다.

Number.isInteger(3.2); // false. 정수여부 판단.
Number.isInteger(Infinity); // false

Number.isNaN(undefined); // false. 마찬가지로 타입이 달라 false이다.
isNaN(undefined); // true. 암묵적 변환에 의해 und는 NaN이 된다. 이게 차이다.

Number.isSafeInteger(100000);

(77.1234).toExponential(4); // 7.7123e+1 즉 매개변수는 소숫점 길이이다. 기본값은 5이다. 리터럴에는 이런식으로 () 를 사용하자!
// 77.toExponential(); 이렇게 이러털에 쌩으로 바로쓸 수는 없다. 왜냐하면 숫자 바로뒤의 .은 모호하기 떄문이다.(소숫점일수도, 프로퍼티 연산자일수도.. JS 엔진은 소숫점으로 해석한다.)
77 .toExponential(); // 그래서 이렇게도 쓸 수 있긴 하다. JS엔진은 정수부와 소수부 사이에 공백을 허용하지 않으므로 프로퍼티 접근자로 해석하기 떄문이다... 그냥 그렇다고.. () 쓰자.

(12345.6789).toFixed(1); // 소숫점 자리수. 기본값 0

(12345.6789).toPrecision(0); // 12345.6789. 유효숫자 지정이다. 0을 주면 전체자릿수가 유효하다.
(12345.6789).toPrecision(3); // 1.23e+4. 지정한 자릿수로 표현할 수 없는 경우 지수표기법을 사용한다.
(12345.6789).toPrecision(6); // 12345.7. 지정자릿수까지 표현 후 반올림

(10).toString(2); // 2진수로 반환.


//Math
// 상수와 함수를 제공한다. 그래서 생성자함수가 아니다.

Math.PI;
Math.abs(null); // 0
Math.abs([]); // 0
Math.abs(undefined) // NaN
Math.abs({}); // NaN
Math.abs(); // NaN

Math.round(); // 정수로만 반환한다.
Math.ceil();
Math.floor();

Math.sqrt();
Math.random(); // 0 <= x < 1
Math.pow(2, 8); // pow 대신 아래 지수연산자를 사용하자. 
2 ** 2 ** 2; // 16. ES7 부터 도입된 지수연산자를 사용하자.

Math.max(); // 지수가 전달되지 않으면 -Inf 반환


// Date
// 밀리초까지 반환
// UTC(Coordinated Universal Time 협정 세계시)는 국제 표준시를 말한다.
// GMT(Greenwich Mean Time 그리니치 평균시)로 불리기도 한다.
// KST는 UTC보다 9시간이 빠르다.
// 기준은 현재 JS가 실행된 시스템의 시계에 의해 결정된다.

// 1970년 1월 1일 00:00:00(UTC)를 기준으로 경과된 밀리초 데이터를 가지고 있다.

// 생성방법
new Date(); // 현재시간. 기본적으로 밀리초 정수를 가지고 있지만, tostring되면 Mon Jul 06 2022 01:03:18 GMT+0900 (대한민국 표준시) 같이 출력된다.
Date(); // new 없이 호출하면 약간 다르다. Date객체 대신 String 을 반환한다.
new Date(86400000); // 밀리초단위로 넣어준다.
new Date("May 26, 2020 10:00:00"); // dateString을 넣어준다. Date.parse 메서드에 의해 해석가능해야 한다.
new Date("2020/03/26 10:00:00"); // 이게 가독성이 제일 좋은 듯 하다.
new Date(2022, 2); // day, h, m, s ,ms 까지 추가로 넣어줄 수 있따. 연월은 필수이다. month는 0~11 이므로 매우 조심하자!!! day는 1 ~ 31 이다.

// 메서드
Date.now(); // 밀리초를 숫자로 반환
Date.parse("Jan 2, 1970 09:00:00"); // 밀리초를 숫자로 반환
Date.UTC(2022, 0); // UTC 기준으로 밀리초 숫자반환한다.
Date.UTC("1970/1/2"); // NaN. 불가능하다.

new Date().getFullYear(2022); // 정수
new Date().setFullYear(1900, 0, 1); // 옵션으로 월, 일까지도 지정할 수 있다.
new Date().getMonth(); // 0 ~ 11 주의!!
new Date().getDate();
new Date().getDay(); // 일 0 월 1

// 너무 뻔한건 생략.

new Date().getTime(); // 밀리초 반환
new Date().getTimezoneOffset() / 60; // -9. (KST - 9) = UTC 임을 의미한다. 분 단위로 반환한다.
new Date().toDateString(); // Fri Jul 24 2020;
new Date().toString(); // Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
new Date().toISOString(); // ISO 8601 형식. 2020-07-24T03:30:00.000Z
new Date().toLocaleString("ko-KR"); //2020. 7. 24. 오후 12:30:00 --> 인수 생략시 시스템 기준으로 작동
new Date().toLocaleString("ja-JP"); //2020/7/24 12:30:00 --> 즉, 시간이 변경되는게 아니고 그 지역의 표현방식으로 시간을 toString 한다.
new Date().toLocaleTimeString("en-US"); // 시간부분만.



























