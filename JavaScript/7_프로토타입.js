// 모든 객체는 하나의 프로토타입을 가진다.
// 객체,  프로토타입, 생성자함수는 서로 연결되어있다.
//  - 객체.__proto__ -> 프로토타입
//  - 프로토타입.constructor -> 생성자함수
//  - 생성자함수.prototype -> 프로토타입

// __proto__는 [[prototype]]의 접근자프로퍼티. 간접접근한다.
// 객체가 직접 소유한 프로퍼티가 아니고, Object.prototype의 프로퍼티이다.
console.log({}.hasOwnProperty("__proto__")); // false. 자신의 프로퍼티가 아니라 상속받음.
console.log({}.__proto__ === Object.prototype); // true. 상속받은 것을 알 수 있다.

// 왜 직접 접근이 불가능할까? 프로토타입 체인을 방지하기 위해서이다. (프로퍼티검색, 객체생성 등등.. 무한 체이닝됨)
const parent = {};
const child = {};
parent.__proto__ = child;
child.__proto__ = parent; // Type Error. Cyclic __proto__ Value.
// 이렇듯, 직접 바꿀수는 있지만, __proto__ 프로퍼티를 사용못하는 객체도 있기 때문에(직접상속객체 등), __proto__또한 코드내에서 직접 사용하는것은 권장하지 않는다.
// 애초에 ES5 까지는 비표준이었다.
var obj = Object(null); // 여기서 obj는 프로토타입 최상위인 Object 객체이다. 따라서, 더이상의 prototype은 없다.
console.log(obj.__proto__); // undefined
// 따라서, 프로토타입을 조작하고 싶다면 Object.get/setPropertyOf()를 사용하자. -> 무슨 상속까지 동적으로 바꿔버리네..
console.log(Object.getPrototypeOf(obj)); // null. 두 메서드는 __proto__의 동작과 정확하게 일치한다.
console.log(Object.setPrototypeOf(obj, null)); // 객체의 프로토타입 교체
//get은 ES5, set은 ES6에서 도입되었다.

// prototype chain. 객체의 property에 접근할 때 없으면, 상위 프로토타입을 계속해서 탐색한다. 함수의 경우 호출시에 this를 바인딩해준다.
// 최상위는 항상 Object.prototype이고, end of prototype chain 이라고 한다.


var obj = {a: 1};
obj.hasOwnProperty('a'); // true 반환. 상속받지 않는 자신의 고유 프로퍼티 (prototype에 있는게 아닌..)

// prototype 프로퍼티
// 앞에서 말했지만.. constructor인 함수객체만 가지고 있다. 일반객체에는 없다. 그니까.. 내부슬롯 [[prototype]] 이 아니다.!!!
// 즉, non-callable과 화살표함수, 메서드축약표현으로 정의된 메서드는 prototype이 없다.
// 즉, 동일한 프로토타입이지만 사용처가 다르다. __proto는 자신의 프로토타입에 접근하기 위함이고, prototype은 자신이 생성할 객체에 할당하기 위해 사용하는 것.

// 프로토타입에 추가
function Circle(radius){ // 생성자 함수
    this.radius = radius;
}
Circle.prototype.getArea = r => Math.PI * r**2; // 프로토타입에 메서드 추가
var circle = new Circle();
//delete circle.getArea; 이렇게 하위객체를 통해 직접 set은 불가능하다.(get만 가능) 하려면 delete Circle.prototype.getArea 처럼 직접 접근해야 한다.

// 리터럴과 생성자
// 리터럴의 constructor는 그 타입의 생성자라고 단언할 수 없다.
console.log({}.constructor === Object); // true.
// 하지만 사양을 보면 Object에 인수없이, 혹은 undefined, null을 주면서 호출하면 내부적으로는 abstract operation인 OrdinaryObjectCreate를 호출한다.(이건 동일)
// 그러나 new.target확인이나 프로퍼티추가 등 세부내용은 다르다.?? -> 즉, 객체 리터럴은 Object 생성자함수가 생성한 게 아니다.
// Function 생성자의 경우에도, 클로저/렉시컬스코프를 만들지 않는 등 다르게 동작하므로 function으로 정의한 것은 Function에 의한 것이 아니다. 그러나 constructor는 Function을 가리킨다.
// 이는 리터럴객체도 상속을 위해 프로토타입이 필요하고, 프로토타입은 생성자함수와 더불어 생성되기 때문에, 쌍으로 가상적인 생성자 함수를 갖게 하는 것이다. <- 존나 이상하네
// 즉 constructor와 prototype은 항상 쌍이다.

// 생성시점
// prototype은 constructor 함수가 생성되는 시점에 더불어 생성된다.
// 사용자정의 생성자 -> 평가시점에 생성(런타임이전이 됨). prototype도 객체이므로 __proto__는 Object.prototype 이다.
// 빌트인 생성자 -> 마찬가지로 생성자함수 생성시점에 생성. 전역객체 생성시점에 생성된다.
// 전역객체는 런타임 이전에 생성되는 특수객체. 표준빌트인객체들 + 환경에 따른 호스트객체(web API, Node.js - host API), var 변수, 전역함수 등등을 프로퍼티로 갖는다.
console.log(global.Object === Object); // node환경, true. 즉 전역객체의 프로퍼티이다.

// 객체 생성방식
//  - 많은 방법이 있으나, 공통적으로 OrdinaryObjectCreate 추상연산을 사용한다.
//  - prototype필수(생성방법따라 다름), 프로퍼티목록을 옵션으로 전달받는다.
//    - 1. 빈객체 생성
//    - 2, 프로퍼티 추가
//    - 3. [[prototype]]에 전달받은 프로퍼티 할당
//  - 넘겨받는 prototype
//    - 객체 리터럴 - Object.prototype
//    - Object() 생성자 - Object.prototype
//    - 생성자함수 - 자기자신.

