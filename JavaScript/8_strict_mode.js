//결론 : strict말고 ESLint 써라.

// 도입
function foo(){
    x = 1;
}
foo();
console.log(x); // 결과가 어떻게 될 것 같은가?
// var 취급되고, var는 함수레벨 스코프니 undefined가 나올것 같지만, JS는 이런 경우에 전역변수의 프로퍼티로 암묵적으로 할당해버린다. (implicit global : 암묵적 전역)
// 이런 실수들을 방지할 수 있을까? 그로 인해 strict mode 가 도입되었다.(ES5) 문법을 더욱 엄격히 적용한다.

// Lint 도구
//  - ESLint
//  - https://poiemaweb.com/eslint 참고!!\

// strict mode 적용
'use strict'; // 이렇게 써주면 아래로 쭉 적용된다. 호이스팅 되지 않으니 주의!!
// 이렇게 전역선두에 적거나 함수단위로 함수선두에 적용할 수도 있다.

/* 사용지침
    1. 전역 strict는 피하라
      - strict는 script 태그 단위로 적용된다. 따라서 의도치 않은 혼용위험이 있다.
      - 외부 library 사용시 non strict인 경우가 있다.
    2. 함수 단위도 피해라
      - 어떤함수는 strict고 어떤건 non.. 혼용되면 좋지 않다.
      - 함수의 외부환경이 non strict이면 문제가 생길 수 있다.
    3. 그래서 어쩌라고? -> 전역을 걍 즉시실행함수 단위로 감싸서 적용해라!!!
 */
(function (){
    'use strict';
    // 모든 코드를 이 아래에 적어버린다!!

})();

/* strict의 에러
    1. 암묵적 전역(선언하지 않은 변수) -> ReferenceError
    2. delete로 함수, 변수, 매개변수 등 프로퍼티가 아닌 것 삭제 -> SyntaxError
    3. 함수 매개변수명 중복 (function (x, x))
    4. with 사용불가
*/
// with 이란?
with({a: 1}){ // 해당 객체를 스코프체인에 추가한다.
    a = 3; // 그 결과, 객체 식별자 없이 프로퍼티를 사용할 수 있다. 동일 객체에 자주 접근해야 한다면 편하긴 하다
    // 코드가 간단해지나, 가독성 저하, 최적화도 수행되지 않아 성능도 저하되므로 쓰지 않는 것이 좋다.
}

/* strict mode의 변화
    1. 일반 함수의 this -> 외부객체가 아닌 undefined 바인딩 (어차피 사용안하니까.)
    2. arguments -> 매개변수를 재할당했을 때 argument에는 반영되지 않음 (원본보존)
*/

