/* 도입
    클래스(ES6)는 prototype의 단순한 syntax sugar인가?
        - 사실 클래스는 함수이다. 다만 생성자함수와 동작이 다르다. 더 엄격하고, 추가 기능을 제공한다.
            - new 없이 호출 시 에러 발생 -> 애초에 존재 이유가 객체 생성을 위해서이기 떄문이다.
            - extends, super 지원
            - 호이스팅 발생하지 않는 것 처럼 동작
            - 클래스 내 모든 코드는 암묵적으로 strict mode 지정됨(해제 불가)
            - constructor, prototype 메서드, static 메서드 모두 [[Enumerable]]이 false다. 즉 열거되지 않는다.
        - 보다시피, 생성자 함수보다 더 견고하고 명료하다. (다만 다른 방식보다 더 우월하다고 생각하지는 않는다고 한다.)
        - 즉, 단순한 문법적 설탕이 아니고, 새로운 객체생성매커니즘으로 보는 것이 더 합당하다!
*/

// 클래스 선언.
class Person { // 파스칼 케이스를 사용한다.
    // const Person = class MyClass {~~} 표현식 방식으로도 정의할 수도 있다.(무명클래스도 가능) 다만 일반적이지 않다.
    // 여튼, 이는 곧 class가 일급객체라는 것을 의미한다.(애초에 class는 함수이다.)

    //class에는 method만 정의할 수 있다. 생성자, 프로토타입메서드, 정적메서드 3가지를 정의가능하다.
    // 1. 생성자 -> 생성자함수에서는 function Person(name){~~} 으로 정의했었다.
    constructor(name){
        this.name = name; // 프로퍼티 추가. 근데 이제는 꼭 constructor내부가 아니더라도 그냥 필드처럼 프로퍼티를 추가할 수 있다.
        // 그럴일 없겠지만, return 문을 따로 쓰지 말자. 암묵적으로 this를 반환하는데, 다른 객체가 반환되면 문제가 생긴다.
        this.#job = "백수"; // private 참조시 #까지 붙여줘야한다!! 또한 이 방식으로 private필드를 할당할 수는 없다. 미리 정의되있어야 한다.
    }
    // 이 constructor는 평범한 메서드가 아니다. 그래서 console.log()로 Person을 찍어보면 constructor라는 메서드는 존재하지 않는다. (prototype에는 물론 constructor 속성이 있다.근데 그건 속성이다.)
    // 최대 한개만 존재가능하며, 생략가능하다. 생략시 빈 constructor를 만든다.

    // 2. 프로토타입 메서드 -> 생성자 함수에서는 Person.prototype.sayHi = ~~~ 라고 정의헀었다.
    sayHi(){
        console.log(`Hi ${this.name}!`);
    }

    // 3. 정적 메서드 -> 생성자함수에서는 Person.sayHello = ~~라고 정의했었다.
    static sayHello(){
        console.log("Hello");
    } // 먼저 말했었지만, 클래스 또는 생성자 함수를 하나의 namespace로 활용하여 정적메서드들을 모아놓으면 이름충돌방지, 구조화 등 효과가 있다.

    // 접근자 프로퍼티
    get nameRepeat(){ // 클래스의 메서드는 자동으로 prototype메서드가 된다. 그래서 접근자 프로퍼티 또한 prototype property가 된다.
        return this.name + ' ' + this.name;
    } // setter도 마찬가지. setter는 단 하나의 값만 할당하므로, 매개변수는 단 1개만 선언가능하다.

    // Field(최신사양)
    age = 3; // 이렇게, 필드를 사용가능하다(this는 쓰지 않는다)..ㅋㅋ 이제 constructor에서 this를 사용하지 않아도 된다!!!
    #job = "백수"; // 심지어 private 필드도 정의할 수 있다. 이는 접근자 프로퍼티에도 적용할 수 있다.
    job = "취준생"; // #job과 job은 다르다!! #까지 이름이라 생각하면 편하다.
    // 필드 참조시 this는 필수적으로 사용해야 한다.
    gender; // 이렇게 초기화하지 않으면 undefined로 할당된다.
    fieldMethod = () => {}; // 이렇게 메서드또한 정의가능하다!! 다만 이건 prototype메서드가 아닌 instance메서드가 된다. 따라서 비권장한다.
    static PI = 22 / 7; // static 필드도 사용가능하다!!! 쓋....

    /* 이런 표준사양은 어떻게 관리될까?
        TC39 (technical Committee 39)
            - 여러 사양 중 ECMA-262 (ECMA Script) 사양을 관리하는 위원회이다.
            - 구글, 애플, ms, 모질라 등의 브라우저벤더 / 페이스북, 트위터 같은 ECMA-262사양을 제대로 준수해야 하는 기업으로 구성되어있다.
            - TC39 프로세스
                - 새로운 표준사양을 추가하기 위해 공식적으로 명문화해놓은 과정
                - 승급조건을 만족시킨 proposal은 동의를 통해 다음 stage로 승급된다.
                    - 0 stage : strawman
                    - 1 stage : proposal
                    - 2 stage : draft
                    - 3 stage : candidate
                        - 여기까지 온 제안은 심각한 문제가 없는 한 변경되지 않고 대부분 4로 승급된다.
                    - 4 stage : finished
                        - 큰 이변이 없는이상 차기 ECMAScript 버전에 포함된다.
            - 현재 올라와있는 proposal들을 확인하고 싶다면 ECMAScript proposals 를 참고하자!

    */
} // 이렇게 정의된 Class는 평가되면 constructor로 바뀐다!

const me = new Person("Lee");
/* 인스턴스 생성과정
    1. 생성 및 this 바인딩
        1. 빈 객체 생성
        2. prototype 바인딩
        3. this 바인딩
    2. 초기화
        - constructor의 실행
    3. 인스턴스 반환
        - 만들었던 인스턴스가 암묵적으로 바인딩된 this를 반환
*/

/* 상속
    extends 키워드로 프로토타입링크까지 자동으로 수행가능하다.
    이전에는 pseudo classical inheritance 패턴을 사용했으나, 더는 필요하지 않다.. 그냥 Object.create로 부모 prototype을 복사해서 생성자링크를 바꿔주는 패턴이다.. 굳이 쓰지는 않겠다.
*/

class Base{}
class Deprived extends Base {} // construct가 생략되어있다. 자동으로 constructor(...args) { super(...args) }가 적용된다.
// 만약 subclass에서 constructor를 추가정의한다면 super()는 생략할 수 없다!!

//동적 상속
// extends뒤에는 Constructor 함수로 평가되는 "표현식"이 들어올 수 있다!!! ㅋㅋ 그래서 상속마저 동적으로 가능하다.
function Base2(a) { //모든 함수는 생성자함수! 생성자 함수 또한 상속가능하다.
    this.a = a;
}
let condition = false;
class Deprived2 extends (condition ? Base : Base2){} // ㅋㅋ.. 개쩌네

//super는 SubClass.prototype과 같다.