// property shadowing
// 프로토타입에 존재하는 프로퍼티를, 인스턴스 프로퍼티로 오버라이딩하면 존재는 하지만 가려진다. 이걸 이용하여 오버라이딩한다.
// tip : 오버로딩은 존재하지 않는다. arguments로 구현할 수는 있다.

// 프로토타입 교체
// 프로토타입을 Circle.prototype = {~~} 라고 대입해주면 교체가 될까? 리터럴객체는 constructor가 없어서 {}의 prototype 즉 체이닝으로 Object.prototype을 constructor로 검색한다. (링크가 파괴되었다.)
// 1. 생성자함수에 의한 교체 -> Circle.prototype = {constructor: Circle, ~~~} -> 링크가 설정되었다.
// 2. 인스턴스에 의한 교체 -> circle.__proto__ = {constructor : Circle} -> 마찬가지로 링크필요하다.
// 차이가 없어보이는가? 생성자 - 프로토타입 - 객체 링크가 되어있다. 인스턴스의 __proto__를 바꾼 것은 연결된 프로토타입만 바꾼 것. 생성자 -> 프로토타입 링크는 바뀌지 않았다!!
// 추가적으로 Circle.prototype = circle.__proto__ 해줘야 한다!!! 294쪽 그림 필요하면 참고!!
// 핵심은, 번거로우니 어떻게든 직접 교체하지 마라. 상속을 이용해라.

// instanceof
// 객체 instanceof 생성자 꼴로 사용. 상속 적용된다. -> 즉, constructor가 가리키는 prototype을 프로토타입체인 안에서 검색한다!! -> 존나 미묘한데... 생성자함수로 프로토타입을 교체해도,
// 생성자 함수가 교체된 프로토타입을 가리키고 있기때문에, 교체된 prototype이 생성자를 가리키지 않아도 instanceOf가 작동한다... 방향의 문제..
// 생성자함수가 아닌경우 TypeError 발생한다!!!
// 코딩 스타일 참고
function isInstanceOf(instance, constructor) {
    const prototype = Object.getPrototypeOf(instance);
    if (prototype === null) return false; // 종점에 다다른 것이므로
    return prototype === constructor.prototype || isInstanceOf(prototype, constructor); // 단축평가.. 개쩐다.
}

// 직접 상속
// 1. Object.create 사용
Object.create(Object.prototype, { // 첫번째 인수 = 지정할 프로토타입.
    x: { value: 1, writable: true, enumerable: true, configurable: true } // 두번째 인수(옵션) = {프로퍼티 키 - 프로퍼티 디스크립터} 구조의 객체.
}); // 두번째 인수는 구조가 Object.defineProperties 메서드의 2번째 인수 형식과 동일하다.
// Object.create의 장점 :
//  - new 없이 객체 생성가능
//  - 프로토타입 지정가능
//  - 리터럴객체도 상속가능
// 이때, prototype의 종점에 해당하는 객체를 지정해 줄 수도 있기 떄문에(Object.create(null)), 객체를 통해 Object.prototype의 메서드를 호출하는 건 바람직하지 않다.! (ESLint에서 비권장함.)
// 대신 call로 간접호출하라.
Object.prototype.hasOwnProperty.call(obj, 'A'); // 이런식으로 call을 통해 간접호출하라.

// 2. 리터럴 내부에서 __proto__지정
var obj = { // 1번 방식의 인자설정은 너무 번거롭다.
    y: 20,
    __proto__: Circle.prototype // (ES6)이렇게 정의시에 기존 프로토타입을 직접 상속시킨다.
}


// 정적 프로퍼티 / 정적 메서드
// 생성자 함수가 가진 멤버를 정적이라고 부른다. (프로토타입에 있는게 아니고, 생성자함수의 멤버인것이다.) 그래서 인스턴스가 호출은 불가능하다. Object.create가 대표적.
// this로 인스턴스를 가리킬 필요가 없다면, 프로토타입메서드, 인스턴스메서드는 정적메서드로 바꿀 수 있다.
// prototype의 멤버를 #으로 표기하는 경우가 있다! (Object.prototype.isPrototypeOf -> Object#isPrototypeOf)

// 프로퍼티 존재확인
// in 연산자
console.log('y' in obj); // 객체가 해당 프로퍼티를 포함하고 있는지 검사한다. (상속까지 포함)
// Reflect.has == in 과 동일.(ES6)
console.log(Reflect.has(obj, x));
console.log(obj.hasOwnProperty('x')); // 상속은 검사하지 않는다!!

// 프로퍼티 열거
for (prop in obj){
    console.log(prop); // key가 할당된다.
    // 이때, Enumerable 만 열거된다. 즉, prototype 프로퍼티도 열거되지만, Enum이 false 인 toString같은건 열거되지 않는다.
    // Symbol 키는 열거하지 않는다.
    // 열거 순서를 보장하지 않는다. 주의하라..
    // 하지만 대부분 모던 브라우저는 순서 보장하고, 숫자키는 정렬까지 해준다.
    // 배열에는 사용하지 말고, for ... of 나 forEach사용해라.
}
// (ES8) 자신의 프로퍼티만 열람하고 싶다면 in, hasOwn 검사 대신 다음 메서드들을 사용하라.
console.log(Object.keys(obj)); // 자신의 key만 배열로 반환 (Enumerable만)
Object.values(obj); // value 만
Object.entries(obj); // 쌍을 배열에 담아 배열로 리턴. [ ["a", "1"], ["b", "2"] ];

