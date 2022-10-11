//console.dir() 로 log 보다 더 상세한 객체 확인가능!

// 키 - 값은 해시테이블구조로 표현
// V8엔진은 hidden class방식 사용. -> 자세한건 검색!
// hidden class : 속성을 동적으로 추가할 때, 그 속성을 지닌 히든클래스를 만든다. 이후 더 추가하면, 추가적으로 클래스를 만들어 직접 가리킨다.
// 성능을 위해, 계단식접근을 막기위함인데, 기존에 있는 히든클래스라면 재사용한다. 즉, a = {} 하고 b = {} 하면, {}라는 히든클래스가 이미 있기때문에
// b는 히든클래스를 따로 만들지 않는다. 고로, 최적화할때 동적 속성추가를 생각을 하면서 진행하자.
// 해시테이블을 발전시킨 형태이다.
/* 추가적으로 V8이 객체를 어떻게 관리하는지 관심이 있다면 아래를 참고
    Fast properties in V8
    V8 히든클래스 이야기
    자바스크립트 엔진의 최적화기법 (2) - Hidden class, Inline Caching
    How the V8 engine works?
    How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code
    Breaking the JavaScript Speed Limit with V8
    검색해보도록 하자! 책 147쪽
*/

// 객체 리터럴
var person = {
    name : "lee", // 프로퍼티키 : 값
    sayHello : function(){console.log("Hello")} //
}; // ;붙여야 함. (표현식이기 때문)

// 프로퍼티 동적생성
person['age'] = 30;
person.region = "korea";

//프로퍼티 접근
person.age;
person['region'];

//프로퍼티 삭제
delete person.age; // true 반환
delete person['region'];

// 프로퍼티 축약(ES6)
let x = 1, y = 2;
var obj = {x, y};

// 계산 프로퍼티(ES6)
let x = 1, y = 2, z = 3;
var obj = {[`${x+y}`] : z}; // {[expression] : value}

// 메서드 축약(ES6)
var obj = {name : "John",
            sayHi(){console.log(this.name + " Hi!")}   // 프로퍼티 할당함수와 다르게 동작
}; // 축약 표현만 메서드라고 한다.

// 전역객체
// 특수객체. 가장먼저 생성됨. Web = window, node.js = global
// 

// internal slot 내부슬롯, internal method 내부메서드
// 엔진내부에서 사용하는 의사프로퍼티, 의사메서드. [[]]로 표현됨
// 원칙적으로 접근불가능. 다만 [[prototype]] 내부슬롯은 __proto__ 접근자로 간접접근 가능.
o.[[prototype]] // 불가능하다.
o.__proto // 가능하다.

// property attribute 프로퍼티 어트리뷰트
// 프로퍼티 생성시 따라붙는 meta-property 메타정보
// 내부슬롯 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]](해당 프로퍼티 삭제, <- 앞의 property attribute들의 변경불가. 단, writable이 true인 경우, value쓰기랑, false로 하는건 가능)

// property descriptor 프로퍼티 디스크립터
// 프로퍼티 어트리뷰트에 직접접근할 수 없으므로, 간접접근방법제공.
Object.getOwnPropertyDescriptor(person, 'name'); // PropertyDescriptor 객체 반환. 없으면 undefined 반환
Object.getOwnPropertyDescriptors(person); // 모든 프로퍼티에 대한 데이터프로퍼티

// data property 데이터 프로퍼티
// 키-값 구성의 일반적인 프로퍼티

// accessor property 접근자 프로퍼티
// 자체적으로 값을 가지고 있는게 아니고, 접근자 함수로 구성된 프로퍼티
// 애들은 property attribute가 [[Get]] (getter 저장), [[Set]], [[Writable]], [[Configurable]] 이다. (자체적으로 [[Value]]를 가지지 않는다.)
var person = {
    first_name : "shin",
    last_name : "HJ",
    // 프로퍼티 어트리뷰트 [[Get]]에 추가된다. 
    get fullName(){ //프로퍼티로써 추가되는 것이다.
        console.log("Getter 호출!");
        return this.first_name + " " + this.last_name;},
    set fullName(name){
        console.log("Setter 호출!");
        let temp = name.split(' ');
        this.first_name = temp[0];
        this.last_name = temp[1];
    }
}
Object.getOwnPropertyDescriptor(person, 'fullName'); //property attribute에 get, set이 들어있는것을 알 수 있다.

//프로퍼티 정의 : 프로퍼티를 추가, 변경하면서 property attribute까지 명시적으로 정의하는 것.
Object.defineProperty(person, 'first_name', {
    value : 'ungmo',
    writable : true, // attribute를 직접 수정하고 있다. false일때 쓰면 에러는 발생하지 않고 무시된다.
    // 생략된 나머지는 어떻게될까? undefined나 false로 초기화된다.
    get(){
        return this.first_name;
    } // 접근자프로퍼티도 정의가능. 다만 여기선 value랑 같이 정의하는건 좀 아니겠지.
});
// 한꺼번에 여러개 가능
Object.defineProperties(person,{    // 깔끔한 코드는??????
    first_name: { value : 'ungmo',
                  writable : true},
    last_name: { value: "lee",
                 writable: false}
});

