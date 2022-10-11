//ES6에서 도입된 7번째 원시 데이터타입

//Symbol의 생성은 Symbol()을 통해서만 가능하다.
const mySymbol = Symbol();
// new Symbol(); // TypeError : new 와 함께 사용할 수 없다. (constructor가 아님)
console.log(mySymbol); // 콘솔로 찍어도 찍히지않는다.

Symbol("설명용"); // 생성시 설명용 문자열을 줄 수 있다. 디버깅용으로만 사용하며, 심벌값 생성에 어떠한 영향도 주지 않는다.
Symbol("설명용"); // 둘은 다른 Symbol이다.

console.log(mySymbol.description); // Symbol 또한 원래 원시값이니, 이런식으로 객체처럼 접근하면 암묵적으로 Wrapper 객체를 생성한다.

// 숫자나 문자열로 암묵적변환할 수 없다.
mySymbol + ''; // TypeError
+mySymbol; // TypeError

// boolean으로는 가능하다.
!!mySymbol; // if문 등에서 Symbol의 존재를 확인할 수 있다.

// 메서드
//Symbol.for은 global symbol registry에 key - Symbol객체 쌍으로 저장해서 공유할 수 있는 메서드이다. 설명용문자열과 다르다. 이건 key로 레지스트리에 등록된다.
const s1 = Symbol.for("key문자열"); // Symbol.for는 설명용으로 줬던 문자열을 key로 global symbol registry에서 Symbol을 검색한다.
const s2 = Symbol.for("key문자열"); // 만약 매칭되는 Symbol이 존재하면 그걸 반환하고, 없으면 새로 만들어서 레지스트리에 등록 후 반환한다.
s1 === s2;

// key값 받기
Symbol.keyFor(s1); // key문자열
Symbol.keyFor(mySymbol) // undefined. 설명용으로 for을 통하지 않고 생성한 심볼은 레지스트리에 등록되지 않는다.

// 심볼과 상수
const DirectionByProperty = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
}; // 이런 식으로, value는 중요하지 않고, key만이 의미있는 경우가 있다. 또한 매핑된 value가 변하거나 중복될 위험도 있다. 이런 경우 Symbol이 유용하다.

// Object.freeze와 함께 적용하여 마치 enum처럼 사용가능하다.
const Direction = Object.freeze({
    UP: Symbol('up'),
    DOWN: Symbol('down'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
});
const myDirection = Direction.UP;


// Symbol 프로퍼티 키
const obj = {
    [Symbol.for("key1")]: 1 // 프로퍼티 key는 문자열 혹은 Symbol도 가능하다. 다만 계산프로퍼티이므로 []가 필요하다.
    //Symbol이기 때문에 절대 충돌하지 않는다.
};
obj[Symbol.for("key1")]; // 1
// 이렇게 생성한 Symbol 프로퍼티 key는 for...in 문이나 Object.keys / Object.getOwnPropertyNames로 찾을 수 없다.
// 즉, 외부로 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

// 하지만 완전히 숨기는 것은 아니다. Object.getOwnPropertySymbols(ES6)으로 심벌프로퍼티키들을  볼 수 있다.
Object.getOwnPropertySymbols(obj); // [Symbol(key1)] 배열로 반환.


// 표준 빌트인객체의 확장
// 일반적으로, 표준 빌트인객체는 읽기전용으로 쓰는 것이 좋고, 메서드를 직접 추가하여 확장하는 것은 권하지 않는다.
// 이유는 직접 추가한 메서드 이름과 향후 추가될 메서드 이름이 중복될 수 있기 때문이다.
// 그렇다면 여기에 Symbol Property를 사용하면 어떨까?
Array.prototype[Symbol.for('sum')] = function(){
    return this.reduce((acc, cur) => acc + cur, 0);
}; // 절대 충돌하지 않는다!
[1, 2][Symbol.for('sum')](); // 3


// Well-Known Symbol
// JS가 기본제공하는 빌트인 심벌 값
// JS엔진의 내부사양에 사용된다.
// 예를들어 이터러블은 Symbol.iterator를 키로 갖는 메서드를 가지며, Symbol.iterator 메서드를 호출하면 이터레이터를 반환해야 한다.




