// 비교연산
var x = 1;
var y = '1';
console.log(x == y); //loose equality.
console.log(x === y); // strict equality. 값과 타입. 웬만하면 이거쓰자.

//NaN === NaN은 false가 나온다. 일치비교 연산자에서 유일하게 자기자신과 일치하지 않는다.
//고로 NaN 확인시에는 isNaN() 사용하자!
// Object.is 이용한 비교연산 (더 직관적이다)
console.log(Object.is(NaN, NaN)); // true
console.log(NaN == NaN); // false

console.log(Object.is(+0, -0)); // false
console.log(+0 === -0); // true

console.log(Object.is(undefined, undefined)); // true
console.log(undefined === undefined); // true

var x, y, z; // 쉼표연산자.
x = 1, y = 2, z = 3; // 순서대로 실행, 맨 마지막 z = 3 값을 반환

//지수연산자(ES6)
2 ** 4; // 16

// () <- 그룹연산자

//typeof 연산자
var key = Symbol('key');
console.log(typeof key);
console.log(typeof null); // object 반환. 버그임

//형변환
var x = '1';
var y = +x; //단항연산자 +나 - 사용, 숫자로 변환 (묵시적변환)

x = null;
var z = +x; //null은 0 이 된다.

//문자열 + 연산
var x = '안녕';
var y = '하세요';
console.log(x+y); // 문자열끼리는 합쳐진다.

console.log(x + 15);// 안녕15. 다른타입과 합치면 toString 한다.
console.log(x + Symbol('key')); //Symbol은 안된다. ???? 다른데?
console.log(x + undefined); //undefined와 + 시 NaN 반환 -> 아닌데? 걍 반환하는데??

do{
    x--;
}while(x > -10); // ; 필요

// 블록문
{
    // 여러줄의 코드를 1줄인것처럼 만들어준다. let, const등을 사용하면 block레벨 스코프로써 작용한다.
}

//레이블 블록
foo : {
    console.log("실행됨!");
    break foo;
    console.log("실행되지 않음!");
}

// 단축평가
true || false; // 뒷문장 false는 실행되지 않는다.
// 마지막으로 실행한 평가문의 결과를 반환한다.
// if로 사용
a = flag && "완료"; // T면 실행
a = flag || "미완료"; // F면 실행
a = obj && obj.value; // obj가 null, undefined가 아니면 value참조 ??오류나는데?

// 함수에 인수 미전달시 undefined 전달.
function foo(str){
    str = str || ""; //단축평가로 오류방지
    console.log(str.length);
}

// Optional Chaining(ES11)
console.log(obj?.value); // obj가 null이나 undefined면 undefined 반환
console.log(""?.length); // ""는 단축평가에서 false로 평가되나 여기선 실행됨.

// null 병합 연산자(ES11)
var check = null;
var then = {value : "obj Then!"};
console.log(check ?? then); // check 가 null이나 undefined면 then 반환

// 성능확인
const t = performance.now(); // 타입스탬프로 성능측정 가능하다