/* 
    객체 변경방지     추가 삭제 읽기 쓰기 속성재정의
        - 확장금지     x   o    o    o      o   -> 줄이거나 변경하는건 괜찮은데, 더 확장하진 마라.
        - 밀봉         x   x    o    o      x   -> 객체 구조 변경은 하지말고 사용만 해라
        - 동결         x   x    o    x      x   -> 아무것도 건드리지 마라. 읽기만 해라.
*/
// 만약 금지된 동작을 실행할 경우, 무시되지만, strict mode에서는 에러가 발생한다.
Object.preventExtensions(person);
Object.seal(person);
Object.freeze(person);

Object.isExtensible(person);
Object.isSealed(person);
Object.isFrozen(person);

// 불변 객체
// 위의 불변방지 메서드들은 shallow only이다.
// 중첩객체까지 재귀적으로 얼려 모든게 변하지 않게 하는 것.
var deepFreeze = function (obj){
    if(obj && typeof obj === 'object' && !Object.isFrozen(obj)){
        Object.freeze(obj);
        Object.keys(obj).forEach(key => deepFreeze(obj(key)));
    }
}

//생성자함수 = new 와 함께 호출되는 함수. 일반 함수와 꼴은 동일.
function Circle(radius) { // 일반함수와 동일한 방법으로 정의. new와 함께 호출시 생성자함수로 동작.
    // new 와 함께 호출하지 않으면 일반함수로 동작한다. (this로 전역객체를 오염시킬 수 있겠군.)
    // 일반함수와 형식적 차이가 없기때문에, Pascal case로써 명명하여 구별할 수 있도록 노력한다.

    // new로 쓰이면 암묵적으로 빈객체가 먼저 생성된다. 그 후 this 바인딩된다. 이는 함수 실행전에 이미 실행된다.
    this.radius = radius;
    this.getDiameter = function(){ // 메서드
        return 2 * this.radius;
    }
    // new로 쓰이면, 실행 후 바인딩된 this가 암묵적으로 반환된다.
    return 3; // 명시적으로 return 했다면, 객체라면 그게 나간다. 근데 원시값이라면 무시되고 this가 반환된다.
    // 이렇게 기본동작을 훼손할 수 있으므로 생성자 함수에서는 return 문을 반드시 생략해야 한다.

    // this는 함수 호출방식에 따라 동적으로 결정됨
    // 1. 일반함수로 호출 -> 전역객체 (함수객체를 가리키는게 아니구나!) (+ 그래서 콜백함수에서 this는 전역객체를 가리키는구나. )
    // 2. 메서드로서 호출 -> 메서드 호출한 객체
    // 3. 생성자함수로서 호출 -> 생성자함수가 (미래에) 생성할 인스턴스
}

/*
    함수객체 내부슬롯
    일반 객체와 달리 호출할 수 있기 때문에 추가적인 내부슬롯, 메서드를 가진다.
    1. 내부슬롯
        - [[Environment]], [[FormalParameters]]
            - Env : lexical scope를 따르기 때문에, 호출되는 위치에서의 환경(렉시컬 스코프)의 참조를 저장해야 한다.
    2. 내부 메서드
        - [[Call]] : 일반함수로써 호출 시 호출되는 메서드. 있으면 callable객체. 
        - [[Constructor]] : 생성자함수로써 호출 시 호출되는 메서드. 있으면 constructor객체. 없으면 non-constructor 라고 한다. 
            - 모든 함수가 constructor 인 것은 아니다.
            - constructor : 선언문, 표현식, class (class도 함수다.)
            - non-constructor : 화살표함수, 메서드(ES6 메서드 축약표현)
                - 이때, "메서드"로 인정되는 범위가 매우 좁다. 예컨데 add: function(){} 같은 경우 add 프로퍼티에 함수를 할당한 것 뿐이기 때문에 메서드가 아니다.
                - add(){} 같은 축약표현만 메서드로 인정한다.
*/

// new.target (ES6) : 생성자를 실수로 일반함수로 호출하는것을 막는 것
function Circle(radius){
    // new와 함께 호출되지 않았다면 new.target은 undefined이다.
    if(!new.target) return new Circle(radius); // new와 함께 사용되지 않았다면 new와 함께 재호출한다.
}

// scope-safe constructor 스코프세이프 생성자패턴
// ES6 이하나 IE 같은데서는 new.target을 사용할 수 없으므로, 대체용으로 사용. this 바인딩을 이용한다.
function Circle(radius){
    if(!(this instanceof Circle)){
        return new Circle(radius); // 잘못 호출했다면 new와 함께 재호출하여 생성자함수로써 사용하게 한다.
    }
}

// 대부분의 빌트인 객체 생성자 함수는 위처럼 생성자로만 사용되게끔 정의되어있다.
// 예외적으로 String, Number, Boolean 은 new 없이 호출하면 원시값을 반환한다.
// 이를 이용해서 형변환을 하는 것이다.
let number = Number("123"); // 생성자가 아닌 일반 함수가 호출되어 원시값을 리턴. new와 함께 쓰였다면 Number 객체가 반환된다.