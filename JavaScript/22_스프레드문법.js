// ES6 도입, 이터러블에 사용가능하다. rest 파라미터와는 반대개념이다.
// 결과는 값이 아니기 때문에 결과를 변수에 할당할 수는 없다. -> const list = ...[1, 2, 3]; 이런거 불가능하다는 말.
// 그럼어디에? ,로 구분한 값 목록을 사용하는 문맥에서 사용할 수 있다. (배열리터럴, 함수호출인수목록, 객체리터럴 프로퍼티 목록 등..)

// 스프레드 문법 이전에는 배열로 함수에 넣고싶으면 apply를 썼다.
Math.max.apply(null, arr); // 이런식으로..
Math.max([...arr]); // 이제는 이렇게 쓰면 된다.


// 용례
[...[1, 2], ...[3, 4]];// concat, splice 등 대체가능
const copy = [...arr]; // 배열복사 (얕은복사)
// 배열 유사객체 혹은 이터러블을 배열로 변환
function sum(){ return [...arguments].reduce(); }
// rest를 이용한 더 좋은 방법
const sum = (...args) => args.reduce();
// 다만, 이터러블이 아닌 유사배열객체는 Array.from으로 바꿔 사용한다.

// 객체에도 사용가능
const obj = { x: 1, y: 2 };
const copyObj = { ...obj };
const copy_oldversion = Object.assign({}, {x: 1, z: 3}, obj); // ES6에서 도입된 assign을 썼었는데, 이젠 걍 스프레드 쓰면 된다.

