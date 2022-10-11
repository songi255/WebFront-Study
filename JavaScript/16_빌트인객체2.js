// Number
const numObj = new Number('10'); // 파싱해서 Number wrapper 객체를 생성한다. 초기값 안주면 0이고, 변환불가능하면 NaN이 할당된다.
console.log(numObj); // [[PrimativeValue]] 를 출력하는데, [[NumberData]]에 저장된 값이다. ES5에서는 PrimativeValue라고 불렀었다...

